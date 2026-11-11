# Khôi phục intro và tăng chuyển động

Yêu cầu mới của chủ portfolio thay thế lựa chọn giảm hiệu ứng ở bản `dd22444`.

- Video gốc `/neural-intro.mp4` tự phát khi mở trực tiếp Home lần đầu trong mỗi tab, tắt tiếng theo chính sách trình duyệt. Bắt đầu chuyển tiếp tại 6,1 giây, hoàn tất khoảng giây thứ 7. Có Bỏ qua, Tạm dừng/Tiếp tục, âm thanh và nút phát lại trên Home.
- Dùng khóa phiên `ptd-neural-intro-v2-seen` để người đã xem phiên bản cũ cũng được xem intro được khôi phục một lần. Refresh trong cùng tab không lặp video. Link tới chương cụ thể, Simple view, tiết kiệm dữ liệu và OS reduced motion bỏ qua tự phát. Khi script/video lỗi vẫn có cơ chế mở trang.
- Thêm lại luồng sáng và linh vật ở hai mép trang trên mọi route. Không có phần tử tương tác trong lớp trang trí, không che click hay làm tràn ngang. Dừng khi mở menu/modal hoặc tab bị ẩn; reduced motion/Simple view ẩn hoàn toàn.
- Work: tín hiệu ánh sáng và vòng quỹ đạo trong sơ đồ; mask reveal cho hình dự án; ánh sáng lướt và tiêu đề dịch nhẹ khi hover. Chuyển động liên tục chỉ nằm trong sơ đồ nhỏ hoặc lề trang.
- Personal: mở ảnh từ cạnh, lật thẻ, xòe ảnh, nghiêng ảnh và mở từ giữa dựa trên cuộn tự nhiên. Góc nhỏ hơn trên mobile; focus bàn phím làm phẳng ảnh. Timeline desktop thêm xoay nhẹ vào crossfade.
- Chuyển trang: thêm dịch chuyển theo hướng Work/Personal, giữ shared media transition và header ổn định. Reduced motion bỏ qua transform.
- Giữ tối ưu của bản trước: thanh tiến độ cập nhật transform trực tiếp, biến tiến độ Work không kế thừa, header tối không blur, không có vòng requestAnimationFrame chạy khi trang đứng yên (animation CSS do trình duyệt quản lý).

`expressive-motion.css` là lớp tăng chuyển động; `ambient-motion.css` chỉ quản lý trang trí ở lề, không gắn chuyển động Work vào đó.

Số đo trong `docs/redesign/DELIVERY.md` là của bản redesign trước khi khôi phục hiệu ứng. Kết quả kiểm tra và đo lại cho bản này được ghi dưới đây sau khi hoàn tất.

## Kiểm tra

- Build thành công, prerender 28 trang; lint đạt; 34 test tự động đạt.
- 54 kiểm tra trình duyệt về intro, Work/Personal, gallery, shared transition, Back, bàn phím và reduced motion đạt trên desktop/mobile. 8 kiểm tra ambient bổ sung đều đạt, gồm pause khi mở ảnh, tiếp tục sau Escape và ẩn khi bật Simple view/reduced motion.
- Đo lại bằng Chrome headless, 1440×900 CPU ×1 và 390×900 CPU ×4, 40ms latency / 10Mbps download, full motion. Ba mẫu tải cho mỗi route, một đoạn cuộn tự nhiên khoảng 3 giây cho mỗi route/viewport. P95 khoảng cách requestAnimationFrame là 16,7–16,8ms, không có khoảng cách vượt 25ms trong các đoạn cuộn đã lấy mẫu.
- Đây là số đo trang **sau khi intro đã được xem**, để kiểm tra chi phí chuyển động khi đọc/cuộn. Lần mở Home đầu tiên có video khoảng 7 giây theo yêu cầu; không dùng số đo sau intro để tuyên bố thời gian vào nội dung lần đầu.
- Kết quả này không phải đo trên mọi thiết bị, không phải INP hoặc Core Web Vitals thực tế. Số liệu gốc: [intro-motion-performance.json](intro-motion-performance.json).
