# Hành trình Personal: ba cảnh chuyển động

Thay chồng ảnh xoay như lật trang bằng các cảnh có nhịp riêng:

- **THCS / Assemble:** năm dải ảnh bay ghép vào khung; khung mở từ chiều sâu và ổn định thành một ảnh đầy đủ.
- **THPT / Aperture:** mở khung từ giữa, màn che rút lên; hai ảnh kỷ niệm thật xuất hiện từ hai góc với góc nghiêng và nhịp khác nhau.
- **Đại học / Portal:** ảnh mở từ tâm với vòng sáng mở rộng; ảnh phụ đi vào và camera dịch chuyển chiều sâu nhẹ theo tiến độ đọc.
- Ảnh rời cảnh dịch lùi/chéo trước khi mờ đi, thay hướng khi cuộn ngược. Không còn phép xoay Y để lật trang trong timeline.
- Số chương chạy theo ô đếm, quỹ đạo và đường sáng mảnh, thanh tiến độ của cảnh và từng chương.
- Tiêu đề, lời dẫn, các thành tích xuất hiện theo viewport riêng; các điểm thành tích nối lại thành một đường. Chữ dừng khi vào vùng đọc.
- Mobile dùng cảnh ảnh ngay trong từng chương, với camera nhẹ hơn; ảnh chính mở album thật của chương, hỗ trợ mũi tên/Escape và trả focus.

Dùng ảnh đã có trong `portfolio.json`; ảnh phụ chỉ là các ảnh gallery thật, không thêm thành tích hoặc ảnh giả. Các mảnh ảnh và ảnh phụ trang trí có `aria-hidden`, không thêm điểm focus hoặc nội dung đọc lặp. Giữ một layer desktop hiện hành có thể truy cập; các layer khác inert.

## Triển khai

- `LifeTimeline.jsx`: tách khỏi `Personal.jsx`, chứa cảnh ảnh, marker, nội dung chương và album mobile.
- `useJourneyMotion.js`: đọc vị trí các article không bị transform; chọn chương khi cuộn, cập nhật camera và progress bằng transform trực tiếp. React chỉ cập nhật khi chương đổi.
- `journey-scenes.css`: assemble/aperture/portal, ảnh vệ tinh, cảnh ra/vào, milestone và giao diện desktop/mobile.
- `Personal.jsx`, `main.jsx`: tích hợp component và CSS mới. Các section Personal khác giữ hoạt động hiện tại.
- `tests/e2e/journey-scenes.spec.js`: cuộn hai chiều/nhảy chương, footprint ổn định, active/inert, tiến độ, dừng khi ra viewport, keyboard, reduced motion và album mobile.
- `scripts/measure-journey-scenes.cjs`: đo cuộn native qua đủ ba chương theo cả hai hướng trên production preview port 4176, CPU ×1 desktop và ×4 mobile, mạng 40ms/10Mbps. Không chạy cùng build/E2E.

Không có vòng JavaScript chạy liên tục khi đứng yên, không chặn cuộn hoặc kéo dài hành trình bằng khoảng cuộn giả. Các phép đọc hình học được gom trước khi ghi transform. Dải ảnh ghép được ẩn sau khi chuyển cảnh kết thúc; đường sáng chỉ chạy khi hành trình còn trong viewport và dừng khi mở modal/ẩn tab. Simple view và OS reduced motion giữ ảnh, nội dung, điều hướng và chọn chương, bỏ motion.

Ảnh THCS/`thpt1.jpg` hiện có độ phân giải thấp; có thể thay bằng bản gốc sắc nét hơn sau, không cần thêm ảnh để các cảnh hoạt động.

## Kiểm tra và số đo cuối

- Build/prerender 28 trang và lint đạt; 34 kiểm tra dữ liệu đạt.
- E2E: 148 đạt, 2 bỏ qua theo loại thiết bị. Bao gồm luồng hiện có, chuyển chương nhanh/hai chiều, ảnh/album, footprint ổn định, focus, reduced motion, Simple view và kiểm tra axe.
- Đã xem ảnh chụp đủ ba cảnh ở 1440×900 và 390×900; chỉ một layer desktop hiện hành được đọc/tương tác. Không tràn ngang hoặc lỗi JavaScript trong lượt đo.

Chrome headless 157, full motion, CPU ×1 ở 1440×900 và ×4 ở 390×900; mạng 40ms, download 10Mbps. Một đoạn cuộn native qua đủ ba chương theo mỗi hướng, tốc độ 900px/s, chờ 1,1s để chuyển cảnh kết thúc:

| Viewport / chiều | Số khoảng rAF | P95 | Lớn nhất | Số khoảng >25ms |
| --- | --- | --- | --- | --- |
| Desktop / xuôi | 264 | 16,8ms | 33,4ms | 1 |
| Desktop / ngược | 262 | 16,8ms | 16,8ms | 0 |
| Mobile CPU ×4 / xuôi | 322 | 16,8ms | 33,3ms | 2 |
| Mobile CPU ×4 / ngược | 320 | 16,7ms | 33,4ms | 1 |

Tổng 1.168 khoảng rAF, 4 khoảng vượt 25ms. Đây là phép đo lab qua callback rAF, không phải GPU presentation FPS hoặc kết quả trên mọi thiết bị. Chưa đo trên điện thoại vật lý/Safari/Firefox. Dữ liệu gốc: [journey-scenes-performance.json](journey-scenes-performance.json).
