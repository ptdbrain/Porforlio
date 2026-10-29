# Work — Kinetic Cinema V2

Bản mới của `newidea2.md` thay thế hoàn toàn brief Engineering Studio trước. Work hiện là hành trình chữ, khung ảnh và project world; Personal giữ nguyên visual diary/timeline. Source Studio cũ được giữ để tham khảo, không được Work import hoặc tải stylesheet vào entry mới.

## Đối chiếu từng cảnh

| Cảnh | Triển khai |
| --- | --- |
| W00 Portal | Home → Work dùng shared element trên desktop khi hỗ trợ, fade ngắn trên mobile; case study có shared frame riêng. Vào URL trực tiếp không phụ thuộc portal |
| W01 Cold Open | Tên và chuyên môn hiển thị ngay, CTA luôn dùng được; ba dòng chữ mask, ba frame lệch lớp, pointer depth tối đa 10px; intro dưới 1,3 giây |
| W02 Manifesto | Bốn động từ với dịch chuyển/scale/skew/rotation khác nhau, nền ngà, một câu giải thích có căn cứ mỗi dòng, không bento |
| W03 Universe | Quỹ đạo CSS perspective; scroll chọn tâm, nút trước/sau và danh sách tên; extra scroll 1,2 viewport, pin native không chặn wheel. Tablet/mobile là rail snap; Simple view là danh sách |
| W04A Product Film | MedTutor: frame browser, ba ảnh/chế độ nội dung, lớp Workspace/API/Model–Data có thể chọn, skip đọc case study. Ảnh/video trống không giả giao diện |
| W04B Research Motion | FutureVLA: luồng cong và các bước pipeline thật; What/Why/Trade-off mở dialog có focus trap. Không dựng A/B, metric hoặc đồ thị khi chưa có dữ liệu |
| W04C Interactive Experience | LabGuard: gallery với tab, nút và swipe. Chưa có demo public input/output nên ghi rõ fallback; không gọi API hoặc tạo output giả. Có schema để thêm ví dụ đã lưu với nguồn |
| W05 Credits | Poster rộng cho đóng góp nhóm LabGuard, ghi đúng loại hoạt động; Challenge/Contribution/Outcome và chi tiết/nguồn. VinUni là đào tạo riêng, không thành kinh nghiệm công ty |
| W06 Skills | Typography wall sáu nhóm, chọn nhóm mở dự án/vai trò/trạng thái/kết quả và link implementation. Mobile là accordion; không ma trận hay tỷ lệ tự chấm |
| W07 Experiment Room | Filmstrip có nút điều khiển, drawer Hypothesis/Tried/Learned/Next; ngày và ghi chú chưa cung cấp hiển thị thiếu, không suy từ ngày push |
| W08 Horizon | Đường chân trời, ba title card chọn được bằng nút và bàn phím; vai trò mong muốn còn trống, hai hướng chuyên môn dùng nội dung hiện có |
| W09 Closing | Typography lớn, khung chân dung/typographic fallback, email/copy/GitHub/LinkedIn/CV/Personal hoạt động; frame chuyển sắc xanh–ấm |

Thư viện bảy dự án còn nguyên tại `#archive`, dùng danh sách đọc nhanh có tìm kiếm không phân biệt dấu Việt, lọc category và stack; không xếp thành loạt card giống nhau. Các URL case study, metadata, canonical, sitemap và HTML tĩnh được giữ.

## Kiến trúc và chuyển động

- `src/components/cinema/`: các scene, frame, index và motion provider.
- `src/content/cinema.json` / `cinemaCopy.js`: format và nội dung Việt–Anh; không chứa claim kỹ thuật mới chưa xác minh.
- `cinema.css`: graphite `#090B10`, cream `#F4F1EC`, lime `#D9FF61`, xanh/tím tiết chế; Sora local + Be Vietnam Pro + IBM Plex Mono.
- GSAP/ScrollTrigger tải động: một controller chung chọn cảnh đang ở tâm viewport, chỉ cập nhật progress cảnh đó. IntersectionObserver giới hạn cảnh có mặt. Pointer chỉ hoạt động khi hero có mặt và thiết bị có chuột.
- Motion for React dùng LazyMotion/features tải riêng cho đổi nội dung/drawer; không có animation nền chạy vô hạn.
- Trigger, observer, pointer listener, rAF được dọn khi unmount/đổi mode; không chặn wheel, khóa chuột hay dùng smooth-scroll hijacking.
- Simple view lưu trong localStorage. OS reduced motion luôn ưu tiên; Save-Data, RAM ≤4GB hoặc CPU ≤4 luồng chọn chế độ đơn giản khi để Auto. Người dùng có thể chủ động bật full motion trên máy yếu, trừ khi OS yêu cầu reduced motion.
- Bản production hydrate HTML đã prerender để tránh tạo lại hero/intro khi JavaScript tới chậm. Route HTML không khớp (fallback dev/404) dùng render client bình thường; language/motion preference được áp dụng sau hydration để không gây mismatch.

## Nội dung còn thiếu

Ưu tiên ảnh cover MedTutor/FutureVLA/LabGuard; các screenshot tính năng MedTutor; ảnh/clip LabGuard; input/kết quả/biểu đồ thật của FutureVLA; ảnh nhóm; ảnh chân dung ending; CV PDF.

Vai trò hiện tại, vai trò mong muốn, các đóng góp cá nhân chưa rõ, ngày cập nhật experiment, Why/Trade-off và metric vẫn để trống. Hướng dẫn chi tiết trong [CONTENT-NEEDED.md](CONTENT-NEEDED.md).

## Kiểm tra và giới hạn

Kiểm tra mã nguồn, build/prerender, lint phạm vi thay đổi và trình duyệt production. Browser tests bao phủ normal motion, reduced motion, Simple view lưu lựa chọn, fallback CPU yếu, keyboard, touch swipe thật, anchor thoát orbit, Back/revisit, modal focus, clipboard, i18n, HTML không JS và WCAG tự động.

Đây là kiểm tra trên Chrome headless, không phải xác nhận 60fps trên mọi thiết bị hoặc kiểm tra thủ công mọi trình duyệt. Cần đo lại với ảnh/video thật và trên domain triển khai. Không push, commit hoặc deploy tự động trong lần cập nhật này.


### Kết quả kiểm tra lần này

- `npm run lint`: đạt, phạm vi source hiện hành vừa thay đổi.
- `npm test`: 28 kiểm tra đạt, gồm build/prerender và dữ liệu/routes.
- Browser production: 52 ca đạt, hai ca bỏ qua theo thiết bị (touch-only và timeline desktop-only).
- Viewport 320/390/768/1024/1440 ở cả Việt/Anh không tràn ngang trang.
- HTML không JavaScript vẫn hiện headline, nội dung và future panel. Console/runtime không lỗi trong kiểm tra tải chậm.
- Chrome mobile 390×844, CPU 4×, latency 150ms, download ~1,6Mbps: một lượt đo local LCP **0,748s**, CLS **0,0006** khi chưa có ảnh/video thật.
- Orbit desktop với CPU 4×, đo 89 khoảng rAF khi cuộn: median **16,7ms**, p95 **33,3ms**. Đây là cadence headless local, không phải bằng chứng 60fps cố định trên mọi thiết bị.

Build cuối giữ HTML tĩnh theo từng route; layout/animation cũ Studio không còn trong entry. Các screenshot QA là artifact kiểm tra, không được dùng làm ảnh minh chứng dự án.
