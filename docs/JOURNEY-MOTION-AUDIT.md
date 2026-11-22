# Rà soát chuyển động xuyên suốt PTD. — 22/11/2026

## Luồng và nguyên tắc

Giữ Home → highlights → Work/Personal → case study → liên hệ, intro video 7 giây và các hiệu ứng ảnh hiện có. Dùng chuyển động có thứ tự trên các lớp bên trong; container tiếp tục sở hữu reveal/hover của nó. Không thêm thư viện, không can thiệp cuộn tự nhiên, không thêm vòng JavaScript chạy liên tục khi trang đứng yên.

## Thay đổi theo trang

| Vị trí | Chuyển động / cải tiến |
| --- | --- |
| Điều hướng chung | Chỉ báo lựa chọn trượt bằng transform; có shared snapshot riêng khi chuyển Work/Personal để header đứng yên mà chỉ báo vẫn di chuyển. Đổi thành rail dọc trên mobile. Menu mobile xuất hiện lần lượt, nhịp cách nhau 35ms. Đo bằng tọa độ layout để không lệch theo animation của chữ. |
| Home | Tiêu đề và lời dẫn section lệch nhịp nhẹ; hai lựa chọn câu chuyện vào lần lượt. Parallax chân dung chỉ nghe pointer trong hero, khi hero còn trong viewport; về trung tính khi rời hero/ẩn tab. |
| Work | Bốn node luồng xử lý vào tuần tự 60ms; giữ tên dự án xuất hiện một lần và layout card sạch. Reveal bắt đầu trước mép viewport 72px, tránh đổi trạng thái sát cạnh. |
| Tab năng lực | Rail trượt 420ms; bài toán → cách tiếp cận → đầu ra → CTA xuất hiện lệch nhịp 55–145ms. Giữ footprint panel ổn định, bàn phím và inert của panel ẩn. |
| Personal | Tiêu đề chương reveal khi tới vùng đọc; caption ảnh sticky đổi mềm khi chương đổi. Giữ nguyên bảy kiểu chuyển ảnh theo cuộn và sáu kiểu chuyển trong gallery. |
| Case study | Rail mục lục theo phần đang đọc; mô tả node kiến trúc chuyển nhẹ khi thay lựa chọn. Giữ shared image transition khi mở từ card. |
| Contact | Đường nối mở từ chữ PTD. ra hai phía, tiếp theo là nội dung và cụm liên hệ. |

CSS mới: `journey-motion.css`, được import sau các lớp hiện có. Chuyển động mới có đích dừng; full motion giữ lớp ánh sáng/linh vật ở lề trang. Simple view và OS reduced motion bỏ animation mới, rail cập nhật ngay.

## Sửa tính ổn định và khả năng truy cập

- Đổi reduced motion giữa lúc native View Transition chờ snapshot chỉ hủy phần chuyển động, không vô hiệu hóa callback cập nhật route. URL và trang hiển thị vẫn khớp nhau.
- Nếu snapshot không tạo được, đợi cập nhật DOM rồi dùng fallback WAAPI; kiểm tra version để một điều hướng cũ không ghi đè điều hướng mới.
- Observer reveal chỉ quét main, gộp các mutation trong một frame; bỏ theo dõi node đã tháo. Khi focus bàn phím vào nội dung, các ancestor reveal mở ngay.
- Gallery phân biệt pointer: chạm hai ngón/pinch không bị hiểu thành swipe đổi ảnh. Sau khi thả hết ngón, swipe một ngón tiếp tục hoạt động. Không chặn pinch zoom native.
- Khi modal unmount, hủy exit animation và không gọi callback đóng đã hết vòng đời; giữ focus trap, Escape và trả focus về ảnh gốc.
- Chỉ báo trang trí không nhận pointer, không thêm tab stop; đo lại sau đổi ngôn ngữ, font và kích thước viewport. Đặt vị trí đồng bộ trước native snapshot, chỉ dùng RAF cho resize/font.
- Thay blur toàn viewport sau modal bằng lớp nền tối sâu hơn. Phép đối chiếu trong cùng browser chỉ ra blur gây vẽ lại nền khi đổi ảnh; sáu hiệu ứng gallery vẫn được giữ.

## File chính

- Thêm `src/components/editorial/MotionIndicator.jsx`, `journey-motion.css`.
- Tích hợp vào `src/App.jsx`, `Capabilities.jsx`, `CaseStudy.jsx`, `Personal.jsx`, `src/main.jsx`.
- Sửa `useRouteTransition.js`, `useWorkMotion.js`, `src/lib/useSiteMotion.js`, `GalleryStage.jsx`, `Shared.jsx`.
- Thêm kiểm tra hành vi `tests/e2e/journey-motion.spec.js`: rail, keyboard, VI/EN, resize, đổi reduced motion khi snapshot đang chờ, fallback lỗi snapshot, focus reveal và đa điểm chạm.
- Thêm `scripts/measure-journey.cjs` để đo khoảng cách rAF trong chuyển trang, đổi tab và đổi ảnh trên preview production. Script ghi kết quả vào `/tmp/ptd-redesign/`.

## Kiểm tra chức năng

- `npm run lint`: đạt.
- `npm run build`: đạt, prerender 28 trang. Các lượt E2E tiếp theo cũng tự build lại trước khi chạy.
- `npm test`: 34/34 đạt.
- `npm run test:e2e`: 139 đạt, 1 bỏ qua theo cấu hình vì ca sticky timeline chỉ dành cho desktop.
- 12 ca journey mới (6 hành vi × 2 viewport) nằm trong lượt E2E toàn bộ; nhánh lỗi snapshot còn kiểm tra promise `finished` bị từ chối và không có unhandled rejection.
- Kiểm tra gồm desktop 1440×1000 và mobile 390×844; capability còn được kiểm tra ở 320px, đổi VI/EN và resize sang 820px. Có kiểm tra axe, tràn ngang, link CV/social, 23 case study, Back/Forward, focus, intro tự kết thúc/bỏ qua/lỗi video, ảnh tải chậm/lỗi, reduced motion và Simple view.

## Đo hiệu năng trên bản production cuối

Môi trường: Chrome **157.0.8103.38 headless**, preview local; full motion. Desktop 1440×900 CPU ×1; mobile giả lập 390×900 CPU ×4. Mạng giả lập latency 40ms, download 10Mbps, upload 2Mbps. Các lần đo chạy tuần tự, không đồng thời với E2E.

**Cuộn:** 3 lần tải mới cho mỗi route/viewport, tắt cache; lấy một đoạn cuộn native khoảng 3 giây trên Home, Work, Personal và MedTutor. Tổng 1.482 khoảng cách rAF; P95 của cả 8 đoạn là **16,7–16,8ms**. Có 3 khoảng vượt 25ms ở Work mobile; các đoạn khác không có. Median LCP của các route trong cấu hình này là 248–508ms; CLS lớn nhất trong 24 lần tải full motion là khoảng 0,00081.

**Tương tác:** một chuỗi cho mỗi flow/viewport, cùng CPU/network như trên, cache mặc định của browser. Khoảng cách rAF trong toàn bộ thao tác:

| Flow | Viewport | P95 | Lớn nhất | Khoảng >25ms / tổng |
| --- | --- | --- | --- | --- |
| Home → Work → Personal → Home | 1440 | 33,3ms | 83,4ms | 8 / 138 |
| Đổi tab năng lực ×4 | 1440 | 16,7ms | 16,8ms | 0 / 128 |
| Sáu chuyển ảnh gallery | 1440 | 16,8ms | 33,4ms | 2 / 297 |
| Home → Work → Personal → Home | 390, CPU ×4 | 16,7ms | 233,3ms | 5 / 125 |
| Đổi tab năng lực ×4 | 390, CPU ×4 | 16,8ms | 16,8ms | 0 / 133 |
| Sáu chuyển ảnh gallery | 390, CPU ×4 | 16,7ms | 16,8ms | 0 / 302 |

Trước khi sửa backdrop, cùng flow gallery desktop có median **49,9ms**, P95 **50,1ms**, 115/130 khoảng vượt 25ms. Sau sửa: median **16,7ms**, P95 **16,8ms**, 2/297 khoảng vượt 25ms. Phép thử đối chiếu chỉ tắt blur bằng CSS cũng đưa P95 về 16,8ms; chỉ thêm layer hints mà giữ blur vẫn có P95 50,1ms. Vì vậy bản cuối thay nền modal, giữ nguyên các hiệu ứng chuyển ảnh.

Chuyển route vẫn có khung chậm lúc chuẩn bị snapshot/cập nhật trang, rõ nhất ở CPU ×4. Không tuyên bố mọi thao tác đều đạt 60 FPS. rAF là chỉ báo nhịp callback trong lab, **không phải** phép đo GPU presentation FPS, INP hay Core Web Vitals người dùng thật. Chưa thử trên Safari/Firefox hoặc điện thoại vật lý.

Các phép đo tải/cuộn thực hiện **sau khi intro đã được xem**. Lần vào Home đầu tiên vẫn có video khoảng 7 giây theo yêu cầu; không dùng LCP sau intro để đại diện thời gian vào nội dung lần đầu.

- Bundle cuối: JavaScript 413.047 bytes, gzip 123.168 bytes; CSS 193.172 bytes, gzip 35.753 bytes. Không thêm dependency.
- Rà responsive bổ sung ở 1440 / 820 / 390 trên 4 route: không lỗi JavaScript hoặc tràn ngang. Đã xem ảnh chụp full motion của capability và lightbox trên desktop/mobile: ảnh giữ tỉ lệ, controls rõ và không tràn.
- Kiểm tra native animation thực tế thấy `-ua-view-transition-group-anim-site-selection`: chỉ báo header được browser tween riêng trong shared transition.
- Số liệu gốc, cấu hình và đối chiếu trước/sau: [journey-motion-performance.json](journey-motion-performance.json). Tái đo: chạy preview production trên port 4176, sau đó lần lượt `node scripts/measure-experience.cjs`, `node scripts/measure-journey.cjs`; không chạy đồng thời với E2E/build.

## Nội dung thật có thể bổ sung tiếp

Không cần thêm ảnh để chạy các chuyển động này. Các phần ưu tiên để portfolio giàu minh chứng hơn:

1. Screenshot/output thật cho **LLMFeed/DPOTM, AdverTest, MedTutor, ParkingAI**. Hiện `projects[].media.cover/gallery/video` vẫn trống; luồng xử lý hiện tại lấy từ tài liệu dự án.
2. Kết quả đo có điều kiện thử nghiệm, bài học và giới hạn thật cho từng dự án (`metrics`, `lessons`, `nextSteps`). Chỉ điền khi có thông tin xác nhận.
3. Ảnh chứng nhận VinUni, ngày hoàn thành và đường dẫn xác minh nếu có (`training`). Trạng thái đã hoàn thành được giữ nguyên.
4. Có thể bổ sung một chân dung/ảnh liên hệ khác để giảm việc dùng lại `anhcanhandep.jpg`. Đây là lựa chọn biên tập, không phải ảnh bị thiếu hay link hỏng.

Các dữ liệu trống tiếp tục được giữ trong cấu hình và ẩn khỏi giao diện công khai.
