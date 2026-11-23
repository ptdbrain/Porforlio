# Chữ và bố cục trong hành trình Personal

Giữ nguyên nội dung và thứ tự đọc, thay đổi cách trình bày theo từng chương:

- **THCS — ghi chép:** tiêu đề bên trái, thông tin trường/năm có đường lề, đoạn kể và thành tích thụt vào; chữ đầu đoạn lớn như trang nhật ký.
- **THPT — editorial:** tiêu đề lớn căn phải; thông tin trường/năm cũng đổi bên. Thành tích đánh số thành các ghi chú so le, hai cột trên desktop đủ rộng, một cột trên tablet/mobile.
- **Đại học — góc nhìn mới:** tiêu đề căn giữa; desktop đặt thông tin học tập cạnh phần câu chuyện, tablet/mobile xếp lại theo thứ tự đọc.

Tiêu đề mở theo từng ký tự với ba kiểu: trượt/nghiêng từ dưới, xoay theo chiều sâu, phóng nhẹ vào nét. Mỗi heading có một accessible name, lớp ký tự trang trí aria-hidden để screen reader không đọc rời từng chữ.

Thông tin và đoạn kể đi vào từ hai phía; ghi chú thành tích có góc vào khác nhau và nằm phẳng khi đọc. Camera của tiêu đề/nội dung dịch nhẹ ở mép viewport, trở về `transform: none` trong vùng đọc. Chỉ biến đổi lớp con; chiều rộng/cao article và thứ tự DOM không đổi theo cuộn. Focus bàn phím giữ panel chữ đứng yên; Simple view, OS reduced motion và print bỏ các phép biến đổi.

File chính: `LifeTimeline.jsx`, `useJourneyMotion.js`, `journey-typography.css`, `main.jsx`; kiểm tra hành vi mới trong `tests/e2e/journey-typography.spec.js`. Không đổi dữ kiện, ảnh, routes hay thêm thư viện.

## Kiểm tra

- Build/prerender 28 trang, lint và 34 kiểm tra dữ liệu đạt.
- E2E toàn bộ: 154 đạt, 2 bỏ qua theo loại thiết bị. Các ca mới kiểm tra ba bố cục, accessible name của heading, vùng chữ chuyển động/đứng yên, footprint không đổi, keyboard, VI/EN ở 320px và reduced motion.
- Đã xem ảnh chụp từng chương trên desktop 1440×900 và mobile 390×900; không lỗi JavaScript/tràn ngang trong lượt đo.

Đo lại bằng `scripts/measure-journey-scenes.cjs` trên production preview: Chrome headless 157, full motion, desktop CPU ×1 và mobile CPU ×4, mạng 40ms/10Mbps. Cuộn native qua đủ ba chương theo cả hai chiều, tốc độ 900px/s:

| Viewport / chiều | Khoảng rAF | P95 | Lớn nhất | Khoảng >25ms |
| --- | --- | --- | --- | --- |
| Desktop / xuôi | 286 | 16,7ms | 33,3ms | 1 |
| Desktop / ngược | 285 | 16,7ms | 16,8ms | 0 |
| Mobile CPU ×4 / xuôi | 358 | 16,7ms | 33,4ms | 1 |
| Mobile CPU ×4 / ngược | 355 | 16,7ms | 33,4ms | 2 |

Tổng 1.284 khoảng rAF, 4 khoảng vượt 25ms. Đây là chỉ báo callback trong lab, không phải GPU presentation FPS hay cam kết 60 FPS trên mọi thiết bị; chưa thử điện thoại vật lý, Safari/Firefox. Dữ liệu gốc: [journey-typography-performance.json](journey-typography-performance.json).
