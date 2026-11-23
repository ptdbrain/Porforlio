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

## Giới hạn chuyển động ở phần dấu mốc

Ảnh thành tích có khung cắt riêng và chỉ dùng một lớp phối cảnh. Hiệu ứng lật ở ảnh đầu đổi từ góc 42° quanh mép sang 16° quanh tâm, kèm thu nhẹ để không phóng lớn ra ngoài khung. Section cũng giới hạn vùng vẽ để ảnh không che hành trình hoặc tiêu đề. Áp dụng cho cả bốn dấu mốc chính và kho lưu trữ.

`usePersonalPhotoMotion.js` dùng smoothstep ở đầu/cuối tín hiệu cuộn để chuyển động bắt đầu và dừng nhẹ hơn. Khung giữ nguyên kích thước; mở ảnh, focus bàn phím và reduced motion vẫn hoạt động.

## Kiểm tra

- Lint, build/prerender và 34 test tự động đã đạt.
- Các test luồng hiện có xác nhận intro, gallery, bàn phím, Back và motion preference vẫn hoạt động.
- `photo-transitions.spec.js`: kiểm tra cả 6 kiểu gallery giữ khung ổn định, ảnh chậm không ghi đè lựa chọn mới, tải lỗi vẫn điều hướng tiếp, vuốt và reduced motion.
- `personal-photo-motion.spec.js`: kiểm tra cuộn hai chiều, kích thước khung ảnh, timeline, mobile không tràn ngang và giảm chuyển động.

Không dùng lại số đo hiệu năng của các commit trước làm số đo của bản chuyển ảnh này.

Lượt kiểm tra sau sửa lỗi ảnh dấu mốc: build/prerender, lint, 34 test và **168/168 test trình duyệt đạt**. Thêm regression kiểm tra ảnh lật không vượt khung khi cuộn xuôi/ngược, không che nội dung phía trên, giữ kích thước và mở/đóng album bằng bàn phím.

Kiểm tra hình ảnh trên Chrome headless ở 390, 820 và 1834px: cả 15 vị trí cuộn giữ ảnh lật trong khung, không tràn ngang hoặc lỗi JavaScript. Ảnh và số liệu lần kiểm tra này ở `/tmp/ptd-milestone-audit/`. Chưa đo FPS cho bản sửa này.
