# Form Cập Nhật Nhân Viên

Trang web tĩnh gồm hai phần, chạy trực tiếp trên trình duyệt (không cần build):

| File | Vai trò |
|---|---|
| `index.html` | Form nhập/cập nhật thông tin nhân viên, gửi dữ liệu tới Google Apps Script. |
| `dashboard.html` | Biểu đồ trực quan hoá dữ liệu nhân viên đã thu thập. |

## Dashboard

`dashboard.html` hiển thị:

- **Thẻ số liệu**: tổng nhân viên, số bộ phận, tỉ lệ hồ sơ có email / điện thoại.
- **Nhân sự theo bộ phận** – biểu đồ cột ngang, sắp xếp giảm dần.
- **Sinh nhật theo tháng** – biểu đồ cột dọc 12 tháng.
- **Độ đầy đủ của dữ liệu** – tỉ lệ hồ sơ đã điền từng trường.
- **Bảng dữ liệu** – toàn bộ bản ghi đang được vẽ.

Hỗ trợ giao diện sáng/tối và tooltip khi rê chuột lên từng cột.

### Hai cách nạp dữ liệu

**1. File CSV (dùng được ngay).** Trong Google Sheet chọn *File → Download → CSV*,
rồi bấm **Chọn file CSV…** trên dashboard. Dữ liệu chỉ được đọc trong trình duyệt,
không gửi đi đâu.

**2. Tải trực tiếp từ Apps Script.** Nút **Tải từ Google Sheet** gọi
`GET <SCRIPT_URL>?action=list`. Apps Script cần có hàm `doGet` trả về JSON, ví dụ:

```js
function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  const values = sheet.getDataRange().getValues();
  const headers = values.shift();
  const data = values.map(row => {
    const o = {};
    headers.forEach((h, i) => o[h] = row[i]);
    return o;
  });
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, data: data }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

Sau khi thêm `doGet`, nhớ *Deploy → Manage deployments → New version* để bản triển khai
mới có hiệu lực.

### Tên cột

Dashboard nhận các cột `HoTen`, `MaNV`, `BoPhan`, `ChucDanh`, `DienThoai`, `Email`,
`Ngay`, `Thang`, `Nam`, `DiaChi`, `GhiChu` — đúng như form đang gửi. Tên cột tiếng Việt
có dấu (ví dụ `Họ tên`, `Bộ phận`, `Điện thoại`) cũng được nhận diện tự động.

## Chạy thử

Mở trực tiếp `index.html` / `dashboard.html` bằng trình duyệt, hoặc:

```bash
python3 -m http.server 8000
# http://localhost:8000/dashboard.html
```
