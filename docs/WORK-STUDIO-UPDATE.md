# Work 2.0 — The Build Studio

Áp dụng `newidea2.md` cho `/work` và cách trình bày case study. Home và Personal giữ triết lý “One Person. Two Stories.” / visual diary. Các trường còn thiếu được giữ trống theo yêu cầu trước.

## Đối chiếu W01–W10

| Scene | Kết quả |
| --- | --- |
| W01 / Hero | Typography toàn chiều ngang, mask theo dòng, ba preview liên kết tới case study; Projects tới thư viện trong một thao tác, CV giữ trạng thái chờ file thật |
| W02 / Capability map | Bento chọn/mở được bằng chuột, touch và keyboard; số repo chính xác, liên kết tới implementation, highlight các build liên quan; không tự cuộn trang |
| W03 / Featured | MedTutor full-bleed có reveal giới hạn; ParkingAI blueprint node/drawer và đường nối; LabGuard reel bốn tab, previous/next, phím mũi tên, touch swipe; không autoplay |
| W04 / Library | Nền sáng lạnh; nhóm danh mục từ dữ liệu, tìm kiếm không phân biệt dấu Việt, lọc stack kết hợp, load more; role/year/status/case study rõ ràng; FLIP reflow 300ms khi không bật reduced motion |
| W05 / Inside the Build | Ba case note kiến trúc từ repo. Dùng phương án dự phòng của brief vì chưa có dữ liệu quy trình thử nghiệm cá nhân đủ đầy; không dựng năm bước với quyết định hay metric suy đoán |
| W06 / Experience | Hồ sơ accordion, Challenge/Contribution/Evidence, phân loại hoạt động, xếp theo sortDate khi có; LabGuard là nhóm dự án, không gắn thành việc làm ở công ty. Chứng nhận VinUni được đặt riêng đúng nhãn đào tạo |
| W07 / Skills × Evidence | Ma trận công nghệ–dự án trên desktop; các điểm dẫn tới implementation; caption mô tả phạm vi repo. Tablet/mobile dùng accordion kỹ năng và danh sách dự án |
| W08 / Lab | Ba nhóm Learning/Building/Experimenting; ghi chú mở được, slot ảnh, trạng thái thật; không hiện ngày cập nhật khi chưa có dữ liệu |
| W09 / Next Mission | Hai hướng gần/dài hạn, đường nối tĩnh; “Open to” chỉ hiện khi có nội dung và ngày xác nhận; CV chờ bổ sung |
| W10 / Contact | Email/copy, GitHub, LinkedIn, CV và liên kết “Gặp con người phía sau những bản build” sang Personal |

## Case study

Đổi từ nội dung có mục lục trái sang bài đọc sản phẩm rộng toàn trang, mục lục inline. Pipeline vẫn chọn được. Gallery được đặt ở Implementation, dùng mosaic. Technical decisions, alternatives, trade-offs, failed experiments và next steps là module theo dữ liệu, chỉ hiện khi có nội dung thật. Metadata HTML tĩnh/OG/canonical và direct URL tiếp tục được giữ.

## Nội dung và giới hạn

- Ba featured vẫn là prototype, không được nâng nhãn thành shipped vì đổi thiết kế. Ảnh chưa cung cấp là khung trống.
- LabGuard có vai trò Product Owner / spec & impact được README nhóm ghi rõ. Hồ sơ nhóm liên kết trực tiếp đến README; chưa thêm thời gian hoặc số liệu tác động.
- Chưa có nội dung đáng tin cậy cho Speech AI nên không đưa nhóm đó vào bento/category.
- Các node blueprint tóm tắt pipeline thật; không minh họa số lượng request, latency hay kết quả không được đo.
- File CV đang trống: các vị trí đã sẵn sàng nhận URL nhưng không tạo link tải giả.

Xem [CONTENT-NEEDED.md](CONTENT-NEEDED.md#bổ-sung-cho-work-studio-newidea2md) để điền ảnh và dữ liệu mới.

## Mã nguồn

- `src/components/work/`: mỗi scene một component, reusable project facts/meta/links.
- `src/components/editorial/Work.jsx`: ghép các scene, trạng thái capability.
- `src/content/studio.json`, `studioCopy.js`: dữ liệu/nhãn Việt–Anh cho studio.
- `src/content/portfolio.json`: giữ nội dung dự án/Personal và nguồn chứng minh; bổ sung các field case study tùy chọn.
- `src/lib/studio.mjs`: lọc/tìm kiếm và liên kết capability.
- `work-studio.css`: palette #0B111B / #75C8FF, nền sáng #F3F7FB, responsive, reduced motion. Không thêm GSAP/3D hoặc server mới.

## Kiểm tra

Các kiểm tra trình duyệt bao phủ điều hướng/Back, i18n, HTML prerender, library, capability, node drawer, reel tabs/keyboard/touch, accordion, skill matrix/mobile evidence, lab notes và cross-link Personal. Axe kiểm tra WCAG A/AA trên năm trang chính ở desktop/mobile. Rà soát riêng kích thước 320/390/768/1024/1440 ở cả Việt/Anh; không có tràn ngang trang. Bộ lọc mobile có vùng cuộn riêng và chỉ dẫn.

Chuyển động có giảm chuyển động, không scroll hijacking, không sticky image/text trong Work. Không triển khai ra hosting trong lần cập nhật này.

Kết quả kiểm tra lần cập nhật: **26 kiểm tra mã nguồn/build đạt; 42 kiểm tra trình duyệt đạt**, hai trường hợp bỏ qua đúng theo thiết bị (sticky timeline chỉ ở desktop; touch gesture chỉ ở mobile). Các phần skills/dossier/Work accessibility được kiểm tra lại sau chỉnh nội dung. Đã thử thêm chế độ chuyển động bình thường: headline, node reveal, filter animation và accordion; không có lỗi runtime.
