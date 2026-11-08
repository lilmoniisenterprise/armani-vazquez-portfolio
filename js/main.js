(function () {
  'use strict';
  var BOOK = 'https://calendly.com/virellionapex/free-consultation';
  var EMAIL = 'armani@virellionapex.com';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (id) { return document.getElementById(id); };
  var el = function (tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };

  var FOCUS = [
    { name: 'Entrepreneurship', c: 'violet', text: 'Founder of Lil’Monii’s Enterprise LLC, home to eight brands across fashion, gaming, music, publishing, retail, and technology.' },
    { name: 'Creative direction', c: 'blue', text: 'Each brand and demo gets its own visual identity, from luxury fashion to tactical gaming streetwear.' },
    { name: 'Digital strategy', c: 'green', text: 'Websites, booking flows, stores, and AI tools planned around how customers find a business and buy from it.' }
  ];

  var BRANDS = [
    { id: 'lmoni', name: 'L’Moni Maison de Mode', type: 'Luxury fashion', img: 'lmoni', text: 'Luxury women’s fashion and personal styling, based in San Antonio.', tags: ['Collections', 'Styling', 'Ready to wear'], url: 'https://lmonimaison.com', host: 'lmonimaison.com' },
    { id: 'drops', name: 'Drops By BK3', type: 'Gaming & creator retail', img: 'drops', text: 'A streetwear brand blending gaming culture with tactical-inspired style, released in numbered drops.', tags: ['Streetwear', 'Gaming gear', 'Creator retail'], url: 'https://dropsbybk3.com', host: 'dropsbybk3.com' },
    { id: 'madjon', name: 'DJ MADJON', type: 'Music & entertainment', img: 'madjon', text: 'The official home for DJ MADJON’s music, merch, updates, and booking enquiries.', tags: ['Music', 'Merch', 'Bookings'], url: 'https://djmadjon.com', host: 'djmadjon.com' },
    { id: 'virellion', name: 'Virellion Apex', type: 'Consulting & strategy', img: 'virellion', text: 'Business consulting and creative strategy, with website and AI services for growing companies.', tags: ['Consulting', 'Websites', 'AI services'], url: 'https://virellionapex.com', host: 'virellionapex.com' }
  ];

  var FILTERS = [['all', 'All'], ['commerce', 'E-commerce'], ['local', 'Local business'], ['services', 'Services & AI']];
  /* To turn on a demo's live button, paste its address into url. */
  var WORK = [
    { id: 'ondessa', name: 'ONDESSA Restaurant Demo', type: 'Restaurant website concept', cat: 'local', host: 'ondessa', url: 'https://lilmoniisenterprise.github.io/restaurant-demo/', inner: 'Menu',
      list: ['22-dish menu with search and dietary filters', 'Live “open now” status', 'Table reservations and order for pickup', 'Catering inquiry with a live cost estimate'] },
    { id: 'elvare', name: 'ÉLVARÉ Fashion Demo', type: 'Luxury fashion storefront concept', cat: 'commerce', host: 'elvare', url: 'https://lilmoniisenterprise.github.io/elvare-luxury-fashion/', inner: 'Collections',
      list: ['32 product pages with zoom and quick view', 'Live search with price, size, and color filters', 'Wishlist and shopping bag', 'Three-step demo checkout'] },
    { id: 'contractor', name: 'Granitebrook Contractor Demo', type: 'Construction business website concept', cat: 'local', host: 'granitebrook', url: '', inner: 'Services',
      list: ['Eight core services with detail sections', 'Project gallery and customer reviews', 'Free estimate request form', 'Tap-to-call bar on phones'] },
    { id: 'consulting', name: 'Aldermoor Consulting Demo', type: 'Professional services concept', cat: 'services', host: 'aldermoor', url: '', inner: 'Practice areas',
      list: ['Five-step appointment booking', 'New-client onboarding with saved drafts', 'Searchable insights library', 'Service detail pages'] },
    { id: 'retail', name: 'Orbit Lane Retail Demo', type: 'E-commerce website concept', cat: 'commerce', host: 'orbitlane', url: 'https://lilmoniisenterprise.github.io/retail-demo/', inner: 'Shop',
      list: ['Search across seven departments', 'Product filters and sorting', 'Cart with promo codes', 'Demo checkout'] },
    { id: 'ai', name: 'Aurivane AI Business Demo', type: 'AI-powered business concept', cat: 'services', host: 'aurivane', url: 'https://ai.virellionapex.com', inner: 'Chatbot',
      list: ['Simulated AI chatbot with suggested questions', 'AI receptionist walkthrough', 'Appointment scheduling with calendar file', 'Workflow automation examples'] }
  ];
  var shot = function (id, v) { return 'images/work/' + id + '-' + v + '.webp'; };

  /* Focus tabs */
  function tabs(host, items, onPick) {
    items.forEach(function (it, i) {
      var b = el('button', 'tab ' + (it.c || ''), it.name);
      b.type = 'button'; b.setAttribute('role', 'tab');
      b.addEventListener('click', function () {
        Array.prototype.forEach.call(host.children, function (x) { x.setAttribute('aria-selected', x === b); });
        onPick(it, i);
      });
      host.appendChild(b);
      if (i === 0) b.setAttribute('aria-selected', 'true');
    });
  }
  tabs($('focusTabs'), FOCUS, function (it) { $('focusText').textContent = it.text; });
  $('focusText').textContent = FOCUS[0].text;

  /* Showreel */
  var reelI = 0, reelT = null, reelBtns = [];
  WORK.forEach(function (w, i) {
    var im = el('img'); im.src = shot(w.id, 'home'); im.alt = ''; im.width = 1280; im.height = 800;
    if (i === 0) im.className = 'on';
    $('reelStage').appendChild(im);
    var b = el('button'); b.type = 'button'; b.setAttribute('aria-label', 'Show ' + w.name);
    b.addEventListener('click', function () { showReel(i); stopReel(); });
    $('reelNav').appendChild(b); reelBtns.push(b);
  });
  function showReel(i) {
    reelI = i;
    Array.prototype.forEach.call($('reelStage').children, function (m, k) { m.className = k === i ? 'on' : ''; });
    reelBtns.forEach(function (b, k) { b.setAttribute('aria-current', k === i); });
    $('reelName').textContent = WORK[i].name;
    $('reelUrl').textContent = WORK[i].host + ' demo';
    $('reelFrame').setAttribute('aria-label', 'Open ' + WORK[i].name);
  }
  function startReel() { if (!reduce && !reelT) reelT = setInterval(function () { showReel((reelI + 1) % WORK.length); }, 3800); }
  function stopReel() { clearInterval(reelT); reelT = null; }
  showReel(0); startReel();
  $('reel').addEventListener('mouseenter', stopReel);
  $('reel').addEventListener('mouseleave', startReel);
  $('reelFrame').addEventListener('click', function () { openViewer(reelI); });

  /* Pointer glow and tilt */
  var fine = window.matchMedia('(pointer:fine)').matches;
  if (fine && !reduce) {
    var hero = $('hero'), frame = $('reelFrame');
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
      hero.style.setProperty('--x', x + 'px'); hero.style.setProperty('--y', y + 'px');
      frame.style.transform = 'perspective(1100px) rotateY(' + ((x / r.width - .5) * 9).toFixed(2) + 'deg) rotateX(' + ((.5 - y / r.height) * 7).toFixed(2) + 'deg)';
    });
    hero.addEventListener('pointerleave', function () { frame.style.transform = ''; });
  }

  /* Brand explorer */
  var brandBtns = [];
  BRANDS.forEach(function (b, i) {
    var c = el('button', 'brand'); c.type = 'button'; c.setAttribute('aria-expanded', 'false'); c.setAttribute('aria-controls', 'brandPanel');
    var w = el('span', 'brand-img'), im = el('img');
    im.src = 'images/brands/' + b.img + '.webp'; im.alt = ''; im.loading = 'lazy'; im.width = 1000; im.height = 500;
    w.appendChild(im); c.appendChild(w);
    c.appendChild(el('strong', '', b.name)); c.appendChild(el('span', 'brand-type', b.type));
    c.addEventListener('click', function () { pickBrand(i); });
    $('brandGrid').appendChild(c); brandBtns.push(c);
  });
  function pickBrand(i) {
    var b = BRANDS[i], p = $('brandPanel');
    brandBtns.forEach(function (x, k) { x.setAttribute('aria-expanded', k === i); });
    p.textContent = '';
    p.appendChild(el('h3', '', b.name));
    p.appendChild(el('p', '', b.text));
    var u = el('ul', 'chips');
    b.tags.forEach(function (t) { u.appendChild(el('li', '', t)); });
    p.appendChild(u);
    if (b.url) { var a = el('a', 'btn btn-sm', 'Visit ' + b.host); a.href = b.url; a.target = '_blank'; a.rel = 'noopener'; p.appendChild(a); }
    p.classList.remove('flash'); void p.offsetWidth; p.classList.add('flash');
  }
  pickBrand(0);

  /* Gallery */
  var tiles = [];
  WORK.forEach(function (w, i) {
    var t = el('button', 'tile'); t.type = 'button'; t.dataset.cat = w.cat;
    var f = el('span', 'tile-img');
    [['home', 'a'], ['page', 'b']].forEach(function (v) {
      var im = el('img', v[1]); im.src = shot(w.id, v[0]); im.alt = ''; im.loading = 'lazy'; im.width = 1280; im.height = 800; f.appendChild(im);
    });
    f.appendChild(el('span', 'tile-view', 'View project'));
    t.appendChild(f);
    t.appendChild(el('strong', '', w.name)); t.appendChild(el('span', 'tile-type', w.type));
    t.addEventListener('click', function () { openViewer(i); });
    $('gallery').appendChild(t); tiles.push(t);
  });
  FILTERS.forEach(function (f, i) {
    var b = el('button', 'tab', f[1]); b.type = 'button'; b.setAttribute('aria-pressed', i === 0);
    b.addEventListener('click', function () {
      Array.prototype.forEach.call($('filters').children, function (x) { x.setAttribute('aria-pressed', x === b); });
      tiles.forEach(function (t) { t.hidden = !(f[0] === 'all' || t.dataset.cat === f[0]); });
    });
    $('filters').appendChild(b);
  });

  /* Project viewer */
  var dlg = $('viewer'), cur = 0, tabList = [];
  function setShot(v) {
    var w = WORK[cur], s = $('vShot');
    s.textContent = ''; s.className = 'v-shot' + (v === 'phone' ? ' phone' : '');
    var im = el('img'); im.src = shot(w.id, v); im.alt = w.name + ' ' + v + ' screen'; s.appendChild(im);
  }
  function renderViewer() {
    var w = WORK[cur];
    $('vTitle').textContent = w.name; $('vType').textContent = w.type;
    var host = $('vTabs'); host.textContent = '';
    tabs(host, [{ name: 'Home', v: 'home' }, { name: w.inner, v: 'page' }, { name: 'Phone', v: 'phone' }], function (it) { setShot(it.v); });
    setShot('home');
    var l = $('vList'); l.textContent = '';
    w.list.forEach(function (x) { l.appendChild(el('li', '', x)); });
    var act = $('vAct'); act.textContent = '';
    if (w.url) { var a = el('a', 'btn', 'Open live demo'); a.href = w.url; a.target = '_blank'; a.rel = 'noopener'; act.appendChild(a); }
    else { act.appendChild(el('p', 'soon', 'Live demo link coming soon.')); var c = el('a', 'btn', 'Book a free consultation'); c.href = BOOK; c.target = '_blank'; c.rel = 'noopener'; act.appendChild(c); }
  }
  function openViewer(i) { cur = i; stopReel(); renderViewer(); if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', ''); document.body.classList.add('locked'); }
  function closeViewer() { dlg.close ? dlg.close() : dlg.removeAttribute('open'); }
  dlg.addEventListener('close', function () { document.body.classList.remove('locked'); startReel(); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) closeViewer(); });
  dlg.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'ArrowLeft') step(-1);
  });
  function step(d) { cur = (cur + d + WORK.length) % WORK.length; renderViewer(); }
  $('vClose').addEventListener('click', closeViewer);
  $('vPrev').addEventListener('click', function () { step(-1); });
  $('vNext').addEventListener('click', function () { step(1); });

  /* Project request builder */
  var NEEDS = ['Website', 'Online store', 'Branding', 'AI tools', 'Consulting'], TIMES = ['As soon as possible', 'Within 1–3 months', 'Just exploring'];
  var chosen = {}, when = '';
  NEEDS.forEach(function (n) {
    var b = el('button', 'opt', n); b.type = 'button'; b.setAttribute('aria-pressed', 'false');
    b.addEventListener('click', function () { chosen[n] = !chosen[n]; b.setAttribute('aria-pressed', !!chosen[n]); write(); });
    $('needs').appendChild(b);
  });
  TIMES.forEach(function (n) {
    var b = el('button', 'opt', n); b.type = 'button'; b.setAttribute('aria-pressed', 'false');
    b.addEventListener('click', function () {
      when = when === n ? '' : n;
      Array.prototype.forEach.call($('timing').children, function (x) { x.setAttribute('aria-pressed', x.textContent === when); });
      write();
    });
    $('timing').appendChild(b);
  });
  function message() {
    var list = NEEDS.filter(function (n) { return chosen[n]; });
    var name = $('fName').value.trim(), biz = $('fBiz').value.trim(), note = $('fNote').value.trim();
    var s = 'Hi Armani,\n\n' + (name ? 'I’m ' + name + (biz ? ' from ' + biz : '') + '. ' : (biz ? 'I’m reaching out from ' + biz + '. ' : ''));
    s += list.length ? 'I’d like help with: ' + list.join(', ') + '.' : 'I’d like to talk about a project.';
    if (when) s += '\nTiming: ' + when + '.';
    if (note) s += '\n\n' + note;
    return s + '\n\nThank you' + (name ? ',\n' + name : '.');
  }
  function write() {
    var m = message();
    $('msgOut').textContent = m;
    $('sendMail').href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent('New project request') + '&body=' + encodeURIComponent(m);
    $('builderHint').textContent = '';
  }
  ['fName', 'fBiz', 'fNote'].forEach(function (id) { $(id).addEventListener('input', write); });
  $('builder').addEventListener('submit', function (e) { e.preventDefault(); });
  $('copyMsg').addEventListener('click', function () {
    var ok = function () { $('builderHint').textContent = 'Copied. Paste it into an email to ' + EMAIL + '.'; };
    var no = function () { $('builderHint').textContent = 'Copy didn’t work here. Select the text above and copy it.'; };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(message()).then(ok, no); else no();
  });
  write();

  /* Menu, progress, and active link */
  var burger = $('burger'), menu = $('menu');
  function setMenu(o) { menu.classList.toggle('open', o); burger.setAttribute('aria-expanded', o); burger.setAttribute('aria-label', o ? 'Close menu' : 'Open menu'); }
  burger.addEventListener('click', function () { setMenu(!menu.classList.contains('open')); });
  menu.addEventListener('click', function (e) { if (e.target.tagName === 'A') setMenu(false); });
  function onScroll() {
    var d = document.documentElement, max = d.scrollHeight - innerHeight;
    $('progress').style.transform = 'scaleX(' + (max > 0 ? scrollY / max : 0) + ')';
    $('top').classList.toggle('solid', scrollY > 10);
  }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  if ('IntersectionObserver' in window) {
    var links = document.querySelectorAll('[data-spy]');
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) links.forEach(function (l) { l.toggleAttribute('aria-current', l.getAttribute('href') === '#' + e.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['brands', 'work', 'connect'].forEach(function (id) { io.observe($(id)); });
  }
  $('yr').textContent = new Date().getFullYear();
})();
