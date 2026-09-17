/* =========================================================================
   APP — dùng chung cho mọi trang
   ========================================================================= */
(function () {
  'use strict';

  /* ---------- Cấu hình + phần ghi đè do người dùng đổi trên web ---------- */
  var OVERRIDE_KEY = 'site_config_override';
  var CART_KEY = 'cart_items';
  var WISH_KEY = 'wish_items';
  var COUPON_KEY = 'cart_coupon';
  var REVIEW_KEY = 'user_reviews';

  function deepMerge(a, b) {
    var out = JSON.parse(JSON.stringify(a));
    Object.keys(b || {}).forEach(function (k) {
      if (b[k] && typeof b[k] === 'object' && !Array.isArray(b[k])) out[k] = deepMerge(out[k] || {}, b[k]);
      else if (b[k] !== '' && b[k] !== null && b[k] !== undefined) out[k] = b[k];
    });
    return out;
  }
  function readOverride() {
    try { return JSON.parse(localStorage.getItem(OVERRIDE_KEY) || '{}'); } catch (e) { return {}; }
  }
  var CFG = deepMerge(window.SITE_CONFIG, readOverride());
  window.CFG = CFG;

  function saveOverride(patch) {
    var cur = deepMerge(readOverride(), patch);
    localStorage.setItem(OVERRIDE_KEY, JSON.stringify(cur));
    location.reload();
  }
  function resetOverride() { localStorage.removeItem(OVERRIDE_KEY); location.reload(); }

  function applyTheme() {
    var r = document.documentElement.style;
    r.setProperty('--primary', CFG.theme.primary);
    r.setProperty('--primary-dark', shade(CFG.theme.primary, -18));
    r.setProperty('--accent', CFG.theme.accent);
    document.title = document.title.replace(/\{TEN\}/g, CFG.name);
  }
  function shade(hex, pct) {
    var n = parseInt(hex.slice(1), 16), amt = Math.round(2.55 * pct);
    var r = Math.min(255, Math.max(0, (n >> 16) + amt));
    var g = Math.min(255, Math.max(0, ((n >> 8) & 255) + amt));
    var b = Math.min(255, Math.max(0, (n & 255) + amt));
    return '#' + (0x1000000 + r * 0x10000 + g * 0x100 + b).toString(16).slice(1);
  }

  /* ---------- Tiện ích ---------- */
  function fmt(n) { return (n || 0).toLocaleString('vi-VN') + 'đ'; }
  function qs(k) { return new URLSearchParams(location.search).get(k) || ''; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]; }); }
  function byId(id) { return window.BOOKS.filter(function (b) { return b.id === id; })[0]; }
  function catName(slug) { var c = window.CATEGORIES.filter(function (x) { return x.slug === slug; })[0]; return c ? c.name : slug; }
  function stars(r) { var f = Math.round(r); return '★★★★★'.slice(0, f) + '☆☆☆☆☆'.slice(0, 5 - f); }

  /* ---------- Ảnh bìa sinh tự động (SVG) ---------- */
  var PALETTE = [['#0a4ea3', '#0090c4'], ['#c0392b', '#e8743b'], ['#00875a', '#4ec98a'], ['#6a1b9a', '#b06ab3'],
  ['#ef6c00', '#ffb74d'], ['#1a3a5c', '#3d7ea6'], ['#ad1457', '#f06292'], ['#37474f', '#78909c']];
  function wrap(text, max) {
    var words = String(text).split(' '), lines = [], cur = '';
    words.forEach(function (w) {
      if ((cur + ' ' + w).trim().length > max) { if (cur) lines.push(cur); cur = w; }
      else cur = (cur + ' ' + w).trim();
    });
    if (cur) lines.push(cur);
    return lines.slice(0, 5);
  }
  function cover(book) {
    var h = 0, i;
    for (i = 0; i < book.id.length; i++) h = (h * 31 + book.id.charCodeAt(i)) >>> 0;
    var p = PALETTE[h % PALETTE.length];
    var lines = wrap(book.title, 16);
    var y0 = 150 - (lines.length - 1) * 15;
    var tspans = lines.map(function (l, idx) {
      return '<tspan x="120" y="' + (y0 + idx * 30) + '">' + esc(l) + '</tspan>';
    }).join('');
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 320">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="' + p[0] + '"/><stop offset="1" stop-color="' + p[1] + '"/>' +
      '</linearGradient></defs>' +
      '<rect width="240" height="320" fill="url(#g)"/>' +
      '<rect x="0" y="0" width="12" height="320" fill="rgba(0,0,0,.22)"/>' +
      '<rect x="26" y="34" width="188" height="252" fill="none" stroke="rgba(255,255,255,.35)"/>' +
      '<text font-family="Segoe UI,Arial" font-size="22" font-weight="700" fill="#fff" text-anchor="middle">' + tspans + '</text>' +
      '<text x="120" y="272" font-family="Segoe UI,Arial" font-size="13" fill="rgba(255,255,255,.85)" text-anchor="middle">' + esc(book.author) + '</text>' +
      '</svg>';
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }
  window.coverOf = cover;

  /* ---------- Giỏ hàng ---------- */
  function getCart() { try { return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); } catch (e) { return []; } }
  function setCart(c) { localStorage.setItem(CART_KEY, JSON.stringify(c)); paintBadge(); }
  function addToCart(id, qty) {
    var c = getCart(), f = c.filter(function (x) { return x.id === id; })[0];
    if (f) f.qty += (qty || 1); else c.push({ id: id, qty: qty || 1 });
    setCart(c); toast('Đã thêm vào giỏ hàng ✓');
  }
  function cartCount() { return getCart().reduce(function (s, x) { return s + x.qty; }, 0); }
  function cartSubtotal() {
    return getCart().reduce(function (s, x) { var b = byId(x.id); return s + (b ? b.price * x.qty : 0); }, 0);
  }
  function paintBadge() {
    var el = document.getElementById('cartBadge');
    if (el) el.textContent = cartCount();
    var w = document.getElementById('wishBadge');
    if (w) {
      var n = getWish().length;
      w.textContent = n;
      w.style.display = n ? '' : 'none';
    }
  }
  window.Cart = { get: getCart, set: setCart, add: addToCart, count: cartCount, subtotal: cartSubtotal };

  /* ---------- Danh sách yêu thích ---------- */
  function getWish() { try { return JSON.parse(localStorage.getItem(WISH_KEY) || '[]'); } catch (e) { return []; } }
  function setWish(w) { localStorage.setItem(WISH_KEY, JSON.stringify(w)); paintBadge(); }
  function inWish(id) { return getWish().indexOf(id) > -1; }
  function toggleWish(id) {
    var w = getWish(), i = w.indexOf(id);
    if (i > -1) { w.splice(i, 1); toast('Đã bỏ khỏi danh sách yêu thích'); }
    else { w.push(id); toast('Đã thêm vào danh sách yêu thích ♥'); }
    setWish(w);
    return i === -1;
  }
  window.Wish = { get: getWish, set: setWish, has: inWish, toggle: toggleWish };

  /* ---------- Mã giảm giá ---------- */
  function findCoupon(code) {
    var c = String(code || '').trim().toUpperCase();
    return (CFG.coupons || []).filter(function (x) { return x.code === c; })[0] || null;
  }
  function getCoupon() { return findCoupon(localStorage.getItem(COUPON_KEY)); }
  function setCoupon(code) {
    if (code) localStorage.setItem(COUPON_KEY, String(code).trim().toUpperCase());
    else localStorage.removeItem(COUPON_KEY);
  }
  function discountOf(coupon, subtotal) {
    if (!coupon || coupon.type === 'ship' || subtotal < (coupon.min || 0)) return 0;
    if (coupon.type === 'amount') return Math.min(coupon.value, subtotal);
    var d = Math.round(subtotal * coupon.value / 100);
    return coupon.max ? Math.min(d, coupon.max) : d;
  }
  window.Coupon = { find: findCoupon, get: getCoupon, set: setCoupon, discount: discountOf };

  /* ---------- Đánh giá của người dùng ---------- */
  function allReviews() { try { return JSON.parse(localStorage.getItem(REVIEW_KEY) || '{}'); } catch (e) { return {}; } }
  function reviewsOf(id) { return allReviews()[id] || []; }
  function addReview(id, r) {
    var all = allReviews();
    all[id] = [r].concat(all[id] || []);
    localStorage.setItem(REVIEW_KEY, JSON.stringify(all));
  }
  window.Reviews = { of: reviewsOf, add: addReview };

  /* ---------- Toast ---------- */
  var toastEl;
  function toast(msg) {
    if (!toastEl) { toastEl = document.createElement('div'); toastEl.className = 'toast'; document.body.appendChild(toastEl); }
    toastEl.textContent = msg; toastEl.classList.add('show');
    clearTimeout(toastEl._t); toastEl._t = setTimeout(function () { toastEl.classList.remove('show'); }, 2200);
  }
  window.toast = toast;

  /* ---------- Thẻ sản phẩm ---------- */
  function badgeOf(b) {
    if (b.tags.indexOf('hot') > -1) return '<span class="badge hot">HOT</span>';
    if (b.tags.indexOf('moi') > -1) return '<span class="badge new">MỚI</span>';
    if (b.off >= 25) return '<span class="badge">-' + b.off + '%</span>';
    return '';
  }
  function cardHTML(b) {
    return '<div class="card">' +
      '<button class="wish-btn' + (inWish(b.id) ? ' on' : '') + '" data-wish="' + b.id + '" ' +
      'title="Thêm vào yêu thích" aria-label="Thêm vào yêu thích">♥</button>' +
      '<a class="card-img" href="san-pham.html?id=' + b.id + '">' + badgeOf(b) +
      '<img class="cover" src="' + cover(b) + '" alt="' + esc(b.title) + '"></a>' +
      '<div class="card-body">' +
      '<span class="card-cat">' + esc(catName(b.cat)) + '</span>' +
      '<a class="card-title" href="san-pham.html?id=' + b.id + '">' + esc(b.title) + '</a>' +
      '<span class="card-author">' + esc(b.author) + '</span>' +
      '<div class="rate"><span class="stars">' + stars(b.rate) + '</span><span>Đã bán ' + b.sold.toLocaleString('vi-VN') + '</span></div>' +
      '<div><span class="price">' + fmt(b.price) + '</span>' +
      (b.off ? '<span class="price-old">' + fmt(b.listPrice) + '</span><span class="off-tag">-' + b.off + '%</span>' : '') + '</div>' +
      '<button class="btn btn-sm btn-block" data-add="' + b.id + '">🛒 Thêm vào giỏ</button>' +
      '</div></div>';
  }
  window.cardHTML = cardHTML;
  window.fmtVND = fmt;
  window.catName = catName;
  window.bookById = byId;
  window.starsOf = stars;

  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-add]');
    if (t) { e.preventDefault(); addToCart(t.getAttribute('data-add'), 1); return; }
    var w = e.target.closest('[data-wish]');
    if (w) {
      e.preventDefault();
      var on = toggleWish(w.getAttribute('data-wish'));
      w.classList.toggle('on', on);
      if (document.body.dataset.page === 'wish' && window.PAGE_REFRESH) window.PAGE_REFRESH();
    }
  });

  /* ---------- Header / Nav / Footer ---------- */
  function renderChrome() {
    var cats = window.CATEGORIES;
    var books = cats.filter(function (c) { return c.group === 'sach'; });
    var tools = cats.filter(function (c) { return c.group === 'dungcu'; });

    function subMenu(c) {
      return c.children.map(function (s) {
        return '<a href="danh-muc.html?cat=' + c.slug + '&sub=' + encodeURIComponent(s) + '">' + s + '</a>';
      }).join('');
    }

    var menu = books.slice(0, 5).map(function (c) {
      return '<div class="nav-item"><a href="danh-muc.html?cat=' + c.slug + '">' + c.name + ' ▾</a>' +
        '<div class="dropdown">' + subMenu(c) + '</div></div>';
    }).join('') +
    /* Toàn bộ nhóm dụng cụ gom vào một menu riêng */
    '<div class="nav-item"><a href="danh-muc.html?nhom=dungcu">📐 Dụng cụ &amp; VPP ▾</a>' +
      '<div class="dropdown">' + tools.map(function (c) {
        return '<a href="danh-muc.html?cat=' + c.slug + '"><b>' + c.icon + ' ' + c.name + '</b></a>' +
          subMenu(c).replace(/<a /g, '<a class="dd-sub" ');
      }).join('<div class="dd-sep"></div>') + '</div></div>';

    var header =
      '<div class="topbar"><div class="wrap">' +
      '<span>📞 Hotline: <b>' + esc(CFG.hotline) + '</b> · ' + esc(CFG.workingHours) + '</span>' +
      '<span class="topbar-links">' +
      '<a href="tin-tuc.html">Tin tức &amp; Khuyến mãi</a>' +
      '<a href="lien-he.html">Hệ thống nhà sách</a>' +
      '<a href="tai-khoan.html?tab=tracuu">Tra cứu đơn hàng</a>' +
      '</span></div></div>' +

      '<div class="header"><div class="wrap">' +
      '<a class="logo" href="index.html">' +
      '<span class="logo-mark">' + esc(CFG.nameShort.charAt(0) || 'A') + '</span>' +
      '<span class="logo-text"><b>' + esc(CFG.name) + '</b><span>' + esc(CFG.slogan) + '</span></span></a>' +
      '<form class="search" id="searchForm" autocomplete="off">' +
      '<input id="q" placeholder="Tìm sách, dụng cụ học tập, văn phòng phẩm..." value="' + esc(qs('q')) + '">' +
      '<button type="submit">🔍 Tìm</button><div class="suggest hide" id="suggest"></div></form>' +
      '<div class="head-actions">' +
      '<a class="head-act head-phone" href="lien-he.html"><i>📞</i><span><small>Hỗ trợ</small><b>' + esc(CFG.hotline) + '</b></span></a>' +
      '<a class="head-act" href="tai-khoan.html"><i>👤</i><span><small>Tài khoản</small><b>Đăng nhập</b></span></a>' +
      '<a class="head-act cart-link" href="yeu-thich.html"><i>♥</i><span class="cart-badge" id="wishBadge">0</span>' +
      '<span><small>Đã thích</small><b>Yêu thích</b></span></a>' +
      '<a class="head-act cart-link" href="gio-hang.html"><i>🛒</i><span class="cart-badge" id="cartBadge">0</span>' +
      '<span><small>Giỏ hàng</small><b>Thanh toán</b></span></a>' +
      '</div></div></div>' +

      '<nav class="nav"><div class="wrap">' +
      '<div class="nav-item all"><a href="danh-muc.html">☰ Danh mục</a>' +
      '<div class="dropdown">' +
        '<div class="dd-label">Sách</div>' +
        books.map(function (c) {
          return '<a href="danh-muc.html?cat=' + c.slug + '">' + c.icon + ' ' + c.name + '</a>';
        }).join('') +
        '<div class="dd-label">Dụng cụ &amp; văn phòng phẩm</div>' +
        tools.map(function (c) {
          return '<a href="danh-muc.html?cat=' + c.slug + '">' + c.icon + ' ' + c.name + '</a>';
        }).join('') +
      '</div></div>' + menu +
      '<div class="nav-item"><a href="danh-muc.html?tag=hot" style="color:var(--accent)">🔥 Khuyến mãi</a></div>' +
      '<div class="nav-item"><a href="tin-tuc.html">Tin tức</a></div>' +
      '</div></nav>';

    var pay = ['VNPAY', 'MOMO', 'ZALOPAY', 'VISA', 'MASTERCARD', 'COD'].map(function (p) { return '<span>' + p + '</span>'; }).join('');
    var footer =
      '<footer class="footer"><div class="wrap"><div class="footer-grid">' +
      '<div><h4>' + esc(CFG.name) + ' — ' + esc(CFG.slogan) + '</h4>' +
      '<p>' + esc(CFG.company) + '</p>' +
      '<p>📍 ' + esc(CFG.address) + '</p>' +
      '<p>📞 ' + esc(CFG.hotline) + ' &nbsp;·&nbsp; ✉️ ' + esc(CFG.email) + '</p>' +
      '<p style="font-size:12.5px">' + esc(CFG.license) + '<br>Mã số thuế: ' + esc(CFG.taxCode) + '</p>' +
      '<div class="socials">' +
      '<a href="' + CFG.social.facebook + '" title="Facebook">f</a>' +
      '<a href="' + CFG.social.youtube + '" title="YouTube">▶</a>' +
      '<a href="' + CFG.social.instagram + '" title="Instagram">◎</a>' +
      '<a href="' + CFG.social.tiktok + '" title="TikTok">♪</a>' +
      '<a href="' + CFG.social.zalo + '" title="Zalo">Z</a></div></div>' +

      '<div><h4>Về ' + esc(CFG.name) + '</h4><ul>' +
      '<li><a href="lien-he.html">Giới thiệu công ty</a></li>' +
      '<li><a href="lien-he.html">Hệ thống nhà sách</a></li>' +
      '<li><a href="tin-tuc.html">Tin tức &amp; sự kiện</a></li>' +
      '<li><a href="tai-khoan.html">Tài khoản của tôi</a></li>' +
      '<li><a href="lien-he.html">Liên hệ</a></li></ul></div>' +

      '<div><h4>Hỗ trợ khách hàng</h4><ul>' +
      '<li><a href="chinh-sach.html?t=mua-hang">Hướng dẫn mua hàng</a></li>' +
      '<li><a href="chinh-sach.html?t=thanh-toan">Phương thức thanh toán</a></li>' +
      '<li><a href="chinh-sach.html?t=giao-hang">Chính sách giao hàng</a></li>' +
      '<li><a href="chinh-sach.html?t=doi-tra">Chính sách đổi trả</a></li>' +
      '<li><a href="chinh-sach.html?t=bao-mat">Chính sách bảo mật</a></li>' +
      '<li><a href="chinh-sach.html?t=faq">Câu hỏi thường gặp</a></li></ul></div>' +

      '<div><h4>Đăng ký nhận tin</h4>' +
      '<p>Nhận thông tin sách mới và mã giảm giá mỗi tuần.</p>' +
      '<form class="nl-form" data-newsletter style="max-width:none">' +
      '<input type="email" placeholder="Email của bạn" required><button class="btn btn-accent">Gửi</button></form>' +
      '<h4 style="margin-top:18px">Phương thức thanh toán</h4><div class="pay">' + pay + '</div></div>' +
      '</div>' +
      '<div class="copyright">© ' + new Date().getFullYear() + ' ' + esc(CFG.name) + '. Website demo — nội dung tham khảo, không phải trang thương mại thật.</div>' +
      '</div></footer>';

    var h = document.getElementById('site-header'); if (h) h.innerHTML = header;
    var f = document.getElementById('site-footer'); if (f) f.innerHTML = footer;
    paintBadge();
    bindSearch();
  }

  function bindSearch() {
    var form = document.getElementById('searchForm');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      location.href = 'danh-muc.html?q=' + encodeURIComponent(document.getElementById('q').value.trim());
    });
    var input = document.getElementById('q'), box = document.getElementById('suggest');
    input.addEventListener('input', function () {
      var v = input.value.trim().toLowerCase();
      if (v.length < 2) { box.classList.add('hide'); return; }
      var hits = window.BOOKS.filter(function (b) {
        return (b.title + ' ' + b.author).toLowerCase().indexOf(v) > -1;
      }).slice(0, 6);
      if (!hits.length) { box.classList.add('hide'); return; }
      box.innerHTML = hits.map(function (b) {
        return '<a href="san-pham.html?id=' + b.id + '"><img class="s-cover" src="' + cover(b) + '" alt="">' +
          '<span><b>' + esc(b.title) + '</b><br><small style="color:#6b7280">' + esc(b.author) + ' · ' + fmt(b.price) + '</small></span></a>';
      }).join('');
      box.classList.remove('hide');
    });
    document.addEventListener('click', function (e) {
      if (!form.contains(e.target)) box.classList.add('hide');
    });
  }

  /* ---------- Hộp "Đổi tên & thông tin" ---------- */
  function renderSettings() {
    var btn = document.createElement('button');
    btn.className = 'gear'; btn.title = 'Đổi tên website & thông tin'; btn.innerHTML = '⚙';
    document.body.appendChild(btn);

    var modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML =
      '<div class="modal-box">' +
      '<h3>Đổi tên &amp; thông tin website</h3>' +
      '<p class="note">Thay đổi được lưu trong trình duyệt này và áp dụng cho mọi trang. ' +
      'Muốn đổi vĩnh viễn cho mọi người, sửa file <code>assets/js/config.js</code>.</p>' +
      '<div class="field"><label>Tên website</label><input id="cf-name" value="' + esc(CFG.name) + '"></div>' +
      '<div class="field"><label>Tên viết tắt (chữ trên logo)</label><input id="cf-short" value="' + esc(CFG.nameShort) + '"></div>' +
      '<div class="field"><label>Slogan</label><input id="cf-slogan" value="' + esc(CFG.slogan) + '"></div>' +
      '<div class="field"><label>Hotline</label><input id="cf-hotline" value="' + esc(CFG.hotline) + '"></div>' +
      '<div class="field"><label>Email</label><input id="cf-email" value="' + esc(CFG.email) + '"></div>' +
      '<div class="field"><label>Địa chỉ</label><input id="cf-address" value="' + esc(CFG.address) + '"></div>' +
      '<div class="field"><label>Tên công ty</label><input id="cf-company" value="' + esc(CFG.company) + '"></div>' +
      '<div class="field" style="display:flex;gap:12px">' +
      '<span style="flex:1"><label>Màu chính</label><input type="color" id="cf-primary" value="' + CFG.theme.primary + '" style="height:42px;padding:3px"></span>' +
      '<span style="flex:1"><label>Màu nhấn</label><input type="color" id="cf-accent" value="' + CFG.theme.accent + '" style="height:42px;padding:3px"></span>' +
      '</div>' +
      '<div class="modal-actions">' +
      '<button class="btn btn-block" id="cf-save">Lưu thay đổi</button>' +
      '<button class="btn btn-ghost" id="cf-reset">Mặc định</button>' +
      '<button class="btn btn-ghost" id="cf-close">Đóng</button>' +
      '</div></div>';
    document.body.appendChild(modal);

    btn.onclick = function () { modal.classList.add('open'); };
    modal.addEventListener('click', function (e) { if (e.target === modal) modal.classList.remove('open'); });
    modal.querySelector('#cf-close').onclick = function () { modal.classList.remove('open'); };
    modal.querySelector('#cf-reset').onclick = function () { resetOverride(); };
    modal.querySelector('#cf-save').onclick = function () {
      var v = function (id) { return modal.querySelector('#cf-' + id).value.trim(); };
      saveOverride({
        name: v('name'), nameShort: v('short') || v('name'), slogan: v('slogan'),
        hotline: v('hotline'), email: v('email'), address: v('address'), company: v('company'),
        theme: { primary: v('primary'), accent: v('accent') }
      });
    };
  }

  /* ---------- Form đăng ký nhận tin ---------- */
  document.addEventListener('submit', function (e) {
    var f = e.target.closest('[data-newsletter]');
    if (f) { e.preventDefault(); f.reset(); toast('Đăng ký nhận tin thành công ✓'); }
  });

  /* ---------- Khởi động ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    applyTheme();
    renderChrome();
    renderSettings();
    if (window.PAGE_INIT) window.PAGE_INIT();
  });
})();
