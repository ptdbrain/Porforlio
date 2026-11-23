# Personal: hành trình với chuyển động lớn

Thay cấu trúc ảnh sticky bên trái và chữ chạy bên phải bằng **ba khung cảnh độc lập, rộng toàn phần hành trình**. Mỗi chương có ảnh, tiêu đề, vùng chuyển cảnh và phần nội dung riêng.

- THCS: ảnh đi từ trái sang phải, tiêu đề đi từ phải sang trái và xuống thấp.
- THPT: đổi chiều so với THCS, ảnh và tiêu đề đi qua nhau.
- Đại học: ảnh rộng tiến gần, tiêu đề đi ngang qua khung hình và xuống phía dưới.
- Mobile: ảnh đi từ nửa dưới lên trên, tiêu đề đi từ trên xuống dưới. Có khoảng an toàn để tên chương và thời gian không bị sát/cắt ở cạnh.
- Phần kể chuyện sau khung cảnh lần lượt nằm phía phải, phía trái, rồi trải rộng. Các đoạn chữ đi vào từ bên cạnh với quãng dịch tối đa 260px trên desktop, 110px trên mobile.
- Gallery thành dải ảnh ngang lớn. Desktop có pan nhẹ theo cuộn dọc; khi người xem focus, dùng chuột/touch hoặc cuộn ngang, quyền điều khiển chuyển cho họ. Mobile cuộn ngang tự nhiên.

Mỗi canvas dùng CSS sticky trong phạm vi riêng (155svh desktop, 135svh mobile). Cuộn vẫn do trình duyệt xử lý, không chặn wheel/touch, không ép scrollTo khi đọc. Simple view/reduced motion dùng bố cục tĩnh gọn và bỏ quãng chuyển cảnh sticky; nội dung, ảnh, link chương và album vẫn truy cập được.

Ảnh chính có thể mở album trên cả desktop/mobile. Ảnh có focus được giữ vị trí, đưa lên trên lớp tiêu đề để hành động rõ và không bị che. Các link chương dừng dưới cả header lẫn thanh chọn chương; Back giữ vị trí đọc.

## Ảnh thật

Giữ dữ liệu và thành tích. Khi ảnh chính cũ có độ phân giải thấp và trong album đã có ảnh lớn hơn, dùng ảnh lớn làm khung chính; ảnh cũ vẫn còn trong album/ảnh phụ. THPT hiện dùng ảnh trao giải KHKT đã có, thay cho việc phóng lớn ảnh cầu lông 206px. Ảnh THCS hiện chỉ có bản nhỏ; có thể bổ sung bản gốc sau.

## Triển khai và kiểm tra

- `LifeTimeline.jsx`: mỗi article sở hữu khung ảnh/chữ riêng, thanh chương nằm ngang, vùng đọc và gallery.
- `useJourneyMotion.js`: đọc hình học container cố định, di chuyển các lớp con bằng transform; không cập nhật React theo từng frame.
- `journey-panorama.css`, `main.jsx`: bố cục rộng, sticky theo chương, đường chuyển động lớn, responsive và fallback.
- Thêm `tests/e2e/journey-panorama.spec.js`; cập nhật các kiểm tra của cấu trúc cũ. Kiểm tra quãng di chuyển thật của bounding box, chiều đổi vị trí, footprint ổn định, focus/album, link chương, Back và điều khiển gallery.
- Build/prerender 28 trang, lint và 34 kiểm tra dữ liệu đạt. E2E toàn bộ: **164/164 đạt**, gồm desktop/mobile, VI/EN, reduced motion, keyboard và axe.

Ảnh so sánh cùng một chương ở đầu và cuối chuyển động, không phải hai chương khác nhau:

- [Desktop — đầu](journey-panorama/desktop-start.jpg) / [Desktop — cuối](journey-panorama/desktop-end.jpg).
- [Mobile — đầu](journey-panorama/mobile-start.jpg) / [Mobile — cuối](journey-panorama/mobile-end.jpg).

## Quãng di chuyển đo từ giao diện

Đo bounding box ở 2% và 98% cùng một khoảng chuyển cảnh; số liệu bao gồm phép xoay/scale của khung ảnh:

| Viewport / chương | Ảnh | Tiêu đề |
| --- | --- | --- |
| 1440×900 / THCS | sang phải 690,2px | sang trái 603,1px, xuống 314,8px |
| 1440×900 / THPT | sang trái 673,2px | sang phải 603,1px, xuống 314,8px |
| 1440×900 / Đại học | sang trái 202,9px, lên 188,3px, rộng thêm 28% | sang phải 524,4px, xuống 428,2px |
| 820×900 / THCS | sang phải 389,1px | sang trái 336,3px, xuống 314,8px |
| 390×900 / mỗi chương | lên 175,8px | xuống 481,3px |

Không tràn ngang hoặc lỗi JavaScript trong các lượt chụp; đã xem lại ảnh desktop/mobile, tên chương và thời gian nằm trong khung an toàn.

## Đo cuộn bản production cuối

Chrome headless 157, full motion; CPU ×1 desktop và ×4 mobile, mạng 40ms/10Mbps. Cuộn native qua đủ ba chương theo cả hai chiều, 900px/s. Chạy tuần tự, không trùng E2E/build:

| Viewport / chiều | Khoảng rAF | P95 | Lớn nhất | Khoảng >25ms |
| --- | --- | --- | --- | --- |
| Desktop / xuôi | 540 | 16,7ms | 50ms | 2 |
| Desktop / ngược | 541 | 16,8ms | 16,8ms | 0 |
| Mobile CPU ×4 / xuôi | 499 | 16,8ms | 16,8ms | 0 |
| Mobile CPU ×4 / ngược | 496 | 16,7ms | 33,3ms | 1 |

Tổng 2.076 khoảng rAF, 3 khoảng vượt 25ms. Đây là chỉ báo nhịp callback trong lab, không phải GPU presentation FPS hay cam kết 60 FPS trên mọi thiết bị. Chưa thử Safari/Firefox hoặc điện thoại vật lý. Dữ liệu gốc: [results.json](journey-panorama/results.json).
