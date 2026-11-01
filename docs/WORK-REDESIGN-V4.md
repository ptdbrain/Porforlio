# Work V4 — Năng lực rõ ràng, bằng chứng có chiều sâu

Kịch bản thiết kế ngày 01/11/2026, đã được triển khai vào route `/work`. Bản phác thảo ban đầu nằm ở `work-v4-preview.html` trong cùng thư mục. Nội dung Việt/Anh ở `src/content/workV4.mjs`, giao diện ở `src/components/editorial/Work.jsx`, style ở `work-v4.css`.

## 1. Câu chuyện của trang

Người xem cần đọc được ba điều trong khoảng 30 giây: Đạt làm việc trong lĩnh vực nào, có thể đảm nhận phần việc gì, và đã có trải nghiệm liên quan ở đâu. Khi muốn kiểm tra sâu hơn, họ chọn một dự án để mở case study.

Luồng mới:

**Giới thiệu cụ thể → Năng lực theo bài toán → Kinh nghiệm & nghiên cứu → Chọn dự án → Liên hệ.**

Mỗi đoạn trả lời một câu hỏi. Các heading và mô tả chính luôn đọc được, kể cả khi chưa tương tác. Animation hỗ trợ chuyển điểm chú ý và thể hiện quan hệ giữa các thành phần.

## 2. Vấn đề cần xử lý từ phiên bản hiện tại

- Hero và section Process dành nhiều diện tích cho thông điệp chung; người xem phải cuộn thêm để biết phạm vi công việc cụ thể.
- Các nhóm skill thiên về liệt kê công cụ, chưa diễn đạt rõ dùng chúng để làm việc gì.
- Đóng góp trong kinh nghiệm đang nằm sau thao tác mở details; thông tin có giá trị nhất cần được đưa ra ngoài.
- Selected Works và Project Index tạo hai lần duyệt dự án. V4 dùng một thư viện duy nhất, mở rộng ngay tại chỗ.
- Future Horizon dài và có trường dữ liệu còn thiếu. Định hướng nghề nghiệp có thể gói thành một câu ở đoạn liên hệ.

## 3. Ngôn ngữ thị giác

Giữ nền navy `#090B10`, màu chữ ngà `#F4F1EC`, xám phụ `#ACB1BD` và lime `#D9FF61` của Work. Cyan chỉ dùng cho tín hiệu trong sơ đồ. Experience là một vùng cream `#F4F1EC` để tạo nhịp nghỉ; phần còn lại giữ nền tối liên tục.

Sora dùng cho heading, Be Vietnam Pro cho nội dung tiếng Việt, IBM Plex Mono cho số thứ tự, thời gian và nhãn kỹ thuật. Heading desktop khoảng 44–72 px, mobile 30–42 px. Nội dung khoảng 15–17 px desktop, 14–16 px mobile. Nhãn nhỏ vẫn cần đọc rõ, hạn chế dưới 11 px.

Grid desktop 12 cột, khung nội dung tối đa 1240–1320 px; lề mobile 20 px. Khoảng cách giữa section khoảng 80–110 px desktop và 52–72 px mobile. Không dành nhiều viewport cho một câu khẩu hiệu.

## 4. Cảnh 01 — Bạn đang xem hồ sơ của ai?

**Thời gian đọc:** 5–8 giây. **Chiều cao:** khoảng 75–90% viewport desktop, chiều cao tự nhiên trên mobile.

Eyebrow: `PHAN TRỌNG ĐẠT / AI & SOFTWARE`

Heading:

> Tôi kết nối dữ liệu,
> mô hình và sản phẩm.

Mô tả:

> Sinh viên Khoa học Máy tính tại HUST. Tôi phát triển pipeline AI, backend và công cụ đánh giá, với mối quan tâm ở NLP, Computer Vision và tối ưu mô hình.

CTA chính: **Xem năng lực** → section 02. CTA phụ: **Tải CV** → PDF hiện có. Liên kết chữ nhỏ **Chọn dự án** phục vụ người muốn đi thẳng tới bằng chứng.

Bên phải là sơ đồ minh họa nhỏ: `Dữ liệu → Mô hình → API → Sản phẩm`. Mỗi nút có nhãn dễ hiểu. Một tín hiệu chạy qua đường nối một lần khi hero hiện, mô tả phạm vi kết nối hệ thống. Sơ đồ không giả làm ảnh sản phẩm hoặc mô tả kiến trúc chung cho mọi repo.

Cuối hero có ba dòng tín nhiệm ngắn, với vai trò rõ ràng:

| Loại | Nội dung |
|---|---|
| Công việc | Software Engineer · GeoIT VNPT · 03–07/2026 |
| Thực tập | AI Intern · BA GPS · 06–12/2024 |
| Nghiên cứu | Đồng tác giả LLMFeed · EMNLP 2026 |

Motion: heading hiện theo cụm dòng, opacity 0→1 và y 16→0 trong 500 ms; mô tả và CTA trễ 80–120 ms. Sơ đồ vẽ đường nối trong 700 ms, tín hiệu đi qua một lượt rồi dừng. Không đếm thành tích hoặc tự sinh số liệu.

## 5. Cảnh 02 — Tôi có thể tham gia phần việc nào?

Heading: **Từ bài toán đến phần việc cụ thể.**

Mô tả: **Bốn hướng tôi đã tiếp cận qua công việc, nghiên cứu và dự án. Chọn một hướng để xem cách làm và loại đầu ra.**

Bốn tab kích thước vừa phải, có tên đầy đủ: **RAG & LLM**, **Computer Vision**, **Backend & dữ liệu**, **Nghiên cứu & tối ưu**. Các tab đều nhìn thấy trên desktop; mobile xếp 2×2, không dùng rail chữ bị cắt.

Panel phía dưới có ba ô thông tin cùng một sơ đồ ngang ngắn. Mỗi lựa chọn chứa:

| Hướng | Phần việc | Kỹ thuật tiêu biểu | Loại đầu ra |
|---|---|---|---|
| RAG & LLM | Tổ chức tài liệu, xây luồng truy xuất và trả lời có nguồn | Chunking, BM25, vector retrieval, RAG evaluation; FastAPI, Qdrant | Prototype hỏi đáp tài liệu, nguồn trích dẫn và bộ đánh giá |
| Computer Vision | Xây pipeline ảnh/video, nối mô hình với ứng dụng và tổ chức kiểm thử | YOLO, OpenCV, OCR, nhận dạng và kiểm thử robustness | Pipeline xử lý, tích hợp thiết bị/API và báo cáo đánh giá trong phạm vi dự án |
| Backend & dữ liệu | Kết nối API, AI worker và luồng dữ liệu bất đồng bộ | Python, FastAPI, PostgreSQL, queue; Kafka/Spark trong repo tương ứng | Backend service, pipeline dữ liệu và giao diện giám sát |
| Nghiên cứu & tối ưu | Triển khai thí nghiệm, so sánh baseline và phân tích đánh đổi | PyTorch, topic modeling, preference optimization, mixed precision | Mã thí nghiệm, cấu hình chạy và báo cáo chất lượng/bộ nhớ |

Mỗi panel kết thúc bằng nút **Xem dự án liên quan**: cuộn tới thư viện và áp dụng bộ lọc. Không mở chi tiết dự án ngay trong phần năng lực. Chỉ hiển thị những công nghệ và đầu ra có nguồn trong CV/repo; nhóm kỹ thuật không được hiểu là phần đóng góp cá nhân trong mọi repo.

Dòng cuối gói cách làm trong một hàng: **Hiểu bài toán → Thử phương án → Kết nối hệ thống → Đánh giá & cải thiện**. Không cần một màn Process riêng.

Motion: tab active có nền/viền đổi nhẹ, panel crossfade 180–240 ms. Giữ chiều cao panel đủ cho nội dung dài nhất để tránh trang nhảy. Khi thao tác liên tiếp, hủy chuyển cảnh cũ và đi thẳng tới lựa chọn mới. Sơ đồ chỉ vẽ một lượt; không có loop chạy liên tục.

## 6. Cảnh 03 — Tôi đã đóng góp ở đâu?

Heading: **Kinh nghiệm đi cùng phần việc thật.**

Nền cream, chữ than; bố cục ba hàng lịch sử công việc. Mỗi hàng có thời gian, tổ chức, vai trò và một câu đóng góp luôn hiển thị:

- **GeoIT VNPT — Software Engineer — 03–07/2026:** Phát triển backend và workflow xử lý dữ liệu địa không gian tích hợp AI.
- **BA GPS — AI Intern — 06–12/2024:** Xây module phát hiện vật thể, khuôn mặt, bàn tay và tối ưu inference cho thiết bị nhúng.
- **Vietnam Robotics Challenge — Developer & Mentor — 2021–2022:** Lập trình robot, tích hợp cảm biến và hướng dẫn đội học sinh.

Link **Xem phạm vi đóng góp** mới mở thông tin bổ sung về bối cảnh, kết quả và nguồn. Các câu trên là bản rút gọn từ CV, không tự thêm KPI hoặc hiệu suất triển khai.

Bên dưới có một dòng nghiên cứu riêng: **LLMFeed · Đồng tác giả thứ hai · EMNLP 2026**. Mô tả ngắn: **Triển khai và đánh giá thực nghiệm cho hướng topic modeling dùng phản hồi LLM.** Có liên kết bài báo và case study.

VinUni AI thực chiến hiển thị thành một dòng đào tạo gọn phía dưới. Giữ trạng thái hoàn thành do người dùng cung cấp; ảnh chứng nhận và mã xác thực chỉ xuất hiện khi có tài liệu thật.

Motion: các hàng hiện opacity và y 10→0, lệch tối đa 60 ms. Không pin section và không biến lịch sử làm việc thành slideshow.

## 7. Cảnh 04 — Chọn dự án để kiểm tra sâu hơn

Heading: **Chọn bài toán bạn muốn tìm hiểu.**

Một thư viện duy nhất. Mặc định hiện sáu dự án có phạm vi đóng góp rõ: **LLMFeed / DPOTM, AdverTest, MedTutor, PRISM, ParkingAI, LabGuard**. Lựa chọn này ưu tiên nội dung CV và các repo người dùng muốn giới thiệu trước.

Mỗi card gồm tên dự án, một câu mô tả bài toán, loại hoạt động/trạng thái, phần việc cá nhân ngắn và link **Đọc case study ↗**. Tối đa 2–3 tag kỹ thuật nếu có tác dụng phân biệt dự án.

Ví dụ MedTutor:

> **MedTutor**
> Hỏi đáp tài liệu y khoa tiếng Việt với nguồn để đối chiếu.
> **Phần việc:** RAG & evaluation
> `RAG` `Retrieval` `Prototype`
> Đọc case study ↗

Card không cần ảnh để có bố cục hoàn chỉnh. Khi chưa có screenshot thật, dùng nền màu và hình học nhỏ có tính trang trí; không đặt khung ảnh trống to, không tạo ảnh giả làm UI sản phẩm.

Desktop ba cột, tablet hai cột, mobile một cột. Bộ lọc theo bài toán và ô tìm kiếm dùng dữ liệu hiện có. Nút **Xem toàn bộ dự án** mở rộng trong cùng thư viện; tổng số lấy động từ data. Khi lọc không có kết quả, hiển thị nút xóa bộ lọc.

Nhấn vào card mới mở route `/projects/<slug>`, giữ các nội dung bài toán, kiến trúc, kỹ thuật, đóng góp, kết quả và nguồn của case study hiện có. Khi quay lại, khôi phục bộ lọc, số card đang mở và vị trí cuộn. Chỉ khôi phục focus khi xuất phát từ card tương ứng.

Motion: hover nâng 3–4 px và viền sáng nhẹ trong 180 ms; bàn phím có focus rõ tương đương. Khi lọc, card fade 120–180 ms, danh sách cập nhật ổn định. Shared transition ảnh chỉ dùng khi có ảnh thật và trình duyệt hỗ trợ; chuyển route luôn hoạt động ngay.

## 8. Cảnh 05 — Bắt đầu cuộc trao đổi

Heading: **Bạn đang có bài toán phù hợp?**

Một câu định hướng: **Tôi muốn tiếp tục phát triển các hệ thống AI kết nối dữ liệu, mô hình và trải nghiệm sử dụng.**

CTA email, Tải CV, GitHub, LinkedIn và liên kết **Gặp con người phía sau công việc** sang Personal. Không tự công bố đang tìm việc hoặc sẵn sàng bắt đầu ở thời điểm cụ thể khi chưa có thông tin từ người dùng.

Khoảng cao vừa đủ, không thêm màn kết thúc chiếm trọn viewport.

## 9. Sơ đồ tổng thể

```text
NAV: Work / Personal / CV / Liên hệ
┌────────────────────────────────────────────────────────────┐
│ 01  TÔI KẾT NỐI DỮ LIỆU,        Dữ liệu → Mô hình          │
│     MÔ HÌNH VÀ SẢN PHẨM.                  ↓                │
│     Một đoạn giới thiệu.         Sản phẩm ← API             │
│     [Xem năng lực] [CV]                                    │
│ GeoIT VNPT          BA GPS              LLMFeed / EMNLP     │
├────────────────────────────────────────────────────────────┤
│ 02  TỪ BÀI TOÁN ĐẾN PHẦN VIỆC CỤ THỂ                      │
│ [RAG/LLM] [Vision] [Backend/Data] [Research]                 │
│ Phần việc       →       Kỹ thuật       →       Đầu ra       │
│                              [Xem dự án liên quan]         │
├────────────────────────────────────────────────────────────┤
│ 03  KINH NGHIỆM & NGHIÊN CỨU — VÙNG SÁNG                  │
│ Thời gian | Tổ chức / vai trò | Một câu đóng góp            │
│ ...                                                        │
│ LLMFeed / EMNLP 2026                   Đào tạo VinUni       │
├────────────────────────────────────────────────────────────┤
│ 04  CHỌN BÀI TOÁN BẠN MUỐN TÌM HIỂU                       │
│ [Bộ lọc]                                      [Tìm kiếm]   │
│ [DPOTM]             [AdverTest]            [MedTutor]       │
│ [PRISM]             [ParkingAI]           [LabGuard]       │
│                  [Xem toàn bộ dự án]                      │
├────────────────────────────────────────────────────────────┤
│ 05  BẠN ĐANG CÓ BÀI TOÁN PHÙ HỢP?                          │
│ Email / CV / GitHub / LinkedIn / Personal                  │
└────────────────────────────────────────────────────────────┘
```

## 10. Quy tắc chuyển động và đọc nội dung

- Đọc được hero, phần việc và đóng góp khi không bật motion hoặc không chạy JavaScript.
- Cuộn tự nhiên theo chiều dọc; không bắt người dùng hoàn thành animation để tiếp tục đọc.
- Một chuyển động nổi bật tại một thời điểm. Nội dung chữ chỉ đi lên 8–16 px; giữ nguyên độ nét khi đọc.
- Reveal 400–550 ms, tương tác 160–240 ms; dùng ease-out `cubic-bezier(.22,1,.36,1)`.
- Chỉ animate transform/opacity, và stroke dash cho SVG. Không blur đoạn văn hoặc chạy shader nền toàn màn hình.
- Chỉ hoạt ảnh ở gần viewport; dừng các hiệu ứng khi tab ẩn. Giữ chỗ cho media để tránh layout shift.
- Reduced motion: hiển thị tĩnh, đổi panel ngay, bỏ signal và chuyển cảnh không gian; mọi thao tác vẫn hoạt động.
- Mobile giữ cùng thứ tự nội dung. Không có hover bắt buộc, vùng chạm tối thiểu 44 px; heading không chen lên UI và không có cuộn ngang ngoài ý muốn.

## 11. Phạm vi triển khai tiếp theo

V4 thay cấu trúc Work và các nhãn cần thiết của nhánh Work. Dữ liệu case study là nguồn dùng lại; dữ liệu riêng như ngày làm việc, tác giả bài báo và vai trò cá nhân cần lấy nguyên từ nguồn đã lưu. Intro video ở trang chủ và các route Personal/case study tiếp tục hoạt động trong hệ thống điều hướng hiện có.

Ảnh chưa được cung cấp không ngăn bố cục V4 hoàn chỉnh. Các mục cần bổ sung về sau: screenshot sản phẩm có thể công bố, bằng chứng doanh nghiệp được phép chia sẻ, ảnh/chứng nhận VinUni và phạm vi vai trò cá nhân còn thiếu trong những repo ngoài nhóm ưu tiên.

## 12. Tiêu chí nghiệm thu khi triển khai

Người mới đọc hero phải mô tả được Đạt đang tập trung vào AI và software. Sau section năng lực, họ phải nêu được ít nhất hai loại phần việc có thể trao đổi với Đạt. Trước khi mở case study, họ phải thấy một kinh nghiệm có tổ chức/vai trò/thời gian rõ và nhận ra dự án là nơi kiểm tra sâu hơn.

Kiểm tra responsive ở 320, 390, 768, 1024 và 1440 px; tab/arrow keys cho capability selector; lọc/tìm kiếm thư viện; back navigation; reduced motion; contrast; link CV và nguồn; không phát sinh số liệu hoặc vai trò mới. Kiểm tra hiệu năng bằng thiết bị/throttle thật khi có môi trường trình duyệt phù hợp.

## 13. Ghi nhận triển khai

- Work dùng CSS và IntersectionObserver; giữ Simple view, reduced motion và fallback cho thiết bị yếu. Không cần tải GSAP/Motion cho luồng Work V4.
- Khung năng lực dùng các lớp CSS grid cùng một vùng bố cục để giữ chiều cao theo nội dung dài nhất. Lớp không được chọn có `aria-hidden`, `inert` và `visibility: hidden`, không đưa nút ẩn vào tab order.
- Lượt quay lại thư viện dùng state trong History API; nút Trở lại Work ở case study đọc thêm context gần nhất trong sessionStorage. Trạng thái lưu gồm nhóm năng lực, bộ lọc, từ khóa, công nghệ, mở rộng danh sách, vị trí cuộn và card xuất phát.
- Các anchor cũ `#skills`, `#manifesto`, `#selected-work` tiếp tục trỏ tới phần tương ứng. Thư viện chính dùng `#archive`.
- Lint và build đạt; 32 kiểm tra unit hiện có và 2 kiểm tra mới về lọc/state đều đạt. E2E Chrome: 51 đạt, 1 bỏ qua theo thiết bị; bao gồm bàn phím, a11y, route, không JavaScript, locale, clipboard và quay lại case study. Bộ kiểm tra V2/V3 đã được chuyển sang hành vi V4.
- Đã xem ảnh giao diện desktop/mobile và kiểm tra Việt/Anh ở 320, 390, 768, 1024, 1440 px; không phát hiện tràn ngang. Không có lỗi JavaScript trong lượt rà soát. Đã có regression test cho chiều cao panel ở màn hình 320 px.
