# Rà soát user flow và tối ưu UX — 01/11/2026

Đã rà luồng intro → Home → Work / Personal → case study → liên hệ; gồm chuột, bàn phím, mobile, chuyển ngôn ngữ, URL trực tiếp, Back/Forward, nội dung prerender và chế độ giảm chuyển động.

Các ảnh, câu chuyện cá nhân, vai trò chưa có nguồn và số liệu chưa được cung cấp vẫn để trống. Danh sách bổ sung theo ưu tiên ở [ASSETS-CONTENT-CHECKLIST.md](ASSETS-CONTENT-CHECKLIST.md).

## Những điểm đã xử lý

| Khu vực | Thay đổi và lý do |
|---|---|
| Intro → Home | Home được reveal cùng lúc video fade; animation hero chờ tới lúc reveal, tránh fade về màn hình tối rồi xuất hiện đột ngột |
| Intro tải lỗi | Giới hạn chờ bắt đầu 4,5 giây; kẹt tải sau khi đã chạy 2,5 giây thì chuyển tiếp. Có guard mở nội dung prerender nếu script app không chạy |
| Tùy chọn motion | Simple view áp dụng cả Home/Personal/modal. Không tải intro khi reduced motion, Simple view đã lưu, Save-Data hoặc mở Home bằng fragment |
| Tab nền | Video dừng hình/tiếng khi tab ẩn, tiếp tục khi quay lại; CSS animation cũng tạm dừng |
| Bàn phím intro | Tab/Shift+Tab ở trong điều khiển; Escape bỏ qua; trả focus về main khi hoàn tất |
| Menu mobile | Focus link đầu khi mở; Escape trả focus về nút menu; đóng khi click/tab ra ngoài hoặc resize sang desktop; menu dài có vùng cuộn riêng |
| Scroll / fragment | Phân biệt mở một đoạn mới với khôi phục lịch sử. Back/Forward giữ vị trí đã lưu, deep link chỉnh lại sau khi font sẵn sàng |
| Mục lục | Chuyển focus tới đoạn được chọn, giúp thao tác bàn phím tiếp nối ở đúng nội dung |
| Chuỗi case study | Mang context Work qua các lần xem dự án tiếp theo; quay lại giữ bộ lọc, trạng thái mở rộng, scroll và card xuất phát |
| Route transition | Fade khoảng 180/320 ms, shared transition khoảng 480 ms; bỏ chuyển cảnh cũ khi có yêu cầu mới |
| Home | Hover dùng transform/shadow nhỏ; hai lựa chọn giữ kích thước để chữ không reflow |
| Personal | Thành tích xếp 3 cột desktop, 2 cột tablet, 1 cột mobile; giữ mọi ô ảnh để bổ sung sau. Timeline theo dõi tất cả chương đang nhìn thấy và giảm khoảng trống tối thiểu |
| Case study | Tăng cỡ chữ/vùng bấm, số mục lục hai chữ số; bỏ thông báo đo lường trống lặp lại sau kết quả narrative |
| Kiến trúc | Nút có aria-pressed/aria-controls và mô tả live; grid responsive và chữ rõ hơn |
| Modal | Nền inert, giữ focus, Escape/click nền để đóng; trả focus về đúng nút mà không đổi scroll. Callback không làm reset focus khi render lại |
| Ảnh bổ sung sau | Ảnh lỗi trở về khung chờ và bỏ nút lightbox hỏng. Hỗ trợ fit/position; chứng nhận VinUni mặc định contain |
| Contact | Có h1 trên route liên hệ riêng, dùng h2 khi nằm trong trang khác |

## Chuyển động

Reveal dùng IntersectionObserver, opacity và translateY khoảng 14 px trong 480–520 ms, chạy một lần. Intro giữ đoạn đầu khoảng 7 giây; bắt đầu hòa cảnh ở mốc khoảng 6,1 giây và tiếp tục phát hình trong 900 ms chuyển tiếp. Home được chuẩn bị hoàn chỉnh phía dưới, không fade cả hai lớp về nền tối hoặc chạy lại animation hero khi gỡ intro. Âm lượng giảm dần nếu bật tiếng. Bỏ qua/lỗi tải dùng chuyển tiếp nhanh khoảng 260 ms. `scrollbar-gutter: stable` giữ bề rộng bố cục khi mở khóa cuộn. Panel năng lực Work giữ chiều cao ổn định và đổi trong khoảng 220 ms. Modal hiện khoảng 220 ms. Hover không đổi chiều rộng card.

Khi tab ẩn, animation pause và video dừng. Reduced motion/Simple view giữ nguyên thao tác nhưng tắt các chuyển động tương ứng. Thanh đọc dùng requestAnimationFrame; ghi vị trí lịch sử có throttle 500 ms và cập nhật khi scroll kết thúc.

## Kiểm tra

- Lint đạt; **34 unit đạt**.
- E2E Chrome desktop/mobile: **75 đạt, 1 bỏ qua theo thiết bị**. Có kiểm tra video kết thúc tự nhiên, skip, tải kẹt, mất script app, Simple view, deep link, menu/modal, chuỗi case và trạng thái thư viện.
- Build prerender đủ **28 trang**, giữ metadata, sitemap và trang 404.
- **280 lượt rà**: 28 URL × 2 ngôn ngữ × 5 kích thước 320/390/768/1024/1440; không thấy tràn ngang, ID trùng, lỗi JavaScript hoặc trang thiếu h1.
- **66 audit tự động WCAG A/AA** trên mọi URL ở desktop và các luồng chính ở mobile: không có violation trong bộ rule đã chạy.
- Đã xem screenshot Home, Work, Personal, case study, Contact desktop/mobile và grid thành tích.
- Đã thử ảnh mẫu tạm thời: contain, lightbox, focus và fallback ảnh lỗi đều hoạt động; không thêm ảnh mẫu vào dữ liệu thật.

Đây là kiểm tra local bằng Chrome, chưa phải phép đo FPS trên điện thoại thật hoặc xác minh quyền xem các trang bên ngoài. Khi có ảnh/video và nội dung cuối cùng cần rà thêm dung lượng, crop, alt text, độ dài copy và các nguồn được phép chia sẻ.

## File chính

`src/App.jsx` xử lý route, menu, history, scroll, focus và intro reveal. `src/lib/useSiteMotion.js` điều phối reveal dùng chung. Các component NeuralIntro/Shared/Personal/CaseStudy chứa sửa đổi theo luồng. `ux-polish.css` được đọc sau stylesheet hiện có. Regression mới nằm tại `tests/e2e/user-flow.spec.js`.
