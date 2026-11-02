# Chuyển động ảnh Personal

Các hiệu ứng dùng trực tiếp ảnh hoặc khung chờ ảnh trong `portfolio.json`, không yêu cầu thêm video hay ảnh biến thể.

| Nhóm ảnh | Chuyển động |
| --- | --- |
| Collage giới thiệu | Các tấm ảnh xòe, xoay ngược chiều xen kẽ rồi ổn định như một cụm ảnh giấy |
| Hành trình desktop | Ảnh chương cũ khép sang trái, ảnh chương mới mở ra bằng chuyển cảnh 3D 950 ms; cuộn ngược đảo chiều chuyển cảnh |
| Hành trình mobile, chứng chỉ | Mở từ cạnh trái như trang sổ; chứng chỉ vẫn dùng `object-fit: contain` |
| Thành tích, hiện tại | Thẻ ảnh ngả lên từ cạnh dưới và mở phẳng |
| Sở thích | Xen kẽ xoay nhẹ, mở từ cạnh và ngả thẻ |
| Thể thao, tương lai | Mở từ giữa ra hai cạnh, ảnh bên trong zoom/dịch chuyển nhẹ |

`usePersonalPhotoMotion.js` đo khung figure cố định rồi cập nhật biến CSS cho `.photo-surface` bên trong. Chuyển động theo vị trí cuộn, đảo được khi cuộn lên; vùng đọc chính giữ ảnh phẳng. IntersectionObserver giới hạn xử lý ở các ảnh gần khung nhìn. Mỗi đợt cuộn được gộp vào một animation frame; không có vòng lặp JavaScript lúc đứng yên. Tab ẩn dừng cập nhật, rời trang dọn toàn bộ observer/listener.

`personal-photo-motion.css` định nghĩa các kiểu `fan`, `hinge`, `flip`, `tilt`, `unfold`. Mobile giảm góc 3D còn 55%. Khi focus ảnh bằng bàn phím, ảnh lập tức trở về trạng thái phẳng để mở lightbox. Simple view/reduced motion và bản in bỏ hiệu ứng. Ảnh chưa có vẫn giữ placeholder; không tạo nội dung thay thế trong dữ liệu.

Kiểm tra tự động trong `tests/e2e/personal-photo-motion.spec.js`: cuộn hai chiều, kích thước bố cục ổn định, timeline chỉ có một lớp ảnh truy cập được, reduced motion đổi trong phiên. Đã kiểm tra thêm bằng ảnh SVG tạm trong bộ nhớ trình duyệt: hiển thị ảnh, mở/đóng lightbox, trả focus về ảnh và giữ toàn bộ chứng chỉ trong khung; không lưu ảnh thử vào portfolio.
