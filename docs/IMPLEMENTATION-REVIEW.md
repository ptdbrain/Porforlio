# Đối chiếu portfolio với newidea.md

> Nhánh Work đã được refactor tiếp theo `newidea2.md`. Bảng bên dưới ghi lại bản triển khai đầu; các mục Work (đặc biệt showcase sticky) được thay thế bởi [WORK-STUDIO-UPDATE.md](WORK-STUDIO-UPDATE.md). Nhánh Personal giữ triết lý visual diary.

## Phân tích bản cũ

Bản cũ là một trang dashboard kỹ thuật: hero AI, kỹ năng, sáu thẻ dự án, hành trình và ghi chú. Nội dung cá nhân đặt chung với chuyên môn; chưa có nhánh Personal, trang case study theo URL hoặc cấu trúc kể chuyện. Nhiều liên kết dự án, thông tin trường học và ảnh vẫn trống. Intro neural/brain chiếm màn hình trước khi vào nội dung.

Bản mới chuyển trọng tâm sang “One Person. Two Stories.”, dùng nội dung đã xác minh làm phần Work và để trống phần tiểu sử chưa được cung cấp. Các file giao diện cũ và chỉnh sửa đã có được giữ nguyên để tham khảo, nhưng không còn được `src/App.jsx` import vào giao diện mới.

## Kết quả theo kế hoạch

| Phần của plan | Thực hiện |
| --- | --- |
| Scene 01 / First impression | Hero chữ lớn, tên PTD, khung chân dung 4:5, hai CTA, reveal ngắn; không chạy brain intro |
| Scene 02 / Two stories | Hai vùng chọn Work/Personal, hover mở rộng trên desktop, xếp dọc trên mobile, chuyển route bằng History API và View Transition khi hỗ trợ |
| Scene 03 / Personal intro | Tiểu sử, ba từ khóa tùy chọn, collage bốn ảnh, cơ chế mở ảnh/caption |
| Scene 04 / Life timeline | Bốn chương THCS/THPT/Đại học/Hiện tại; ảnh sticky và crossfade theo cuộn desktop, ảnh trong từng chương trên mobile; không khóa cuộn |
| Scene 05 / Achievements | Chương trình VinUni đã hoàn thành, archive giải thưởng, thẻ mở chi tiết khi có nội dung |
| Scene 06 / Beyond code | Vùng thể thao rộng, ảnh phụ, gallery sở thích bất đối xứng |
| Scene 07 / Present | Ba mục đang học/đang xây/đang khám phá, chỗ ảnh và ngày cập nhật |
| Scene 08 / Dreams | Tông trầm ấm, ảnh tương lai, ba mục tiêu và cầu nối sang Work |
| Scene 09 / Work hero | Định vị CV/RAG/AI systems theo nội dung cũ và repo; Projects/CV/GitHub dễ tìm |
| Scene 10 / Experience | Timeline kinh nghiệm có cấu trúc; chưa tạo công việc/nhà tuyển dụng khi thiếu dữ kiện |
| Scene 11 / Selected work | Ba dự án MedTutor/ParkingAI/LabGuard; ảnh sticky đổi theo cuộn desktop, thẻ dọc mobile |
| Scene 12 / Case studies | Bảy URL riêng, bài toán, vai trò, kiến trúc tương tác, triển khai, kết quả, giới hạn, bài học, nguồn và liên kết |
| Scene 13 / Archive & Lab | Bộ lọc danh mục + công nghệ, trạng thái prototype/research/in-progress; Lab tách riêng |
| Scene 14 / Skills & mindset | Công nghệ chọn được và liên kết đúng dự án; sáu bước tư duy, ví dụ cá nhân để trống |
| Scene 15 / Career | Mục tiêu gần/dài hạn, hình thức/khu vực, CV và ảnh định hướng |
| Scene 16 / Contact | Lời dẫn theo nhánh, email/copy có phản hồi, GitHub/LinkedIn/điện thoại/CV, footer thống nhất |
| Visual identity / Motion / Mobile | Kem–xanh cho Home, kem–nâu cho Personal, xanh đen cho Work; font local; reduced motion; layout 320–1440px |
| Ảnh và dữ liệu | Tập trung trong JSON; ảnh trống có khung giữ chỗ; không tải ảnh hỏng hoặc tạo ảnh sự kiện giả |
| SEO / Routing | HTML tĩnh cho từng route, title/description/OG/canonical riêng, sitemap, robots, custom 404, direct URL và Back |

Next.js, Tailwind, Motion/GSAP trong plan là gợi ý công nghệ. Bản triển khai giữ React/Vite hiện có, dùng CSS, IntersectionObserver, History API và View Transition để đạt cấu trúc và tương tác được yêu cầu. Prerender tạo HTML riêng cho từng URL để có nội dung/metadata khi tắt JavaScript, vẫn giữ cấu hình static Vercel. Không cần thêm server hoặc di chuyển hosting.

Hiệu ứng nghiêng ảnh/parallax tùy chọn chưa áp dụng khi ảnh còn trống. Các animation chính: reveal 650–900ms, hover ảnh 1.02, chuyển route 650–700ms khi trình duyệt hỗ trợ, crossfade timeline/showcase. Hệ điều hành bật giảm chuyển động sẽ tắt animation. Cuộn dùng hành vi native.

## Nguồn và giới hạn nội dung

Xem `CONTENT-NEEDED.md` để biết toàn bộ trường cần bổ sung, đường dẫn ảnh và nguồn repo. README là căn cứ mô tả phạm vi dự án, không là chứng minh độc lập về chất lượng, số liệu hiệu năng hoặc quyền tác giả toàn bộ mã nguồn. Các phần mock/prototype và attribution gốc được ghi rõ.

Không lấy avatar GitHub làm ảnh chân dung. LinkedIn chưa truy cập được nội dung công khai. Chưa ghi học trường nào, có giải thưởng gì hoặc từng làm tại công ty nào khi chưa có xác nhận.

## Kiểm tra

- `npm test`: kiểm tra build/Vercel, routes, metadata, nguồn dữ liệu và các kiểm tra cũ được giữ lại.
- `npm run test:e2e`: kiểm tra trên bản build production với Chrome desktop và mobile; điều hướng không reload, Back, hai nhánh, Việt/Anh, lọc kết hợp, skill evidence, keyboard tabs, case study, clipboard, sticky state, static HTML khi tắt JS, SEO và overflow/accessibility.
- Axe kiểm tra WCAG A/AA trên Home, Work, Personal, Case Study và Contact ở cả hai viewport; đây là kiểm tra tự động, không thay thế kiểm tra thủ công đầy đủ.
- Mở ảnh có chú thích đã được kiểm tra riêng bằng fixture tạm: mở/đóng bằng Escape, giữ focus trong dialog, trả focus về ảnh và khôi phục cuộn; fixture không nằm trong bản build.
- Kiểm tra bổ sung trên viewport 320/390/768/1024 và ảnh chụp desktop/mobile; cần đo lại LCP/CLS trên hosting thực sau khi bổ sung ảnh thật.

Bản này sửa mã nguồn trong repo và tạo `dist/`, chưa push hoặc triển khai web công khai.

### Baseline hiệu năng local

Đo một lượt trên bản production preview bằng Chrome, viewport 390 × 844, CPU throttle 4×, latency 150 ms, download 200.000 byte/s (~1,6 Mbps), không bật reduced motion. Thu thập bằng PerformanceObserver sau khi tải trang:

| Trang | LCP | CLS |
| --- | --- | --- |
| Home | 1,292 s | 0,0066 |
| Work | 1,236 s | 0,0011 |
| Personal | 0,584 s | 0,0805 |

Baseline hiện tại dưới mục tiêu LCP 2,5 s / CLS 0,1 của plan trong điều kiện đo này. Đây không phải số liệu người dùng thực hay bảo đảm sau khi thêm ảnh; cần đo lại trên domain triển khai với ảnh thật.
