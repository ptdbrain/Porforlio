# PTD. — One Person. Two Stories.

Portfolio Việt/Anh của Phan Trọng Đạt, triển khai theo [newidea.md](newidea.md): trang mở đầu chung, câu chuyện Personal, chuyên môn Work và case study kỹ thuật theo URL riêng. Nhánh Work cập nhật theo [newidea2.md](newidea2.md) V3: process SVG bốn bước và Selected Works có điều khiển, trên nền Kinetic Cinema và các project world hiện có.

## Chạy và kiểm tra

Yêu cầu Node.js 20.19+, 22.13+ hoặc 24+; khuyến nghị Node.js LTS còn được hỗ trợ.

```bash
npm ci
npm run dev
npm run lint
npm test
npm run test:e2e
npm run build
npm run preview
```

E2E dùng Google Chrome đã cài (`channel: chrome`), tự build và chạy preview trên port 4174. Nếu máy chưa có Chrome, cài Chrome hoặc thay channel trong `playwright.config.js` bằng Chromium đã cài cho Playwright. Báo cáo lỗi/trace nằm trong `test-results/` và `playwright-report/` (được gitignore).

## Nội dung và ảnh còn thiếu

- [Nội dung dự án từ GitHub và CV](docs/PROJECT-CONTENT-REVIEW.md) · 23 case study, bỏ qua repo bài lab.
- [Bản cập nhật hai section Work V3](docs/WORK-SECTIONS-V3.md).
- [Bản cập nhật Kinetic Cinema V2](docs/KINETIC-CINEMA-UPDATE.md).
- [Kế hoạch file và các bước triển khai](docs/KINETIC-CINEMA-PLAN.md).
- [Danh sách cần bổ sung và cách điền](docs/CONTENT-NEEDED.md).
- [Phân tích bản cũ, đối chiếu từng phần của plan và giới hạn kiểm tra](docs/IMPLEMENTATION-REVIEW.md).
- Dữ liệu chính: `src/content/portfolio.json`.
- Nhãn Việt/Anh: `src/content/copy.js`.
- File ảnh: `public/images/`; CV/báo cáo: `public/documents/`.

Để chuỗi `""` hoặc mảng `[]` khi chưa có nội dung. Ảnh chưa có hiển thị khung trống; CV chưa có không tạo link tải giả. Mỗi case study có đường dẫn nguồn README công khai; trường đóng góp/số liệu cá nhân cần chủ portfolio bổ sung.

## Routes

- `/`: Home — hai lựa chọn.
- `/personal`: tiểu sử, học tập, cột mốc, thể thao, sở thích, hiện tại, ước mơ.
- `/work`: định vị, kinh nghiệm, Selected Work, archive, Lab, skills, notes, VinUni, career.
- `/projects/[slug]`: case study riêng cho từng dự án trong dữ liệu.
- `/contact`: liên hệ.

History API hỗ trợ chuyển trang và Back; View Transition là progressive enhancement. Work có nút Simple view, reduced-motion/thiết bị yếu fallback và GSAP/Motion tải động. Build prerender HTML cho từng route, metadata/OG/canonical riêng, `sitemap.xml`, `robots.txt` và `404.html`. Nội dung chính vẫn đọc được khi tắt JavaScript. UI tương tác cần JavaScript.

## Cấu trúc

```text
src/App.jsx                      Router, layout, i18n, motion, metadata
src/components/editorial/        Home, Personal, Work, CaseStudy, Shared
src/content/portfolio.json       Nội dung và asset slots
src/content/cinema.json          Scene formats, manifesto, experiments, career
src/components/cinema/           Cold open, orbit, project worlds và các scene
cinema.css                       Kinetic Cinema, responsive và low-motion
src/content/copy.js              Nhãn Việt/Anh
src/lib/routes.mjs               Route resolution, metadata
src/prerender.jsx                React server renderer cho build tĩnh
scripts/prerender.mjs            Tạo HTML theo route và sitemap
editorial.css                    Design system, responsive, motion
public/fonts/                    Be Vietnam Pro, Manrope, IBM Plex Mono + OFL
```

Giao diện cũ (`BrainIntro.jsx`, `PortfolioHome.jsx`, `styles.css`, `src/data/`) được giữ để tham khảo, không dùng trong entry mới.

## Triển khai Vercel

Cấu hình hiện tại dùng `npm run build`, output `dist`, `cleanUrls: true`. Build tạo `/work.html`, `/personal.html`, `/projects/<slug>.html` và custom 404; Vercel phục vụ đường dẫn không có `.html`.

Nếu dùng domain khác, đặt **`VITE_SITE_URL=https://your-domain.example`** trong môi trường build để canonical và sitemap dùng đúng domain. Mặc định là `https://porforlio-delta.vercel.app` từ metadata repo công khai. Sau khi cập nhật nội dung hoặc ảnh, build và triển khai lại để metadata tĩnh được cập nhật.
