/* =========================================================================
   CẤU HÌNH WEBSITE  —  ĐỔI TÊN & THÔNG TIN TẠI ĐÂY
   -------------------------------------------------------------------------
   Sửa trực tiếp các giá trị bên dưới là toàn bộ website đổi theo.
   Ngoài ra còn có thể đổi nhanh ngay trên web: bấm nút ⚙ "Đổi tên"
   ở góc phải màn hình (lưu trong trình duyệt, không cần sửa code).
   ========================================================================= */

window.SITE_CONFIG = {
  /* --- Tên thương hiệu (đang để tạm là "A") --- */
  name: 'A',
  nameShort: 'A',
  slogan: 'Sách & Dụng cụ học tập',
  tagline: 'Sách hay, dụng cụ đủ — Giao nhanh toàn quốc',

  /* --- Thông tin liên hệ --- */
  hotline: '1900 1234',
  email: 'cskh@nhasach-a.vn',
  address: '123 Nguyễn Văn Cừ, Phường Cầu Kho, Quận 1, TP. Hồ Chí Minh',
  workingHours: '08:00 - 21:00 (Thứ 2 - Chủ nhật)',

  /* --- Thông tin pháp lý hiển thị ở chân trang --- */
  company: 'Công ty Cổ phần Văn hóa & Nhà sách A',
  taxCode: '0312345678',
  license: 'GPĐKKD số 0312345678 do Sở KH&ĐT TP.HCM cấp ngày 01/01/2020',

  /* --- Mạng xã hội (để "#" nếu chưa có) --- */
  social: {
    facebook: '#',
    youtube: '#',
    instagram: '#',
    tiktok: '#',
    zalo: '#'
  },

  /* --- Màu thương hiệu --- */
  theme: {
    primary: '#0a4ea3',
    accent: '#ff6b00'
  },

  /* --- Chính sách bán hàng --- */
  freeShipThreshold: 300000,
  shipFee: 25000,
  memberDiscountNote: 'Thành viên Thân thiết giảm thêm 5% cho mọi đơn hàng',

  /* --- Mã giảm giá áp dụng ở trang giỏ hàng ---
     type: 'percent' (giảm % tổng tiền hàng, có thể đặt max)
           'amount'  (giảm số tiền cố định)
           'ship'    (miễn phí giao hàng)                                  */
  coupons: [
    { code: 'GIAM10',   type: 'percent', value: 10, max: 100000, min: 0,      label: 'Giảm 10% tổng tiền hàng (tối đa 100.000đ)' },
    { code: 'SACH50K',  type: 'amount',  value: 50000,           min: 300000, label: 'Giảm 50.000đ cho đơn từ 300.000đ' },
    { code: 'FREESHIP', type: 'ship',    value: 0,               min: 0,      label: 'Miễn phí giao hàng' }
  ]
};
