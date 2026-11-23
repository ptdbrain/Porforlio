# Personal: ảnh gọn, nội dung hiện ngay

Điều chỉnh ba chương hành trình để ảnh hỗ trợ câu chuyện và không chiếm một màn hình riêng trước phần nội dung.

- Tên chương, thời gian, tên trường và đoạn kể nằm trong cùng khung. Tên trường và câu chuyện hiện ngay, không phải chờ hiệu ứng reveal.
- Desktop: ảnh khoảng 28% chiều ngang, tối đa 340px trước phép xoay; vùng chữ 70%. Khung rộng tối đa 1180px, chiều cao tự tăng theo nội dung.
- Mobile: ảnh 100×120px cạnh tên chương; tên trường và đoạn kể đọc liền phía dưới. Tiêu đề tiếng Anh vẫn vừa ở chiều rộng 320px.
- Bỏ sticky và toàn bộ khoảng cuộn giữ khung. Ảnh/chữ vẫn đổi phía theo vị trí trong viewport trên desktop; mobile chỉ dịch nhẹ. Thành tích và album nối ngay dưới khung, không lặp lại đoạn giới thiệu.
- Phần thành tích chỉ dịch nhẹ theo trục dọc, không bị đẩy ngang ra ngoài mép. Gallery thu nhỏ; bàn phím, album, focus, thanh chọn chương và Simple view/reduced motion được giữ.
- Không thay đổi dữ liệu, thành tích hoặc ảnh thật. Ảnh THCS hiện là bản nhỏ; có thể bổ sung ảnh gốc rõ hơn sau.

## File thay đổi

- `src/components/editorial/LifeTimeline.jsx`: đưa thông tin trường và câu chuyện vào khung; bỏ nhắc cuộn và vùng đọc trống.
- `src/components/editorial/useJourneyMotion.js`: tiến độ theo viewport, quãng chuyển động phù hợp với bố cục gọn; xử lý chương không có thành tích.
- `journey-compact.css`, `src/main.jsx`: kích thước ảnh/tiêu đề, giới hạn chiều rộng, khoảng cách, responsive và fallback.
- `tests/e2e/journey-panorama.spec.js`, `tests/e2e/journey-typography.spec.js`: kiểm tra nội dung nằm trong khung, không có quãng cuộn đệm, ảnh nhỏ, chữ không tràn khi chuyển động, album và reduced motion.

## Kiểm tra thực tế

Build/prerender 28 trang, lint và 34/34 test đạt. E2E: **166/166 đạt**, gồm desktop/mobile, VI/EN, điều hướng, keyboard, axe và reduced motion.

Kiểm tra ba chương ở 1440, 820, 390 và 320px: đoạn kể nằm trong khung và viewport tại vị trí đọc, không tràn ngang hoặc lỗi JavaScript. Ở 1440×900, khung còn 378px cao, ảnh xoay khoảng 344px rộng. Cấu trúc cũ dành 1395px cho mỗi cảnh (155svh); cấu trúc mới không có khoảng cuộn đệm. Mobile VI có khung cao 307–361px tùy nội dung.

- [Ảnh desktop](journey-compact/desktop.jpg)
- [Ảnh mobile](journey-compact/mobile.jpg)
- [Số liệu bố cục và nhịp cuộn](journey-compact/results.json)

Đo production bằng Chrome headless, cuộn native qua ba chương theo cả hai chiều, 900px/s; CPU ×1 desktop, ×4 mobile, mạng 40ms/10Mbps. Số liệu rAF chỉ phản ánh nhịp callback trong lab, không phải GPU presentation FPS hay cam kết 60 FPS trên mọi thiết bị. Chưa thử Safari/Firefox hoặc điện thoại vật lý. Kết quả cuối được lưu trong JSON phía trên.

| Viewport / chiều | Khoảng rAF | P95 | Lớn nhất | Khoảng >25ms |
| --- | --- | --- | --- | --- |
| Desktop / xuôi | 246 | 16.8ms | 33.3ms | 1 |
| Desktop / ngược | 244 | 16.7ms | 16.8ms | 0 |
| Mobile CPU ×4 / xuôi | 246 | 16.8ms | 33.4ms | 5 |
| Mobile CPU ×4 / ngược | 246 | 16.7ms | 33.3ms | 2 |
