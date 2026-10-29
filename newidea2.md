# PORTFOLIO 2.0 — WORK EXPERIENCE: KINETIC CINEMA

> **Bản thiết kế V2.0 — đổi hẳn phong cách nhánh Work**  
> Phạm vi: **chỉ thiết kế lại nhánh Professional / Work**. Nhánh Personal giữ cách kể chuyện gần gũi, theo thời gian, có ảnh và hồi ức.  
> Mục tiêu: *nhiều chuyển động, mượt mà, có cảm giác điện ảnh, giàu tương tác nhưng vẫn chứng minh được năng lực thật*.  
> Trạng thái: design brief + storyboard + motion specification + checklist để giao Codex triển khai.

---

## 0. Quyết định thay đổi lớn nhất

**Bỏ hoàn toàn phong cách “Engineering Studio” cũ.** Không dùng nhịp bố cục lặp đi lặp lại như: ảnh cố định bên trái, thông tin cuộn bên phải; bento grid nối tiếp; dashboard; một loạt card dự án cùng mẫu; hàng loạt sơ đồ đứng yên.

**Concept mới:** `WORK = KINETIC CINEMA — A JOURNEY THROUGH THINGS I BUILD`.

Không xem trang Work là một hồ sơ được chia thành các section; hãy xem nó là **một bộ phim ngắn tương tác**. Khi người xem cuộn, nội dung không chỉ xuất hiện mà **biến hình, mở rộng, lướt qua, đổi cảnh, đi vào chiều sâu và kết nối với nhau**.

**Nguyên tắc:** Chuyển động phải tiết lộ nội dung, không được che khuất nội dung. Ảnh sản phẩm, demo, kết quả nghiên cứu và lời giải thích của chủ nhân vẫn là trung tâm.

### So sánh hai hướng

| | Personal | Work — Kinetic Cinema |
|---|---|---|
| Cảm giác | Nhật ký ảnh, ấm, chân thực | Motion design điện ảnh, năng lượng, táo bạo |
| Trục tổ chức | Thời gian: THCS → THPT → Đại học → hiện tại | Nhịp phim: mở màn → khám phá → bước vào dự án → năng lực → tương lai |
| Hình thức chính | Ảnh, đoạn kể chuyện, timeline | Typography khổng lồ, khung hình biến dạng, lớp không gian 2.5D, các cảnh chuyển theo cuộn |
| Tương tác | Đọc, ngắm ảnh, khám phá kỷ niệm | Cuộn để điều khiển cảnh, rê chuột để tạo chiều sâu, nhấn để đi vào dự án |
| Chuyển động | Êm và dịu, tiết chế | Nhiều chuyển động hơn, dứt khoát nhưng không giật, nhất quán về nhịp |

**Lưu ý:** 2.5D nghĩa là tạo cảm giác chiều sâu từ lớp ảnh, perspective và transform CSS; không mặc định phải dựng một thế giới 3D nặng nề.

---

## 1. Art direction — Liquid Motion + Kinetic Editorial

### Phong cách nhìn

- Một **canvas tối graphite** `#090B10`, tương phản với các đoạn **sáng ngà** `#F4F1EC`. Thay đổi nền theo nhịp câu chuyện, không để tất cả section chung một nền.
- Accent dùng **electric lime** `#D9FF61` hoặc **electric blue** `#7AB8FF` có kiểm soát; màu thứ ba tím nhạt `#B6A3FF` dành cho một vài chi tiết. **Không biến trang thành cyberpunk neon**.
- Chữ rất lớn, kiểu editorial: nhiều lúc một từ chiếm gần trọn chiều ngang màn hình; sau đó từ ấy thu lại và biến thành nhãn một dự án.
- Dùng ảnh thật, screenshot sản phẩm, clip demo ngắn, diagram kết quả thật và ảnh công việc. **Các khối hình động chỉ là vật dẫn để kết nối nội dung thật**.
- Không dùng icon minh họa AI chung chung như não phát sáng, robot 3D, ma trận số bay dày đặc.
- Có nhịp thở: sau một cảnh chuyển động mạnh là một khoảng tĩnh, để người xem đọc.

### Typography

- Display: **Space Grotesk** hoặc **Sora** — chữ ngắn, lớn, mạnh.
- Nội dung Việt: **Be Vietnam Pro** — thoáng, đọc tốt.
- Thông số / nhãn: **IBM Plex Mono** — ít, chỉ dùng cho dự án, thời gian, trạng thái.
- Tiêu đề desktop có thể dùng `clamp(4rem, 10vw, 10rem)`; điện thoại cần kiểm tra xuống dòng bằng thiết kế, không scale mù quáng.

### Ngôn ngữ hình khối

- **Frames:** khung ảnh trình chiếu, có thể co/giãn thành cửa sổ browser hay toàn màn hình.
- **Ribbons:** dải màu mềm để chuyển cảnh, không phải dây neon chạy khắp site.
- **Layers:** ba lớp chiều sâu (nền / nội dung / chữ) với tốc độ dịch khác nhau rất nhỏ.
- **Type as Object:** chữ trở thành một thành phần chuyển động, đi từ tiêu đề lớn sang nhãn nhỏ.
- **Project as a World:** mỗi dự án có ngôn ngữ trình diễn riêng, không bị ép thành cùng một template.

---

## 2. Trải nghiệm tổng thể / flow

```text
HOME — chọn WORK
   │
   ▼
[W00] Portal Transition — mở một thế giới khác
   │
   ▼
[W01] Cold Open — mở màn như motion reel
   │
   ▼
[W02] Kinetic Manifesto — tôi làm gì và quan tâm điều gì
   │
   ▼
[W03] Project Universe — khám phá các dự án qua quỹ đạo không gian
   │
   ├── [W04A] Project World 01 — Product Film
   │
   ├── [W04B] Project World 02 — Research in Motion
   │
   └── [W04C] Project World 03 — Interactive Experience
   │
   ▼
[W05] Experience Credits — những nơi tôi đã đóng góp
   │
   ▼
[W06] Skills in Motion — năng lực gắn với dự án minh chứng
   │
   ▼
[W07] The Experiment Room — dự án đang thử nghiệm
   │
   ▼
[W08] Future / Career — hướng tôi muốn đi tiếp
   │
   ▼
[W09] Closing Scene — kết nối với tôi
```

Đường đi chính bằng cuộn trang, **nhưng không khóa người dùng vào trải nghiệm**. Thanh điều hướng luôn có `Projects`, `Experience`, `Resume`, `Contact` để nhà tuyển dụng truy cập trực tiếp. Một nút `Skip motion / Simple view` ở menu mở chế độ đọc ít hiệu ứng.

---

## 3. Storyboard chi tiết — từng cảnh, từng chuyển động

### W00 — PORTAL: bước từ Home vào Work

**Mục đích:** Người xem phải cảm thấy hai nhánh *thực sự khác nhau* ngay từ cú click đầu.

**Trạng thái ban đầu:** ở Home, người xem nhấn `Explore My Work`. Khu vực Work vốn là một tấm ảnh/video có khung rõ ràng.

**Choreography:**

1. `0–150ms`: phản hồi tức thì, nút và khung Work nhận trạng thái active; con trỏ không bị khóa.
2. `150–550ms`: khung Work **nở từ vị trí hiện tại** ra chiếm khung nhìn (shared-element transition). Các vùng ngoài màn hình mờ dần chứ không nhảy đột ngột.
3. `400–800ms`: tông Personal/Home rút ra, background graphite xuất hiện; ảnh teaser dự án ngả nhẹ theo perspective rồi dừng.
4. `650–1000ms`: chữ `WORK / PHAN TRỌNG ĐẠT` tiến vào; nội dung Work sẵn sàng đọc.

**Quan trọng:** Nếu chuyển thẳng vào `/work`, tải lại trang, mở bằng link, hoặc trình duyệt không hỗ trợ view transition, dùng intro fade đơn giản; không phụ thuộc bắt buộc vào transition từ Home.

**Mobile / reduced motion:** cắt sang Work bằng fade 180–250ms; không phóng to toàn màn hình gây chóng mặt.

---

### W01 — COLD OPEN: trang mở đầu như một đoạn phim ngắn

**Không chia đôi màn hình.** Toàn bộ viewport là sân khấu.

**Tĩnh tại lần đầu tải:** nền graphite. Giữa màn hình là tiêu đề:

```text
I TURN
IDEAS INTO
REAL THINGS.

AI · SOFTWARE · EXPERIMENTS

[ Explore selected work ]    [ Download CV ]
```

Tên thật, vai trò hiện tại và lĩnh vực chuyên môn phải hiển thị ngay, không bị giấu dưới animation.

**Hình ảnh:** 3–5 lát cắt thật của sản phẩm (ảnh UI, một đoạn kiến trúc, một ảnh thử nghiệm/ảnh làm việc). Những lát cắt này nằm ở các vị trí lệch nhau, có độ sâu ảo, không xếp lưới.

**Chuyển động khi tải:**

- `0–200ms`: hiển thị nền + tên/điều hướng ngay, tránh màn hình đen giả loading.
- `200–950ms`: ba dòng chữ lần lượt **trượt ra khỏi mask từ dưới lên**; stagger 90ms, không gõ từng ký tự.
- `400–1150ms`: các lát cắt dự án tiến từ `scale(.88)` và `translateZ(-60px)` giả lập về vị trí; blur giảm từ 6px về 0.
- `900–1250ms`: CTA và chỉ dẫn cuộn xuất hiện; intro kết thúc **không quá ~1,3 giây**.

**Khi cuộn 0 → ~1 viewport:**

- Dòng `IDEAS` lướt ngang một chút, dòng `REAL THINGS` lớn dần rồi **trở thành mặt phẳng nền**.
- Ảnh sản phẩm dịch lên và tụ lại thành một khung trình chiếu duy nhất.
- Nền chuyển từ gần đen sang màu riêng của cảnh tiếp theo.
- Có một đoạn “nghỉ” khoảng 150–250px cuộn cho người xem đọc lời mở đầu.

**Tương tác chuột:** ảnh phía trước dịch tối đa 8–12px theo con trỏ; không nghiêng toàn màn hình. Trên thiết bị cảm ứng bỏ mouse tracking.

---

### W02 — KINETIC MANIFESTO: chữ kể câu chuyện, không phải card

**Mục đích:** Cho biết bạn tập trung vào lĩnh vực gì trước khi xem dự án.

**Bố cục:** màn hình sáng ngà. Một câu được chia thành 4 dòng lớn, không cần ảnh làm nền:

```text
I EXPLORE.
I EXPERIMENT.
I BUILD.
I IMPROVE.
```

Dưới mỗi động từ có đúng 1 câu nhỏ liên hệ với cách bạn làm việc; ví dụ `I BUILD — from prototype to usable systems`. Đây là **copy mẫu**, không phải tuyên bố về kinh nghiệm thực tế của bạn.

**Choreography theo cuộn:**

1. Màn hình đổi màu nền theo một gradient ngắn, không chớp.
2. `I EXPLORE` bắt đầu rất lớn (chiếm 80% chiều ngang), di chuyển từ trái vào giữa.
3. Khi cuộn thêm, dòng đầu **thu nhỏ** và đẩy lên thành chỉ mục 01, dòng sau từ mép dưới lướt vào.
4. Cảnh lặp nhịp 4 động từ, nhưng **mỗi động từ có cách chuyển riêng**: dòng chữ tách chữ cái nhẹ, chữ nghiêng, chữ co độ rộng — không dùng 4 lần cùng một slide-in.
5. Kết cảnh, cả 4 động từ tụ lại thành một cụm nhỏ `Research / Build / Evaluate / Iterate` trên mép màn hình, rồi nhường chỗ cho dự án.

**Không làm:** hiệu ứng karaoke chữ chạy theo cuộn quá nhạy hoặc giật; không cần bắt người xem dừng ở từng chữ.

---

### W03 — PROJECT UNIVERSE: gallery chuyển động theo quỹ đạo

Đây là **signature interaction** của trang Work mới.

**Hình dung:** Người xem đứng trước một không gian tối, các dự án là những *khung cửa sổ hình ảnh* đang nằm trên quỹ đạo dạng cung cong / băng phim. Mỗi dự án có screenshot thật, tên, lĩnh vực và một câu mô tả. Quỹ đạo là **2.5D**, không cần rendering 3D nặng.

**Trạng thái đầu:** dự án chính ở giữa lớn nhất. Hai dự án kế cận lùi về sau, hơi xoay theo trục Y, nhỏ hơn, giảm độ sáng; vẫn nhìn rõ chúng là những lựa chọn có thể bấm.

**Điều khiển:**

- Cuộn đến phần này: gallery được ghim **tối đa 1–1,5 viewport chiều dài cuộn** để trải qua 3 dự án; không “nuốt” nhiều lần cuộn chuột.
- Scroll tiến thì các khung đi theo một đường cong nhẹ, tâm gallery đổi dự án. Di chuyển có inertia vừa phải và snap mềm khi ngừng cuộn.
- Hover một khung: khung tiến lên 12–24px, screenshot sáng rõ hơn, nhãn `View case study` xuất hiện.
- Click/tap: khung dự án được chọn **mở rộng thành toàn khung hình**. Trình duyệt chuyển sang trang case study hoặc mục trình chiếu tương ứng.
- Có các nút `Previous` / `Next` và danh sách tên dự án cho thao tác bàn phím / mobile.

**Visual:** thay vì card có bóng đổ, các khung như màn hình trong không gian, bo góc rất nhẹ, viền sáng mỏng. Bên dưới là số thứ tự `01 / 03`, tên dự án và một mô tả thật ngắn.

**Chuyển động mở dự án:** hình đang được chọn phóng ra đầy màn hình, còn hình xung quanh trôi ra sau và mờ; tiêu đề lớn bên ngoài chuyển thành tiêu đề trang case study. Dùng shared-element nếu làm được; fallback là crossfade.

**Mobile:** **không chạy quỹ đạo 3D theo scroll**. Đổi thành dãy ảnh ngang có snap, mỗi thẻ rộng ~84vw; animation scale nhẹ khi thẻ ở giữa. Có dot indicator và xem theo dạng danh sách khi tắt motion.

**Fallback:** nếu người dùng chỉ có 1–2 dự án đáng trình diễn, thiết kế tự thích nghi. Không tạo dự án giả để đủ quỹ đạo.

---

### W04 — PROJECT WORLDS: ba dự án, ba cách kể *khác nhau*

Mỗi project được phép có case-study riêng. Không nên bắt tất cả case study dùng cùng một cơ chế cuộn. **Chỉ một đến hai dự án cần hiệu ứng trình chiếu lớn**; những dự án khác có thể hiển thị đơn giản, thông tin đầy đủ.

#### W04A — THE PRODUCT FILM: dành cho dự án có giao diện đẹp / demo rõ

**Bố cục:** khung browser hoặc điện thoại treo giữa nền sáng. Tiêu đề lớn phía trên: `[PROJECT NAME]`. Một câu giải thích bài toán thật, ba nút `Live Demo`, `Case Study`, `Source`.

**Chuỗi chuyển cảnh theo cuộn:**

1. **Overview:** ảnh giao diện như một tấm poster lớn, nhìn trọn sản phẩm.
2. **Zoom-in:** khung browser phóng nhẹ, tập trung vào một tính năng thật; chú thích hiện cạnh đúng khu vực đó.
3. **Feature shift:** nội dung bên trong khung chuyển sang screenshot thứ hai; *khung giữ vị trí*, không đổi cả layout.
4. **Behind the build:** mockup thu nhỏ, các lớp thành phần tách ra với hiệu ứng exploded view 2.5D (UI → API → model/data), nhấn vào lớp sẽ mở giải thích kỹ thuật.
5. **Proof:** khung trở về trạng thái bình thường, xuất hiện kết quả thật / demo video có nút play.

**Tương tác:** có nút `Skip showcase → Read case study` luôn nhìn thấy, vì nhà tuyển dụng không nên bị ép xem cả đoạn trình diễn.

#### W04B — RESEARCH IN MOTION: dành cho AI / ML / NLP / Speech nghiên cứu

**Bố cục:** một nền rất sáng hoặc tối tương phản, giữa màn hình là **một đường dữ liệu chuyển động**. Không phải sơ đồ mạng đầy node.

**Chuyển động theo cuộn:**

- `Problem`: khối dữ liệu đầu vào xuất hiện dưới dạng những mẫu ảnh/âm thanh/văn bản thật (ẩn thông tin nhạy cảm).
- `Process`: từng khối xử lý đi theo đường cong và nối thành pipeline rõ ràng. Các label hiện dần, không chạy loạn.
- `Experiment`: các nhánh phương án A/B tách ra, người xem có thể chọn để đọc lý do lựa chọn.
- `Evaluation`: biểu đồ từ **kết quả đo thật** được vẽ lên. Không tự thêm chỉ số chính xác giả.
- `Outcome`: pipeline thu lại thành một hình tổng thể, kèm 2–3 kết luận bạn thực sự rút ra.

**Tương tác:** click vào mô hình/bước xử lý để xem `What / Why / Trade-off` ngay trong một panel overlay gọn. Vẫn có bản dạng bài viết cho SEO, accessibility, sao chép và đọc nhanh.

#### W04C — THE INTERACTIVE EXPERIENCE: dành cho project AI có demo đầu vào/đầu ra

Nếu có sản phẩm Speech, Chatbot, Agent hoặc mô hình chạy được, thiết kế *mini-demo* trực tiếp trong một khung trình diễn rộng.

- Với Speech: âm thanh dùng waveform **phát triển từ dữ liệu audio có thật**, không phải sóng trang trí vô nghĩa; không tự phát âm thanh; người dùng chủ động bấm Play.
- Với NLP/LLM: người xem chọn một ví dụ công khai, animation mô phỏng hành trình Input → Analysis → Output và có thể xem output thực đã lưu.
- Với Agent: hiển thị từng bước tool/decision bằng animation tuần tự có điều khiển `Step forward`, không cần gọi API thật nếu không có backend công khai.
- Nếu dự án chưa có demo: hiển thị video ngắn hoặc một bộ screenshot có chú thích. **Không giả vờ có tương tác thật**.

**Chuyển cảnh:** các lớp UI thay đổi qua `layout morph` 300–500ms; badge nhỏ và button phản hồi 120–180ms. Không kéo dài mỗi lần bấm.

---

### W05 — EXPERIENCE CREDITS: kinh nghiệm như phần credit của phim

**Đổi phong cách hoàn toàn, không timeline giống Personal.**

**Ý tưởng:** Nền sáng. Tên công ty, lab, nhóm nghiên cứu hoặc vai trò được đặt như các dòng **title card** lớn, xuất hiện lần lượt ở giữa màn hình. Phía sau là những hình ảnh/ảnh nhóm, clip thật, tài liệu hoặc mô tả ngắn bay qua theo các layer rất chậm, như closing credits có chủ ý.

**Bố cục:**

- Đầu section: `PLACES I CONTRIBUTED` / `WHAT I WAS RESPONSIBLE FOR`.
- Mỗi công việc là một **tấm poster ngang** thay vì card nhỏ. Dòng lớn `[ROLE] — [ORGANIZATION]`; phía dưới 3 nhãn `Challenge`, `Contribution`, `Outcome` (có bằng chứng nếu có).
- Cuộn từ poster này qua poster khác bằng một **vertical curtain**: poster hiện tại trượt lên, poster mới xuất hiện ở phía sau, ảnh tài liệu thay đổi.
- Chuyển động tối đa 500–700ms nếu chủ động bấm next; theo scroll dùng progress trực tiếp, không thêm độ trễ vô lý.

**Chiều sâu chuyên môn:** có thể mở một modal/expand panel để đọc chi tiết trách nhiệm cá nhân, kỹ thuật sử dụng và kết quả. Không chỉ liệt kê logo và tên chức danh.

**Nếu chưa có kinh nghiệm làm việc chính thức:** đặt tên mục là `COLLABORATIONS & CONTRIBUTIONS`, dùng nhóm học thuật, dự án nhóm và cuộc thi theo đúng bản chất. Không tạo công ty hoặc chức danh giả.

---

### W06 — SKILLS IN MOTION: kỹ năng chuyển thành các minh chứng

**Bỏ progress bar 95%, icon grid và bento skills.**

**Cảnh đầu:** một tấm typography wall cực lớn với 5–7 từ khóa cấp nhóm, ví dụ `LANGUAGE`, `MODELS`, `SYSTEMS`, `DATA`, `PRODUCT`, `RESEARCH` (tùy lĩnh vực thật).

**Cảm giác:** các từ nằm trên các lớp ngang chồng nhau. Khi cuộn, mỗi lớp chạy tốc độ khác nhau một chút; tất cả dừng lại thành một bố cục trật tự, dễ đọc.

**Tương tác:**

1. Hover/tap `MODELS` → từ đó nổi lên; phần còn lại giảm tương phản.
2. Bên dưới hiện **dự án thật đã dùng kỹ năng ấy**: tên dự án, vai trò, kết quả và nút `View evidence`.
3. Chọn một dự án → chuyển đến đúng mục trong case study.
4. Khi bỏ chọn, typography wall trở về trạng thái bình thường bằng spring êm; không lật 3D.

**Mobile:** thay bằng accordion theo nhóm kỹ năng, có từ khóa lớn phía trên và bằng chứng nằm phía dưới. Không dùng toàn bộ chữ chạy ngang liên tục.

---

### W07 — THE EXPERIMENT ROOM: phòng thử nghiệm có nhịp sống

**Đây là khu vực thể hiện bạn đang học và khám phá chứ không phải thành tích đã hoàn thành.**

**Bố cục:** nền tối có một dải filmstrip ngang với các dự án đang thử. Mỗi frame có ảnh experiment thật: log chạy, ảnh mẫu, biểu đồ, notebook, một prototype, hoặc UI đang xây.

**Motion:**

- Dải filmstrip dịch chậm theo tiến độ cuộn ngang/dọc, nhưng có nút điều khiển và không làm mất cuộn tự nhiên.
- Khi hover một frame, frame tiến lên một chút, ảnh chuyển từ trắng đen sang màu, tên và trạng thái `Exploring / Prototype / In Progress` xuất hiện.
- Khi click, bật một *drawer* nhỏ trình bày `Hypothesis → What I tried → What I learned → Next step`.
- Mọi experiment có ngày cập nhật gần nhất, không hiển thị như đã đạt kết quả cuối cùng.

**Nhịp độ:** Sau các cảnh mạnh ở W03–W06, đây là khu vực tương đối nhẹ để giảm mệt mỏi khi xem.

---

### W08 — FUTURE: đường chân trời thay vì ba thẻ mục tiêu

**Mục đích:** nói rõ muốn phát triển theo lĩnh vực nào và công việc mong muốn, nhưng vẫn giữ tính điện ảnh.

**Màn hình:** toàn màn hình gần đen, ở xa có một đường chân trời mảnh. Câu lớn:

```text
I'M STILL
BUILDING WHAT'S NEXT.
```

**Chuyển động:**

1. Khi vào section, các lớp nội dung cũ biến mất về phía sau, tạo không gian rất rộng.
2. Đường chân trời sáng dần, nhưng **không dùng camera zoom mạnh**.
3. Ba định hướng nghề nghiệp thật xuất hiện lần lượt như ba title card ở các lớp độ sâu khác nhau: `Next role`, `What I want to master`, `What I want to create`.
4. Khi người xem chọn một mục, nội dung đầy đủ trượt vào từ dưới, có nút `Let's work together`.
5. Ở cuối, cả ba mục thu lại thành một câu trọng tâm về định hướng công việc.

**Nội dung cần đủ thực tế:** vị trí mong muốn; lĩnh vực AI/software quan tâm; loại môi trường muốn tham gia; link CV; cách liên hệ. Không tuyên bố sẽ đạt được điều gì với chắc chắn tuyệt đối.

---

### W09 — ENDING: nơi hai hướng gặp nhau

**Cảnh cuối phải kết nối Work với Personal mà không làm hai nhánh giống nhau.**

- Chữ lớn: `LET'S BUILD SOMETHING MEANINGFUL.`
- Một khung hình từ gallery Work thu dần và biến thành một đường viền mỏng.
- Viền này chuyển từ màu accent Work sang màu ấm Personal; phía sau xuất hiện **một ảnh chân dung thật**.
- Các nút xuất hiện nhanh: `Email`, `LinkedIn`, `GitHub`, `Resume`, `Explore My Story`.
- Phía dưới một dòng chân thực `Designed & built by [tên bạn]`.

**Hover:** từng nút có một reveal nhẹ, icon dịch 3–5px, không có nam châm kéo con trỏ quá mạnh. **Click email phải hoạt động, liên kết phải hợp lệ.**

---

## 4. Motion language — chi tiết để lập trình

### Bảng quy chuẩn

| Loại | Thông số gợi ý | Ứng dụng |
|---|---|---|
| Micro interaction | 120–200ms, ease-out | Button, nav, label |
| Card hover | 220–320ms | Project frame, experiment frame |
| Typography reveal | 500–800ms, stagger 60–100ms | Hero, manifesto |
| Frame morph | 450–750ms | Gallery → case study |
| Scene transition | 500–850ms | Đổi nền, đổi chapter |
| Scroll-linked motion | Tùy progress, scrub nhẹ | Orbit, layered scenes |
| Parallax | Tối đa 8–24px với UI; ảnh lớn tối đa ~5–8% chiều cao | Chiều sâu 2.5D |
| Tilt | Tối đa 2–4° | Poster / screenshot khi hover |
| Spring | Damping cao, bounce thấp | Các tương tác chọn/bỏ chọn |

**Easing:**

- Reveal lớn: `cubic-bezier(0.22, 1, 0.36, 1)`.
- Đổi trạng thái UI: `cubic-bezier(0.2, 0.8, 0.2, 1)`.
- Scrub nên bám tiến độ cuộn, không chèn thêm animation độc lập quá chậm làm cảm giác giật / lệch.

### Ba nguyên tắc không được phá

1. **Chỉ dùng `transform` và `opacity` cho phần lớn animation.** Tránh animate `top`, `left`, `width` và các thuộc tính gây layout liên tục ở khu vực đông thành phần; với layout morph chỉ thực hiện trên vài phần tử quan trọng.
2. **Mỗi cảnh có cao trào rồi nghỉ.** W01 mạnh → W02 mạnh vừa → W03 mạnh → W04 có đoạn tĩnh đọc → W05 vừa → W06 vừa → W07 nhẹ → W08 mạnh vừa → W09 nhẹ.
3. **Không biến scroll thành một bộ điều khiển khó chịu.** Không cướp wheel/touch, không khóa toàn trang, không buộc cuộn 10 lần mới qua một dự án, không bắt xem hết intro để bấm Projects.

### Tương tác chuột có mục đích

- **Cursor tracking:** chỉ tác động 1–3 phần tử lớn đang có mặt, cập nhật qua `requestAnimationFrame` hoặc Motion value, giới hạn biên độ.
- **Magnetic CTA:** tùy chọn tối đa 4–6px, bỏ hoàn toàn trên touch và reduced motion.
- **Hover preview:** dự án có thể đổi sang ảnh thứ hai, nhưng phải preload hợp lý và không dùng video tự phát âm thanh.
- **Pointer spotlight:** nếu dùng, chỉ là ánh sáng radial rất mờ dưới khung ảnh, không làm chữ giảm tương phản.

---

## 5. Phân nhánh nội dung: những gì cần điền bằng dữ liệu thật

Không tự suy đoán trường học, thành tích, công ty, vai trò hoặc dự án đã hoàn thiện. Tất cả phần trong dấu ngoặc vuông cần thay bằng dữ liệu của bạn.

```yaml
identity:
  name: "[Họ tên]"
  headline: "[Mô tả vai trò hiện tại chính xác]"
  focus: ["[Chuyên môn 1]", "[Chuyên môn 2]"]
  desiredRoles: ["[Vị trí công việc mong muốn]"]

featuredProjects:
  - slug: "[slug-du-an-1]"
    title: "[Tên dự án]"
    format: "product-film" # hoặc research-motion, interactive-experience
    stage: "completed" # hoặc prototype, in-progress, research
    summary: "[Bài toán trong 1 câu]"
    myRole: "[Phần việc trực tiếp của bạn]"
    proof: ["[Kết quả / demo / tài liệu minh chứng]"]
    images: ["[Đường dẫn screenshot thật]"]
    links: {demo: "[URL hoặc trống]", source: "[URL hoặc trống]"}

experiences:
  - role: "[Vai trò]"
    organization: "[Đơn vị / Nhóm]"
    period: "[Thời gian]"
    contributions: ["[Việc thực sự làm]"]

experiments:
  - name: "[Tên thử nghiệm]"
    stage: "in-progress"
    lastUpdated: "[YYYY-MM]"
    learned: "[Bài học / Kết quả hiện tại]"
```

### Tài sản ảnh/video nên chuẩn bị

1. **Hero:** 3–5 ảnh cắt cận sản phẩm hoặc ảnh demo rõ, không cần nhiều ảnh chân dung.
2. **Mỗi featured project:** 1 ảnh hero ngang, 2–4 screenshot tính năng, 1 ảnh kiến trúc hoặc kết quả, 1 video 5–15 giây **nếu có thật**.
3. **Research:** ảnh input minh họa hợp lệ, hình pipeline, biểu đồ thực, ảnh kết quả mô hình; ghi rõ dữ liệu thử nghiệm.
4. **Experience:** ảnh workshop/nhóm/dự án hoặc tài liệu công khai, không có cũng không sao.
5. **Experiment room:** ảnh prototype/notebook/result được phép công bố.
6. **Ending:** 1 ảnh chân dung tự nhiên, đã tối ưu.

**Không cần ảnh đầy đủ ngay từ đầu:** code phải hỗ trợ placeholder typography đẹp và ẩn widget thiếu dữ liệu, thay vì dùng ảnh AI giả làm thành tích hoặc screenshot giả.

---

## 6. Thiết kế theo kích thước màn hình

### Desktop rộng (≥ 1200px)

- W01 full-bleed kinetic typography với 3–5 layered frames.
- W03 project orbit 2.5D với frame chính ~55–65vw, frame phụ ~25–40vw; tránh che nhau đến mức không bấm được.
- W04 featured project đủ rộng để trình diễn video/UI, có câu chữ đọc bình thường.
- W05 posters rộng gần hết trang, không tách thành timeline hai cột.
- W06 typography wall + evidence panel có thể bấm.

### Tablet (768–1199px)

- Giảm số layer di chuyển đồng thời, có thể đổi orbit thành gallery cong ít perspective.
- Giảm scale / blur; phần case study vẫn đọc theo chiều dọc.
- Mọi button có kích thước chạm đủ rộng.

### Mobile (< 768px)

- Không pin project orbit; không horizontal scroll-jacking.
- Intro tối đa một lần fade + slide, loại bỏ parallax theo chuột.
- Gallery vuốt ngang có snap và phím bấm; text không bay theo trục Z.
- Content-first: case study như bài viết dọc với ảnh phù hợp chiều rộng.
- Section W06 thành accordion, W05 thành từng poster dọc.
- Chuyển cảnh nhẹ, sử dụng ảnh tĩnh poster cho video tự phát không cần thiết.

---

## 7. Kỹ thuật & performance — để nhiều animation vẫn mượt

**Stack phù hợp nếu website đang dùng Next.js / React:**

- **Next.js + TypeScript**: routing, SEO, render nội dung quan trọng từ server.
- **Tailwind CSS** hoặc CSS Modules: design tokens, responsive.
- **Motion for React**: micro-interaction, text reveal, layout transition, presence.
- **GSAP + ScrollTrigger**: chỉ cho các sequence scroll thật sự phức tạp (W01, W03, một project world). Không gắn ScrollTrigger cho mọi paragraph.
- **CSS perspective / transform**: dựng 2.5D orbit, chỉ cân nhắc Three.js/WebGL nếu có tài sản/ý tưởng rõ ràng và thiết bị đủ mạnh.
- **Next/Image / AVIF/WebP**: ảnh; clip nén dùng video native có poster.

### Quy tắc vận hành

- Không đặt tất cả section là client component nếu không cần. Text, dự án, SEO vẫn cần render ổn khi JS chậm.
- Giới hạn chỉ **một animation scroll lớn** active mỗi thời điểm; tạm dừng listener, video và xử lý pointer khi section ra khỏi viewport.
- Dùng `prefers-reduced-motion`, lưu ý người dùng nhạy cảm với zoom, blur, chuyển động ngang mạnh.
- Không autoload video full-res ngoài viewport. Không autoplay audio.
- Thử nghiệm CPU-throttle và các máy tầm trung. Mục tiêu trải nghiệm hướng 60fps khi đủ khả năng; nếu không đạt, tự giảm hiệu ứng trước khi hạ khả năng đọc nội dung.
- Ưu tiên tránh layout shift và hiển thị nội dung ngay cả khi animation bị vô hiệu hóa.
- Các pinned sequence nên giải phóng pin khi người dùng cuộn nhanh / dùng phím tắt / click anchor.

### Fallback quan trọng

| Trường hợp | Cách xử lý |
|---|---|
| JS chưa tải | Nội dung, tên dự án, CTA vẫn nhìn thấy |
| Reduced motion | Bỏ zoom/quỹ đạo/scrub; chuyển cảnh fade ngắn hoặc không animate |
| Máy cấu hình yếu | Bỏ blur, parallax nhiều lớp, chạy gallery snap đơn giản |
| Mất ảnh/video | Typography + nền có chủ đích, không để khung rỗng |
| Ít dự án | Không bịa dự án; layout tự co còn 1–2 |
| Mở link case study trực tiếp | Trang render độc lập, không phụ thuộc scene W03 |

---

## 8. Cấu trúc component gợi ý

```text
src/
├── app/
│   ├── page.tsx                   # Home / two paths
│   ├── work/page.tsx              # Work Kinetic Cinema
│   └── projects/[slug]/page.tsx   # Case study có thể vào trực tiếp
├── components/
│   ├── motion/
│   │   ├── SceneTransition.tsx
│   │   ├── ScrollScene.tsx
│   │   ├── KineticHeadline.tsx
│   │   ├── MotionPreference.tsx
│   │   └── PointerParallax.tsx
│   └── work/
│       ├── WorkPortal.tsx
│       ├── ColdOpenHero.tsx
│       ├── KineticManifesto.tsx
│       ├── ProjectOrbit.tsx
│       ├── ProductFilm.tsx
│       ├── ResearchMotion.tsx
│       ├── InteractiveProject.tsx
│       ├── ExperienceCredits.tsx
│       ├── SkillsInMotion.tsx
│       ├── ExperimentRoom.tsx
│       ├── FutureHorizon.tsx
│       └── WorkClosing.tsx
├── content/
│   ├── profile.ts
│   ├── projects.ts
│   └── experiences.ts
└── styles/
    └── tokens.css
```

**Lưu ý kiến trúc:** Mỗi cảnh nhận dữ liệu từ content thay vì hard-code nội dung. Project format có thể chọn layout `product-film`, `research-motion`, `interactive-experience`. Có thể dùng một case-study layout nền tảng chung nhưng thay đổi hero và cách thể hiện nội dung theo format.

---

## 9. Acceptance criteria — khi nào coi như thiết kế thành công?

### Nhìn / cảm giác

- [ ] 5 giây đầu phân biệt rõ Work với Personal.
- [ ] **Không có bất kỳ chuỗi section nào** sử dụng lặp công thức ảnh trái + văn bản cuộn phải.
- [ ] Ít nhất 3 kiểu diễn đạt chuyển động: kinetic typography, morphing frame, spatial/gallery motion.
- [ ] Dự án mạnh nhất chiếm vị trí ưu tiên về diện tích và chi tiết.
- [ ] Chuyển động có cao trào và đoạn nghỉ, không mệt khi xem hơn 1–2 phút.

### Nội dung / tuyển dụng

- [ ] Tên, chuyên môn, CV, Projects, Contact có thể tìm ngay.
- [ ] Mọi project có mô tả bài toán, vai trò cá nhân, kết quả/thực trạng rõ.
- [ ] Không sử dụng kết quả đo, giải thưởng, chức danh chưa được xác minh.
- [ ] Có ít nhất một case study đủ sâu về kỹ thuật nếu có dự án thực tế tương ứng.

### Chất lượng kỹ thuật

- [ ] Không scroll-jacking, không khóa chuột, có thể nhảy đến anchor.
- [ ] Hoạt động tốt trên mobile và bàn phím.
- [ ] Reduced motion và fallback máy yếu hoạt động.
- [ ] Không flash nội dung, không nhảy layout, không lặp animation vô hạn gây mất tập trung.
- [ ] Không có console error hoặc listener animation bị bỏ quên.

---

## 10. Lộ trình triển khai dành cho Codex

**Phase 1 — Base (phải làm trước):** bố cục tĩnh hoàn chỉnh, SEO, nội dung thật, navbar, mobile, các link; không viết motion lớn ngay.

**Phase 2 — Motion foundation:** font, màu, easing, header transition, component reveal chung, motion preference.

**Phase 3 — Signature scenes:** W01 kinetic cold open + W03 project orbit + transition mở case study; tập trung polish vì đây là những phần tạo khác biệt.

**Phase 4 — Project worlds:** triển khai đúng 1 case study sản phẩm và 1 case study nghiên cứu trước, rồi mở rộng format nếu có dữ liệu đủ.

**Phase 5 — Remaining story:** Experience Credits, Skills in Motion, Experiment Room, Future Horizon, Closing.

**Phase 6 — Optimize:** đo trên thiết bị thật, giảm chuyển động thừa, tối ưu asset, kiểm tra keyboard / reduced motion / mobile.

---

## 11. Prompt giao thẳng cho Codex CLI

> Bạn là senior creative front-end engineer, chuyên Next.js, TypeScript, GSAP ScrollTrigger, Motion for React và performance. Hãy đọc file `portfolio_work_kinetic_cinema_v2.md` này như một đặc tả thiết kế.
>
> **Nhiệm vụ:** Làm lại nhánh `/work` theo concept **KINETIC CINEMA**. Không sao chép bố cục ảnh trái / nội dung phải từ nhánh Personal; không sử dụng dashboard hay bento grid làm cấu trúc chính. Nhánh Personal giữ nguyên.
>
> **Visual:** graphite, cream, electric accent; chữ editorial lớn; các khung screenshot dự án có chiều sâu 2.5D. Có nhịp chuyển cảnh sáng/tối, kinetic typography, project orbit, frame morph và các project world khác nhau.
>
> **Motion:** chú trọng choreography mượt và phản hồi nhanh. Dùng Motion cho tương tác nhỏ, GSAP ScrollTrigger cho sequence scroll giới hạn. Không sử dụng smooth-scroll hijacking mặc định. Chú ý rAF, transform/opacity, lazy load, cleanup, tránh memory leaks. Tương thích reduced motion và mobile.
>
> **Content:** đọc dữ liệu dự án hiện có trong repo; không bịa dự án, kinh nghiệm hay kết quả. Nếu thiếu dữ liệu/ảnh, tạo cấu trúc placeholder rõ ràng và đề xuất asset cần cung cấp.
>
> **Workflow:** (1) khảo sát cấu trúc repo hiện tại; (2) ghi kế hoạch file cần thay đổi; (3) dựng Work tĩnh responsive; (4) triển khai W01 và W03 trước; (5) mở rộng các cảnh; (6) kiểm tra build/lint; (7) giải thích cách cập nhật dữ liệu và ảnh. Giữ routes và nội dung đang hoạt động, tránh phá site cũ.
>
> **Tiêu chí hoàn thành:** motion rõ nét nhưng không giật, người xem có thể bấm `Projects`/`CV`/`Contact` ngay, khác biệt hẳn với Personal, hoạt động tốt trên mobile, không có scroll-jacking và không tạo lời giới thiệu sai sự thật.

---

## 12. Chốt phong cách mới trong một câu

> **Personal là một câu chuyện để đọc; Work là một không gian chuyển động để bước vào.** Những dự án không chỉ được liệt kê — chúng đi từ ý tưởng, qua quá trình tạo ra, tới một kết quả mà người xem có thể nhìn thấy và kiểm chứng.
