# Work motion

Work giữ bố cục V4, nội dung và luồng chọn dự án hiện tại. Chuyển động dùng navy, cyan và lime của trang; phần kinh nghiệm vẫn có nền kem.

- Khi cuộn xuống hoặc quay lại phía trên, tiêu đề, kinh nghiệm, đào tạo và thẻ dự án trượt nhẹ vào khung nhìn. Các thẻ cùng hàng trên desktop xuất hiện lệch nhau 70 ms; mobile bỏ độ trễ này.
- Sơ đồ hệ thống có các node xuất hiện lần lượt, đường nối được vẽ và tín hiệu chạy liên tục khi sơ đồ nằm trong khung nhìn. Sơ đồ và các vòng trang trí dịch chuyển nhẹ theo vị trí cuộn.
- Đường sáng ở ranh giới các phần mở rộng theo cuộn; vùng sáng nền chuyển động nhẹ, tách biệt khỏi chữ. Nền kem có góc bo để chuyển phần mềm hơn.
- Tab năng lực chuyển nội dung bằng fade/slide ra vào, các cột vào lệch nhịp. Chiều cao của cả khung vẫn theo lớp dài nhất. Lớp không hoạt động lập tức `inert` và `aria-hidden`.
- Chi tiết kinh nghiệm có hiệu ứng mở; thẻ dự án nhấc nhẹ, hiện viền sáng và dịch mũi tên khi hover. Bàn phím vẫn có trạng thái focus rõ ràng.

## Implementation

`src/components/editorial/useWorkMotion.js` quản lý riêng `[data-work-reveal]`, tránh tranh chấp với observer dùng chung của các trang khác. IntersectionObserver theo dõi ra/vào; một requestAnimationFrame gộp các sự kiện cuộn, chỉ đọc tọa độ các section đang thấy. Không có vòng lặp hoạt ảnh JavaScript khi đứng yên; không chặn hay thay thế thao tác cuộn. MutationObserver theo dõi thẻ mới sau lọc/mở rộng, ResizeObserver cập nhật khi mở nội dung kinh nghiệm.

`work-motion.css` chứa các hiệu ứng, được nhập sau stylesheet dùng chung. Simple view, thiết bị yếu và reduced motion bỏ chuyển động. Khi tắt JavaScript hoặc in trang, nội dung vẫn hiện đầy đủ. Hook dọn observer, listener và frame khi rời trang hoặc đổi chế độ; tab trình duyệt ẩn không cập nhật scroll frame.

## Regression checks

`tests/e2e/work-motion.spec.js` chạy desktop/mobile: cuộn ngược, tiến độ theo cuộn, đổi tab nhanh, ổn định chiều cao, thẻ mới sau lọc/mở rộng, giữ focus khi trở về từ dự án, và đổi reduced motion ngay trong phiên.

## Chuyển động liên tục toàn trang

`AmbientMotion.jsx` và `ambient-motion.css` bổ sung đom đóm SVG nhỏ cùng vệt sáng chạy ở hai lề trên Home, Work, Personal, Contact và case study. Work dùng cyan/lime; các trang còn lại dùng vàng ấm. Chu kỳ bay 28 giây, vệt sáng 11–14 giây; chỉ dùng CSS animation, không thêm vòng lặp JavaScript. Mobile giảm kích thước và bỏ hạt sáng phụ. Lớp trang trí không nhận pointer/focus và ẩn với screen reader.

Simple view có trên menu mọi trang, tắt toàn bộ lớp này. Reduced motion/thiết bị yếu cũng tắt; tab ẩn, menu mở hoặc modal mở tạm dừng. Video intro, bản in và màn hình thấp dưới 420px không hiển thị lớp này. `tests/e2e/ambient-motion.spec.js` kiểm tra chuyển động liên tục trên các route, nút tắt trên Personal, menu mobile và thay đổi reduced motion trong phiên.
