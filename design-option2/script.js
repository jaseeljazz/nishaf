/* HalaQStore — Design option 2 (index page logic). Uses P, TYPES, BRANDS, esc, qar, byId, productArt from catalog.js */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const productURL = p => '../product.html?id=' + p.id;
  const store = {
    get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
  };

  /* ---------- Real product photos (Unsplash) ---------- */
  const unsplash = (id, w = 500, h = w) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=75`;
  const PHOTO = {
    1: '1527864550417-7fd91fc51a46',  2: '1618384887929-16ec33fab9ef',  3: '1527814050087-3793815479db',
    4: '1628832307345-7404b47f1751',  5: '1541140532154-b024d705b90a',  6: '1623949556303-b0d17d198863',
    7: '1599669454699-248893623440',  8: '1595225476474-87563907a212',  9: '1615663245857-ac93bb7c39e7',
    10: '1629429407756-4a7703614972', 11: '1623949556303-b0d17d198863', 12: '1593640408182-31c70c8268f5',
    13: '1597872200969-2b65d56bd16b', 14: '1531492746076-161ca9bcad58', 15: '1602526429747-ac387a91d43b',
    16: '1625842268584-8f3296236761', 17: '1614624532983-4ce03382d63d', 18: '1602526429747-ac387a91d43b',
    19: '1562976540-1502c2145186',    20: '1541029071515-84cc54f84dc5', 21: '1591799264318-7e6ef8ddb7ea',
    22: '1531492746076-161ca9bcad58', 23: '1602526429747-ac387a91d43b', 24: '1600490722773-35753aea6332',
    25: '1609091839311-d5365f9ff1c5', 26: '1618410320928-25228d811631', 27: '1657181253444-66c4745d5a86',
    28: '1601524909162-ae8725290836', 29: '1606904825846-647eb07f5be2', 30: '1606904825846-647eb07f5be2',
    31: '1606904825846-647eb07f5be2', 32: '1657181253444-66c4745d5a86', 33: '1527443224154-c4a3942d3acf',
    34: '1587829741301-dc798b83add3', 35: '1616763355548-1b606f439f86', 36: '1618366712010-f4ae9c647dcb',
    37: '1623949556303-b0d17d198863'
  };
  P.forEach(p => { if (PHOTO[p.id]) p.art = unsplash(PHOTO[p.id]); });
  document.querySelectorAll('img[data-photo]').forEach(img => {
    img.src = unsplash(img.dataset.photo, +img.dataset.w || 800, +img.dataset.h || 600);
  });

  /* ---------- Header ---------- */
  const hdr = $('#hdr');
  const onScroll = () => hdr.classList.toggle('scrolled', scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  $('#searchToggle').addEventListener('click', () => { hdr.classList.toggle('search-open'); $('.search input').focus(); });
  addEventListener('keydown', e => {
    if (e.key === '/' && !/input|textarea/i.test(document.activeElement.tagName)) { e.preventDefault(); hdr.classList.add('search-open'); $('.search input').focus(); }
    if (e.key === 'Escape') closeDrawers();
  });
  $('#yr').textContent = new Date().getFullYear();
  $('#catbar').innerHTML = TYPES.map(t => `<a href="../products.html?type=${t.key}"><i class="bi ${t.icon}"></i>${esc(t.label)}</a>`).join('');

  /* ---------- Drawers ---------- */
  const scrim = $('#scrim');
  function openDrawer(id) { closeDrawers(); const d = $(id); d.classList.add('open'); d.setAttribute('aria-hidden', 'false'); scrim.classList.add('on'); }
  function closeDrawers() { $$('.drawer').forEach(d => { d.classList.remove('open'); d.setAttribute('aria-hidden', 'true'); }); scrim.classList.remove('on'); }
  scrim.addEventListener('click', closeDrawers);
  $$('[data-close]').forEach(b => b.addEventListener('click', closeDrawers));
  $('#menuBtn').addEventListener('click', () => openDrawer('#menuDrawer'));
  $('#cartBtn').addEventListener('click', () => openDrawer('#cartDrawer'));
  $$('[data-open-cart]').forEach(b => b.addEventListener('click', () => openDrawer('#cartDrawer')));

  $('#drawerNav').innerHTML =
    `<div class="dn-label">Explore</div>` +
    [['#trending', 'bi-stars', 'Trending'], ['#deal', 'bi-fire', 'Deal of the day'], ['#gaming', 'bi-controller', 'Gaming'], ['#business', 'bi-buildings', 'Business']]
      .map(([h, i, t]) => `<a href="${h}"><i class="bi ${i}"></i>${t}</a>`).join('') +
    `<div class="dn-label">Categories</div>` +
    TYPES.map(t => `<a href="../products.html?type=${t.key}"><i class="bi ${t.icon}"></i>${esc(t.label)}</a>`).join('');
  $$('#drawerNav a[href^="#"]').forEach(a => a.addEventListener('click', closeDrawers));

  /* ---------- Toast ---------- */
  let toastT;
  function toast(msg) {
    const t = $('#toast'); t.innerHTML = `<i class="bi bi-check-circle-fill"></i>${esc(msg)}`;
    t.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('on'), 2400);
  }

  /* ---------- Cart ---------- */
  let cart = store.get('hq2-cart', {});
  const FREE_SHIP = 200;
  function addToCart(id, qty = 1, silent) {
    cart[id] = (cart[id] || 0) + qty;
    if (cart[id] <= 0) delete cart[id];
    store.set('hq2-cart', cart); renderCart();
    if (!silent) toast(byId(id).title.split(' ').slice(0, 4).join(' ') + ' added to bag');
  }
  function renderCart() {
    const ids = Object.keys(cart).filter(byId);
    const count = ids.reduce((n, id) => n + cart[id], 0);
    const total = ids.reduce((n, id) => n + (byId(id).price || 0) * cart[id], 0);
    const dot = $('#cartCount'); dot.textContent = count; dot.hidden = !count;
    $('#cartTotal').textContent = qar(total);
    const left = FREE_SHIP - total;
    $('#shipText').innerHTML = left > 0 ? `Add <b>${qar(left)}</b> more for free delivery` : `<b>You've unlocked free delivery</b>`;
    $('#shipBar').style.width = Math.min(100, total / FREE_SHIP * 100) + '%';
    $('#cartItems').innerHTML = ids.length ? ids.map(id => {
      const p = byId(id);
      return `<div class="ci"><img src="${p.art}" alt=""><div><h4>${esc(p.title)}</h4><small>${qar(p.price)}</small></div>
        <div class="qty"><button data-q="-1" data-id="${id}" aria-label="Decrease">−</button><span>${cart[id]}</span><button data-q="1" data-id="${id}" aria-label="Increase">+</button></div></div>`;
    }).join('') : `<div class="cart-empty"><i class="bi bi-bag"></i>Your bag is empty.<br>Let's find something good.</div>`;
  }
  $('#cartItems').addEventListener('click', e => { const b = e.target.closest('[data-q]'); if (b) addToCart(b.dataset.id, +b.dataset.q, true); });

  /* ---------- Wishlist ---------- */
  let wish = new Set(store.get('hq2-wish', []));
  function renderWish() { const d = $('#wishCount'); d.textContent = wish.size; d.hidden = !wish.size; }

  /* ---------- Product art for banners ---------- */

  /* ---------- Hero slider ---------- */
  (() => {
    const track = $('#slides'), slides = $$('.slide', track), dots = $('#slDots');
    let i = 0, timer;
    dots.innerHTML = slides.map((_, n) => `<button aria-label="Go to slide ${n + 1}"></button>`).join('');
    const go = n => {
      i = (n + slides.length) % slides.length;
      track.style.transform = `translateX(${-i * 100}%)`;
      $$('button', dots).forEach((d, k) => d.classList.toggle('on', k === i));
      slides.forEach((s, k) => s.setAttribute('aria-hidden', k !== i));
    };
    const auto = () => { clearInterval(timer); timer = setInterval(() => go(i + 1), 5500); };
    $$('button', dots).forEach((d, k) => d.addEventListener('click', () => { go(k); auto(); }));
    $('#slPrev').addEventListener('click', () => { go(i - 1); auto(); });
    $('#slNext').addEventListener('click', () => { go(i + 1); auto(); });
    const sl = $('#slider');
    sl.addEventListener('mouseenter', () => clearInterval(timer));
    sl.addEventListener('mouseleave', auto);
    let x0 = null;
    sl.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
    sl.addEventListener('touchend', e => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 40) { go(i + (dx < 0 ? 1 : -1)); auto(); }
    });
    go(0); auto();
  })();

  /* ---------- Categories ---------- */
  const CAT_KEYS = ['keyboard', 'mouse', 'monitor', 'nvme', 'ram', 'headset', 'charger', 'router'];
  $('#cats').innerHTML = CAT_KEYS.map(k => {
    const t = TYPES.find(x => x.key === k);
    const p = P.find(x => x.type === k);
    const n = P.filter(x => x.type === k).length;
    return `<a class="cat" href="../products.html?type=${k}"><span class="cat-img"><img src="${p.art}" alt="" loading="lazy"></span><span><strong>${esc(t.label)}</strong><small>${n} products</small></span></a>`;
  }).join('');

  /* ---------- Product card ---------- */
  function card(p) {
    const off = p.old ? Math.round((1 - p.price / p.old) * 100) : 0;
    const badges = [off && `<span class="badge sale">−${off}%</span>`, p.isNew && `<span class="badge new">New</span>`, p.quote && `<span class="badge b2b">B2B</span>`].filter(Boolean).join('');
    const price = p.quote ? `<div class="price price-quote">Get quote</div>`
      : `<div class="price${p.old ? ' price-sale' : ''}">${p.old ? `<s>${qar(p.old)}</s>` : ''}${qar(p.price)}</div>`;
    return `<article class="card">
      <a class="card-media" href="${productURL(p)}"><span class="badges">${badges}</span><img src="${p.art}" alt="${esc(p.title)}" loading="lazy"></a>
      <button class="wish ${wish.has(p.id) ? 'on' : ''}" data-wish="${p.id}" aria-label="Save to wishlist"><i class="bi bi-heart${wish.has(p.id) ? '-fill' : ''}"></i></button>
      <div class="card-body">
        <span class="card-brand">${esc(p.brand)}</span>
        <a class="card-title" href="${productURL(p)}">${esc(p.title)}</a>
        <span class="card-rate"><i class="bi bi-star-fill"></i>${p.rating.toFixed(1)} <span>(${p.reviews})</span></span>
        <div class="card-foot">${price}
          ${p.quote ? `<a class="add quote" href="#business" aria-label="Request quote"><i class="bi bi-chat-dots"></i></a>` : `<button class="add" data-add="${p.id}" aria-label="Add to bag"><i class="bi bi-plus-lg"></i></button>`}
        </div>
      </div>
    </article>`;
  }

  /* ---------- Rail (slider) helpers ---------- */
  function wireRail(rail, arrows) {
    const [prev, next] = $$('.r-btn', arrows);
    const update = () => {
      prev.disabled = rail.scrollLeft <= 2;
      next.disabled = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 2;
    };
    [prev, next].forEach(b => b.addEventListener('click', () => rail.scrollBy({ left: +b.dataset.dir * rail.clientWidth * 0.9 })));
    rail.addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update);
    rail._update = update; update();
  }
  const arrowsHTML = `<div class="nav-arrows"><button class="r-btn" data-dir="-1" aria-label="Scroll left"><i class="bi bi-chevron-left"></i></button><button class="r-btn" data-dir="1" aria-label="Scroll right"><i class="bi bi-chevron-right"></i></button></div>`;

  /* ---------- Product sections ---------- */
  const RAILS = {
    toprated: { title: 'Top rated', sub: 'Highest-rated by our customers', link: '../products.html', list: () => P.filter(p => !p.quote).sort((a, b) => b.rating - a.rating || b.reviews - a.reviews).slice(0, 12) },
    gaming:   { title: 'Gaming gear', sub: 'Keyboards, mice, headsets and high-refresh monitors', link: '../products.html?q=Gaming', list: () => P.filter(p => p.brand === 'Razer' || /gaming/i.test(p.title)) },
    storage:  { title: 'Storage & memory', sub: 'NVMe, SATA and portable SSDs, DDR5 and flash drives', link: '../products.html?type=nvme', list: () => P.filter(p => ['nvme', 'ssd', 'ram', 'flash'].includes(p.type) && p.brand !== 'TP-Link') },
    input:    { title: 'Keyboards & mice', sub: 'Wireless, mechanical and ergonomic', link: '../products.html?type=keyboard', list: () => P.filter(p => ['keyboard', 'mouse'].includes(p.type)) },
    display:  { title: 'Monitors, audio & video', sub: 'Screens, headsets and webcams for work and play', link: '../products.html?type=monitor', list: () => P.filter(p => ['monitor', 'headset', 'webcam'].includes(p.type)) },
    power:    { title: 'Power, hubs & networking', sub: 'Chargers, power banks, docks, cables and Wi-Fi', link: '../products.html?type=charger', list: () => P.filter(p => ['charger', 'powerbank', 'hub', 'cable', 'router'].includes(p.type)) },
    budget:   { title: 'Under QAR 200', sub: 'Great picks that won\'t break the bank', link: '../products.html', list: () => P.filter(p => p.price && p.price <= 200).sort((a, b) => a.price - b.price) },
    business: { title: 'Business essentials', sub: 'Volume pricing available on every item', link: '#business', list: () => P.filter(p => p.quote).concat([17, 35, 26, 24, 2, 1].map(byId)).filter((p, k, a) => a.indexOf(p) === k) }
  };
  $$('[data-rail]').forEach(sec => {
    const cfg = RAILS[sec.dataset.rail];
    sec.innerHTML = `<div class="wrap">
      <div class="sec-head"><div><h2>${cfg.title}</h2><p>${cfg.sub}</p></div>
        <div class="sec-tools"><a href="${cfg.link}" class="link-more">View all <i class="bi bi-arrow-right"></i></a>${arrowsHTML}</div></div>
      <div class="rail">${cfg.list().map(card).join('')}</div></div>`;
    wireRail($('.rail', sec), $('.nav-arrows', sec));
  });

  /* Trending rail with tabs */
  const trendRail = $('#trendRail');
  const TABS = {
    featured: p => p.featured,
    logitech: p => p.brand === 'Logitech',
    samsung:  p => p.brand === 'Samsung',
    anker:    p => p.brand === 'Anker'
  };
  function renderTrend(tab) { trendRail.innerHTML = P.filter(TABS[tab]).map(card).join(''); trendRail.scrollLeft = 0; trendRail._update && trendRail._update(); }
  renderTrend('featured');
  wireRail(trendRail, $('#trending .nav-arrows'));
  $('#tabs').addEventListener('click', e => {
    const b = e.target.closest('[data-tab]'); if (!b) return;
    $$('#tabs button').forEach(x => x.classList.toggle('active', x === b));
    renderTrend(b.dataset.tab);
  });

  /* ---------- Global clicks: add to bag / wishlist ---------- */
  document.addEventListener('click', e => {
    const add = e.target.closest('[data-add]');
    if (add) { addToCart(+add.dataset.add); return; }
    const w = e.target.closest('[data-wish]');
    if (w) {
      const id = +w.dataset.wish;
      wish.has(id) ? wish.delete(id) : wish.add(id);
      store.set('hq2-wish', [...wish]); renderWish();
      $$(`[data-wish="${id}"]`).forEach(b => { b.classList.toggle('on', wish.has(id)); b.innerHTML = `<i class="bi bi-heart${wish.has(id) ? '-fill' : ''}"></i>`; });
      toast(wish.has(id) ? 'Saved to wishlist' : 'Removed from wishlist');
    }
  });

  /* ---------- Deal of the day ---------- */
  const deal = byId(13);
  $('#dealTitle').textContent = deal.title;
  $('#dealDesc').textContent = deal.desc + ' Free fitting at our Al Sadd store.';
  $('#dealPrice').textContent = qar(deal.price);
  $('#dealOld').textContent = qar(deal.old);
  $('#dealSave').textContent = 'Save ' + qar(deal.old - deal.price);
  $('#dealImg').src = unsplash(PHOTO[deal.id], 800, 600);
  $('#dealImg').alt = deal.title;
  $('#dealAdd').addEventListener('click', () => addToCart(deal.id));

  const pad = n => String(n).padStart(2, '0');
  const cd = $('#countdown');
  function tick() {
    const now = new Date(), end = new Date(now); end.setHours(24, 0, 0, 0);
    const s = Math.max(0, Math.floor((end - now) / 1000));
    $('[data-h]', cd).textContent = pad(Math.floor(s / 3600));
    $('[data-m]', cd).textContent = pad(Math.floor(s % 3600 / 60));
    $('[data-s]', cd).textContent = pad(s % 60);
  }
  tick(); setInterval(tick, 1000);

  /* ---------- Brands marquee ---------- */
  const brandHTML = BRANDS.map(b => `<a href="../products.html?brand=${encodeURIComponent(b.key)}">${esc(b.key)}<small>${esc(b.sub)}</small></a>`).join('');
  $('#marquee').innerHTML = brandHTML + brandHTML;

  /* ---------- Forms ---------- */
  $('#quoteForm').addEventListener('submit', e => { e.preventDefault(); e.target.reset(); toast('Thanks! Our B2B team will reply within 2 hours'); });
  $('#nlForm').addEventListener('submit', e => { e.preventDefault(); e.target.reset(); toast("You're subscribed. Welcome aboard!"); });

  renderCart(); renderWish();
})();

/* ---------- View-only mode: disable all links, buttons and forms ---------- */
(() => {
  const block = e => {
    if (e.target.closest('a, button, input, textarea, select, label, [data-add], [data-wish]')) {
      e.preventDefault(); e.stopImmediatePropagation();
    }
  };
  window.addEventListener('click', block, true);
  window.addEventListener('submit', e => { e.preventDefault(); e.stopImmediatePropagation(); }, true);
  window.addEventListener('keydown', e => { if (e.key === '/' || e.key === 'Enter' || e.key === ' ') { if (e.target.closest('a, button, input, textarea') || e.key === '/') { e.preventDefault(); e.stopImmediatePropagation(); } } }, true);
  document.querySelectorAll('a, button, input, textarea').forEach(el => {
    el.setAttribute('tabindex', '-1');
    if (el.matches('input, textarea')) el.readOnly = true;
    if (el.matches('a')) el.removeAttribute('href');
  });
  document.documentElement.classList.add('view-only');
})();
