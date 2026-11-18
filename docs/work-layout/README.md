# Làm gọn dự án và thay bố cục năng lực

- Featured Work chuyển sang grid hai cột thẳng hàng, một cột trên mobile. Tên dự án chỉ xuất hiện một lần ở đầu card.
- Bỏ poster chứa lại tên/stack trong preview; thay bằng luồng xử lý HTML gọn, lấy trực tiếp từ pipeline của dự án. Ảnh hero, trang case study và ảnh social vẫn dùng dữ liệu hiện có.
- Mỗi card theo thứ tự: tên/mô tả → luồng xử lý → vai trò/CTA → công nghệ. Bốn card có cùng chiều cao trong mỗi hàng.
- Phần “Từ bài toán đến phần việc cụ thể” dùng danh sách chọn dọc bên trái và một panel bên phải. Panel trình bày bài toán, ba bước tiếp cận, đầu ra và kỹ thuật.
- Giữ bộ lọc dự án liên quan, trạng thái khi Back, shared transition, VI/EN, reduced motion và keyboard. Bổ sung Up/Down cho danh sách dọc; Left/Right và Home/End vẫn hoạt động.

## Kiểm tra

Lint, build/prerender và 34 test tự động đạt. Nhóm Work/portfolio/redesign: 59 test trình duyệt đạt, 1 bỏ qua theo thiết kế mobile. 4 test bổ sung xác nhận tên dự án không lặp và bàn phím cho layout dọc. Kiểm tra hình hiển thị 1440/820/390px không tràn ngang; test ổn định panel 320px cho cả VI/EN vẫn đạt. Không đo lại FPS trong thay đổi bố cục này.

## Xem trước

| Phần | Desktop | Mobile |
| --- | --- | --- |
| Dự án | [Xem](featured-1440.png) | [Xem](featured-390.png) |
| Năng lực | [Xem](capabilities-1440.png) | [Xem](capabilities-390.png) |

Mã chính: `FeaturedProjects.jsx`, `ProjectVisual.jsx` (variant `flow`), `Capabilities.jsx`, `Work.jsx`, `work-layout.css`.
