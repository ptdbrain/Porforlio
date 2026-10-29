# PORTFOLIO 2.0 — KỊCH BẢN THIẾT KẾ LẠI NHÁNH WORK

**Concept:** `PERSONAL = A VISUAL DIARY` · `WORK = AN INTERACTIVE ENGINEERING STUDIO`  
**Bản:** 1.0 — Design & Motion Brief  
**Phạm vi:** Thiết kế lại cách kể chuyện, bố cục và tương tác của nhánh **Work**; giữ triết lý của nhánh **Personal**.

> **Tuyên ngôn thiết kế:** Ở Personal, người xem *đọc câu chuyện về tôi*. Ở Work, người xem *khám phá những gì tôi đã xây dựng*.

---

## 1. Quyết định thiết kế quan trọng nhất

Không dùng chung công thức **“ảnh bên trái được giữ cố định + cuộn nội dung bên phải + ảnh đổi theo”** cho cả hai nhánh.

- **Personal / Who I Am:** Một cuốn nhật ký có nhịp điệu tuyến tính. Timeline đi qua THCS → THPT → Đại học → hiện tại; ảnh và ký ức dẫn dắt. Có thể giữ sticky photo + scrolling narrative ở khu vực hành trình vì nó hợp với kể chuyện theo thời gian.
- **Work / What I Build:** Một **studio triển lãm sản phẩm kỹ thuật**. Người xem nhìn thấy toàn cảnh năng lực, chủ động chọn dự án, mở kiến trúc, xem thử nghiệm, lọc sản phẩm và đi tới case study. Trang đổi bố cục theo nội dung, không lặp một motif ở mọi section.

### Sự khác biệt trong 5 giây đầu

| Tiêu chí | Personal | Work |
|---|---|---|
| Cảm giác | Ấm áp, đời thường, ký ức | Sắc nét, khám phá, kỹ thuật |
| Cách đọc | Theo trục thời gian | Theo câu hỏi: *Bạn đã làm gì? Làm thế nào? Kết quả ra sao?* |
| Bố cục chủ đạo | Storyline + photo timeline | Hero typography, bento map, fullscreen showcase, architecture canvas, project library |
| Hình ảnh | Chân dung, trường học, thể thao, kỷ niệm | Screenshot thật, demo, system diagram, ảnh làm việc, biểu đồ kết quả |
| Tương tác | Cuộn và khám phá câu chuyện | Chọn, mở rộng, lọc, chuyển tab, xem case study |
| Chuyển động | Êm, chậm, giàu cảm xúc | Dứt khoát, phản hồi nhanh, có logic hệ thống |

**Không biến Work thành một dashboard quản trị, một bản sao GitHub hoặc màn hình hacker.** Đây vẫn là portfolio nghệ thuật, chỉ sử dụng ngôn ngữ của hệ thống kỹ thuật để làm rõ giá trị chuyên môn.

---

## 2. Hệ thống hình ảnh mới: THE BUILD STUDIO

### Tinh thần

**Editorial + Product Showcase + Interactive Technical Canvas**.

- Nền chính: xanh đen rất sâu `#0B111B`; các section có thể đổi sang trắng lạnh `#F3F7FB` để tạo nhịp tương phản.
- Accent chính: xanh lam nhạt `#75C8FF`; accent phụ cực tiết chế là tím xanh `#9C9AFF`.
- Chữ lớn, khoảng trắng rộng, đường kẻ mảnh, nhãn mono kích thước nhỏ; **không phủ lưới và hạt chuyển động lên mọi khu vực**.
- Mỗi dự án có một *hero visual* riêng: ảnh sản phẩm, demo, sơ đồ hoặc kết quả. Không dùng cùng một mockup laptop cho tất cả dự án.
- Hình ảnh thật phải được ưu tiên hơn các khối 3D trang trí.

### Thành phần giao diện xuyên suốt

**Top bar (sticky, rất gọn):** `PTD.` · `Work` · `Personal` · `Projects` · `Resume` · `Contact`.

**Section index:** Ở desktop, góc trên hoặc lề nhỏ hiển thị nhãn `01 / INTRO`, `02 / SELECTED BUILDS`… nhưng không chiếm cả cột.

**Cursor:** Giữ con trỏ hệ điều hành. Chỉ dùng hover state, không tạo custom cursor quá lớn.

**Chuyển mode:** Khi từ Home chọn Work, mảng màu xanh đen của Work mở rộng ra toàn màn hình; ảnh dự án nổi lên trước, rồi mới đến nội dung. Khi chuyển sang Personal, chuyển sắc độ sang tông ấm. Hai nhánh có điểm liên kết nhưng không phụ thuộc vào việc người xem phải đi hết một hành trình.

---

## 3. User journey của nhánh Work

```text
HOME / TWO PATHS
       |
       v
WORK — THE BUILD STUDIO
       |
       +--> [01] Hero: Tôi xây dựng những gì?
       |
       +--> [02] Capability Map: Bản đồ năng lực có thể tương tác
       |
       +--> [03] Featured Builds: 3 dự án / 3 hình thức trình diễn KHÁC NHAU
       |        |            |             |
       |     Fullscreen   Blueprint     Product Demo
       |
       +--> [04] Project Library: Kho dự án có lọc và tìm kiếm
       |
       +--> [05] Inside the Build: Tư duy giải bài toán và kiến trúc
       |
       +--> [06] Experience: Những đóng góp theo dạng release log
       |
       +--> [07] Skills x Evidence: Kỹ năng liên kết tới dự án chứng minh
       |
       +--> [08] The Lab: Hiện đang học, thử nghiệm và phát triển gì?
       |
       +--> [09] Next Mission: Định hướng công việc và lời mời hợp tác
       |
       +--> CONTACT / RESUME / GITHUB
```

> Nguyên tắc UX: nhà tuyển dụng cần đến **Projects** và **CV** trong một thao tác từ Hero. Người muốn xem sâu có thể đi xuyên suốt toàn bộ trải nghiệm.

---

## 4. Storyboard chi tiết

### SCENE W01 — HERO: “I DON'T JUST WRITE CODE. I BUILD SYSTEMS.”

**Mục tiêu:** Trong 5–8 giây, người xem hiểu bạn theo đuổi lĩnh vực nào và nên khám phá gì tiếp theo.

**Bố cục desktop:**

- Không chia thành cột ảnh trái – chữ phải.
- Nửa trên màn hình là typography lớn, chiếm gần toàn bộ chiều ngang:

  ```text
  PTD.                                    WORK  PERSONAL  CV

  AI ENGINEERING / SOFTWARE / RESEARCH

  I BUILD
  THINGS THAT
  THINK & WORK.

  [ EXPLORE PROJECTS ]      [ DOWNLOAD CV ]

  CURRENT FOCUS: [LĨNH VỰC THẬT]        [AVAILABLE FOR ...]
  ```

- Bên dưới headline, trải rộng chiều ngang là **một visual strip**: ba khung ảnh/screenshot nổi bật của ba dự án, kích thước không đều và có chiều sâu nhẹ. Chúng giống một góc nhìn vào studio, không phải carousel tự chạy.
- Cuối màn hình có dòng nhỏ `Scroll to inspect the work`.

**Chuyển động:**

1. Nền và logo xuất hiện ngay; tránh màn chờ loading giả.
2. Headline được hé lộ theo từng dòng bằng mask từ dưới lên, mỗi dòng lệch 90–120ms.
3. Ba ảnh dự án xuất hiện lần lượt với `opacity 0 → 1`, `translateY 28px → 0`, `scale 0.97 → 1`.
4. Khi rê vào từng ảnh, các ảnh còn lại giảm độ sáng rất nhẹ; tên dự án và loại dự án hiện ở góc, không có chữ bay theo con trỏ.
5. Click ảnh chuyển tới case study tương ứng (hoạt động thật, không phải trang trí).

**Mobile:** Chữ tự co bằng `clamp()`, các ảnh xếp dạng hai ảnh ngang + một ảnh rộng; hai nút CTA luôn nhìn thấy trong màn đầu hoặc ngay bên dưới tiêu đề.

**Ảnh cần chuẩn bị:** 1 screenshot tốt cho mỗi dự án featured; 1 ảnh chân dung công việc chỉ dùng nếu phù hợp. Nếu chưa có screenshot đẹp, dùng sơ đồ/ảnh kết quả thật.

---

### SCENE W02 — CAPABILITY MAP: “WHAT I CAN BUILD”

**Mục tiêu:** Cho xem toàn cảnh chuyên môn bằng **bento grid tương tác**, thay vì list kỹ năng và sticky image.

**Bố cục:** Một grid 12 cột rộng rãi, có 4–6 ô không đều. Ví dụ (chỉ giữ nhóm nào phản ánh năng lực thật):

```text
+-------------------------------+---------------------+
| AI / MODEL ENGINEERING        | NLP / LLM SYSTEMS   |
| mô hình + visual nhỏ          | use cases / stack   |
|                               +---------------------+
+----------------+--------------+---------------------+
| SPEECH AI      | BACKEND & APIs              | RESEARCH |
| waveform mini  | sơ đồ dịch vụ              | evaluate |
+----------------+----------------------------+----------+
```

**Mỗi ô có 3 lớp thông tin:**

- **At rest:** Tên năng lực, 1 câu mô tả rõ người xem nhận được giá trị gì.
- **Hover/focus:** Xuất hiện hình ảnh/đồ họa nhỏ tương ứng và dòng `Used in 3 projects` (chỉ hiện số thật).
- **Click:** Mở một panel gọn bên trong ô hoặc dẫn tới **các dự án đã dùng kỹ năng đó**; ví dụ chọn `Speech AI` thì highlights liên quan phía dưới được gắn sáng.

**Chuyển động:** Grid vào theo từng cụm, không stagger toàn bộ 10 ô. Hover đổi viền, nền và scale hình bên trong `1 → 1.03` trong 250ms. Khi chọn một ô, các mối liên hệ được nhấn rõ, không tự di chuyển cả trang.

**Điểm khác với Personal:** Người xem **điều khiển thông tin**, không bị đưa qua ảnh theo một đường cuộn cố định.

---

### SCENE W03 — FEATURED BUILDS: 3 PROJECTS, 3 VISUAL GRAMMARS

Đây là **điểm khác biệt lớn nhất**. Không làm ba card giống nhau; không biến mỗi project thành một lần lặp `ảnh trái / chữ phải`.

#### Project 01 — CINEMATIC FULL-BLEED / THE FLAGSHIP

**Dùng cho:** dự án có sản phẩm trực quan hoặc screenshot demo mạnh nhất.

**Bố cục:** Ảnh hoặc video muted của sản phẩm **tràn ngang màn hình**, không có cột bên trái/bên phải. Tên dự án nằm trực tiếp trên vùng phủ nền tối có độ tương phản tốt. Bên dưới là 3 nhãn ngắn: `Problem` · `My Role` · `Outcome`.

```text
+-------------------------------------------------------+
|                                                       |
|              [FULL-WIDTH PRODUCT VISUAL]              |
|                                                       |
|       PROJECT 01 / [TITLE]                            |
|       [ONE-LINE VALUE PROPOSITION]                    |
|                                                       |
|  [PROBLEM]   [MY ROLE]   [OUTCOME]    [VIEW CASE]      |
+-------------------------------------------------------+
```

**Chuyển động khi cuộn:** Ảnh bắt đầu ở khung bo góc 92–96% chiều rộng, mở dần thành full-bleed; nền phủ đậm dần đúng mức để chữ vẫn rõ. Không dùng zoom vô hạn. Khi cuộn tiếp, các nhãn nổi lên từ dưới, rồi nhường vị trí cho section tiếp theo. Click `VIEW CASE STUDY` mở trang dự án riêng.

**Đặc trưng:** cảm giác ra mắt một sản phẩm (product launch).

#### Project 02 — SYSTEM BLUEPRINT / THE TECHNICAL CHALLENGE

**Dùng cho:** dự án có pipeline, mô hình, dữ liệu hoặc kiến trúc đáng kể.

**Bố cục:** Một **canvas sơ đồ hệ thống toàn chiều ngang** trên nền sáng lạnh, như bản thiết kế kỹ thuật. Tên dự án nhỏ gọn phía trên. Trung tâm là các node nối theo pipeline thực tế, ví dụ:

```text
            [PROJECT 02 / TITLE]

 [INPUT] ---> [PREPROCESS] ---> [MODEL] ---> [EVALUATE]
    |               |              |             |
    +---- click xem từng quyết định kỹ thuật -----+

        [MY CONTRIBUTION]  [RESULTS]  [CASE STUDY]
```

**Tương tác:**

- Người xem chọn một node để mở một **technical detail drawer** bên dưới/ở cạnh canvas, có sơ đồ nhỏ, dữ liệu, cách giải quyết và ảnh minh chứng.
- Node được chọn sáng lên; các đường nối liên quan được làm đậm, còn các đường khác giảm opacity.
- Nút `View Full Architecture` mở case study. Không làm sơ đồ có các node di chuyển tự do khó điều khiển.

**Chuyển động:** Node xuất hiện theo thứ tự logic trong 700–1100ms tổng cộng; một xung sáng chạy **một lần** trên đường nối để mô tả luồng dữ liệu. Sau đó hệ thống đứng yên, chỉ phản hồi khi hover/click.

**Đặc trưng:** người xem thấy bạn hiểu *how it works*, không chỉ trưng bày bề ngoài.

#### Project 03 — PRODUCT DEMO REEL / THE CREATIVE BUILD

**Dùng cho:** web app, developer tool, AI agent có nhiều trạng thái UI hoặc nhiều tính năng.

**Bố cục:** Một sân khấu demo gồm **các khung sản phẩm có thể duyệt bằng nút mũi tên / touch swipe**. Phía dưới visual là 3–4 tab `01 Overview`, `02 Interaction`, `03 Result`, `04 Tech`. Mỗi tab đổi screenshot hoặc video ngắn và 1–2 câu mô tả.

**Tương tác:** Mỗi khung hình có nhãn rõ, phím mũi tên hoạt động khi gallery được focus; có nút Previous/Next thật. Không auto-play carousel. Nút `Live Demo` hoặc `Source` chỉ hiện khi có URL chính xác.

**Chuyển động:** Chuyển giữa screenshot bằng clip mask ngang hoặc crossfade 300–450ms; chuyển tab thì thay nội dung không làm dịch chuyển layout lớn.

**Đặc trưng:** cảm giác chạm vào một sản phẩm thật, khác hoàn toàn kiểu timeline.

#### Quy tắc chọn featured

- **01:** Hoàn thiện tốt, ảnh đẹp và giá trị dễ hiểu.
- **02:** Độ sâu kỹ thuật, thể hiện quy trình giải quyết bài toán.
- **03:** Tính tương tác hoặc trải nghiệm sản phẩm.
- Nếu mới có 1–2 dự án đủ mạnh, chỉ dựng 1–2 showcase; không cố thêm project yếu để đủ ba kiểu.
- Mỗi featured luôn hiển thị: **tên, bài toán, vai trò thật, trạng thái, năm, liên kết case study**.

---

### SCENE W04 — PROJECT LIBRARY: “ALL BUILDS, ONE PLACE”

**Mục tiêu:** Liệt kê toàn bộ dự án, cho nhà tuyển dụng duyệt nhanh và tìm đúng mảng quan tâm.

**Bố cục:** Chuyển từ showcase đậm chất điện ảnh sang một **kho dự án sáng, gọn, rất đọc được**. Sử dụng grid bento 2–3 cột, nhưng các project card ở đây vẫn có cấu trúc nhất quán để dễ so sánh.

**Thanh công cụ:** `All | AI/ML | NLP/LLM | Speech | Software | Research` + ô tìm kiếm nhỏ nếu đủ nhiều dự án. Các category thực tế được tạo từ dữ liệu, không gắn nhãn cho đẹp.

**Card gồm:** preview thật, tên, một câu về bài toán, stack cốt lõi, `Role`, `Year`, `Status` và nút `View Case Study` hoặc `View Details`.

**Interaction:**

- Filter thay đổi thẻ bằng layout animation 250–350ms; giữ thứ tự có chủ đích.
- Hover phóng to preview bên trong card 1.02, không scale toàn bộ card quá nhiều.
- Nếu có nhiều dự án, thêm phân trang hoặc `Load more` thay vì render hết mọi thứ ngay.
- Trạng thái dự án rõ ràng: **Shipped / Prototype / In Progress / Research**. Không trình bày ý tưởng đang nghiên cứu như sản phẩm đã hoàn thành.

**Mobile:** 1 cột, thanh filter kéo ngang có dấu hiệu cuộn, nút xem rõ ràng.

---

### SCENE W05 — INSIDE THE BUILD: “HOW I THINK”

**Mục tiêu:** Kể về **cách tư duy giải bài toán** mà không lặp lại case study dài của từng dự án.

**Bố cục:** Một **interactive technical canvas**, rộng theo chiều ngang, chia 5 giai đoạn:

`Understand → Research → Prototype → Evaluate → Improve`

Khác với timeline đời sống: đây không phải lịch sử theo năm; đây là quy trình kỹ thuật. Mỗi giai đoạn là một **module có thể mở** với một ví dụ thực tế từ một dự án được chọn.

**Ý tưởng trải nghiệm:** Đầu section chọn một case study mẫu bằng dropdown/tabs. Canvas cập nhật 5 bước của dự án đó. Ví dụ chọn *[Dự án NLP]*, người xem thấy bài toán, cách chọn mô hình, thử nghiệm, metric đánh giá và quyết định cải tiến. Chọn *[Dự án Speech]*, canvas đổi sang bằng chứng tương ứng.

**Chuyển động:** Khi chọn giai đoạn, module đó nở nhẹ theo chiều cao, đoạn nội dung và screenshot hiện dần; các giai đoạn khác vẫn thấy được. Đường kết nối chỉ highlight theo giai đoạn, không chạy loop. Không tạo giá trị đánh giá hoặc metric giả.

**Giới hạn:** Chỉ làm interactive canvas nếu có dữ liệu thật tương đối đầy đủ. Nếu chưa đủ, dùng 3–5 case notes dạng bài ngắn có hình minh họa.

---

### SCENE W06 — EXPERIENCE: “A LOG OF WHAT I'VE CONTRIBUTED”

**Mục tiêu:** Cho thấy nơi đã làm việc, các nhóm từng tham gia và đóng góp thực tế.

**Ý tưởng hình thức:** **Release log / Layered dossiers**, không phải timeline với ảnh cố định.

**Bố cục:** Một dãy thẻ ngang toàn chiều rộng, xếp theo thời gian mới nhất trước. Mỗi thẻ giống một hồ sơ công việc với mã `EXPERIENCE / 01`, khoảng thời gian, tổ chức, vai trò, mô tả vấn đề và điểm nổi bật. Các thẻ có thể mở rộng kiểu accordion.

```text
EXPERIENCE / 01    [PERIOD]    [ROLE] @ [ORGANIZATION]   [+]
EXPERIENCE / 02    [PERIOD]    [ROLE] @ [ORGANIZATION]   [+]
EXPERIENCE / 03    [PERIOD]    [ROLE] @ [ORGANIZATION]   [+]
```

**Khi mở thẻ:** Hiển thị 3 vùng con theo hàng hoặc stack responsive:

1. **Challenge:** Bài toán / công việc.
2. **Contribution:** Bạn trực tiếp làm gì.
3. **Evidence:** Kết quả, link, ảnh nhóm hoặc dự án liên quan.

**Chuyển động:** Thẻ mở theo chiều cao 350–450ms; nội dung xuất hiện bằng fade 150–250ms. Một đường accent sáng chạy ở mép thẻ được chọn. Không có sticky photo và không cần dùng parallax.

**Lưu ý nội dung:** Tách *employment*, *internship*, *research collaboration*, *competition* hoặc *student team* bằng nhãn chính xác; không gọi mọi hoạt động là kinh nghiệm làm việc ở công ty.

---

### SCENE W07 — SKILLS × EVIDENCE: “SHOW, DON'T CLAIM”

**Mục tiêu:** Biến kỹ năng thành một đồ thị có bằng chứng, không sử dụng thanh phần trăm tự đánh giá.

**Bố cục:** Trên desktop dùng **ma trận công nghệ–dự án**, tương tự một bản đồ liên kết:

```text
                  [PROJECT A]   [PROJECT B]   [PROJECT C]
 Python                ●             ●             ●
 PyTorch               ●             ●             -
 FastAPI               ●             -             ●
 [OTHER TECH]          -             ●             -
```

Đây là minh họa cấu trúc; danh sách công nghệ phải theo dự án thật.

**Tương tác:** Chọn một kỹ năng (ví dụ PyTorch), các dự án có sử dụng nó được nhấn sáng và xuất hiện một caption ngắn: **Đã dùng để làm gì?**. Chọn dự án có thể dẫn tới phần implementation trong case study.

**Chuyển động:** Các đường liên kết highlight 200–300ms, không vẽ network 3D với hàng trăm particle. Trên mobile chuyển thành danh sách kỹ năng dạng accordion, bên trong là các dự án chứng minh.

**Giá trị:** Nhà tuyển dụng kiểm tra được năng lực trong một hoặc hai thao tác.

---

### SCENE W08 — THE LAB: “CURRENTLY EXPLORING”

**Mục tiêu:** Cho người xem thấy bạn vẫn đang nghiên cứu, học và phát triển các ý tưởng mới.

**Bố cục:** Một **workbench / board** gồm ba cột trên desktop:

`LEARNING` · `BUILDING` · `EXPERIMENTING`

Mỗi mục là một mảnh nhật ký kỹ thuật có tiêu đề, mục tiêu, trạng thái, lần cập nhật và một ảnh minh chứng nhỏ (screenshot, notebook, demo, biểu đồ). Có thể mở rộng để đọc thử nghiệm và bài học.

**Đặc điểm khác biệt:** Đây không phải Kanban quản lý task nội bộ; không lộ công việc riêng tư. Nó là **public lab notebook** tuyển chọn, chỉ chia sẻ những gì bạn thực sự muốn công khai.

**Chuyển động:** Các thẻ nổi nhẹ lên khi vào khung nhìn; hover/focus cho thấy caption. Không tự cập nhật số liệu 'live' nếu dữ liệu không thực sự được đồng bộ. Phần `Last updated` lấy từ ngày cập nhật thật.

**Mobile:** Ba cột chuyển thành ba nhóm xếp dọc, không yêu cầu kéo ngang để đọc hết.

---

### SCENE W09 — NEXT MISSION: “WHAT I WANT TO BUILD NEXT”

**Mục tiêu:** Kết nối năng lực đã thể hiện với định hướng nghề nghiệp và cơ hội hợp tác.

**Bố cục:** Một màn hình tương đối tĩnh, có khoảng thở. Ở giữa là headline lớn:

> **I'm looking for problems worth solving.**

Dưới đó là hai khối song song:

- **Next 12–24 months:** Vai trò muốn ứng tuyển, kỹ năng muốn phát triển, loại bài toán quan tâm.
- **Long-term direction:** Hướng nghiên cứu/kỹ thuật lâu dài và loại sản phẩm muốn tạo ra.

Dòng `Open to: [role / opportunity]` chỉ hiển thị khi đúng tình trạng hiện tại, có ngày cập nhật.

**Chuyển động:** Một đường hình học mảnh nối hai khối từ hiện tại tới tương lai khi cuộn vào; giới hạn 600ms, không cần 3D.

---

### SCENE W10 — CONTACT: “LET'S BUILD SOMETHING MEANINGFUL.”

**Mục tiêu:** Kết thúc hành trình kỹ thuật bằng một lời mời cụ thể.

**Bố cục:** Chữ lớn toàn chiều ngang, dưới là Email / GitHub / LinkedIn / Download CV. Có một đường link nhỏ `Meet the person behind the work →` dẫn sang Personal.

**Chuyển động:** Accent xanh dần hòa vào màu trung tính của footer chung giữa hai nhánh. Các CTA phản hồi hover/focus đơn giản, không dùng hiệu ứng làm mất khả năng đọc.

---

## 5. Thiết kế riêng cho TRANG CHI TIẾT DỰ ÁN

Trang case study **không dùng template ảnh cố định bên trái, chữ cuộn bên phải**. Dùng cấu trúc **product case study**, nhưng tổ chức theo từng module linh hoạt:

1. **Hero full-width:** Tên, vấn đề một câu, ảnh/demo lớn, vai trò, thời gian, trạng thái.
2. **Problem statement:** Khối chữ ngắn, số liệu hoặc ảnh ngữ cảnh nếu có.
3. **System overview:** Sơ đồ pipeline tương tác có chú thích; người xem có thể chọn thành phần.
4. **Technical decisions:** Các khối `Why this approach?`, `Alternatives`, `Trade-offs`.
5. **Implementation gallery:** Ảnh pipeline, UI, logs hoặc snippet ngắn; trình bày dạng mosaic và caption, không đổ hết code lên trang.
6. **Results & evidence:** Metrics thật, phương pháp đánh giá, phạm vi kiểm thử, demo, link.
7. **What didn't work:** Thử nghiệm thất bại, vấn đề và cách sửa. Đây là phần thể hiện độ sâu kỹ thuật.
8. **Lessons & next steps:** Tổng kết ngắn, liên kết dự án kế tiếp.

**Mỗi dự án có thể khác nhau về bố cục:** dự án NLP thiên về pipeline và evaluation; web app thiên về demo và UX; nghiên cứu thiên về phương pháp–thí nghiệm–kết quả. Giữ một design system, không ép mọi dự án có 8 phần nếu dữ liệu không đủ.

---

## 6. Motion language: Động, nhưng phải có ý nghĩa

### Motion tokens

| Tình huống | Hiệu ứng | Thời lượng tham khảo |
|---|---|---:|
| Hero headline | Mask reveal theo dòng, lệch nhịp | 600–900ms |
| Bento enter | Fade + translateY 16–24px | 450–600ms |
| Bento hover | Border glow nhẹ, preview scale 1.02 | 220–300ms |
| Full-bleed flagship | Khung bo góc mở ra, zoom tối đa 1.04 | Theo cuộn, có giới hạn |
| Blueprint nodes | Xuất hiện theo chuỗi logic | 700–1100ms tổng |
| Blueprint node select | Highlight đường nối + detail panel | 250–400ms |
| Demo reel | Slide/crossfade | 300–450ms |
| Project filter | Layout reflow mượt | 250–350ms |
| Experience expand | Accordion / content fade | 350–450ms |
| Skills highlight | Emphasize liên kết | 200–300ms |
| Route transition | Màu và thành phần chủ đạo chuyển tiếp | 500–750ms |

**Easing gợi ý:** `cubic-bezier(0.22, 1, 0.36, 1)` cho reveal; easing nhanh hơn cho phản hồi hover.

### Các luật không được phá

- **Không scroll hijacking**: người xem vẫn cuộn bình thường, không phải cuộn 5 lần để qua một slide.
- **Không lặp sticky image + right text** ở nhánh Work; chỉ giữ sticky top navigation nếu cần.
- **Không auto-play carousel**; video tự phát chỉ khi muted, có kiểm soát và thực sự cần thiết.
- **Không motion liên tục** ở nền; nên ưu tiên hiệu ứng chỉ diễn ra khi tương tác hoặc khi xuất hiện.
- **Không fake metrics, fake terminal, fake activity feed**. Mọi kết quả dự án và trạng thái đang làm việc phải là thông tin thật.
- Hỗ trợ `prefers-reduced-motion`: tắt parallax, clip animation phức tạp, chuyển sang fade/instant.
- Không giấu thông tin quan trọng bên trong hover-only. Touch và keyboard vẫn truy cập được.

---

## 7. Thiết kế mobile: Work không được biến thành bản rút gọn khó dùng

| Thành phần desktop | Mobile tương ứng |
|---|---|
| Typography lớn + visual strip | Headline ngắn, 1 visual lớn + 2 ảnh nhỏ, không tràn ngang |
| Bento 12 cột | Card 1 cột hoặc 2 cột tùy kích thước, click để mở |
| Full-bleed flagship | Ảnh 4:5 hoặc 16:9, tiêu đề tách khỏi ảnh nếu thiếu tương phản |
| Interactive blueprint canvas | Sơ đồ dọc theo bước, các node thành accordion |
| Product demo reel | Swipe + nút mũi tên + tab rõ ràng |
| Project library 3 cột | 1 cột, filter cuộn ngang có chỉ báo |
| Experience dossiers | Accordion toàn chiều ngang |
| Skill matrix | Nhóm kỹ năng → danh sách dự án liên quan |
| The Lab 3 cột | Các nhóm xếp dọc |

**Breakpoints tham khảo:** mobile `<768px`, tablet `768–1023px`, desktop `≥1024px` — điều chỉnh theo nội dung thực tế. Mọi tương tác cần thử trên cả chuột, bàn phím và màn hình cảm ứng.

---

## 8. Bộ ảnh và tài nguyên cần chuẩn bị cho Work

| Tài nguyên | Cần cho | Mức ưu tiên |
|---|---|---|
| 3 screenshot/demo tốt nhất | Hero visual strip + Featured | Rất cao |
| Screenshot giao diện, kiến trúc, kết quả của từng dự án | Case study | Rất cao |
| Mô tả ngắn: problem / role / outcome | Thẻ dự án và case study | Bắt buộc |
| Sơ đồ pipeline thực tế | Blueprint + Inside the Build | Cao |
| Ảnh nhóm, buổi thuyết trình, làm việc | Experience | Trung bình |
| Biểu đồ/metric đánh giá có nguồn từ thử nghiệm | Results | Cao nếu có |
| Ảnh notebook, log, demo prototype | The Lab | Trung bình |
| CV cập nhật và link GitHub/LinkedIn | Header + Contact | Bắt buộc |

**Chất lượng nội dung quyết định layout:** Nếu một dự án không có ảnh sản phẩm, hãy dùng sơ đồ kỹ thuật hoặc hình kết quả; không lấp bằng hình AI giả. Nếu chưa có số liệu đánh giá, mô tả bằng kết quả định tính có giới hạn rõ ràng.

---

## 9. Cách triển khai kỹ thuật

**Stack gợi ý nếu dùng Next.js:** Next.js + TypeScript + Tailwind + Motion for React; chỉ thêm GSAP/ScrollTrigger cho đoạn flagship scroll reveal nếu thực sự cần. Canvas kiến trúc nên là SVG có node tương tác, không bắt buộc Three.js.

### Component map

```text
app/
  work/page.tsx
  projects/[slug]/page.tsx

components/work/
  WorkHero.tsx
  CapabilityBento.tsx
  FeaturedFlagship.tsx
  FeaturedBlueprint.tsx
  FeaturedDemoReel.tsx
  ProjectLibrary.tsx
  ProblemSolvingCanvas.tsx
  ExperienceDossiers.tsx
  SkillsEvidenceMatrix.tsx
  PublicLabBoard.tsx
  CareerDirection.tsx
  WorkContact.tsx

components/motion/
  Reveal.tsx
  SectionTransition.tsx
  ReducedMotionBoundary.tsx

content/
  projects.ts
  experiences.ts
  capabilities.ts
  lab.ts
```

### Dữ liệu tối thiểu cho một dự án

```ts
type Project = {
  slug: string;
  title: string;
  summary: string;
  year: number | string;
  status: 'shipped' | 'prototype' | 'in-progress' | 'research';
  category: string[];
  technologies: string[];
  role: string;
  problem: string;
  contribution: string[];
  outcomes: string[]; // chỉ ghi điều có bằng chứng
  coverImage?: string;
  demoUrl?: string;
  repoUrl?: string;
  caseStudySections?: unknown[];
};
```

Dữ liệu và layout tách riêng để sau này bạn bổ sung dự án không cần sửa toàn bộ giao diện. Ngoài ra cần xử lý lazy loading ảnh/video, metadata/OG image riêng, keyboard focus, alt text, tốc độ tải và tránh layout shift.

---

## 10. Điều chỉnh nhịp tổng thể giữa hai hướng

**Personal:**

```text
Ảnh thật → Ký ức → Mốc thời gian → Kỷ niệm → Con người hiện tại → Ước mơ
      (mềm, sâu, liên tục, thiên về đọc và ngắm)
```

**Work:**

```text
Tuyên ngôn mạnh
  ↓
Bản đồ năng lực (tương tác)
  ↓
Sản phẩm chủ lực (full-bleed)
  ↓
Sơ đồ hệ thống (chọn node)
  ↓
Demo sản phẩm (đổi tab)
  ↓
Kho dự án (lọc / tìm)
  ↓
Kinh nghiệm (mở hồ sơ)
  ↓
Kỹ năng × Bằng chứng (chọn và đối chiếu)
  ↓
The Lab (đang xây gì?)
  ↓
Định hướng → Liên hệ
      (nhanh, rõ, nhiều hình thức khám phá)
```

**Ý tưởng cốt lõi:** Work không phải một cuộn timeline thứ hai. Nó là một **triển lãm sống về sản phẩm và tư duy kỹ thuật**, trong đó mỗi khối giao diện có một lý do tồn tại, một hình thức tương tác riêng và một loại bằng chứng cụ thể.

---

## 11. Tiêu chí nghiệm thu bản thiết kế

- [ ] Khách truy cập hiểu hướng nghề nghiệp trong 5–8 giây đầu.
- [ ] Có thể tới danh sách dự án và CV bằng tối đa một thao tác từ Work Hero.
- [ ] Nhánh Work **không tái sử dụng** pattern timeline ảnh trái / nội dung phải.
- [ ] Ba dự án featured (nếu đủ) có **ba bố cục thực sự khác nhau**.
- [ ] Mỗi dự án hiển thị rõ bài toán, vai trò, kết quả và tình trạng.
- [ ] Không có số liệu, giải thưởng, vị trí hoặc kinh nghiệm bịa đặt.
- [ ] Filter, tabs, node diagram, accordion đều tương tác thật.
- [ ] Trên mobile không cần hover và không có cuộn ngang bất đắc dĩ.
- [ ] Hiệu ứng có reduced-motion fallback, không cản trở đọc nội dung.
- [ ] Sau khi xem Work, người xem muốn tìm hiểu thêm về con người bạn qua liên kết Personal.

---

## 12. Prompt bàn giao ngắn cho Codex CLI

> Hãy refactor nhánh `/work` của portfolio theo bản đặc tả này. Giữ nguyên tinh thần `/personal` như visual diary/timeline; nhánh Work phải khác về cấu trúc thông tin, bố cục và interaction. Không dùng pattern sticky image left + scrolling text right. Thay bằng editorial hero, interactive capability bento, 3 featured showcase độc lập (full-bleed cinematic, interactive architecture blueprint, product demo reel), project library có lọc, experience dossiers, skills-evidence matrix, public lab board, future/career và contact. Dữ liệu dự án phải tách riêng khỏi UI. Dùng ảnh và thông tin thật; placeholder chỉ dùng khi thiếu dữ liệu, không được tự tạo thành tích hay metric. Ưu tiên responsive, accessible, reduced motion, performance, SEO, clean components; không lạm dụng GSAP/3D. Triển khai theo từng section và kiểm tra trước khi chuyển tiếp.

**Kết luận:** **Personal kể tôi đã trở thành ai. Work chứng minh tôi có thể tạo ra điều gì.** Hai hướng có cùng một con người, nhưng tuyệt đối không cần cùng một khuôn bố cục.
