# Những phần cần bạn bổ sung

Giao diện hoạt động khi chưa có ảnh. Bạn có thể gửi theo từng đợt dưới đây; các trường chưa có nội dung thật tiếp tục để trống.

## 1. Ảnh nên bổ sung trước

| Vị trí | Nội dung cần chuẩn bị | Trường trong `src/content/portfolio.json` |
|---|---|---|
| Chân dung Home | Ảnh rõ mặt, chừa khoảng trống quanh đầu/vai; khung gần 4:5 | `assets.hero` |
| Hai lựa chọn Work / Personal | Ảnh làm việc/thuyết trình và ảnh đời thường; chủ thể ở vùng giữa để crop trên desktop/mobile | `assets.work`, `assets.personal` |
| Collage Personal | 4 ảnh: đời thường, thể thao, bạn bè/hoạt động, học tập | `assets.collageMain`, `collageSport`, `collageFriends`, `collageStudy` |
| Case study ưu tiên | Mỗi dự án 1 screenshot/sơ đồ thật; ưu tiên DPOTM, AdverTest, MedTutor, PRISM, ParkingAI, LabGuard | `projects[slug].media.cover`, `media.alt` |
| VinUni | Chứng nhận hoặc link bằng chứng; thời gian hoàn thành nếu muốn hiển thị | `training.image`, `evidence`, `date`, `credentialId` |

Card Work không cần ảnh để hoạt động; ảnh tổng quan được dùng ở case study. Với screenshot/sơ đồ, cần bản rõ chữ và nói rõ đây là UI, sơ đồ giải thích hay kết quả thực nghiệm.

## 2. Câu chuyện cá nhân

| Nội dung | Gợi ý | Trường |
|---|---|---|
| Học tập | Mỗi giai đoạn 1–2 đoạn về kỷ niệm, thay đổi hoặc quyết định; ảnh thật nếu có | `education[].story`, `image`, `gallery` |
| Thành tích | Bạn trực tiếp làm gì, cùng ai, điều được ghi nhận; ảnh và nguồn có thể chia sẻ | `achievements[].role`, `story`, `image`, `evidence` |
| Thể thao/sở thích | Câu chuyện cụ thể và ảnh tương ứng | `sports[].story`, `image`, `gallery`; `hobbies[].caption`, `image` |
| Hiện tại | Mỗi mục 1–3 câu: đang học, đang xây, đang khám phá; ngày cập nhật thật | `present.learning`, `building`, `exploring`, `updatedAt`; `assets.presentLearning`, `presentBuilding`, `presentExploring` |
| Định hướng | Mong muốn gần, dài hạn và cuộc sống hướng tới | `dreams.near`, `long`, `life`; `assets.future` |
| Ảnh liên hệ | Chân dung khác hoặc ảnh đời thường phù hợp | `assets.contact` |

Tiểu sử, học vấn, kinh nghiệm và thành tích đã có thông tin từ CV. Phần bổ sung giúp có lời kể riêng của bạn; không cần viết lại toàn bộ hồ sơ.

## 3. Chi tiết dự án

Với mỗi dự án, gửi các nhóm sau nếu có:

1. **Vai trò cá nhân:** phần trực tiếp làm, phần của nhóm, thời gian/quy mô nhóm được phép công bố.
2. **Cách làm:** bối cảnh, kiến trúc chính, một lựa chọn kỹ thuật đáng giải thích.
3. **Kết quả:** số đo có nguồn, dataset/thiết bị/cấu hình, ngày và điều kiện chạy; giới hạn của prototype.
4. **Bài học:** khó khăn, phương án không hiệu quả, bước tiếp theo.
5. **Minh chứng:** screenshot, sơ đồ, video demo, báo cáo và link có thể chia sẻ.

Trường tương ứng: `role`, `period`, `personalContribution`, `technicalDecisions`, `metrics`, `constraints`, `failedExperiments`, `lessons`, `nextSteps`, `media`, `links`.

Các repo đang thiếu vai trò cá nhân trong data: `sentinel-ai`, `future-vla`, `firebite`, `ahs-real-estate`, `tour-resq`, `tcb-stock-prediction`, `pso-optimize`, `8th-year-student`, `ai-exam`, `face-vision`, `kv-cache-privacy`, `ptd-portfolio`, `background-removal`, `image-collection-tools`. Đã có mô tả kỹ thuật; cần xác nhận của bạn để ghi phạm vi cá nhân.

Với PRISM, bổ sung nguồn/code được phép chia sẻ và kết quả mới nếu có. Nội dung hiện dựa trên CV và checkout local đã đọc; không tự nâng báo cáo lịch sử thành kết quả mới.

## 4. File ảnh và cách hiển thị

Ảnh đặt dưới `public/images/`, data dùng `/images/...` thay vì `/public/images/...`. Có thể chia `portraits/`, `personal/`, `education/`, `achievements/`, `projects/<slug>/`. Tên file không dấu, có ý nghĩa.

Ảnh chụp dùng JPG/WebP; screenshot/sơ đồ cần giữ chữ rõ. Gửi file vừa đủ độ phân giải cho khung, tránh đưa ảnh gốc quá lớn vào website. Mỗi ảnh cần mô tả VI/EN hoặc ít nhất mô tả thật bằng một ngôn ngữ để hoàn thiện sau.

```json
{
  "src": "/images/portraits/hero.webp",
  "alt": {
    "vi": "Mô tả thật của ảnh bạn cung cấp",
    "en": "An accurate description of the supplied photo"
  },
  "fit": "cover",
  "position": "50% 40%"
}
```

`cover` lấp đầy khung và có thể crop; `contain` giữ toàn bộ ảnh, phù hợp chứng nhận/UI/sơ đồ. `position` điều chỉnh vị trí chủ thể khi dùng cover. Chứng nhận VinUni mặc định contain.

Ảnh chính case study dùng `media.cover`, `media.alt`, tùy chọn `media.fit`, `media.position`. Mỗi mục `media.gallery[]` dùng cấu trúc asset ở trên. `media.video` là đường dẫn/URL demo thật; nếu có lời nói, gửi thêm lời/phụ đề để hoàn thiện khả năng theo dõi.

Bạn có thể gửi **ảnh + tên vị trí/dự án + vài gạch đầu dòng nội dung**, không cần tự chỉnh JSON. Những phần chưa có tiếp tục để trống.
