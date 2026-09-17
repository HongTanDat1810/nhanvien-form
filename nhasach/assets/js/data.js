/* =========================================================================
   DỮ LIỆU MẪU (sách, danh mục, tin tức, hệ thống cửa hàng)
   Thay bằng dữ liệu thật hoặc nối API khi triển khai.
   ========================================================================= */

/* group: 'sach' = sách · 'dungcu' = dụng cụ, văn phòng phẩm, quà tặng */
window.CATEGORIES = [
  { slug: 'van-hoc',   group: 'sach',   name: 'Văn học',               icon: '📖', children: ['Tiểu thuyết', 'Truyện ngắn', 'Thơ', 'Light novel'] },
  { slug: 'kinh-te',   group: 'sach',   name: 'Kinh tế',               icon: '📈', children: ['Quản trị - Lãnh đạo', 'Marketing - Bán hàng', 'Tài chính - Đầu tư', 'Khởi nghiệp'] },
  { slug: 'ky-nang',   group: 'sach',   name: 'Tâm lý - Kỹ năng sống', icon: '🧠', children: ['Kỹ năng sống', 'Tâm lý', 'Sách hạt giống tâm hồn', 'Rèn luyện nhân cách'] },
  { slug: 'thieu-nhi', group: 'sach',   name: 'Thiếu nhi',             icon: '🧸', children: ['Truyện tranh', 'Tô màu - Tập vẽ', 'Kiến thức bách khoa', 'Sách cho bé 0-6 tuổi'] },
  { slug: 'giao-khoa', group: 'sach',   name: 'Giáo khoa - Tham khảo', icon: '🎓', children: ['Sách giáo khoa', 'Sách bài tập', 'Luyện thi', 'Từ điển'] },
  { slug: 'ngoai-ngu', group: 'sach',   name: 'Ngoại ngữ',             icon: '🌏', children: ['Tiếng Anh', 'Tiếng Nhật', 'Tiếng Hàn', 'Tiếng Trung'] },
  { slug: 'ngoai-van', group: 'sach',   name: 'Sách ngoại văn',        icon: '🗽', children: ['Fiction', 'Business', 'Children books', 'Manga - Comic'] },
  { slug: 'lich-su',   group: 'sach',   name: 'Lịch sử - Địa lý',      icon: '🏛️', children: ['Lịch sử Việt Nam', 'Lịch sử thế giới', 'Danh nhân', 'Du ký'] },

  { slug: 'dung-cu',   group: 'dungcu', name: 'Dụng cụ học tập',       icon: '📐', children: ['Bút - Thước - Compa', 'Cặp - Ba lô', 'Hộp bút - Bảng viết', 'Máy tính cầm tay'] },
  { slug: 'my-thuat',  group: 'dungcu', name: 'Dụng cụ mỹ thuật',      icon: '🎨', children: ['Màu vẽ', 'Cọ - Bảng pha màu', 'Giấy vẽ - Canvas', 'Đất nặn - Thủ công'] },
  { slug: 'vpp',       group: 'dungcu', name: 'Văn phòng phẩm',        icon: '✏️', children: ['Bút viết', 'Sổ tay - Notebook', 'Giấy - Sổ sách', 'Dụng cụ văn phòng'] },
  { slug: 'qua-tang',  group: 'dungcu', name: 'Quà lưu niệm - Lifestyle', icon: '🎁', children: ['Quà tặng', 'Trang trí', 'Túi vải - Balo', 'Lịch - Thiệp'] }
];

/* Nhóm của một danh mục: 'sach' hoặc 'dungcu' */
window.catGroup = function (slug) {
  var c = window.CATEGORIES.filter(function (x) { return x.slug === slug; })[0];
  return c ? c.group : 'sach';
};

/* id, tên, tác giả, danh mục, giá bìa, % giảm, NXB, năm, số trang, đã bán, đánh giá, nhãn, mô tả */
function B(id, title, author, cat, list, off, pub, year, pages, sold, rate, tags, desc) {
  return {
    id, title, author, cat,
    listPrice: list,
    price: Math.round(list * (100 - off) / 100 / 1000) * 1000,
    off, publisher: pub, year, pages, sold, rate,
    tags: tags || [],
    desc: desc || (window.catGroup(cat) === 'dungcu'
      ? 'Sản phẩm chính hãng, chất liệu bền, hoàn thiện chắc chắn — phù hợp cho học sinh, sinh viên và dân văn phòng.'
      : 'Ấn phẩm được tuyển chọn kỹ lưỡng về nội dung và hình thức, in trên giấy tốt, trình bày trang nhã — món quà ý nghĩa cho người yêu sách.')
  };
}

window.BOOKS = [
  B('vh01', 'Những Người Khốn Khổ (Trọn bộ 2 tập)', 'Victor Hugo', 'van-hoc', 420000, 35, 'NXB Văn Học', 2023, 1280, 2450, 4.8, ['hot'], 'Kiệt tác của văn học Pháp thế kỷ 19 — bản dịch đầy đủ, bìa cứng, in trên giấy xốp nhẹ.'),
  B('vh02', 'Đất Rừng Phương Nam', 'Đoàn Giỏi', 'van-hoc', 135000, 25, 'NXB Kim Đồng', 2024, 320, 5310, 4.9, ['banchay'], 'Tác phẩm kinh điển về vùng đất Nam Bộ, đã được chuyển thể thành phim.'),
  B('vh03', 'Nhà Giả Kim', 'Paulo Coelho', 'van-hoc', 89000, 20, 'NXB Hội Nhà Văn', 2023, 228, 12800, 4.7, ['banchay', 'hot'], 'Hành trình đi tìm kho báu và khám phá vận mệnh của chính mình.'),
  B('vh04', 'Mắt Biếc', 'Nguyễn Nhật Ánh', 'van-hoc', 125000, 15, 'NXB Trẻ', 2024, 268, 8900, 4.8, ['banchay'], 'Câu chuyện tình trong trẻo và day dứt bậc nhất của Nguyễn Nhật Ánh.'),
  B('vh05', 'Tuyển Tập Truyện Ngắn Nam Cao', 'Nam Cao', 'van-hoc', 160000, 30, 'NXB Văn Học', 2023, 420, 1240, 4.6, [], null),
  B('vh06', 'Cây Cam Ngọt Của Tôi', 'José Mauro de Vasconcelos', 'van-hoc', 118000, 22, 'NXB Hội Nhà Văn', 2024, 244, 7600, 4.9, ['banchay'], null),

  B('kt01', 'Nghĩ Giàu Làm Giàu', 'Napoleon Hill', 'kinh-te', 158000, 30, 'NXB Tổng Hợp', 2023, 396, 4300, 4.5, ['banchay'], 'Cuốn sách làm giàu kinh điển được tái bản liên tục gần 90 năm qua.'),
  B('kt02', 'Nguyên Tắc - Principles', 'Ray Dalio', 'kinh-te', 299000, 25, 'NXB Thế Giới', 2024, 592, 2100, 4.7, ['hot'], null),
  B('kt03', 'Marketing 6.0', 'Philip Kotler', 'kinh-te', 265000, 20, 'NXB Công Thương', 2024, 348, 980, 4.6, ['moi'], null),
  B('kt04', 'Từ Tốt Đến Vĩ Đại', 'Jim Collins', 'kinh-te', 195000, 28, 'NXB Trẻ', 2023, 412, 3200, 4.6, [], null),
  B('kt05', 'Khởi Nghiệp Tinh Gọn', 'Eric Ries', 'kinh-te', 175000, 25, 'NXB Lao Động', 2023, 336, 1750, 4.4, [], null),

  B('kn01', 'Đắc Nhân Tâm', 'Dale Carnegie', 'ky-nang', 128000, 20, 'NXB Tổng Hợp', 2024, 320, 24500, 4.8, ['banchay', 'hot'], 'Cuốn sách về nghệ thuật đối nhân xử thế bán chạy nhất mọi thời đại.'),
  B('kn02', 'Tuổi Trẻ Đáng Giá Bao Nhiêu', 'Rosie Nguyễn', 'ky-nang', 98000, 18, 'NXB Hội Nhà Văn', 2023, 288, 9800, 4.5, ['banchay'], null),
  B('kn03', 'Thói Quen Nguyên Tử', 'James Clear', 'ky-nang', 189000, 30, 'NXB Thế Giới', 2024, 376, 15600, 4.9, ['banchay', 'hot'], 'Thay đổi nhỏ mỗi ngày tạo nên kết quả phi thường.'),
  B('kn04', 'Sống Chậm Lại Giữa Thế Giới Vội Vã', 'Hải Miên', 'ky-nang', 115000, 25, 'NXB Thanh Niên', 2024, 260, 3400, 4.4, ['moi'], null),
  B('kn05', 'Hạt Giống Tâm Hồn - Trọn Bộ 10 Cuốn', 'Nhiều tác giả', 'ky-nang', 550000, 40, 'NXB Tổng Hợp', 2023, 2400, 1120, 4.7, ['hot'], null),

  B('tn01', 'Doraemon - Trọn Bộ 45 Tập', 'Fujiko F. Fujio', 'thieu-nhi', 900000, 25, 'NXB Kim Đồng', 2024, 8100, 1560, 4.9, ['hot'], 'Bộ truyện tranh gắn liền tuổi thơ nhiều thế hệ độc giả Việt Nam.'),
  B('tn02', 'Dế Mèn Phiêu Lưu Ký (Bìa cứng)', 'Tô Hoài', 'thieu-nhi', 145000, 20, 'NXB Kim Đồng', 2024, 172, 6700, 4.8, ['banchay'], null),
  B('tn03', 'Bách Khoa Tri Thức Cho Trẻ Em', 'Nhiều tác giả', 'thieu-nhi', 235000, 30, 'NXB Dân Trí', 2024, 240, 2100, 4.6, ['moi'], null),
  B('tn04', 'Ehon Nhật Bản - Bộ 6 Cuốn Cho Bé 0-3 Tuổi', 'Nhiều tác giả', 'thieu-nhi', 320000, 35, 'NXB Phụ Nữ', 2024, 180, 1890, 4.7, ['moi'], null),
  B('tn05', 'Sách Tô Màu Sáng Tạo Cho Bé', 'Nhiều tác giả', 'thieu-nhi', 45000, 15, 'NXB Mỹ Thuật', 2024, 64, 4300, 4.3, [], null),

  B('gk01', 'Bộ Sách Giáo Khoa Lớp 6 - Chân Trời Sáng Tạo', 'Bộ GD&ĐT', 'giao-khoa', 310000, 5, 'NXB Giáo Dục', 2025, 1200, 8700, 4.5, ['moi'], null),
  B('gk02', 'Luyện Thi THPT Quốc Gia Môn Toán', 'Nguyễn Văn A', 'giao-khoa', 185000, 20, 'NXB Đại Học QG', 2025, 480, 2600, 4.4, [], null),
  B('gk03', 'Từ Điển Tiếng Việt', 'Hoàng Phê', 'giao-khoa', 280000, 15, 'NXB Hồng Đức', 2023, 1250, 3100, 4.8, [], null),

  B('nn01', 'IELTS Cambridge 19 (Kèm Audio)', 'Cambridge', 'ngoai-ngu', 220000, 25, 'NXB ĐH Sư Phạm', 2025, 180, 5400, 4.7, ['banchay', 'moi'], null),
  B('nn02', 'Mina No Nihongo I - Bản Mới', 'Nhiều tác giả', 'ngoai-ngu', 195000, 20, 'NXB Trẻ', 2024, 250, 3300, 4.6, [], null),
  B('nn03', '3000 Từ Vựng Tiếng Anh Thông Dụng', 'Nguyễn Thị B', 'ngoai-ngu', 138000, 30, 'NXB Thanh Niên', 2024, 368, 6100, 4.3, ['banchay'], null),
  B('nn04', 'Giáo Trình Hán Ngữ 6 Quyển', 'Nhiều tác giả', 'ngoai-ngu', 420000, 28, 'NXB ĐH Sư Phạm', 2024, 1100, 1450, 4.5, [], null),

  B('nv01', 'Atomic Habits (English Edition)', 'James Clear', 'ngoai-van', 380000, 20, 'Penguin Books', 2023, 320, 1250, 4.9, ['hot'], 'Original English edition, paperback, imported.'),
  B('nv02', 'Harry Potter Boxed Set (7 Books)', 'J.K. Rowling', 'ngoai-van', 1850000, 30, 'Bloomsbury', 2023, 3400, 640, 4.9, ['hot'], null),
  B('nv03', 'The Psychology of Money', 'Morgan Housel', 'ngoai-van', 350000, 22, 'Harriman House', 2024, 256, 980, 4.8, ['banchay'], null),

  B('ls01', 'Việt Nam Sử Lược', 'Trần Trọng Kim', 'lich-su', 195000, 20, 'NXB Văn Học', 2023, 620, 4200, 4.8, ['banchay'], null),
  B('ls02', 'Sapiens - Lược Sử Loài Người', 'Yuval Noah Harari', 'lich-su', 289000, 28, 'NXB Tri Thức', 2024, 560, 7800, 4.9, ['banchay', 'hot'], null),
  B('ls03', 'Lịch Sử Sài Gòn - Chợ Lớn', 'Nhiều tác giả', 'lich-su', 245000, 25, 'NXB Tổng Hợp', 2024, 430, 860, 4.6, ['moi'], null),

  B('dc01', 'Bộ Dụng Cụ Học Tập 12 Món (Hộp Nhựa)', 'Deli', 'dung-cu', 165000, 30, 'Deli', 2025, 0, 4200, 4.5, ['banchay'], 'Đủ bút chì, tẩy, gọt, thước kẻ, compa, ê ke — hộp nhựa trong có khoá, gọn trong cặp học sinh.'),
  B('dc02', 'Bộ Thước Kẻ 4 Món Nhựa Dẻo Không Gãy', 'Thiên Long', 'dung-cu', 38000, 20, 'Thiên Long', 2025, 0, 6800, 4.4, [], 'Thước thẳng 20cm, ê ke, thước đo độ; nhựa dẻo chống gãy, vạch chia in sắc nét không bay màu.'),
  B('dc03', 'Compa Kim Loại Có Hộp Đựng', 'Deli', 'dung-cu', 72000, 25, 'Deli', 2025, 0, 2900, 4.6, [], 'Thân hợp kim, khớp xoay chắc, vẽ đường tròn đến bán kính 15cm; kèm ruột chì dự phòng.'),
  B('dc04', 'Bút Chì Gỗ 2B (Hộp 12 Cây)', 'Điểm 10', 'dung-cu', 42000, 15, 'Thiên Long', 2025, 0, 11200, 4.7, ['banchay'], 'Ruột chì 2B đều màu, ít gãy khi gọt; thân gỗ nhẹ, phù hợp tập viết và tô trắc nghiệm.'),
  B('dc05', 'Ba Lô Chống Gù Chống Thấm Cho Học Sinh', 'Campus', 'dung-cu', 520000, 30, 'Campus', 2025, 0, 1850, 4.8, ['hot'], 'Khung lưng nâng đỡ cột sống, quai bản to có đệm, vải chống thấm, 3 ngăn lớn đựng vừa sách A4.'),
  B('dc06', 'Cặp Chống Gù Có Bánh Xe Kéo', 'Miti', 'dung-cu', 680000, 25, 'Miti', 2025, 0, 940, 4.5, ['moi'], 'Tay kéo rút và bánh xe êm, chuyển nhanh sang kiểu đeo vai; đáy chống thấm, khoá kéo đôi.'),
  B('dc07', 'Hộp Bút Vải 2 Ngăn Chống Sốc', 'Colokit', 'dung-cu', 85000, 20, 'Colokit', 2025, 0, 5300, 4.4, [], 'Hai ngăn kéo riêng, lót mút giữ bút không xô lệch, vải canvas dày dễ vệ sinh.'),
  B('dc08', 'Bảng Viết 2 Mặt Kèm Bút Lông & Khăn Lau', 'Hồng Hà', 'dung-cu', 110000, 25, 'Hồng Hà', 2025, 0, 3100, 4.3, [], 'Một mặt kẻ ô tập viết, một mặt trắng trơn; bề mặt xoá sạch không lưu vết mực.'),
  B('dc09', 'Máy Tính Khoa Học Casio FX-580VN X', 'Casio', 'dung-cu', 720000, 12, 'Bitex phân phối', 2025, 0, 7400, 4.9, ['banchay', 'hot'], 'Được phép mang vào phòng thi THPT Quốc gia, hơn 500 chức năng, màn hình hiển thị tự nhiên.'),
  B('dc10', 'Đèn Bàn LED Chống Cận 3 Mức Sáng', 'Rạng Đông', 'dung-cu', 390000, 28, 'Rạng Đông', 2025, 0, 2250, 4.6, ['moi'], 'Ánh sáng không nhấp nháy, 3 mức sáng, thân xoay 180°, có cổng sạc USB cho góc học tập.'),

  B('mt01', 'Màu Nước 24 Ô Kèm Cọ & Khay Pha', 'Marco', 'my-thuat', 210000, 30, 'Marco', 2025, 0, 2600, 4.7, ['banchay'], 'Màu lên tươi, tan đều, không nứt khi khô; hộp thiếc gập lại thành khay pha màu tiện mang theo.'),
  B('mt02', 'Bút Chì Màu 48 Màu Thân Gỗ', 'Faber-Castell', 'my-thuat', 285000, 25, 'Faber-Castell', 2025, 0, 3400, 4.8, ['hot'], 'Ruột mềm, lên màu mượt và chồng lớp tốt; thân gỗ chuẩn dễ gọt, ít gãy ruột.'),
  B('mt03', 'Bộ Cọ Vẽ 10 Cây Nhiều Cỡ', 'Mont Marte', 'my-thuat', 175000, 22, 'Mont Marte', 2025, 0, 1780, 4.5, [], 'Đủ cọ tròn, cọ dẹt, cọ quạt cho màu nước và acrylic; lông giữ form, ít rụng khi rửa.'),
  B('mt04', 'Giấy Vẽ A4 Định Lượng 180gsm (Tập 50 Tờ)', 'Canson', 'my-thuat', 125000, 18, 'Canson', 2025, 0, 4100, 4.6, [], 'Giấy dày ăn màu tốt, không nhăn khi đi màu nước; bề mặt vân nhẹ hợp cả chì và bút kim.'),
  B('mt05', 'Khung Canvas Vẽ 30x40cm (Combo 3 Tấm)', 'Mont Marte', 'my-thuat', 240000, 25, 'Mont Marte', 2025, 0, 890, 4.4, ['moi'], 'Vải bố căng sẵn trên khung gỗ thông, đã phủ lớp lót gesso, dùng ngay với acrylic hoặc sơn dầu.'),
  B('mt06', 'Giá Vẽ Gỗ Chữ A Gấp Gọn', 'Mont Marte', 'my-thuat', 450000, 30, 'Mont Marte', 2025, 0, 620, 4.5, [], 'Gỗ thông đánh nhẵn, chỉnh được độ cao và độ nghiêng, gấp gọn khi không dùng.'),
  B('mt07', 'Đất Nặn An Toàn 12 Màu Cho Bé', 'Colokit', 'my-thuat', 78000, 20, 'Colokit', 2025, 0, 5600, 4.5, ['banchay'], 'Nguyên liệu an toàn cho trẻ, mềm dẻo dễ tạo hình, không dính tay, kèm khuôn và que nặn.'),
  B('mt08', 'Bộ Bút Lông Màu 36 Màu Hai Đầu', 'Touch', 'my-thuat', 320000, 28, 'Touch', 2025, 0, 1950, 4.6, ['moi'], 'Một đầu cọ mềm, một đầu ngòi tròn; mực gốc cồn lên màu đều, phù hợp vẽ minh hoạ và calligraphy.'),

  B('vp01', 'Bút Bi Thiên Long TL-027 (Hộp 20 Cây)', 'Thiên Long', 'vpp', 90000, 15, 'Thiên Long', 2025, 0, 12400, 4.6, ['banchay'], 'Mực đều, nét thanh, thích hợp cho học sinh - văn phòng.'),
  B('vp02', 'Sổ Tay Bìa Da A5 200 Trang', 'Crabit', 'vpp', 125000, 25, 'Crabit', 2024, 200, 3200, 4.5, [], null),
  B('vp03', 'Giấy Note Dán 5 Màu (Combo 10 Tập)', 'Pronoti', 'vpp', 60000, 20, 'Pronoti', 2024, 0, 5600, 4.3, [], null),
  B('vp04', 'Giấy In A4 70gsm (Ream 500 Tờ)', 'Double A', 'vpp', 95000, 12, 'Double A', 2025, 0, 8900, 4.7, ['banchay'], 'Giấy trắng đều, ít kẹt máy, chạy tốt trên cả máy in phun và in laser.'),
  B('vp05', 'Bấm Kim Số 10 Kèm Hộp Ghim', 'Deli', 'vpp', 55000, 20, 'Deli', 2025, 0, 4300, 4.4, [], 'Thân kim loại, bấm nhẹ tay, kẹp được khoảng 20 tờ; kèm sẵn một hộp ghim.'),
  B('vp06', 'Bìa Còng A4 Gáy 7cm (Combo 3 Cái)', 'Thiên Long', 'vpp', 135000, 22, 'Thiên Long', 2025, 0, 2700, 4.3, [], 'Còng thép bật êm, bìa cứng ép nhựa chống ẩm, có ô dán nhãn ở gáy.'),
  B('vp07', 'Bút Highlight 6 Màu Pastel', 'Stabilo', 'vpp', 115000, 25, 'Stabilo', 2025, 0, 6200, 4.7, ['banchay'], 'Mực pastel dịu mắt, không lem qua mặt sau giấy, ngòi vát tô được cả nét to và nét nhỏ.'),

  B('qt01', 'Lịch Để Bàn 2026 - Danh Lam Việt Nam', 'Nhiều tác giả', 'qua-tang', 135000, 20, 'NXB Văn Hóa', 2025, 60, 1900, 4.5, ['moi'], null),
  B('qt02', 'Túi Vải Canvas In Hình Sách', 'Local Brand', 'qua-tang', 110000, 25, 'Local Brand', 2024, 0, 2400, 4.4, [], null),
  B('qt03', 'Bookmark Kim Loại Mạ Vàng (Set 6)', 'Local Brand', 'qua-tang', 95000, 30, 'Local Brand', 2024, 0, 3100, 4.6, ['banchay'], null)
];

window.NEWS = [
  { id: 'n1', title: 'Hội sách mùa thu 2026: Giảm đến 50% toàn bộ sách văn học', date: '15/09/2026', cat: 'Sự kiện',
    excerpt: 'Hội sách thường niên quay trở lại với hơn 20.000 đầu sách, nhiều hoạt động giao lưu tác giả và workshop dành cho bạn đọc nhỏ tuổi.' },
  { id: 'n2', title: '10 cuốn sách kỹ năng nên đọc trước tuổi 30', date: '10/09/2026', cat: 'Gợi ý đọc',
    excerpt: 'Danh sách được tuyển chọn từ phản hồi của hàng nghìn độc giả, xoay quanh tư duy tài chính, thói quen và phát triển bản thân.' },
  { id: 'n3', title: 'Khai trương nhà sách thứ 40 tại Thủ Đức', date: '02/09/2026', cat: 'Tin công ty',
    excerpt: 'Không gian 800m² với khu đọc sách miễn phí, góc cà phê và sân khấu nhỏ dành cho các buổi ra mắt sách.' },
  { id: 'n4', title: 'Giao lưu cùng tác giả Nguyễn Nhật Ánh nhân dịp tái bản Mắt Biếc', date: '28/08/2026', cat: 'Sự kiện',
    excerpt: 'Buổi ký tặng diễn ra lúc 9h00 sáng Chủ nhật, số lượng chỗ có hạn, bạn đọc vui lòng đăng ký trước.' },
  { id: 'n5', title: 'Cách chọn sách phù hợp cho trẻ theo từng độ tuổi', date: '20/08/2026', cat: 'Gợi ý đọc',
    excerpt: 'Từ ehon cho bé 0-3 tuổi đến sách bách khoa cho tuổi tiểu học — bí quyết để trẻ yêu việc đọc một cách tự nhiên.' },
  { id: 'n6', title: 'Ưu đãi thẻ thành viên: tích điểm đổi quà, sinh nhật giảm thêm 10%', date: '12/08/2026', cat: 'Khuyến mãi',
    excerpt: 'Chương trình áp dụng đồng thời tại cửa hàng và trên website, điểm tích lũy không giới hạn thời gian sử dụng.' }
];

window.STORES = [
  { name: 'Chi nhánh Quận 1',     addr: '123 Nguyễn Văn Cừ, P. Cầu Kho, Q.1, TP.HCM',   phone: '028 3838 1111' },
  { name: 'Chi nhánh Quận 3',     addr: '45 Võ Văn Tần, P.6, Q.3, TP.HCM',              phone: '028 3838 2222' },
  { name: 'Chi nhánh Thủ Đức',    addr: '12 Võ Văn Ngân, P. Linh Chiểu, TP. Thủ Đức',   phone: '028 3838 3333' },
  { name: 'Chi nhánh Hà Nội',     addr: '88 Bà Triệu, P. Nguyễn Du, Q. Hai Bà Trưng',   phone: '024 3939 4444' },
  { name: 'Chi nhánh Đà Nẵng',    addr: '56 Lê Duẩn, P. Thạch Thang, Q. Hải Châu',      phone: '0236 3939 555' },
  { name: 'Chi nhánh Cần Thơ',    addr: '9 Hòa Bình, P. Tân An, Q. Ninh Kiều',          phone: '0292 3838 666' }
];

window.BANNERS = [
  { title: 'Hội sách mùa thu', sub: 'Giảm đến 50% hơn 20.000 đầu sách', cta: 'Mua ngay', href: 'danh-muc.html?tag=hot', c1: '#0a4ea3', c2: '#00b2c9' },
  { title: 'Sách thiếu nhi',   sub: 'Mua 2 tặng 1 — Ehon, truyện tranh, bách khoa',      cta: 'Khám phá', href: 'danh-muc.html?cat=thieu-nhi', c1: '#ff6b00', c2: '#ffb300' },
  { title: 'Back to school',   sub: 'Ba lô chống gù, bút thước, màu vẽ — từ 38.000đ',     cta: 'Xem ngay', href: 'danh-muc.html?nhom=dungcu', c1: '#00875a', c2: '#57d9a3' }
];
