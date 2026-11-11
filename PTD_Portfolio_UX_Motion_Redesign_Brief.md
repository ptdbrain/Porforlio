# PTD. — Portfolio Experience & Motion Redesign Brief

**Website:** https://ptdbrain.vercel.app/  
**Ngôn ngữ:** Tiếng Việt (có bản EN tương ứng)  
**Định hướng:** Cinematic Editorial × Technical Precision  
**Mục tiêu:** Nâng cấp trải nghiệm, dẫn dắt hành trình xem, tăng chiều sâu hình ảnh và chuyển động — không biến portfolio thành một trang trình diễn hiệu ứng.

> **Ghi chú về phạm vi kiểm tra:** Đặc tả này dựa trên nội dung truy cập được của Home, Work, Personal và một số trang dự án. Chưa đo trực tiếp FPS, Lighthouse hoặc kiểm thử trực quan chi tiết ở từng kích thước màn hình. Coding agent phải kiểm tra lại trên repo và trình duyệt trước khi thay đổi.

---

## 1. Mục tiêu sản phẩm

Portfolio cần trả lời nhanh bốn câu hỏi:

1. **Bạn là ai?** Phan Trọng Đạt — người xây hệ thống AI kết nối dữ liệu, mô hình và sản phẩm.
2. **Bạn làm được gì?** NLP / LLM / RAG, Computer Vision, backend, data engineering và nghiên cứu thực nghiệm.
3. **Bằng chứng ở đâu?** EMNLP 2026, kinh nghiệm làm việc, featured projects, sơ đồ, demo, repo, báo cáo và đóng góp cá nhân được xác thực.
4. **Làm sao kết nối?** CV, email, GitHub, LinkedIn dễ thấy ở mọi nhánh.

Giữ ý tưởng trung tâm **“Một con người. Hai câu chuyện.”**, nhưng không tạo một ngã rẽ khiến người xem phải chọn quá sớm khi chưa thấy bằng chứng nổi bật. Tổng thể phải vừa có cảm xúc, vừa có tính chuyên nghiệp và đáng tin.

## 2. Hành trình truy cập mới

### 2.1. Home — ấn tượng → xác tín → lựa chọn → kết nối

Trật tự đề xuất:

1. **Hero ấn tượng:** typography lớn, ảnh chân dung thật, mô tả chuyên môn 1–2 dòng, CTA “Xem dự án nổi bật”, “Khám phá câu chuyện”, liên kết CV nhỏ rõ ràng.
2. **Selected Highlights:** 3 dấu ấn nổi bật dạng bằng chứng: nghiên cứu EMNLP 2026, công việc AI/backend, dự án tiêu biểu (chọn các yếu tố có nguồn xác minh, không tự chế số liệu).
3. **The Two Stories:** hai ô Work / Personal sử dụng ảnh thật, hover có chiều sâu, click chuyển cảnh có liên hệ hình ảnh.
4. **Featured Work Preview:** 2–3 dự án ưu tiên hiển thị hình sản phẩm/sơ đồ/kết quả; nếu quá dài có thể hợp nhất vào Selected Highlights.
5. **Contact Finale:** lời mời kết nối súc tích + email / CV / GitHub / LinkedIn.

Nếu cố giữ Home cực tối giản, chỉ chọn **một** trong hai khối Selected Highlights và Featured Work Preview; không cần cả hai khi nội dung trùng lặp.

### 2.2. Work — cho nhà tuyển dụng đọc lướt trong 10–20 giây

Thứ tự gợi ý:

1. Hero: nghề nghiệp/định hướng và câu mô tả giá trị.
2. **Proof Strip:** Publication / Experience / Focus, mỗi mục liên kết tới bằng chứng.
3. **Featured Projects (3–4 dự án):** chọn theo chất lượng bằng chứng và liên quan tới AI Engineering, không theo số lượng.
4. Experience: timeline có vai trò, đóng góp, kết quả và nguồn công khai phù hợp.
5. Capabilities: 4 nhóm năng lực đang có, thể hiện dưới dạng tab hoặc card tương tác, có ví dụ dự án liên kết trực tiếp.
6. Project Archive: giữ đủ **23 dự án** trong archive có lọc, tìm kiếm, trạng thái và phân trang / load more. Không ép người xem đọc 23 card liền một mạch.
7. CTA cuối: CV / Email / LinkedIn.

**Mỗi project card:** Thumbnail thật hoặc sơ đồ thực tế; tên; 1 câu mô tả bài toán; vai trò; 2–3 công nghệ chính; trạng thái “Research / Prototype / In progress / Released”; CTA “Xem case study”. Chú ý phân biệt demo/mock/benchmark, không đánh tráo kết quả.

### 2.3. Project Detail — kể một câu chuyện kỹ thuật có hình ảnh

Trật tự:

1. Hero lớn: tên dự án, tagline dễ hiểu, hero media, vai trò, thời gian, trạng thái.
2. **At a Glance:** Bài toán / Giải pháp / Vai trò cá nhân / Kết quả có chứng cứ.
3. Context & Constraints: bài toán và các ràng buộc.
4. System Story: sơ đồ pipeline/architecture giàu trực quan, phản hồi khi scroll theo từng bước.
5. Implementation: chọn 2–4 quyết định kỹ thuật tiêu biểu; mỗi quyết định có lý do / đánh đổi.
6. Evidence & Results: hình so sánh, dashboard, demo, chart hoặc artifact thực; nêu rõ phạm vi, phương pháp đo, hạn chế.
7. Challenges & Lessons: bài học cụ thể; nếu chưa có nội dung, **ẩn phần trống**, không để gạch ngang placeholder.
8. Resources: repo, paper, README, demo; cuối trang có **Next Project** với hình/typography và transition mượt.

Sidebar mục lục 8 phần hiện có nên rút thành 5–6 mốc lớn trên desktop để tránh rối; vẫn giữ anchor nội bộ. Trên mobile dùng nút “Trong trang này” dạng disclosure.

**Bằng chứng cần bổ sung ưu tiên:**
- LLMFeed: hình pipeline nghiên cứu, hình/chỉ số **đúng theo paper**, link paper nổi bật.
- AdverTest: ảnh giao diện compare, attack/clean visual và protocol; không dùng kết quả giả.
- MedTutor: UI hỏi đáp kèm trích dẫn, pipeline retrieve/rerank, ví dụ tài liệu đã được ẩn thông tin nhạy cảm.
- PRISM: biểu đồ ngân sách bit, sơ đồ các stage, và chú thích rõ giới hạn thực nghiệm.
- ParkingAI: UI dashboard hoặc ảnh luồng camera → AI workers → event → dashboard, nêu rõ demo/mock mode nếu có.

### 2.4. Personal — một câu chuyện, không phải bảng liệt kê giải thưởng

Flow mới:

1. **Portrait Intro:** ảnh người thật + giới thiệu gần gũi, ngắn.
2. **Chapter Timeline:** THCS → THPT → Đại học → Hiện tại, chỉ giữ ảnh/mốc quan trọng. Trên desktop có timeline sticky và chapter progress; trên mobile là dòng kể dọc tự nhiên.
3. **Defining Moments:** 3–5 khoảnh khắc chọn lọc; kết hợp hình ảnh, một câu chuyện, điều bạn học được. Thành tích khác chuyển thành archive gập/mở.
4. **Beyond the Screen:** thể thao, sở thích, các khoảnh khắc đời thường bằng gallery ảnh thật.
5. **Now / Next:** hiện đang học gì, xây gì, định hướng gì — chỉ công khai nội dung đã xác nhận. Nếu chưa sẵn sàng, **ẩn hẳn** phần thay vì giữ “—Chưa bổ sung”.
6. **Bridge to Work:** CTA “Đó là hành trình tạo nên tôi. Đây là những gì tôi đang xây dựng.”

Loại những phần lặp, mốc quá vụn hoặc placeholder. Không tự động chạy gallery làm người xem mất kiểm soát; hỗ trợ bàn phím, chạm, focus, caption ảnh.

### 2.5. Contact — kết thúc rõ hành động

Email là CTA chính; bên dưới GitHub, LinkedIn, CV. Nút copy email phải có trạng thái xác nhận, thông báo cho trình đọc màn hình. Nếu có form liên hệ, chỉ giữ khi có gửi thật, validation và chống spam; không dựng form chỉ để trang trông đầy hơn.

---

## 3. Art Direction

### Tinh thần thị giác

- **Editorial:** kiểu chữ lớn, khoảng trắng chủ đích, nhịp bố cục bất đối xứng có kiểm soát, ảnh chân dung thật.
- **Technical:** label nhỏ chính xác, sơ đồ hệ thống, số thứ tự, viền mảnh, typography monospace ở metadata.
- **Cinematic:** ảnh xuất hiện bằng mask reveal, có chiều sâu, chuyển cảnh liên tục nhưng nhẹ.
- **Premium minimal:** ít màu nhấn, không rainbow gradient, không particle background khắp nơi.

**Không đổi thương hiệu gốc một cách tuỳ tiện.** Agent phải đọc token màu/font/layout hiện tại, giữ nhận diện PTD., chỉ tinh chỉnh tương phản, nhịp khoảng trắng và size scale. Hai nhánh Work/Personal có thể phân biệt bằng sắc độ/ảnh/nhịp motion, không thành hai website hoàn toàn khác nhau.

### Hệ bố cục

- Desktop nội dung chính max-width khoảng 1200–1360px, nhiều khoảng thở; hero ảnh/tiêu đề bất đối xứng.
- Tablet: chuyển 2 cột sang 1 hoặc bố cục có tỷ lệ hợp lý; giữ CTA thấy ngay.
- Mobile: 1 cột, text không tràn, tránh sticky dài, tắt phụ thuộc hover.
- Tỷ lệ ảnh: chân dung 3:4 hoặc 4:5, project cover 16:9 hoặc 3:2, gallery kết hợp nhịp ngang/dọc.
- Không kéo dãn ảnh; dùng chất lượng ảnh hiện có, crops nhất quán; cho phép người dùng bấm mở ảnh gốc.

---

## 4. Motion Design System — phần quan trọng nhất

**Nguyên tắc:** Animation có mục đích dẫn mắt, chỉ hướng và nối mạch kể chuyện. Mỗi tương tác cần có trạng thái bắt đầu, đích đến và fallback. Không làm chậm thao tác thật.

### 4.1. Motion tokens đề xuất

| Loại | Thời lượng mục tiêu | Cảm giác |
|---|---:|---|
| Hover button/link | 160–240ms | Nhanh, chính xác |
| Card hover/photo zoom | 280–420ms | Mềm, có chiều sâu |
| Text reveal | 500–750ms | Editorial, theo nhịp |
| Image mask reveal | 650–950ms | Cinematic, không quá chậm |
| Section enter | 450–650ms | Nhẹ nhàng |
| Page exit | 160–250ms | Gọn, không chặn người dùng |
| Page enter | 350–550ms | Nhận diện trang mới |
| Shared-element transition | 500–800ms | Hình ảnh morph liên tục |
| Layout filter/reorder | 250–450ms | Không giật bố cục |

Dùng ease-out hoặc cubic-bezier tham khảo `(.22, 1, .36, 1)` cho enter; easing ngắn hơn cho hover. Giữ delay giữa các element khoảng 60–100ms và tổng thời gian chờ trước khi người dùng có thể tương tác là **0**.

### 4.2. Home Hero

- Khi load, eyebrow xuất hiện nhẹ, headline reveal từng dòng bằng vertical clip + opacity (không split từng ký tự gây rối), subheading và CTA stagger tinh tế.
- Chân dung được mở bằng **mask reveal**, đồng thời scale 1.06 → 1 và parallax 6–12px nếu thiết bị dùng chuột.
- CTA hover có underline/arrow slide 3–5px; có focus-visible tương đương.
- Scroll indicator có chuyển động rất nhẹ, ngừng khi user tương tác hoặc bật reduced motion.
- Tránh hiệu ứng gõ chữ, xoay 3D vô cớ, floating vô hạn.

### 4.3. Two Stories

- Hai hình Work/Personal khi vào viewport được reveal khác nhịp 80–120ms.
- Hover: ảnh scale 1 → 1.04, overlay thay đổi tinh tế, tiêu đề dịch 4–8px, mũi tên đổi vị trí. Không làm card nhảy gây layout shift.
- Khi click: nếu architecture cho phép, **ảnh card chuyển thành ảnh hero của trang đích** bằng shared element hoặc native view transition. Text trang cũ fade out nhanh, trang mới fade/slide vào; rollback/fallback khi không hỗ trợ.
- Cần thử back navigation, browser history, refresh deep-link và route cache.

### 4.4. Scrolling giữa các phần

- Section intro dùng IntersectionObserver/Motion whileInView: opacity 0→1; translateY 16–24px→0, chạy một lần, threshold phù hợp.
- Hình dùng container overflow hidden + scale 1.04→1 và clip/mask reveal; ảnh không bị đợi quá lâu mới thấy.
- Một đường progress mảnh ở header biểu thị tiến độ đọc trang (optional), active nav tự cập nhật.
- Không dùng scroll hijacking hoặc ép mỗi cuộn chuyển một full-screen section. Anchor link và wheel/touch tự nhiên.
- Có thể tạo 1–2 **cinematic transition section** (đặc biệt từ hero → story và từ personal chapters → now) nhưng không áp dụng với mọi section.

### 4.5. Work & Project Cards

- Tab năng lực: active underline/pill trượt bằng shared layout animation; panel cũ fade out 120ms, panel mới fade/translate 220ms. Giữ chiều cao hợp lý, không nhảy scroll.
- Featured cards: hover ảnh scale ~1.04, title dịch vài px, tag đổi nền mờ, arrow moving. Card có thể click toàn bộ nhưng phải bảo đảm không có nút/link lồng sai HTML.
- Bộ lọc 23 dự án: cards animate `layout` khi reorder; enter/exit opacity + y ±12px, stagger rất nhẹ; search trả kết quả tức thì, không đợi animation.
- Click card → project detail: hero image shared transition nếu an toàn; không khả thi thì page crossfade có lớp overlay mỏng và đảm bảo không flash.

### 4.6. Project Detail

- Project hero media reveal và typography theo nhịp êm, không che nguồn dữ liệu.
- Sơ đồ pipeline từng node sáng lên theo tiến độ scroll hoặc thao tác; luôn có phiên bản sơ đồ tĩnh, đọc được, truy cập bằng bàn phím.
- Ảnh before/after dùng slider thật hoặc side-by-side rõ nhãn. Không sử dụng ảnh giả làm bằng chứng.
- Kết quả metrics có thể count-up **chỉ khi có giá trị thật được xác thực**, không animate số bịa đặt.
- “Next Project” cuối trang là một card lớn có ảnh/trích đoạn và transition để giữ flow.

### 4.7. Personal Image Storytelling

- Timeline desktop: tiêu đề/chapter index có thể sticky cục bộ, ảnh của mỗi chương crossfade/cross-slide 12–24px khi chuyển mốc; không pin quá lâu.
- Gallery: staggered image reveal; click ảnh mở lightbox với ảnh phóng to liên tục nếu có thể, caption rõ, ESC đóng, focus return, nút next/previous.
- Mỗi chương có 1 ảnh chính và tối đa 2–4 ảnh phụ có ý nghĩa. Tránh lặp cùng một ảnh liên tiếp.
- Khi đến cầu nối cuối Personal → Work, chữ và ảnh đổi trạng thái giúp người xem nhận ra hai câu chuyện giao nhau.

### 4.8. Contact & Micro-interactions

- Email/link underline draw, icon arrow move nhẹ, nút copy phản hồi thành “Đã sao chép” và aria-live.
- Có thể dùng magnetic CTA **rất nhẹ** cho desktop fine pointer, disable trên touch và reduced motion.
- Menu mobile mở/đóng bằng opacity + translate, không làm mất focus, ESC đóng được.
- Giữ mọi link hoạt động khi JavaScript hoặc animation thất bại.

### 4.9. Reduced Motion & Accessibility

- Tôn trọng `prefers-reduced-motion: reduce` trên toàn hệ thống.
- Khi giảm chuyển động: tắt parallax, pinning phức tạp, zoom lớn, shared-element transform; thay bằng fade rất ngắn hoặc chuyển tức thì.
- Tránh autoplay video/gif nếu chưa có cách pause và chưa thật sự cần.
- Không chặn bàn phím hoặc chuyển focus sai khi transition; kiểm tra screen-reader, focus-visible, tab order.
- Không phụ thuộc hover để lộ dữ liệu quan trọng; mobile tap phải hoạt động.

---

## 5. Nội dung cần bổ sung / thay đổi / loại bỏ

### Bổ sung bắt buộc

1. Tập trung 3–4 Featured Projects có ảnh thật và câu mô tả dễ hiểu.
2. Ảnh/sơ đồ minh chứng ở hero của các case study nổi bật.
3. Proof Strip với nguồn có thể kiểm chứng (EMNLP/paper, vai trò, các dự án có repo).
4. Một đoạn “What I built / What I learned / What changed” ngắn cho dự án và Personal.
5. Nhịp điều hướng chéo: Work → Personal, Personal → Work, Project → Next Project.
6. Social preview metadata (OG image/title/description) chuẩn trên từng route.
7. Phân tích hành vi cơ bản: CTA click, mở case study, click CV, scroll depth (tôn trọng quyền riêng tư).

### Thay đổi

- Work: đưa dự án nổi bật lên trước nội dung quá kỹ thuật; năng lực để sau bằng chứng/featured work.
- Home: không chỉ yêu cầu người xem chọn câu chuyện; cho họ thấy 1–3 dấu ấn ngay trên Home.
- Personal: đổi từ liệt kê hoạt động thành 3–5 khoảnh khắc có story arc; các giải khác thành “More milestones”.
- Project detail: tóm lược bằng visual và At a Glance; ẩn mục trống thay vì giữ placeholder.
- Copywriting: mô tả giá trị công việc bằng ngôn ngữ dễ hiểu trước khi liệt kê stack.
- Menu / CTA: thống nhất tên, trạng thái, hành vi và vị trí.

### Loại bỏ hoặc không thêm

- Tất cả placeholder công khai như “Ảnh sẽ được bổ sung”, “—Chưa bổ sung”, “— / Thời gian”. **Chỉ ẩn khi chưa có nội dung, không bịa ảnh/sự kiện.**
- Các bullet về thành tích bị lặp giữa nhiều khối khi không thêm câu chuyện mới.
- Loader dài, cursor tùy biến khó dùng, hiệu ứng hover quá mạnh, page wipe toàn màn hình trên mọi route, particle vô hạn.
- Chỉ số hiệu suất không kiểm chứng; biểu đồ giả; demo clip không tương ứng hệ thống thật.
- Hai hệ thống animation cùng điều khiển một phần tử, dẫn tới conflict.

---

## 6. Copywriting mẫu (có thể tinh chỉnh)

### Home

**Eyebrow:** `PHAN TRỌNG ĐẠT / AI & SOFTWARE`  
**Headline:** `Tôi kết nối dữ liệu, mô hình và những ý tưởng thành sản phẩm.`  
**Subheading:** `AI engineering, nghiên cứu và xây dựng hệ thống — từ một thử nghiệm đến trải nghiệm có thể sử dụng.`  
**Primary CTA:** `Khám phá những gì tôi xây dựng`  
**Secondary CTA:** `Gặp con người phía sau mã nguồn`

**Two Stories heading:** `Một con người. Hai cách để hiểu tôi.`  
**Work:** `Những điều tôi xây dựng.` / `Dự án, nghiên cứu và những vấn đề tôi đã chọn giải quyết.`  
**Personal:** `Những điều tạo nên tôi.` / `Con người, ký ức và những câu chuyện không xuất hiện trong CV.`

### Work

**Headline:** `Từ bài toán đến hệ thống có thể kiểm chứng.`  
**Subheading:** `Tôi làm việc ở nơi dữ liệu, AI và phần mềm gặp nhau — thiết kế giải pháp, triển khai và đánh giá bằng bằng chứng.`  
**Featured heading:** `Không chỉ là công nghệ. Đây là những gì tôi đã xây dựng.`

### Personal

**Headline:** `Ngoài những dòng mã, tôi vẫn đang viết câu chuyện của mình.`  
**Intro:** `Tôi thích học những điều khó, tạo ra thứ có ích và giữ lại những khoảnh khắc khiến hành trình ấy đáng nhớ.`  
**Bridge:** `Đó là những gì đã tạo nên tôi. Còn đây là những gì tôi đang tạo ra.`

### Contact

**Headline:** `Một ý tưởng hay luôn bắt đầu bằng một cuộc trò chuyện.`  
**CTA:** `Gửi email` / `Xem GitHub` / `Tải CV`.

Các câu này chỉ là đề xuất nội dung, giữ giọng văn của chủ sở hữu, không tự nhận thành tích mới.

---

## 7. Hướng dẫn triển khai kỹ thuật cho Coding Agent

1. **Audit trước, sửa sau:** đọc toàn bộ cấu trúc repo, package.json, app routes, components, CSS/tokens, image assets, i18n, metadata, motion libraries đang dùng. Chụp screenshot baseline desktop/tablet/mobile và xác định các chuyển động hiện có.
2. **Không rewrite toàn site:** ưu tiên refactor component chung, thêm MotionProvider/MotionTokens, không phá routes, URLs, content, links hay cấu trúc SEO hiện tại.
3. **Thư viện:** nếu React/Next.js, cân nhắc `motion` cho hover/reveal/layout/shared element; dùng GSAP ScrollTrigger **chỉ ở nơi** cần scrub/pin/timeline phức tạp. Với chuyển trang, cân nhắc View Transitions API hoặc cách tương thích router hiện tại; có fallback và kiểm thử back/forward. Không thêm thư viện trùng chức năng vô ích.
4. **Tạo primitives:** `PageTransition`, `SectionReveal`, `ImageReveal`, `SplitHeadline`, `StoryCard`, `ProjectCard`, `ChapterTimeline`, `ImageLightbox`, `ScrollProgress`, `MotionToggle` (nếu cần).
5. **Asset strategy:** kiểm kê ảnh sẵn có, dùng ảnh thật và đúng license, kiểm soát aspect ratio, `sizes`, lazy loading cho ảnh dưới fold, priority cho hero quan trọng; hạn chế video nặng. Không thay ảnh thật bằng hình AI mô phỏng thành tích.
6. **Performance:** ưu tiên transform + opacity; không animate top/left/height trên scroll liên tục; lazy-load animation-heavy sections; không bật will-change thường trực quá nhiều; tránh animation gây CLS.
7. **i18n:** tiếng Việt/Anh có đủ nhãn, alt, aria-label, metadata; kiểm tra text wrap hai thứ tiếng.
8. **Testing:** kiểm tra Chrome/Edge/Firefox/Safari, desktop/tablet/mobile, touch/keyboard/hover, 60Hz và máy tầm trung; `prefers-reduced-motion`, dark/light nếu có, deep links, Back, cache, focus restoration.
9. **Đo lường:** mục tiêu Core Web Vitals trên dữ liệu người dùng thật LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1 ở percentile 75. Lighthouse mobile là lab check bổ trợ, không phải chứng nhận trải nghiệm thực tế.
10. **Đầu ra cần bàn giao:** mã hoàn chỉnh, mô tả thay đổi theo file/component, danh sách placeholder đã xử lý, ảnh/video before–after cho desktop/mobile, kết quả build/lint/test, bảng kiểm accessibility/performance và những phần đang chờ nội dung thật.

### Quy tắc nghiệm thu

- [ ] Người xem nhận ra nghề nghiệp, 1–2 bằng chứng và CTA trong 10 giây đầu.
- [ ] Home dẫn tới Work/Personal rõ ràng, không nhánh nào bị cụt.
- [ ] Có 3–4 featured projects với visual thực hoặc đồ họa đúng nội dung.
- [ ] Card-to-detail transition mượt hoặc fallback tốt, không flash trống.
- [ ] Chuyển ảnh/gallery không nháy, giật, dãn méo; lightbox dùng được bằng bàn phím.
- [ ] Filter/search dự án không nhảy bố cục khó chịu.
- [ ] Personal kể chuyện theo mốc, không hiển thị mục trống ra công khai.
- [ ] Không có animation lặp vô hạn gây khó đọc; reduced motion hoạt động.
- [ ] Các CTA, CV, external links, VI/EN còn hoạt động.
- [ ] Build, lint và các test liên quan đều đạt; không có hydration error.
- [ ] Báo cáo rõ bất kỳ giả định nào do thiếu asset hoặc thông tin.

---

## 8. Thứ tự ưu tiên triển khai

**P0 — Sửa nội dung và flow:** ẩn placeholder, chọn featured projects, tái cấu trúc Work, điều chỉnh Home/Personal, chuẩn hóa CTA.  
**P1 — Motion tạo cảm giác cao cấp:** hero intro, image reveal, story hover, section transition, page transition, project gallery, shared-element có fallback.  
**P2 — Chiều sâu tương tác:** sticky personal timeline, image lightbox, kiến trúc tương tác, motion dự án lọc/search, scroll progress.  
**P3 — Polish:** responsive, a11y, reduced motion, performance, SEO, analytics và kiểm thử nhiều thiết bị.

## 9. Chỉ dẫn ngắn gọn để giao cho agent

> Bạn là senior creative developer, interaction designer và frontend engineer. Hãy audit repo hiện tại của PTD. trước khi viết code. Nhiệm vụ là nâng cấp portfolio từ một website đẹp nhưng tương đối tĩnh thành một trải nghiệm kể chuyện cinematic–editorial, giàu hình ảnh và transition mượt, vẫn giữ nguyên concept “Một con người. Hai câu chuyện.”. Triển khai toàn bộ hạng mục khả thi theo brief này; không làm lại thương hiệu tuỳ tiện, không invent content/metrics, không phá link/routes, không quá lạm dụng animation. Ưu tiên flow Home → Selected Highlights → Work/Personal → Case Study → Contact, nâng featured projects lên sớm trong Work, ẩn mọi placeholder công khai, bổ sung motion system nhất quán. Dùng kỹ thuật thích hợp với stack hiện tại, có fallback và prefers-reduced-motion. Sau khi làm, chạy build/test, kiểm tra desktop/mobile, báo cáo chính xác file đã đổi, kết quả kiểm tra và phần cần asset thật từ tôi.

---

**Tham khảo triển khai:** Motion Layout Animation (`https://motion.dev/docs/react-layout-animations`); MDN View Transition API (`https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API`); W3C Animation from Interactions (`https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions`); Google Core Web Vitals (`https://developers.google.com/search/docs/appearance/core-web-vitals`).
