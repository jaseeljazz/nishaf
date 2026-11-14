/* =========================================================
   HalaQStore shared behaviour
   Header, live search, wishlist, cart drawer, quote form,
   newsletter and product rails. Load after catalog.js.
   Cart, wishlist and recently viewed are kept in localStorage
   so they carry between pages.
   ========================================================= */
const HQ = (() => {
  const WA = '97440001234';
  const FREE = 200;

  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ } }
  };
  const loadWish = () => store.get('hq_wish', []).filter(id => byId(id));
  const loadCart = () => store.get('hq_cart', []).filter(l => { const p = byId(l.id); return p && !p.quote && l.qty > 0; });

  const wish = new Set(loadWish());
  const cart = loadCart();
  let toast, quoteModal, quoteFor = null;

  function bump($el) { if (!$el.length) return; $el.removeClass('bump'); void $el[0].offsetWidth; $el.addClass('bump'); }

  /* ---------- Wishlist ---------- */
  function syncWish() {
    $('.wish-btn, .wish-lg').each(function () {
      const on = wish.has(+$(this).data('id'));
      $(this).toggleClass('active', on).attr('aria-pressed', on);
    });
    $('#wishCount').text(wish.size);
  }
  function toggleWish(id) {
    wish.has(id) ? wish.delete(id) : wish.add(id);
    store.set('hq_wish', [...wish]);
    syncWish(); bump($('#wishCount'));
    $(document).trigger('hq:wish');
  }

  /* ---------- Cart ---------- */
  function addToCart(id, qty = 1, silent = false) {
    const p = byId(id); if (!p || p.quote) return;
    const line = cart.find(l => l.id === p.id);
    line ? line.qty += qty : cart.push({ id: p.id, qty });
    saveCart(); bump($('#cartCount'));
    if (!silent && toast) { $('#toastImg').attr('src', p.art); $('#toastTitle').text(p.title); toast.show(); }
  }
  function saveCart() { store.set('hq_cart', cart); renderCart(); }
  function renderCart() {
    const count = cart.reduce((s, l) => s + l.qty, 0);
    const sub = cart.reduce((s, l) => s + byId(l.id).price * l.qty, 0);
    $('#cartCount').text(count);
    $('#drawerCount').text(`(${count} item${count === 1 ? '' : 's'})`);
    $('#cartSubtotal').text(qar(sub));
    $('#checkoutBtn').prop('disabled', !count);
    const left = Math.max(0, FREE - sub);
    $('#shipBar').css('width', Math.min(100, sub / FREE * 100) + '%');
    $('#shipText').html(left > 0 ? `Add <strong>${qar(left)}</strong> more for free express delivery` : `<i class="bi bi-check-circle-fill me-1" style="color:var(--hq-primary)"></i>You’ve unlocked <strong>free express delivery</strong>`);
    if (!cart.length) {
      $('#cartItems').html('<div class="cart-empty"><i class="bi bi-bag"></i><p class="mt-3 mb-3">Your cart is empty. Add an accessory to get started.</p><a class="btn btn-hq px-4" href="products.html">Browse accessories</a></div>');
      return;
    }
    $('#cartItems').html(cart.map(l => { const p = byId(l.id); return `
      <div class="cart-item" data-id="${p.id}"><a href="${productURL(p)}" tabindex="-1"><img src="${p.art}" alt=""></a>
        <div class="flex-fill" style="min-width:0"><a class="ci-title" href="${productURL(p)}">${esc(p.title)}</a>
          <div class="d-flex align-items-center justify-content-between gap-2">
            <div class="qty-control"><button type="button" class="js-qty" data-d="-1" aria-label="Decrease quantity">−</button><input value="${l.qty}" readonly aria-label="Quantity"><button type="button" class="js-qty" data-d="1" aria-label="Increase quantity">+</button></div>
            <div class="ci-price">${qar(p.price * l.qty)}</div></div>
          <button class="ci-remove mt-2 js-remove"><i class="bi bi-trash3 me-1"></i>Remove</button></div></div>`; }).join(''));
  }

  /* ---------- Recently viewed ---------- */
  function addRecent(id) {
    const r = store.get('hq_recent', []).filter(x => x !== id);
    r.unshift(id); store.set('hq_recent', r.slice(0, 12));
  }
  const recent = () => store.get('hq_recent', []).filter(id => byId(id));

  /* ---------- Rails ---------- */
  function updateRailButtons($rail) {
    const el = $rail[0]; if (!el) return;
    const $wrap = $rail.closest('.rail-wrap');
    const max = el.scrollWidth - el.clientWidth - 2;
    const x = Math.abs(el.scrollLeft);
    $wrap.find('.rail-btn.prev').prop('disabled', x <= 2);
    $wrap.find('.rail-btn.next').prop('disabled', x >= max);
  }
  function bindRails() {
    $('.rail').each(function () {
      const $r = $(this);
      $r.off('scroll.rail').on('scroll.rail', () => updateRailButtons($r));
      updateRailButtons($r);
    });
  }

  /* ---------- Quote ---------- */
  function waLink() {
    const p = quoteFor ? byId(quoteFor) : null;
    const msg = p ? `Hello HalaQStore, I'd like a quote for ${$('#qQty').val() || 1} x ${p.title}.` : 'Hello HalaQStore, I would like a bulk quote for computer accessories.';
    $('#quoteWa').attr('href', `https://wa.me/${WA}?text=` + encodeURIComponent(msg));
  }
  function openQuote(id, qty) {
    quoteFor = id || null; const p = id ? byId(id) : null;
    $('#quoteForm')[0].reset(); $('#qQty').val(qty || 1); $('#quoteErr').text('');
    $('#quoteFormWrap').removeClass('d-none'); $('#quoteDone').addClass('d-none');
    $('#quoteTitle').text(p ? 'Request a quote' : 'Request a bulk quote');
    $('#quoteItem').toggleClass('d-none', !p);
    if (p) { $('#quoteImg').attr('src', p.art); $('#quoteBrand').text(p.brand); $('#quoteName').text(p.title); }
    waLink(); quoteModal.show();
  }

  /* ---------- Live search ---------- */
  let idx = -1;
  const hl = (t, q) => esc(t).replace(new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig'), '<mark>$1</mark>');
  function search($in) {
    const q = $in.val().trim(); const $box = $in.closest('.search-wrap').find('.search-results');
    idx = -1;
    if (q.length < 2) { $box.removeClass('show').empty(); return; }
    const words = q.toLowerCase().split(/\s+/);
    const hits = P.filter(p => { const h = (p.title + ' ' + p.brand + ' ' + p.desc + ' ' + typeLabel(p.type)).toLowerCase(); return words.every(w => h.includes(w)); });
    $box.html(hits.length
      ? hits.slice(0, 6).map(p => `
        <a class="sr-item" href="${productURL(p)}" role="option"><img src="${p.art}" alt=""><div class="flex-fill"><div class="sr-title">${hl(p.title, q)}</div><div class="sr-meta">${esc(p.brand)} · <strong>${p.quote ? 'Request a quote' : qar(p.price)}</strong></div></div><i class="bi bi-chevron-right text-muted"></i></a>`).join('')
        + `<a class="sr-all" href="products.html?q=${encodeURIComponent(q)}">See all ${hits.length} result${hits.length === 1 ? '' : 's'} for “${esc(q)}”</a>`
      : `<div class="sr-empty">No products match “${esc(q)}”. Try a brand like “Logitech” or a type like “SSD”.</div>`).addClass('show');
  }

  /* ---------- Init ---------- */
  function init() {
    /* Logo fallback */
    const $logo = $('#brandLogo');
    const showFallback = () => { $logo.hide(); $('#brandFallback').css('display', 'flex'); };
    $logo.on('error', showFallback);
    if ($logo[0] && $logo[0].complete && $logo[0].naturalWidth === 0) showFallback();

    /* Photo fallback */
    document.addEventListener('error', e => {
      const t = e.target;
      if (t.tagName === 'IMG' && t.id !== 'brandLogo' && !t.dataset.fb && /unsplash/.test(t.src)) {
        t.dataset.fb = '1';
        t.src = 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1400&q=80';
      }
    }, true);

    toast = bootstrap.Toast.getOrCreateInstance(document.getElementById('cartToast'));
    quoteModal = new bootstrap.Modal('#quoteModal');

    /* Header */
    $(window).on('scroll', function () {
      const y = $(this).scrollTop();
      $('#mainHeader').toggleClass('scrolled', y > 10);
      $('#backTop').toggleClass('show', y > 700);
    });
    $('#backTop').on('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    $('.lang-toggle button').on('click', function () {
      $('.lang-toggle button').removeClass('active'); $(this).addClass('active');
      const ar = $(this).data('lang') === 'ar';
      $('html').attr({ dir: ar ? 'rtl' : 'ltr', lang: ar ? 'ar' : 'en' });
    });

    /* Wishlist */
    $(document).on('click', '.wish-btn, .wish-lg', function () { toggleWish(+$(this).data('id')); });

    /* Cart */
    $(document).on('click', '.js-add', function () {
      const $b = $(this); addToCart($b.data('id'));
      if ($b.hasClass('p-btn')) { $b.addClass('added').html('<i class="bi bi-check2"></i>Added'); setTimeout(() => $b.removeClass('added').html('<i class="bi bi-bag-plus"></i>Add to Cart'), 1400); }
    });
    $(document).on('click', '.js-qty', function () {
      const id = +$(this).closest('.cart-item').data('id'); const l = cart.find(x => x.id === id);
      l.qty += +$(this).data('d'); if (l.qty < 1) cart.splice(cart.indexOf(l), 1); saveCart();
    });
    $(document).on('click', '.js-remove', function () { const id = +$(this).closest('.cart-item').data('id'); cart.splice(cart.findIndex(l => l.id === id), 1); saveCart(); });
    $('#checkoutBtn').on('click', function () { const $b = $(this); $b.html('<span class="spinner-border spinner-border-sm me-2"></span>Opening secure checkout…'); setTimeout(() => $b.text('Checkout securely'), 1500); });

    /* Quote */
    $(document).on('click', '.js-quote', function (e) { e.preventDefault(); openQuote($(this).data('id')); });
    $(document).on('click', '.js-quote-general', function (e) { e.preventDefault(); openQuote(null); });
    $('#qQty').on('input', waLink);
    $('#qPhone').on('input', function () { this.value = this.value.replace(/\D/g, '').slice(0, 8); });
    $('#quoteForm').on('submit', function (e) {
      e.preventDefault();
      const name = $('#qName').val().trim(), phone = $('#qPhone').val().trim();
      if (!name) { $('#quoteErr').text('Enter your full name.'); $('#qName').focus(); return; }
      if (!/^[3-7]\d{7}$/.test(phone)) { $('#quoteErr').text('Enter an 8-digit Qatar mobile number, like 5555 1234.'); $('#qPhone').focus(); return; }
      $('#quoteDonePhone').text('+974 ' + phone.replace(/(\d{4})(\d{4})/, '$1 $2'));
      $('#quoteFormWrap').addClass('d-none'); $('#quoteDone').removeClass('d-none');
    });

    /* Search */
    $('.js-search').on('input focus', function () { search($(this)); });
    $('.js-search').on('keydown', function (e) {
      const $items = $(this).closest('.search-wrap').find('.sr-item');
      if (e.key === 'Escape') { $('.search-results').removeClass('show'); return; }
      if (!$items.length) return;
      if (e.key === 'ArrowDown') { e.preventDefault(); idx = (idx + 1) % $items.length; }
      else if (e.key === 'ArrowUp') { e.preventDefault(); idx = (idx - 1 + $items.length) % $items.length; }
      else if (e.key === 'Enter' && idx >= 0) { e.preventDefault(); location.href = $items.eq(idx).attr('href'); return; }
      else return;
      $items.removeClass('active').eq(idx).addClass('active');
    });
    $(document).on('click', e => { if (!$(e.target).closest('.search-wrap').length) $('.search-results').removeClass('show'); });

    /* Newsletter */
    $('#nlForm').on('submit', function (e) {
      e.preventDefault(); const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($('#nlEmail').val().trim());
      $('#nlMsg').css('color', ok ? '#FFE3B3' : '#FFD2CE').text(ok ? 'You’re subscribed. Watch your inbox for this week’s accessory deals.' : 'Enter a valid email address, like name@example.com.');
      if (ok) this.reset();
    });

    /* Rails */
    $(document).on('click', '.rail-btn', function () {
      const el = $(this).siblings('.rail')[0];
      const rtl = document.documentElement.dir === 'rtl';
      const dir = $(this).hasClass('next') ? 1 : -1;
      el.scrollBy({ left: dir * (rtl ? -1 : 1) * el.clientWidth * 0.9, behavior: 'smooth' });
    });
    $(window).on('resize', () => $('.rail').each(function () { updateRailButtons($(this)); }));

    /* Keep tabs in sync */
    window.addEventListener('storage', e => {
      if (e.key === 'hq_cart') { cart.splice(0, cart.length, ...loadCart()); renderCart(); }
      if (e.key === 'hq_wish') { wish.clear(); loadWish().forEach(id => wish.add(id)); syncWish(); $(document).trigger('hq:wish'); }
    });

    $('#yr').text(new Date().getFullYear());
    renderCart(); syncWish(); bindRails();
  }

  return { init, WA, FREE, store, syncWish, isWished: id => wish.has(id), addToCart, openQuote, addRecent, recent, updateRailButtons, bindRails };
})();

$(HQ.init);
