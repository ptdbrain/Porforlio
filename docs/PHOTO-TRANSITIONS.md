# Thêm chuyển động ảnh và gallery

## Kiểu chuyển ảnh

- Personal khi cuộn: mở rèm từ giữa, mở vòng tròn, màn trập, lật trang, xoay ảnh, zoom và cắt chéo; phân bố theo collage, timeline mobile, ảnh thành tích và thư viện thể thao.
- Home/Work: card dự án mở bằng rèm, đường chéo, vòng tròn hoặc nghiêng theo chiều sâu. Focus bàn phím hiển thị ảnh ngay.
- Gallery khi bấm next/previous: trượt ngang, lật trang 3D, mở vòng tròn, mở rèm, zoom và xoay nghiêng. Hai lớp ảnh dùng chung một khung, giữ nguyên tỷ lệ bằng `object-fit: contain`.
- Có thể vuốt ngang trên điện thoại, dùng phím ←/→, Escape và các nút điều hướng. Không tự động chạy ảnh. Chạm dọc vẫn cuộn; pinch zoom không bị biến thành thao tác chuyển ảnh.

## Ảnh được chuyển như thế nào

`useImageSequence.js` giữ ảnh đang xem cho đến khi ảnh mới tải và decode xong. Mỗi yêu cầu có số thứ tự: một ảnh tải chậm không được thay thế lựa chọn mới hơn. Có tối đa hai lớp trong chuyển cảnh; lớp cũ được gỡ sau hiệu ứng. Khi ảnh lỗi, giữ ảnh hiện tại, thông báo lỗi và vẫn cho phép chuyển ảnh khác.

`GalleryStage.jsx` quản lý khung hình, lớp ảnh cũ/mới và thao tác vuốt. `Shared.jsx` tiếp tục quản lý modal, focus trap/return và ảnh phóng từ thumbnail. Chứng nhận xoay -90° vẫn được hiển thị đúng chiều; ảnh gốc không bị chỉnh sửa.

`photo-choreography.css` chứa các hiệu ứng bổ sung. Góc và độ mở nhỏ hơn trên mobile. Hiệu ứng cuộn sử dụng observer và requestAnimationFrame hiện có; không thêm loop JavaScript khi trang đứng yên. Simple view/reduced motion hiển thị ảnh trực tiếp và bỏ các lớp chuyển cảnh.

## Kiểm tra

- Lint, build/prerender và 34 test tự động đã đạt.
- Các test luồng hiện có xác nhận intro, gallery, bàn phím, Back và motion preference vẫn hoạt động.
- `photo-transitions.spec.js`: kiểm tra cả 6 kiểu gallery giữ khung ổn định, ảnh chậm không ghi đè lựa chọn mới, tải lỗi vẫn điều hướng tiếp, vuốt và reduced motion.
- `personal-photo-motion.spec.js`: kiểm tra cuộn hai chiều, kích thước khung ảnh, timeline, mobile không tràn ngang và giảm chuyển động.

Không dùng lại số đo hiệu năng của các commit trước làm số đo của bản chuyển ảnh này.

Lượt kiểm tra cuối: 26 test trình duyệt đạt trên desktop/mobile (gallery mới, ảnh Personal và luồng redesign). Đã kiểm tra hình hiển thị giấy chứng nhận xoay đúng chiều và chuyển gallery trong trình duyệt thực. Ảnh chụp kiểm tra tại `/tmp/ptd-new-gallery-certificate.png` và `/tmp/ptd-gallery-book.png`.
