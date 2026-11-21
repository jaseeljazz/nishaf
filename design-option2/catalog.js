/* =========================================================
   HalaQStore catalogue: product drawings, data and card markup.
   Shared by index.html, products.html and product.html.
   ========================================================= */

function productArt(type, tone, accent, view) {
  const dark = tone === 'dark';
  const body = dark ? '#2E3430' : '#FBFBFA';
  const edge = dark ? '#1C201D' : '#D5DAD6';
  const shade = dark ? '#3D453F' : '#ECEEEC';
  const key = dark ? '#454D47' : '#FFFFFF';
  const glow = accent || '#E69C22';
  const pcb = '#1F2523';
  const shadow = '<ellipse cx="100" cy="176" rx="64" ry="6" fill="#000" opacity=".08"/>';
  const rep = (n, f) => Array.from({ length: n }, (_, i) => f(i)).join('');
  let g = '';
  switch (type) {
    case 'keyboard':
      g = `<rect x="16" y="70" width="168" height="70" rx="9" fill="${body}" stroke="${edge}" stroke-width="1.5"/>
        ${rep(4, r => rep(13, c => `<rect x="${24 + c * 12}" y="${78 + r * 12}" width="9.5" height="9.5" rx="2" fill="${key}" stroke="${edge}" stroke-width=".8"/>`))}
        <rect x="60" y="126" width="80" height="9" rx="2" fill="${key}" stroke="${edge}" stroke-width=".8"/>
        <rect x="24" y="126" width="30" height="9" rx="2" fill="${key}" stroke="${edge}" stroke-width=".8"/><rect x="146" y="126" width="30" height="9" rx="2" fill="${key}" stroke="${edge}" stroke-width=".8"/>
        ${accent ? `<rect x="16" y="138" width="168" height="3" rx="1.5" fill="${glow}" opacity=".85"/>` : ''}`;
      break;
    case 'mouse':
      g = `<path d="M100 34 C142 34 150 82 150 114 C150 152 128 170 100 170 C72 170 50 152 50 114 C50 82 58 34 100 34Z" fill="${body}" stroke="${edge}" stroke-width="1.5"/>
        <path d="M100 34 V92 M54 92 Q100 100 146 92" stroke="${edge}" stroke-width="1.5" fill="none"/>
        <rect x="95" y="52" width="10" height="24" rx="5" fill="${shade}" stroke="${edge}"/>
        ${accent ? `<path d="M70 150 Q100 162 130 150" stroke="${glow}" stroke-width="3" fill="none" stroke-linecap="round"/>` : ''}`;
      break;
    case 'monitor':
      g = `<rect x="18" y="30" width="164" height="102" rx="6" fill="#1C201D"/>
        <rect x="24" y="36" width="152" height="88" rx="3" fill="#2F4152"/>
        <path d="M24 36 L110 36 L60 124 L24 124Z" fill="#fff" opacity=".07"/>
        <rect x="24" y="110" width="152" height="14" fill="${accent || '#616C64'}" opacity=".35"/>
        <rect x="92" y="132" width="16" height="26" fill="${shade}" stroke="${edge}"/>
        <rect x="62" y="156" width="76" height="10" rx="5" fill="${shade}" stroke="${edge}"/>`;
      break;
    case 'ssd':
      g = `<rect x="44" y="40" width="112" height="120" rx="12" fill="${body}" stroke="${edge}" stroke-width="1.5"/>
        <rect x="58" y="58" width="84" height="54" rx="6" fill="${accent || '#616C64'}"/>
        <rect x="68" y="70" width="44" height="6" rx="3" fill="#fff" opacity=".9"/><rect x="68" y="82" width="30" height="5" rx="2.5" fill="#fff" opacity=".6"/>
        <rect x="58" y="124" width="84" height="6" rx="3" fill="${shade}"/><rect x="58" y="136" width="52" height="6" rx="3" fill="${shade}"/>`;
      break;
    case 'nvme':
      g = `<rect x="16" y="84" width="168" height="36" rx="3" fill="${pcb}"/>
        <rect x="168" y="88" width="16" height="28" fill="#C9A227"/>${rep(6, i => `<rect x="${169 + 0}" y="${90 + i * 4.3}" width="14" height="1.6" fill="#8C6E12"/>`)}
        <circle cx="24" cy="102" r="5" fill="none" stroke="#C9CEC9" stroke-width="2"/>
        <rect x="40" y="90" width="36" height="24" rx="2" fill="#0E1110"/><rect x="84" y="90" width="36" height="24" rx="2" fill="#0E1110"/><rect x="128" y="92" width="28" height="20" rx="2" fill="#0E1110"/>
        <rect x="40" y="80" width="116" height="10" rx="2" fill="${accent || '#616C64'}"/>`;
      break;
    case 'ram':
      g = `<rect x="14" y="66" width="172" height="64" rx="3" fill="${pcb}"/>
        <path d="M14 66 H186 V110 H14Z" fill="${body}" stroke="${edge}"/>
        <path d="M14 66 L40 56 H160 L186 66Z" fill="${shade}" stroke="${edge}"/>
        <rect x="26" y="78" width="70" height="8" rx="2" fill="${accent || '#E69C22'}"/>
        <rect x="14" y="122" width="172" height="8" fill="#C9A227"/>${rep(28, i => `<rect x="${18 + i * 6}" y="123" width="3" height="6" fill="#8C6E12"/>`)}
        <rect x="96" y="120" width="6" height="12" fill="#fff"/>`;
      break;
    case 'headset':
      g = `<path d="M46 112 V96 A54 56 0 0 1 154 96 V112" stroke="${body}" stroke-width="13" fill="none" stroke-linecap="round"/>
        <path d="M46 112 V96 A54 56 0 0 1 154 96 V112" stroke="${edge}" stroke-width="1.2" fill="none"/>
        <rect x="26" y="100" width="40" height="62" rx="18" fill="${body}" stroke="${edge}" stroke-width="1.5"/>
        <rect x="134" y="100" width="40" height="62" rx="18" fill="${body}" stroke="${edge}" stroke-width="1.5"/>
        <rect x="34" y="110" width="24" height="42" rx="12" fill="${accent || shade}"/><rect x="142" y="110" width="24" height="42" rx="12" fill="${accent || shade}"/>
        <path d="M40 150 Q50 176 84 170" stroke="${dark ? '#1C201D' : '#9CA3AF'}" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="86" cy="170" r="5" fill="${dark ? '#1C201D' : '#6B7280'}"/>`;
      break;
    case 'webcam':
      g = `<rect x="44" y="64" width="112" height="46" rx="23" fill="${body}" stroke="${edge}" stroke-width="1.5"/>
        <circle cx="100" cy="87" r="16" fill="#121514"/><circle cx="100" cy="87" r="10" fill="#2D3A47"/><circle cx="100" cy="87" r="4.5" fill="#080a09"/><circle cx="95" cy="82" r="2.5" fill="#fff" opacity=".75"/>
        <circle cx="128" cy="87" r="2.5" fill="#4ADE80"/><circle cx="66" cy="87" r="3" fill="${shade}"/>
        <path d="M80 110 L74 140 H126 L120 110" fill="${shade}" stroke="${edge}"/><rect x="68" y="138" width="64" height="10" rx="4" fill="${shade}" stroke="${edge}"/>`;
      break;
    case 'hub':
      g = `<path d="M30 102 Q10 102 12 130 Q14 160 40 162" stroke="${dark ? '#1C201D' : '#9CA3AF'}" stroke-width="5" fill="none" stroke-linecap="round"/>
        <rect x="38" y="156" width="14" height="10" rx="3" fill="#C9CEC9"/>
        <rect x="30" y="84" width="150" height="38" rx="12" fill="${body}" stroke="${edge}" stroke-width="1.5"/>
        ${rep(3, i => `<rect x="${52 + i * 22}" y="98" width="15" height="9" rx="1.5" fill="#1C201D"/>`)}
        <rect x="122" y="99" width="20" height="7" rx="1.5" fill="#1C201D"/><rect x="148" y="100" width="12" height="5" rx="2.5" fill="#1C201D"/>
        <circle cx="168" cy="103" r="2.2" fill="${glow}"/>`;
      break;
    case 'charger':
      g = `<rect x="84" y="28" width="8" height="26" rx="2" fill="#B8BDB9"/><rect x="108" y="28" width="8" height="26" rx="2" fill="#B8BDB9"/>
        <rect x="62" y="50" width="76" height="104" rx="18" fill="${body}" stroke="${edge}" stroke-width="1.5"/>
        <rect x="88" y="116" width="24" height="7" rx="3.5" fill="#1C201D"/><rect x="88" y="130" width="24" height="7" rx="3.5" fill="#1C201D"/>
        <path d="M96 76 L90 92 H100 L94 106" stroke="${glow}" stroke-width="3" fill="none" stroke-linejoin="round" stroke-linecap="round"/>`;
      break;
    case 'powerbank':
      g = `<rect x="56" y="30" width="88" height="140" rx="16" fill="${body}" stroke="${edge}" stroke-width="1.5"/>
        <rect x="68" y="44" width="64" height="30" rx="5" fill="#1C201D"/><text x="100" y="65" font-family="Arial,sans-serif" font-size="14" font-weight="700" fill="${glow}" text-anchor="middle">98%</text>
        ${rep(4, i => `<circle cx="${82 + i * 12}" cy="150" r="3" fill="${i < 3 ? glow : shade}"/>`)}
        <rect x="86" y="164" width="28" height="4" rx="2" fill="#1C201D"/>`;
      break;
    case 'cable':
      g = `${rep(6, i => `<ellipse cx="100" cy="100" rx="${62 - i * 7}" ry="${50 - i * 6}" fill="none" stroke="${accent || (dark ? '#2E3430' : '#C9CEC9')}" stroke-width="5" opacity="${1 - i * .08}"/>`)}
        <path d="M150 126 Q170 150 156 166" stroke="${accent || (dark ? '#2E3430' : '#C9CEC9')}" stroke-width="5" fill="none"/>
        <rect x="146" y="160" width="20" height="14" rx="4" fill="#E5E7EB" stroke="#9CA3AF"/><rect x="151" y="172" width="10" height="5" rx="2" fill="#9CA3AF"/>`;
      break;
    case 'router':
      g = `${[[50, 44, 72], [80, 34, 82], [114, 34, 82], [144, 44, 72]].map(([x, y, h]) => `<rect x="${x}" y="${y}" width="6" height="${h}" rx="3" fill="${dark ? '#1C201D' : '#C9CEC9'}"/>`).join('')}
        <path d="M36 118 L164 118 L172 146 L28 146 Z" fill="${body}" stroke="${edge}" stroke-width="1.5"/>
        <rect x="28" y="144" width="144" height="8" rx="3" fill="${shade}" stroke="${edge}"/>
        ${rep(6, i => `<circle cx="${70 + i * 12}" cy="132" r="2.3" fill="${i < 4 ? '#4ADE80' : '#E69C22'}"/>`)}`;
      break;
    case 'flash':
      g = `<g transform="rotate(-30 100 100)"><rect x="40" y="82" width="96" height="36" rx="8" fill="${body}" stroke="${edge}" stroke-width="1.5"/>
        <rect x="136" y="88" width="34" height="24" rx="2" fill="#C9CEC9" stroke="#9CA3AF"/><rect x="148" y="94" width="7" height="5" fill="#8A918C"/><rect x="148" y="102" width="7" height="5" fill="#8A918C"/>
        <rect x="52" y="92" width="50" height="16" rx="3" fill="${accent || '#616C64'}"/><circle cx="48" cy="100" r="3" fill="none" stroke="${edge}" stroke-width="2"/></g>`;
      break;
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${view || '0 0 200 200'}">${shadow}${g}</svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

/* =========================================================
   DATA (demo prices – replace with live catalogue)
   ========================================================= */
const TYPES = [
  { key: 'keyboard',  label: 'Keyboards',         icon: 'bi-keyboard' },
  { key: 'mouse',     label: 'Mice',              icon: 'bi-mouse' },
  { key: 'monitor',   label: 'Monitors',          icon: 'bi-display' },
  { key: 'nvme',      label: 'NVMe SSDs',         icon: 'bi-device-ssd' },
  { key: 'ssd',       label: 'SATA & portable SSDs', icon: 'bi-hdd' },
  { key: 'ram',       label: 'Memory (RAM)',      icon: 'bi-memory' },
  { key: 'headset',   label: 'Headsets',          icon: 'bi-headset' },
  { key: 'webcam',    label: 'Webcams',           icon: 'bi-webcam' },
  { key: 'hub',       label: 'USB-C hubs & docks',icon: 'bi-usb-symbol' },
  { key: 'charger',   label: 'Chargers',          icon: 'bi-lightning-charge' },
  { key: 'powerbank', label: 'Power banks',       icon: 'bi-battery-charging' },
  { key: 'cable',     label: 'Cables',            icon: 'bi-usb-c' },
  { key: 'flash',     label: 'USB drives & adapters', icon: 'bi-usb-drive' },
  { key: 'router',    label: 'Wi-Fi routers',     icon: 'bi-router' }
];

const BRANDS = [
  { key: 'Logitech', sub: 'Keyboards & mice' },
  { key: 'Razer',    sub: 'Gaming gear' },
  { key: 'Samsung',  sub: 'SSDs & monitors' },
  { key: 'Kingston', sub: 'Memory & storage' },
  { key: 'Anker',    sub: 'Charging & hubs' },
  { key: 'TP-Link',  sub: 'Networking' },
  { key: 'Dell',     sub: 'Business accessories' }
];

const P = [
  // Logitech
  { id: 1, brand: 'Logitech', type: 'mouse', title: 'Logitech MX Master 3S Wireless Performance Mouse, Graphite', desc: '8K DPI sensor that tracks on glass, quiet clicks and up to 70 days per charge.', price: 389, old: 449, featured: true },
  { id: 2, brand: 'Logitech', type: 'keyboard', tone: 'dark', title: 'Logitech MX Keys S Wireless Illuminated Keyboard', desc: 'Smart backlighting, switches between 3 devices, works with Mac and Windows.', price: 429, featured: true },
  { id: 3, brand: 'Logitech', type: 'mouse', title: 'Logitech Pebble Mouse 2 M350s Slim Bluetooth Mouse', desc: 'Silent, slim and pocketable with up to 24 months battery life.', price: 99 },
  { id: 4, brand: 'Logitech', type: 'mouse', tone: 'dark', accent: '#E69C22', title: 'Logitech G502 X Lightspeed Wireless Gaming Mouse', desc: 'Hybrid optical-mechanical switches and HERO 25K sensor for competitive play.', price: 549 },
  { id: 5, brand: 'Logitech', type: 'keyboard', title: 'Logitech K380 Multi-Device Bluetooth Keyboard', desc: 'Compact and quiet, types on your laptop, tablet and phone.', price: 159 },
  { id: 6, brand: 'Logitech', type: 'webcam', tone: 'dark', title: 'Logitech Brio 300 Full HD Webcam with Privacy Shutter', desc: 'Auto light correction and noise-reducing mic for clear video calls.', price: 249 },
  { id: 7, brand: 'Logitech', type: 'headset', title: 'Logitech G435 Lightspeed Wireless Gaming Headset', desc: 'Lightweight 165 g design with Bluetooth and low-latency wireless.', price: 279 },

  // Razer
  { id: 8,  brand: 'Razer', type: 'keyboard', tone: 'dark', accent: '#44D62C', title: 'Razer BlackWidow V4 Mechanical Gaming Keyboard, Green Switches', desc: 'Tactile clicky switches, per-key Chroma RGB and a magnetic wrist rest.', price: 649, featured: true },
  { id: 9,  brand: 'Razer', type: 'mouse', tone: 'dark', title: 'Razer DeathAdder V3 Ultra-Light Wired Gaming Mouse', desc: 'Ergonomic 59 g shape with Focus Pro 30K optical sensor.', price: 299 },
  { id: 10, brand: 'Razer', type: 'headset', tone: 'dark', accent: '#44D62C', title: 'Razer Kraken V4 Wireless RGB Gaming Headset', desc: 'Immersive spatial audio, cooling gel ear cushions and up to 70 hours battery.', price: 529, isNew: true },
  { id: 11, brand: 'Razer', type: 'webcam', tone: 'dark', title: 'Razer Kiyo X Full HD Streaming Webcam', desc: '1080p 30 FPS with auto focus, ideal for streaming and meetings.', price: 249 },
  { id: 12, brand: 'Razer', type: 'keyboard', tone: 'dark', accent: '#44D62C', title: 'Razer Huntsman Mini 60% Optical Gaming Keyboard', desc: 'Compact 60% layout with fast optical switches and PBT keycaps.', price: 449 },

  // Samsung
  { id: 13, brand: 'Samsung', type: 'nvme', accent: '#E69C22', title: 'Samsung 990 PRO 1TB PCIe 4.0 NVMe M.2 SSD', desc: 'Read speeds up to 7,450 MB/s for faster boot, games and creative apps.', price: 449, old: 529, featured: true },
  { id: 14, brand: 'Samsung', type: 'ssd', accent: '#2F4152', title: 'Samsung 870 EVO 1TB 2.5" SATA SSD', desc: 'Easy upgrade for older laptops and desktops, 5-year limited warranty.', price: 349 },
  { id: 15, brand: 'Samsung', type: 'ssd', tone: 'dark', accent: '#616C64', title: 'Samsung T7 Portable SSD 1TB USB 3.2, Titan Grey', desc: 'Pocket-sized external drive with transfers up to 1,050 MB/s.', price: 399 },
  { id: 16, brand: 'Samsung', type: 'monitor', title: 'Samsung Odyssey G5 27" QHD 165Hz Curved Gaming Monitor', desc: '1000R curve, 1ms response and HDR10 for smooth, immersive play.', price: 999, featured: true },
  { id: 17, brand: 'Samsung', type: 'monitor', accent: '#E69C22', title: 'Samsung ViewFinity S6 27" QHD Monitor with USB-C', desc: 'Single-cable laptop connection with 90W charging and height-adjustable stand.', price: 1199 },
  { id: 18, brand: 'Samsung', type: 'flash', accent: '#9CA3AF', title: 'Samsung BAR Plus 128GB USB 3.1 Flash Drive', desc: 'Durable metal casing with up to 400 MB/s read speed.', price: 79 },

  // Kingston
  { id: 19, brand: 'Kingston', type: 'ram', tone: 'dark', title: 'Kingston FURY Beast 16GB DDR5 5600MT/s Desktop Memory', desc: 'Plug-and-play overclocking with Intel XMP 3.0 and AMD EXPO.', price: 249, featured: true },
  { id: 20, brand: 'Kingston', type: 'ram', tone: 'dark', accent: '#D9433A', title: 'Kingston FURY Beast 32GB (2x16GB) DDR5 6000MT/s Kit', desc: 'Dual-channel kit for gaming and content creation builds.', price: 449 },
  { id: 21, brand: 'Kingston', type: 'nvme', accent: '#616C64', title: 'Kingston NV3 1TB PCIe 4.0 NVMe M.2 SSD', desc: 'Affordable Gen 4 speeds up to 6,000 MB/s read.', price: 279 },
  { id: 22, brand: 'Kingston', type: 'ssd', accent: '#D9433A', title: 'Kingston A400 480GB 2.5" SATA SSD', desc: 'Up to 10x faster than a hard drive for an instant speed boost.', price: 129 },
  { id: 23, brand: 'Kingston', type: 'flash', accent: '#E69C22', title: 'Kingston DataTraveler Exodia 64GB USB 3.2 Flash Drive', desc: 'Protective cap and key loop for everyday file transfers.', price: 29 },

  // Anker
  { id: 24, brand: 'Anker', type: 'charger', title: 'Anker 735 Nano II 65W 3-Port USB-C GaN Charger', desc: 'Charges a laptop, phone and earbuds together from one compact plug.', price: 199, featured: true },
  { id: 25, brand: 'Anker', type: 'powerbank', tone: 'dark', title: 'Anker 737 Power Bank 24,000mAh 140W', desc: 'Smart display shows remaining power, fast enough to charge laptops.', price: 549 },
  { id: 26, brand: 'Anker', type: 'hub', title: 'Anker 343 7-in-1 USB-C Hub with 4K HDMI', desc: '100W pass-through charging, HDMI, SD card reader and USB-A ports.', price: 179 },
  { id: 27, brand: 'Anker', type: 'cable', tone: 'dark', title: 'Anker PowerLine III USB-C to USB-C Cable 1.8 m, 100W', desc: 'Braided and bend-tested for laptops, tablets and phones.', price: 59 },
  { id: 28, brand: 'Anker', type: 'hub', tone: 'dark', title: 'Anker 332 5-in-1 USB-C Hub', desc: 'Compact travel hub with HDMI, two USB-A ports and pass-through charging.', price: 109 },

  // TP-Link
  { id: 29, brand: 'TP-Link', type: 'router', tone: 'dark', title: 'TP-Link Archer AX55 AX3000 Dual-Band Wi-Fi 6 Router', desc: 'Faster, lower-latency Wi-Fi for gaming, streaming and video calls.', price: 289, old: 329, featured: true },
  { id: 30, brand: 'TP-Link', type: 'router', title: 'TP-Link Archer C6 AC1200 Dual-Band Router', desc: 'Reliable dual-band Wi-Fi with four external antennas.', price: 139 },
  { id: 31, brand: 'TP-Link', type: 'flash', tone: 'dark', accent: '#616C64', title: 'TP-Link Archer T3U Plus AC1300 USB Wi-Fi Adapter', desc: 'Adds dual-band Wi-Fi to any desktop or laptop with a high-gain antenna.', price: 69 },
  { id: 32, brand: 'TP-Link', type: 'hub', title: 'TP-Link UE300 USB 3.0 to Gigabit Ethernet Adapter', desc: 'Wired internet for laptops without an Ethernet port.', price: 59 },

  // Dell (business – quote)
  { id: 33, brand: 'Dell', type: 'monitor', title: 'Dell Pro 24 Plus Monitor P2425H, 24" FHD IPS', desc: 'Eye-comfort IPS panel with full height, tilt and swivel adjustment.', price: null, quote: true },
  { id: 34, brand: 'Dell', type: 'keyboard', tone: 'dark', title: 'Dell Pro Wireless Keyboard and Mouse Combo KM5221W', desc: 'Spill-resistant keyboard and quiet mouse on one USB receiver.', price: null, quote: true },
  { id: 35, brand: 'Dell', type: 'hub', tone: 'dark', title: 'Dell Thunderbolt 4 Dock WD22TB4', desc: 'One cable for dual 4K monitors, Ethernet, USB and 130W charging.', price: null, quote: true, featured: true },
  { id: 36, brand: 'Dell', type: 'headset', tone: 'dark', title: 'Dell Pro Wireless ANC Headset WL5024', desc: 'Noise-cancelling headset certified for Microsoft Teams and Zoom.', price: null, quote: true },
  { id: 37, brand: 'Dell', type: 'webcam', tone: 'dark', title: 'Dell Pro Webcam WB5023 2K QHD', desc: 'AI auto-framing and HDR for sharper meetings.', price: null, quote: true }
];

/* =========================================================
   PRODUCT DETAILS (demo data – replace with live catalogue)
   Key facts shown on the product page. `Warranty` defaults
   to 2 years when not set.
   ========================================================= */
const SPECS = {
  1:  { Connectivity: 'Bluetooth and Logi Bolt USB receiver', Sensor: '8,000 DPI Darkfield, tracks on glass', Battery: 'Up to 70 days, USB-C quick charge', Weight: '141 g' },
  2:  { Connectivity: 'Bluetooth and Logi Bolt USB receiver', Layout: 'Full size with number pad', Backlight: 'Smart illumination with hand sensor', Battery: 'Up to 10 days with backlight, 5 months without' },
  3:  { Connectivity: 'Bluetooth', Tracking: '400 to 4,000 DPI', Battery: 'Up to 24 months, 1 x AA', Weight: '76 g' },
  4:  { Connectivity: 'Lightspeed wireless and USB-C wired', Sensor: 'HERO 25K', Battery: 'Up to 130 hours', Weight: '102 g' },
  5:  { Connectivity: 'Bluetooth', Layout: 'Compact, no number pad', Devices: 'Up to 3 with Easy-Switch', Battery: 'Up to 24 months, 2 x AAA' },
  6:  { Resolution: '1080p at 30 FPS', 'Field of view': '70°', Connection: 'USB-C', Microphone: 'Noise-reducing mono mic' },
  7:  { Connectivity: 'Lightspeed wireless and Bluetooth', Drivers: '40 mm', Battery: 'Up to 18 hours', Weight: '165 g' },
  8:  { Switches: 'Razer Green mechanical, clicky', Connection: 'USB-C wired', Lighting: 'Razer Chroma RGB per key', Extras: 'Magnetic wrist rest, media keys' },
  9:  { Sensor: 'Focus Pro 30K optical', Connection: 'Wired, Speedflex cable', 'Polling rate': 'Up to 8,000 Hz', Weight: '59 g' },
  10: { Connectivity: 'HyperSpeed wireless, Bluetooth and USB', Drivers: '40 mm', Battery: 'Up to 70 hours', Lighting: 'Razer Chroma RGB' },
  11: { Resolution: '1080p at 30 FPS, 720p at 60 FPS', Focus: 'Auto focus', Connection: 'USB-A', Mount: 'Monitor clip and tripod thread' },
  12: { Layout: '60% compact', Switches: 'Razer optical', Keycaps: 'Doubleshot PBT', Connection: 'Detachable USB-C' },
  13: { Capacity: '1TB', Interface: 'PCIe 4.0 x4, NVMe 2.0', 'Read / write': 'Up to 7,450 / 6,900 MB/s', 'Form factor': 'M.2 2280', Warranty: '5 years' },
  14: { Capacity: '1TB', Interface: 'SATA III 6 Gb/s', 'Read / write': 'Up to 560 / 530 MB/s', 'Form factor': '2.5 inch', Warranty: '5 years' },
  15: { Capacity: '1TB', Interface: 'USB 3.2 Gen 2, 10 Gbps', Speed: 'Up to 1,050 MB/s', Weight: '58 g', Warranty: '3 years' },
  16: { Screen: '27 inch, 1000R curve', Resolution: '2560 x 1440 QHD', 'Refresh rate': '165 Hz, 1 ms MPRT', Ports: 'HDMI and DisplayPort' },
  17: { Screen: '27 inch IPS', Resolution: '2560 x 1440 QHD', 'USB-C': '90W power delivery', Stand: 'Height, tilt, swivel and pivot' },
  18: { Capacity: '128GB', Interface: 'USB 3.1 Gen 1', Read: 'Up to 400 MB/s', Body: 'Metal, water and shock resistant', Warranty: '5 years' },
  19: { Capacity: '16GB (1 x 16GB)', Speed: 'DDR5 5600MT/s', Latency: 'CL40', Profiles: 'Intel XMP 3.0 and AMD EXPO', Warranty: 'Limited lifetime' },
  20: { Capacity: '32GB (2 x 16GB)', Speed: 'DDR5 6000MT/s', Latency: 'CL36', Profiles: 'Intel XMP 3.0 and AMD EXPO', Warranty: 'Limited lifetime' },
  21: { Capacity: '1TB', Interface: 'PCIe 4.0 x4 NVMe', 'Read / write': 'Up to 6,000 / 4,000 MB/s', 'Form factor': 'M.2 2280', Warranty: '3 years' },
  22: { Capacity: '480GB', Interface: 'SATA III 6 Gb/s', 'Read / write': 'Up to 500 / 450 MB/s', 'Form factor': '2.5 inch', Warranty: '3 years' },
  23: { Capacity: '64GB', Interface: 'USB 3.2 Gen 1', Read: 'Up to 100 MB/s', Design: 'Protective cap and key loop', Warranty: '5 years' },
  24: { Output: '65W max', Ports: '2 x USB-C, 1 x USB-A', Technology: 'GaN II', Plug: 'UK 3-pin', Warranty: '18 months' },
  25: { Capacity: '24,000mAh', Output: '140W max', Ports: '2 x USB-C, 1 x USB-A', Display: 'Smart digital display', Warranty: '18 months' },
  26: { Ports: '7-in-1', Video: 'HDMI 4K at 30 Hz', Charging: '100W pass-through', 'Card reader': 'SD and microSD', Warranty: '18 months' },
  27: { Length: '1.8 m', Power: '100W', Connectors: 'USB-C to USB-C', Jacket: 'Double-braided nylon', Warranty: '18 months' },
  28: { Ports: '5-in-1', Video: 'HDMI 4K at 30 Hz', Charging: '100W pass-through', USB: '2 x USB-A, 5 Gbps', Warranty: '18 months' },
  29: { 'Wi-Fi': 'Wi-Fi 6, AX3000', Bands: 'Dual band 2.4 GHz and 5 GHz', Ports: '4 x Gigabit LAN, 1 x Gigabit WAN', Antennas: '4 external', Warranty: '3 years' },
  30: { 'Wi-Fi': 'Wi-Fi 5, AC1200', Bands: 'Dual band 2.4 GHz and 5 GHz', Ports: '4 x Gigabit LAN, 1 x Gigabit WAN', Antennas: '4 external', Warranty: '3 years' },
  31: { Speed: 'AC1300, 867 + 400 Mbps', Interface: 'USB 3.0', Bands: 'Dual band 2.4 GHz and 5 GHz', Antenna: 'High-gain, adjustable', Warranty: '3 years' },
  32: { Speed: '10 / 100 / 1000 Mbps', Interface: 'USB 3.0', Setup: 'Plug and play on Windows and macOS', Design: 'Foldable cable', Warranty: '3 years' },
  33: { Screen: '23.8 inch IPS', Resolution: '1920 x 1080 FHD', 'Refresh rate': '100 Hz', Ports: 'HDMI, DisplayPort, VGA, USB', Warranty: '3 years' },
  34: { Connection: '2.4 GHz USB receiver', Keyboard: 'Full size, spill resistant', Mouse: 'Quiet, ambidextrous', Battery: 'Up to 36 months', Warranty: '3 years' },
  35: { Connection: 'Thunderbolt 4', Charging: '130W to Dell laptops, 90W to others', Displays: 'Up to 2 x 4K', Network: 'Gigabit Ethernet', Warranty: '3 years' },
  36: { Connection: 'USB-A receiver and Bluetooth', Audio: 'Active noise cancelling', Certified: 'Microsoft Teams and Zoom', Battery: 'Up to 30 hours talk time', Warranty: '3 years' },
  37: { Resolution: '2K QHD at 30 FPS', Framing: 'AI auto-framing', 'Field of view': '78°', Connection: 'USB-A', Warranty: '3 years' }
};

/* Copy that applies to every product of a type */
const TYPE_INFO = {
  keyboard:  { about: 'A better keyboard means faster, more accurate typing and less strain over a long working day.', features: ['Consistent key feel for fast, accurate typing', 'Works with Windows and macOS', 'Genuine stock with official warranty in Qatar'], box: ['Keyboard', 'USB cable or receiver', 'Quick start guide'] },
  mouse:     { about: 'A mouse that fits your hand makes every click quicker and is easier on your wrist.', features: ['Accurate tracking for work and play', 'Plug in and go on Windows and macOS', 'Genuine stock with official warranty in Qatar'], box: ['Mouse', 'USB cable or receiver', 'Quick start guide'] },
  monitor:   { about: 'More screen space means less switching between windows and a more comfortable view for long sessions.', features: ['Sharp, clear picture for work and entertainment', 'Flicker-reduced panel for comfortable viewing', 'Delivered to your desk in Doha'], box: ['Monitor', 'Stand and base', 'Power cable', 'Video cable', 'Quick start guide'] },
  nvme:      { about: 'An NVMe SSD is the biggest speed upgrade for most PCs: faster start-up, faster apps and shorter game loading.', features: ['Fits the M.2 2280 slot in most laptops and desktops from 2018 onward', 'Free fitting when you bring your PC to our Doha store', 'Drive cloning available for a small fee'], box: ['SSD', 'Installation guide'] },
  ssd:       { about: 'Swap a hard drive for an SSD and an older computer starts in seconds instead of minutes.', features: ['Instant speed boost for older laptops and desktops', 'Silent, with no moving parts', 'Free fitting for internal drives at our Doha store'], box: ['SSD', 'Cables where supplied by the maker', 'Quick start guide'] },
  ram:       { about: 'More memory lets you keep more apps, browser tabs and projects open without slowdowns.', features: ['Send us your PC model on WhatsApp to confirm it fits', 'Free fitting at our Doha store', 'Plug-and-play profiles for easy setup'], box: ['Memory module(s)', 'Installation guide'] },
  headset:   { about: 'Clear sound and a comfortable fit for calls, music and games.', features: ['Clear microphone for calls and team chat', 'Comfortable for long sessions', 'Genuine stock with official warranty in Qatar'], box: ['Headset', 'Charging or connection cable', 'Quick start guide'] },
  webcam:    { about: 'Look sharp and sound clear on every video call, from interviews to family catch-ups.', features: ['Clear video for Teams, Zoom and Google Meet', 'Plug and play, no drivers needed', 'Mounts on monitors and laptop screens'], box: ['Webcam', 'Quick start guide'] },
  hub:       { about: 'Turn one port into a full desk setup with displays, drives, network and charging.', features: ['Connect displays, drives and accessories through one port', 'Works with USB-C laptops and tablets', 'Ask us on WhatsApp if it suits your laptop'], box: ['Hub or adapter', 'Quick start guide'] },
  charger:   { about: 'Charge your laptop, phone and earbuds from one compact plug.', features: ['Fast charges laptops, tablets and phones', 'Built-in protection against overheating', 'UK 3-pin plug for Qatar sockets'], box: ['Charger', 'Quick start guide'] },
  powerbank: { about: 'Keep your laptop and phone going through long flights and busy days out.', features: ['Fast charges laptops, tablets and phones', 'Under 100 Wh, so it can go in your cabin bag', 'Shows remaining charge at a glance'], box: ['Power bank', 'USB-C to USB-C cable', 'Quick start guide'] },
  cable:     { about: 'A well-made cable charges faster and lasts far longer than the one that came in the box.', features: ['Supports fast charging and data transfer', 'Reinforced for daily bending', 'Genuine stock with official warranty in Qatar'], box: ['Cable'] },
  flash:     { about: 'Carry files, back up photos or add connectivity with a pocket-sized device.', features: ['Plug and play on Windows, macOS and Linux', 'Small enough for a keyring or laptop bag', 'Genuine stock with official warranty in Qatar'], box: ['Device', 'Quick start guide'] },
  router:    { about: 'Faster, steadier Wi-Fi across your home or office for streaming, gaming and video calls.', features: ['Works with Ooredoo and Vodafone Qatar home fibre', 'Set up in minutes from the Tether app', 'Free setup help on WhatsApp'], box: ['Router', 'Power adapter', 'Ethernet cable', 'Quick installation guide'] }
};

/* Desk photos used as the last gallery image */
const TYPE_PHOTO = {
  keyboard: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80',
  mouse: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=1000&q=80',
  default: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=80'
};

const typeLabel = k => (TYPES.find(t => t.key === k) || {}).label || '';

P.forEach(p => {
  p.tone = p.tone || 'light';
  p.art = p.img || productArt(p.type, p.tone, p.accent);
  p.gallery = p.gallery || (p.img
    ? [{ src: p.img }]
    : [{ src: p.art }, { src: productArt(p.type, p.tone, p.accent, '36 36 128 128'), label: 'Close-up' }]
  ).concat({ src: TYPE_PHOTO[p.type] || TYPE_PHOTO.default, photo: true, label: 'On the desk' });

  const { Warranty = '2 years', ...facts } = SPECS[p.id] || {};
  p.facts = facts;
  p.warranty = Warranty;
  p.sku = 'HQ-' + p.brand.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 3) + '-' + String(p.id).padStart(4, '0');
  // Demo rating and stock – replace with live values
  p.rating = +(4.3 + ((p.id * 37) % 7) / 10).toFixed(1);
  p.reviews = 18 + (p.id * 53) % 190;
  p.lowStock = !p.quote && p.id % 7 === 3;

  p.specs = p.specs || {
    Brand: p.brand,
    SKU: p.sku,
    Category: typeLabel(p.type),
    ...facts,
    Warranty: Warranty + ' official warranty',
    Delivery: 'Same day in Doha',
    Support: p.quote ? 'Volume pricing for businesses' : (['nvme', 'ssd', 'ram'].includes(p.type) ? 'Free fitting at our Doha store' : 'WhatsApp setup help')
  };
});

const byId = id => P.find(p => p.id === +id);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const qar = n => 'QAR ' + Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-');
const productURL = p => 'product.html?id=' + p.id;

function starsHTML(r) {
  let s = '';
  for (let i = 1; i <= 5; i++) s += `<i class="bi ${r >= i - .25 ? 'bi-star-fill' : r >= i - .75 ? 'bi-star-half' : 'bi-star'}"></i>`;
  return `<span class="stars" role="img" aria-label="Rated ${r} out of 5">${s}</span>`;
}

function cardHTML(p) {
  const pct = p.old ? Math.round((1 - p.price / p.old) * 100) : 0;
  const badge = p.isNew ? '<span class="p-badge new">New</span>' : pct ? `<span class="p-badge sale">-${pct}%</span>` : '';
  const url = productURL(p);
  const price = p.quote
    ? `<button class="quote-link js-quote" data-id="${p.id}">Request a Quote</button>`
    : `<span class="now"><small>QAR</small>${p.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>${p.old ? `<span class="old">${qar(p.old)}</span>` : ''}`;
  const btn = p.quote
    ? `<button class="btn btn-hq p-btn js-quote" data-id="${p.id}"><i class="bi bi-chat-square-text"></i>Request a Quote</button>`
    : `<button class="btn btn-hq p-btn js-add" data-id="${p.id}"><i class="bi bi-bag-plus"></i>Add to Cart</button>`;
  return `
  <article class="p-card" data-pid="${p.id}">
    ${badge}
    <button class="wish-btn" data-id="${p.id}" aria-label="Save ${esc(p.title)} to wishlist" aria-pressed="false"><i class="bi bi-heart"></i></button>
    <a class="p-img" href="${url}" tabindex="-1" aria-hidden="true"><img src="${p.art}" alt="" loading="lazy"></a>
    <div class="p-body">
      <div class="p-brand">${esc(p.brand)}</div>
      <h3 class="p-title"><a href="${url}">${esc(p.title)}</a></h3>
      <div class="p-rating">${starsHTML(p.rating)}<span>${p.rating.toFixed(1)} (${p.reviews})</span></div>
      <p class="p-desc">${esc(p.desc)}</p>
      <div class="p-price">${price}</div>
      ${btn}
    </div>
  </article>`;
}
