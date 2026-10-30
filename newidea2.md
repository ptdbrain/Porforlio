# PORTFOLIO WORK — REDESIGN V3

## Thay thế hai section đang gây rối mắt

**Phạm vi:** chỉ thiết kế lại hai section trong nhánh **Work** đang hiển thị các dòng `EXPLORE / EXPERIMENT / BUILD / IMPROVE` và menu chữ lớn `LANGUAGE / MODELS / SYSTEMS / DATA / PRODUCT / RESEARCH`. Các section khác, nội dung Personal, route và hệ thống điều hướng được giữ nguyên, trừ những chỉnh sửa nhỏ cần thiết để chuyển cảnh liền mạch.

**Định hướng:** Premium Kinetic Editorial — nhiều chuyển động tinh tế, điện ảnh, nhưng nội dung thật và dự án thật vẫn là nhân vật chính. Không dùng lại bố cục *ảnh bên trái, chữ cuộn bên phải*, không dùng danh sách headline siêu lớn, không dùng bento grid hay accordion chữ khổng lồ.

---

## I. Vấn đề của phiên bản hiện tại

### Section 1 — EXPLORE / EXPERIMENT / BUILD / IMPROVE
- Bốn dòng kiểu khẩu hiệu quá lớn, chiếm quá nhiều chiều cao trang.
- Tính chất lặp, thiếu tình huống cụ thể minh họa quy trình.
- Không có một chuyển động liên tục dẫn mắt người xem từ giai đoạn đầu đến kết quả cuối.
- Khoảng trống giữa các dòng dài, nhịp đọc đơn điệu.

### Section 2 — LANGUAGE / MODELS / SYSTEMS / DATA / PRODUCT / RESEARCH
- Sáu mục xếp dọc bằng typography cỡ lớn trông như menu điều hướng hơn là thông tin về năng lực.
- Người dùng khó biết nên nhấn, cuộn hay đọc; các lĩnh vực trừu tượng không đi kèm bằng chứng.
- Dùng cùng ngôn ngữ thị giác “một chữ to trên một hàng” như section trước.
- Đứng giữa người xem và nội dung dự án quan trọng, tạo ma sát không cần thiết.

**Quyết định:** Bỏ hoàn toàn layout hiện có. Không giữ lại những headline làm nội dung chính. Có thể giữ bốn từ ở section 1 dưới dạng nhãn nhỏ cho quá trình, và đưa các lĩnh vực thực sự có minh chứng thành tags/filters ở gallery dự án.

---

# II. SECTION THAY THẾ 01 — FROM IDEA TO REALITY

## 1. Mục tiêu
Giải thích cách tôi chuyển một câu hỏi / vấn đề thành một hệ thống có thể hoạt động, bằng một **chuyển động liên tục từ trái sang phải**, không phải bốn màn hình khẩu hiệu.

**Thời lượng đọc:** khoảng 15–25 giây. **Chiều cao lý tưởng:** 1–1,5 viewport trên desktop, tùy mật độ thông tin; không kéo dài thành bốn màn hình độc lập.

## 2. Copy gợi ý

**Eyebrow:** `MY PROCESS / 01`

**Heading:** `An idea is only the beginning.`

**Supporting text:** `Tôi bắt đầu từ một câu hỏi, kiểm chứng bằng thử nghiệm, xây thành hệ thống và tiếp tục cải thiện dựa trên kết quả.`

**Kết thúc luồng:** `From a question to something that works.`

Các câu chữ nên thật, không khẳng định mọi dự án đều tuân theo một quy trình tuyến tính tuyệt đối. Tên bước hiển thị nhỏ:

1. `01 — Explore`: Xác định vấn đề, tìm hiểu tài liệu và tiêu chí thành công.
2. `02 — Experiment`: Thử mô hình, dữ liệu và giả thuyết; quan sát kết quả.
3. `03 — Build`: Kết nối các thành phần thành một prototype / hệ thống.
4. `04 — Improve`: Đánh giá, phân tích lỗi, tinh chỉnh và lặp lại.

## 3. Bố cục desktop

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ MY PROCESS / 01                                       THINK → TEST → BUILD │
│                                                                             │
│ An idea is only the beginning.                                              │
│ Tôi bắt đầu từ một câu hỏi ...                                               │
│                                                                             │
│       ( ? ) ─────── ( ~ ) ─────── ( ⬡ ) ─────── ( ✓ )                      │
│         ╲              ╲              ╲              ╲                   │
│       EXPLORE        EXPERIMENT       BUILD          IMPROVE                 │
│       Vấn đề        Giả thuyết       Prototype      Đánh giá                │
│                                                                             │
│                   [ vệt sáng / đường nối được vẽ khi cuộn ]                  │
│                                                                             │
│              From a question to something that works.                      │
└─────────────────────────────────────────────────────────────────────────────┘
```

*Hình trên là cấu trúc, không phải ảnh giao diện hoàn chỉnh.*

- Nền: sáng ấm (off-white) để tiếp nối phần trước; chữ xám than, accent olive/green tiết chế.
- Heading chiếm hai dòng tối đa; không dùng font 120–180px.
- Chính giữa là **đồ họa dòng chảy dạng đường cong SVG**, 4 nút có hình dạng/animation khác nhau.
- Nội dung từng nút ngắn gọn, đọc được ngay; khi chọn một nút có thể mở một tooltip/storylet rộng 240–300px với ví dụ thật từ dự án.
- Một vệt sáng nhỏ chạy theo đường dẫn khi người xem khám phá; kết thúc tại biểu tượng kết quả.
- Không đặt ảnh lớn cố định bên trái hoặc bên phải. Nếu có ảnh thật, đặt dưới một bước khi được mở như một chi tiết tùy chọn, không chiếm bố cục chính.

## 4. Thiết kế chuyển động: một hành trình duy nhất

**Khi section đi vào viewport:**

- `0–250ms`: eyebrow và heading hiện bằng opacity + translateY khoảng 16px.
- `150–650ms`: đường cong được vẽ dần bằng SVG path (`stroke-dashoffset`).
- `300–1100ms`: 4 node xuất hiện tuần tự, scale từ 0.92 → 1, opacity 0 → 1, lệch khoảng 110–140ms giữa các node.
- `650–1400ms`: một “signal dot” chạy một vòng theo path; sau đó **dừng**, không tạo hoạt ảnh nặng liên tục.
- `900–1350ms`: câu kết mờ dần vào.

**Khi hover / focus vào node:**

- Node tăng nhẹ 1.05, vòng viền sáng lên trong 180–250ms.
- Mô tả dài 1–2 câu xuất hiện bằng opacity + translateY 8px.
- Đoạn đường đã đi tới node có sắc độ rõ hơn, nhưng node khác không biến mất.
- Trên nút `Experiment`, có thể cho 2–3 điểm dữ liệu dịch chuyển nhẹ; trên `Build`, các khối kết nối; trên `Improve`, đường nét được hoàn chỉnh. Những micro-animation chỉ hoạt động lúc tương tác.

**Khi rời section:** chuyển sắc nền nhẹ sang màu tối của dự án tiếp theo (nếu có), khoảng 300–500ms. Không tạo màn hình chuyển cảnh đen toàn bộ.

### Quy tắc chuyển động

- Không ép cuộn ngang (scroll hijacking); không pin bốn bước thành nhiều viewport.
- Chỉ một element chuyển động nổi bật tại mỗi thời điểm.
- Ưu tiên `transform`, `opacity`, SVG path, hạn chế layout thrashing.
- `prefers-reduced-motion`: hiện toàn bộ nội dung và đường nối tĩnh; hover/focus vẫn đọc được.

## 5. Phiên bản mobile

- Heading 32–44px.
- Chuyển đồ họa thành **đường cong dọc kiểu zig-zag**, 4 nút nối nhau trên cùng một section.
- Mỗi nút kèm nhãn và mô tả luôn nhìn thấy; nhấn mới mở ví dụ chi tiết.
- Không dùng hover bắt buộc, không cuộn ngang tự động và không giữ sticky viewport.
- Tối ưu khu vực chạm >= 44px và giữ chữ thân thiện với mobile.

---

# III. SECTION THAY THẾ 02 — SELECTED WORKS / PROJECT STAGE

## 1. Mục tiêu
**Không hiển thị thêm một danh sách năng lực trừu tượng trước dự án.** Thay menu `LANGUAGE / MODELS / SYSTEMS / DATA / PRODUCT / RESEARCH` bằng một **gallery trình diễn dự án thật**. Người xem vừa khám phá được lĩnh vực kỹ thuật qua nhãn dự án, vừa thấy ngay bằng chứng bạn đã xây dựng.

**Mục đích:** đoạn này phải khác hoàn toàn section quy trình ở trên: không diagram, không timeline, không headline hàng dọc; là một sân khấu trình chiếu sản phẩm có chiều sâu, ảnh thật và điều khiển trực tiếp.

## 2. Copy gợi ý

**Eyebrow:** `SELECTED WORK / 02`

**Heading:** `Things I've built.`

**Subheading:** `Một vài dự án giúp thể hiện rõ nhất cách tôi suy nghĩ, thử nghiệm và tạo ra sản phẩm.`

**Secondary link:** `View all projects →`

Chỉ chọn 3–4 dự án tiêu biểu, không tạo nội dung giả, không gán vai trò hoặc công nghệ chưa được chứng minh.

## 3. Bố cục desktop: editorial project stage

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ SELECTED WORK / 02                                  VIEW ALL PROJECTS ↗     │
│                                                                             │
│ Things I've built.                                                          │
│                                                                             │
│   ┌────────────────────────────────────────────────────────────────────┐    │
│   │                                                                    │    │
│   │          [ẢNH / VIDEO NGẮN / SCREENSHOT CỦA PROJECT 01]          │    │
│   │                 layered product scene                              │    │
│   │                                                                    │    │
│   │                                    [Explore this project ↗]       │    │
│   └────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  01 / 03     PROJECT NAME     [AI] [NLP] [PROTOTYPE]        ←    →          │
│              Mô tả 1 câu về vấn đề và điều đã xây dựng.                     │
│  ━━━━━━━━━━━━━━────────────────────────────────────────────────             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Điểm then chốt:** Đây là **một stage khung rộng**, không phải hình bên trái và mô tả bên phải; screenshot / ảnh giao diện là tâm điểm nằm ngang, metadata được đặt bên dưới và giữ gọn.

- Project stage tỷ lệ khoảng 16:9 hoặc 16:8; bo góc vừa phải 16–24px.
- Nền ngoài tối (`#111417`) để tạo chuyển nhịp từ process sáng; chữ trắng ngà, accent xanh olive/lime chỉ dùng ở nút, progress và điểm nhấn.
- Screenshot hoặc ảnh demo dự án dùng làm art direction chính, không dùng ảnh stock thay cho dự án.
- 2 dự án kế tiếp có thể lộ ra thành các dải mảnh phía sau stage, tạo chiều sâu *stacked editorial*. Không đặt nhiều card to cùng lúc.
- Nút next/previous, chỉ số `01 / 03`, nhãn lĩnh vực, trạng thái và CTA luôn nhìn thấy.
- Nhấn `Explore` chuyển sang trang case study tương ứng; nhấn `View all projects` chuyển tới archive.

## 4. Animation: Project-to-Project Transform

**Khi section vào viewport:**

1. Heading xuất hiện nhanh và nhẹ (opacity + translateY 16px).
2. Stage có hiệu ứng reveal từ `clip-path: inset(10% 0 10% 0 round 20px)` về `inset(0...)` kết hợp scale 0.96 → 1, trong 650–850ms.
3. Metadata dưới khung lên 12px và hiện dần.
4. Chỉ số dự án chạy `00 → 01` một lần.

**Khi người xem nhấn mũi tên `→`:**

1. Card hiện tại dịch sang trái 80–120px và thu về scale 0.94, opacity giảm (250–350ms).
2. Card kế tiếp tăng scale 0.96 → 1, đi từ phải vào trung tâm; ảnh của nó xuất hiện bằng reveal mask (450–650ms).
3. Tên, mô tả và nhãn dự án thay đổi đồng bộ, dùng crossfade + rise 10px (220–300ms).
4. Thanh tiến trình chạy sang vị trí tương ứng, không reset toàn bộ.
5. Chỉ số `01 / 03 → 02 / 03` đổi theo cùng lúc.

**Khi hover stage:**

- Ảnh có parallax rất nhẹ (3–8px), giới hạn theo vị trí chuột và không cần render liên tục khi chuột đứng yên.
- Một nhãn `VIEW CASE STUDY ↗` trượt vào ở góc khung hoặc gần CTA, không thay con trỏ hệ thống.
- Nếu có video preview do chính bạn cung cấp, chỉ tự chạy dạng muted khi hover/focus và tạm dừng khi rời vùng, khi tab ẩn hoặc khi reduced motion bật.

**Khi mở case study:**

- Nếu kỹ thuật cho phép, ảnh stage trở thành hero ảnh của trang chi tiết qua shared-element transition; 500–700ms.
- Nếu không có View Transitions API / hỗ trợ tương thích, dùng transition fade/slide đơn giản. Không được khiến chuyển trang giật hay bắt người dùng chờ splash screen.

**Quan trọng:** Người xem **không cần cuộn nhiều vòng để đi qua từng dự án**. Dùng nút, bàn phím và cử chỉ vuốt để đổi nội dung. Cuộn dọc trang vẫn hoạt động bình thường.

## 5. Dữ liệu mỗi dự án (ví dụ schema)

```ts
type FeaturedProject = {
  slug: string;
  title: string;
  tagline: string;              // vấn đề hoặc giá trị dự án, 1 câu
  year?: string;
  role?: string;                // chỉ ghi vai trò thật
  status: 'completed' | 'prototype' | 'in-progress' | 'research';
  tags: string[];               // chỉ lĩnh vực/công nghệ có cơ sở
  coverImage: string;          // screenshot thật; có ảnh fallback riêng
  previewVideo?: string;        // chỉ khi có demo thật
  href: string;                 // case study
};
```

**Không** hardcode tên dự án, thành tích, số liệu hoặc vai trò giả. Reuse data hiện có trong project archive; chỉ bổ sung trường nếu thực sự cần.

## 6. Mobile

- Stage 4:5 hoặc 5:4 với ảnh sản phẩm crop có chủ đích; các yếu tố text nằm **dưới** stage.
- Tên dự án không vượt 2 dòng; mô tả không vượt 3 dòng.
- Điều khiển next/prev đủ lớn; hỗ trợ swipe ngang nhưng **không chặn** cuộn dọc.
- Không dùng parallax theo chuột, không yêu cầu video tự chạy.
- Project slide dùng fade/slide 150–250ms để nhanh và tiết kiệm pin.

---

# IV. LIÊN KẾT HAI SECTION THÀNH MỘT CÂU CHUYỆN

1. **Process** (sáng): `Tôi làm việc như thế nào?` — diễn đạt một hành trình ngắn từ câu hỏi đến sản phẩm.
2. **Transition** (sáng → tối): cuối đường nối SVG kết thúc bằng một điểm sáng, điểm này thu nhỏ/mờ đi khi chuyển tới stage dự án; không dùng hiệu ứng tia sáng khổng lồ.
3. **Selected Works** (tối): `Đây là những thứ tôi đã làm.` — bước trực tiếp vào bằng chứng thực tế.
4. **Tiếp theo:** case studies, experience hoặc archive hiện có. Nếu đã có một gallery dự án khác ngay phía dưới, **thay thế gallery đó hoặc tái sử dụng một trong hai**, tuyệt đối không tạo hai gallery nội dung giống nhau.

## Điều không được làm

- Không giữ lại 4 chữ khổng lồ ở section đầu rồi thêm animation mới.
- Không thay 6 chữ khổng lồ bằng 6 card to có nội dung trống.
- Không dùng lại kiểu ảnh sticky một cột, nội dung cuộn cột còn lại.
- Không thêm một carousel dự án mới nếu ngay sau đó đã có carousel dự án trùng lặp.
- Không auto-scroll ngang, không khóa scroll, không dùng cuộn để bắt buộc người xem duyệt qua các slide.
- Không thêm motion trên mọi ký tự, lạm dụng blur, glitch hoặc các transform 3D quá mạnh.

---

# V. THÔNG SỐ CHUYỂN ĐỘNG VÀ CHẤT LƯỢNG

| Thành phần | Thời lượng | Kỹ thuật | Ghi chú |
|---|---:|---|---|
| Heading reveal | 450–600ms | opacity / transform | một lần khi vào viewport |
| SVG path draw | 650–1100ms | stroke dashoffset | chạy một lần |
| Node stagger | 120ms / node | scale / opacity | 4 node |
| Tooltip process | 180–250ms | opacity / transform | hover, focus, tap |
| Stage first reveal | 650–850ms | clip-path / transform | chỉ khi vào viewport |
| Slide switch | 450–650ms | transform / opacity | nút, keyboard, swipe |
| Metadata crossfade | 220–300ms | opacity / translateY | đồng bộ stage |
| Background transition | 300–500ms | color / opacity | không chớp sáng |

- Sử dụng Next.js/React và Motion for React nếu dự án đã có, GSAP chỉ khi thật sự cần kiểm soát scroll phức tạp.
- Ưu tiên GPU-composited `transform`/`opacity`; hạn chế filter blur lớn và hình ảnh kích thước quá cao.
- `prefers-reduced-motion`: bỏ path animation, parallax và transition phức tạp, vẫn giữ chức năng đầy đủ.
- Loading ảnh chỉ theo nhu cầu, preload ảnh đang xem và ảnh slide tiếp theo; giữ tỉ lệ/chiều cao placeholder để tránh layout shift.
- Điều khiển bằng `Tab`, `Enter`, phím mũi tên khi focus gallery; thông báo thay đổi slide bằng accessible status.
- Kiểm tra 320px, 375px, 768px, 1024px, 1440px; tối ưu mobile thật, không chỉ thu nhỏ desktop.

---

# VI. ASSETS CẦN CÓ

| Vị trí | Cần chuẩn bị | Nếu chưa có |
|---|---|---|
| Section Process | không bắt buộc có ảnh; SVG nội bộ đủ | dùng icon/shape có chủ đích |
| Project Stage 1 | 1 screenshot hoặc demo thật, 16:9 | khung tên dự án có thiết kế chữ đơn giản |
| Project Stage 2 | screenshot hoặc demo thật | placeholder trung tính có nhãn rõ |
| Project Stage 3 | screenshot hoặc demo thật | placeholder trung tính có nhãn rõ |
| Case Study | ảnh, sơ đồ, video được kiểm chứng | dùng tài liệu đã có |

Không dùng stock photo chung chung hoặc ảnh AI giả làm sản phẩm thật.

---

# VII. PROMPT TRIỂN KHAI CHO CODEX CLI

> Hãy kiểm tra codebase portfolio hiện tại và xác định chính xác hai section đang chứa các text `EXPLORE`, `EXPERIMENT`, `BUILD`, `IMPROVE` và `LANGUAGE`, `MODELS`, `SYSTEMS`, `DATA`, `PRODUCT`, `RESEARCH`. Thay thế riêng hai section này theo đặc tả trong tài liệu `portfolio_two_sections_redesign_v3.md`.
>
> - Section thứ nhất: **From Idea to Reality** — process flow SVG liên tục với bốn bước nhỏ gọn, animation path + nodes + microinteraction, không còn bốn headline khổng lồ hay bốn màn hình cuộn.
> - Section thứ hai: **Selected Works** — stage dự án dạng editorial, rộng theo chiều ngang, ảnh/screenshot thật ở trung tâm, navigation previous/next + counter + progress + CTA, chuyển stage bằng mask/scale/slide mượt. Không giữ lại menu typography khổng lồ sáu lĩnh vực.
> - Nếu codebase đã có Featured Projects hoặc Selected Projects ngay gần đó, **tái cấu trúc / thay thế section hiện tại thay vì tạo bản sao**. Các lĩnh vực kỹ thuật từ menu cũ có thể đưa thành tag hoặc bộ lọc nhỏ có cơ sở trong dự án, không cần giữ đủ sáu loại.
> - Tận dụng dữ liệu dự án hiện có; không chế tác thông tin, ảnh, giải thưởng, tech stack, vai trò hoặc kết quả.
> - Không sửa nhánh Personal, navbar, theme toàn site hay các route không liên quan.
> - Thiết kế có responsive, keyboard navigation, reduced motion, loading ảnh tốt và không scroll hijacking.
> - Dùng thư viện animation đã cài, tránh thêm dependency lớn không cần thiết. Chỉ ra file đã sửa và nêu cách kiểm thử.
> - Hoàn thành bằng việc chạy lint/build và xử lý lỗi phát sinh trong phạm vi thay đổi.

---

# VIII. TIÊU CHÍ NGHIỆM THU

- [ ] Không còn 4 hàng headline EXPLORE / EXPERIMENT / BUILD / IMPROVE cỡ lớn.
- [ ] Không còn 6 hàng menu LANGUAGE / MODELS / SYSTEMS / DATA / PRODUCT / RESEARCH cỡ lớn.
- [ ] Section Process trình bày được 4 giai đoạn trong khoảng 1–1,5 viewport desktop.
- [ ] Section Selected Works có ít nhất một dự án thật từ dữ liệu hiện có hoặc fallback trung thực khi dữ liệu chưa đủ.
- [ ] Hai section khác biệt rõ về bố cục và chuyển động.
- [ ] Không trùng gallery dự án với section nằm phía dưới.
- [ ] Animation chạy trơn, có phương án reduced motion và không làm mất khả năng cuộn dọc.
- [ ] Trên mobile đọc dễ, điều khiển dễ, không tràn chữ hoặc hình.
- [ ] Có CTA dẫn tới case study / trang dự án thật.
- [ ] Build thành công.
