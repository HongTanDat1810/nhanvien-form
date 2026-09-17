# Website nhà sách "A" (bản demo)

Website bán sách trực tuyến, nội dung tương tự các trang nhà sách online tại Việt Nam
(sách trong nước, sách ngoại văn, văn phòng phẩm, quà lưu niệm, tin tức, hệ thống cửa hàng).
Toàn bộ là HTML/CSS/JS tĩnh — mở file là chạy, không cần cài đặt.

## Đổi tên website

Có **2 cách**, dùng cách nào cũng được:

1. **Đổi ngay trên web (nhanh nhất)** — bấm nút ⚙ ở góc phải dưới màn hình, nhập tên mới
   rồi bấm *Lưu thay đổi*. Đổi được cả tên, slogan, hotline, email, địa chỉ, tên công ty và
   màu thương hiệu. Thay đổi lưu trong trình duyệt của bạn; bấm *Mặc định* để trả về ban đầu.

2. **Đổi vĩnh viễn cho mọi người** — sửa file `assets/js/config.js`:

   ```js
   window.SITE_CONFIG = {
     name: 'A',                  // ← đổi tên website tại đây
     nameShort: 'A',             // chữ hiển thị trên logo
     slogan: 'Nhà sách trực tuyến',
     hotline: '1900 1234',
     email: 'cskh@nhasach-a.vn',
     ...
   };
   ```

Tên trong `<title>` của các trang dùng ký tự thay thế `{TEN}` và được đổi tự động theo cấu hình.

## Cấu trúc

```
nhasach/
├── index.html          Trang chủ: banner slider, danh mục, flash sale (đếm ngược),
│                       sách mới / bán chạy / giảm giá sốc, tin tức, hệ thống nhà sách
├── danh-muc.html       Danh sách sản phẩm: lọc theo danh mục / khoảng giá / khuyến mãi,
│                       sắp xếp, phân trang, tìm kiếm (?q=, ?cat=, ?tag=hot)
├── san-pham.html       Chi tiết sản phẩm (?id=): giá, thông số, chính sách, sản phẩm liên quan
├── gio-hang.html       Giỏ hàng + form đặt hàng, tính phí ship theo ngưỡng miễn phí
├── tin-tuc.html        Danh sách & chi tiết tin tức (?id=)
├── lien-he.html        Giới thiệu, hệ thống nhà sách, form liên hệ
└── assets/
    ├── css/style.css   Toàn bộ giao diện (responsive: desktop / tablet / mobile)
    └── js/
        ├── config.js   ⚙ CẤU HÌNH: tên, liên hệ, màu sắc, chính sách bán hàng
        ├── data.js     Dữ liệu mẫu: danh mục, ~40 sản phẩm, tin tức, cửa hàng, banner
        └── app.js      Header/footer dùng chung, tìm kiếm gợi ý, giỏ hàng, hộp đổi tên
```

## Chức năng

- Tìm kiếm có gợi ý tức thì trên thanh header
- Lọc + sắp xếp + phân trang danh sách sản phẩm
- Giỏ hàng lưu bằng `localStorage` (số lượng, xoá, tính phí giao hàng, đặt hàng)
- Ảnh bìa sách sinh tự động bằng SVG nên không phụ thuộc file ảnh bên ngoài
- Giao diện responsive, đổi màu thương hiệu ngay trong hộp ⚙

## Chạy thử

Mở trực tiếp `nhasach/index.html` bằng trình duyệt, hoặc chạy web server tĩnh:

```bash
npx http-server . -p 8080     # rồi mở http://localhost:8080/nhasach/
```

> Lưu ý: đây là bản demo, dữ liệu sản phẩm và tin tức là nội dung mẫu;
> form đặt hàng / liên hệ không gửi dữ liệu đi đâu.
