# Work: ưu tiên mô tả công việc theo bốn mảng

Bốn nhóm hiện có trở thành cấu trúc chính: RAG & LLM, Computer Vision, Backend & dữ liệu, Nghiên cứu & tối ưu. Mỗi nhóm trình bày phạm vi, ba trách nhiệm cụ thể và đầu ra. Danh sách công nghệ riêng trong panel được bỏ; kỹ thuật chỉ xuất hiện trong ngữ cảnh phần việc.

Danh mục dự án được thu lại mặc định dưới “Xem công việc qua dự án”. Khi cần minh chứng, người xem mở danh mục hoặc dùng nút “Xem dự án liên quan” trong một mảng. Danh mục chuyển từ lưới card sang các hàng gọn gồm tên, vai trò và link case study. Bỏ dropdown công nghệ cùng bộ lọc nhóm lặp lại; vẫn có tìm kiếm tùy chọn và truy cập đủ 23 dự án.

Giữ bốn dự án featured, kinh nghiệm, routes, CV, VI/EN và chuyển động hiện có. Trạng thái mở danh mục, tìm kiếm, mảng đang xem, vị trí cuộn và focus được lưu khi quay lại từ case study. Link trực tiếp `/work#archive` mở danh mục. Bộ lọc công nghệ cũ trong history được xóa ở lớp UI để không có bộ lọc vô hình.

File chính:

- `src/content/workV4.mjs`: mô tả trách nhiệm song ngữ và copy.
- `src/components/editorial/Capabilities.jsx`: trình bày công việc thay cho hàng kỹ thuật.
- `src/components/editorial/Work.jsx`: danh mục thu gọn, danh sách dự án và khôi phục trạng thái.
- `src/lib/workV4.mjs`: lưu trạng thái mở danh mục.
- `work-scope.css`, `src/main.jsx`: layout desktop/mobile và micro-interaction mở/đóng.
- Các kiểm tra Work/library được cập nhật theo luồng mới; thêm kiểm tra bốn nhóm, danh mục tùy chọn, mở minh chứng theo nhóm và đóng bằng bàn phím.

Kiểm tra: lint đạt; build/prerender 28 trang đạt; 34 kiểm tra dữ liệu đạt; E2E 141 đạt, 1 bỏ qua vì chỉ dành cho desktop. Đã kiểm tra bố cục tại 1440/820/390, không lỗi JavaScript hoặc tràn ngang; E2E bao gồm 320px, VI/EN, keyboard, reduced motion, Back và khôi phục focus/tìm kiếm.
