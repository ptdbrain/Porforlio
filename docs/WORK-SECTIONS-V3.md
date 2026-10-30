# Work sections V3

Theo `newidea2.md`, bản này chỉ thay hai khu vực trên Work. Personal, navbar, route, theme chung và các project world được giữ nguyên.

## Thay đổi

- **From Idea to Reality** thay manifesto chữ lớn bằng bốn bước Explore, Experiment, Build, Improve trên một đường SVG liên tục. Desktop chạy hiệu ứng vẽ đường, hiện node và tín hiệu một lần khi vào màn hình. Mobile dùng đường dọc đo theo vị trí node, kể cả khi mở ví dụ. Có thao tác hover, focus, chạm và Escape; ví dụ trích từ các trường nội dung repo hiện có.
- **Selected Works** thay orbit cũ bằng một sân khấu chung cho MedTutor, FutureVLA và LabGuard. Metadata nằm dưới ảnh, có nút trước/sau, bộ đếm, tiến trình, chọn tên dự án, phím mũi tên/Home/End và vuốt ngang. Cuộn trang không đổi dự án. Liên kết archive và case study luôn sẵn có.
- Bỏ menu skills sáu nhóm chữ lớn khỏi Work. Selected Works nằm ngay sau process tại vị trí gallery cũ, tránh thêm một gallery trùng. Giữ anchor `#manifesto`, `#selected-work` và alias `#skills`.
- Simple view và reduced motion hiển thị nội dung tĩnh. Không thêm thư viện, scroll pin hoặc scroll hijack. Nội dung chính vẫn được prerender.

## Nội dung bạn có thể bổ sung

Các trường chưa có bằng chứng vẫn để trống; không tạo ảnh hoặc số liệu giả.

1. **Ảnh thật cho ba dự án:** đặt file trong `public/images/projects/`, điền `media.cover` và `media.alt` của dự án tương ứng trong `src/content/portfolio.json`. Dùng đường dẫn như `/images/projects/medtutor.webp`. Khuyến nghị ảnh ngang, khoảng 1600 px, WebP/AVIF được tối ưu dung lượng. Khi chưa có ảnh, sân khấu dùng typography ghi rõ ảnh sẽ bổ sung.
2. **Video demo nếu có:** có thể thêm `media.previewVideo` trỏ tới video thật. Video dùng native controls, không tự chạy; hiện tại chưa có video nào được điền. Có thể chỉ dùng ảnh.
3. **Vai trò cá nhân, kết quả và mốc dự án:** bổ sung các trường song ngữ trong `portfolio.json` khi đã xác nhận. Năm đang hiển thị là mốc repo, không tự coi là thời gian thực hiện dự án.
4. **Nội dung process:** chỉnh heading, mô tả và tham chiếu ví dụ trong `src/content/workSections.json`. Mỗi ví dụ tham chiếu một `slug` và trường nội dung thật của dự án.

Những mục còn thiếu trước đây (CV, ảnh cá nhân, chứng nhận và thông tin cá nhân) tiếp tục theo [CONTENT-NEEDED.md](CONTENT-NEEDED.md).

## File chính

- `src/components/cinema/ProcessFlow.jsx`, `SelectedWorks.jsx`, `useSectionEntrance.js`
- `src/content/workSections.json`
- `work-sections.css` (style riêng của hai section)
- `src/components/editorial/Work.jsx` (ghép section), `src/main.jsx` (import CSS)

Chạy `npm run lint`, `npm test`, `npm run test:e2e` và `npm run build` để kiểm tra. Không tự commit hoặc triển khai website trong bản cập nhật này.
