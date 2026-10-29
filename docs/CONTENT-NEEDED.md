# Nội dung bạn cần bổ sung

Bản mới đã dựng theo `newidea.md`. Các dữ kiện chưa biết được lưu bằng chuỗi rỗng hoặc mảng rỗng, không dùng ảnh AI, ảnh người khác hoặc số liệu minh họa làm thành tích thật.

## Bổ sung trước

1. **Ảnh chân dung hero:** 1 ảnh dọc 4:5, khoảng 1200 × 1500 px trở lên. Thêm một ảnh đời thường và một ảnh học/làm việc cho hai lựa chọn ở trang chủ.
2. **Tiểu sử:** 80–120 từ về bạn ngoài công việc; có thể thêm ba từ khóa tính cách do bạn tự chọn.
3. **Học tập:** tên trường THCS, THPT, đại học, ngành học, khoảng năm, câu chuyện 50–80 từ mỗi giai đoạn và ảnh tương ứng.
4. **Dự án:** ảnh giao diện/kết quả, phần việc trực tiếp, thời gian thực hiện, thử thách và bài học. Ưu tiên MedTutor, ParkingAI và LabGuard.
5. **CV PDF**, vai trò đang tìm, hình thức/khu vực làm việc mong muốn.
6. **VinUni:** ảnh chứng nhận, ngày hoàn thành, mã hoặc liên kết xác minh nếu có. Trạng thái hoàn thành đã có theo thông tin bạn xác nhận.

## Chỗ điền thông tin

Tất cả nội dung bản mới nằm trong **`src/content/portfolio.json`**. Nội dung Việt/Anh có dạng `{ "vi": "...", "en": "..." }`. Không cần sửa component khi điền các trường dưới đây.

| Nội dung | Trường trong JSON | Ảnh đặt ở thư mục |
| --- | --- | --- |
| Chân dung đầu trang | `assets.hero` | `public/images/portraits/` |
| Ảnh Work / chọn câu chuyện | `assets.work` | `public/images/portraits/` |
| Ảnh Personal / chọn câu chuyện | `assets.personal` | `public/images/lifestyle/` |
| Chân dung liên hệ | `assets.contact` | `public/images/portraits/` |
| Ảnh định hướng / tương lai | `assets.future` | `public/images/lifestyle/` |
| Album giới thiệu bản thân | `assets.collageMain`, `collageSport`, `collageFriends`, `collageStudy` | `public/images/lifestyle/` |
| Tiểu sử, tính cách | `identity.personalBio`, `identity.traits` | — |
| CV | `identity.cv` | `public/documents/` |
| Vai trò/cơ hội mong muốn | `identity.availability` | — |
| Hình thức/khu vực làm việc | `identity.workingPreference`, `identity.location` | — |
| THCS, THPT, đại học, hiện tại | `education[]`: `school`, `period`, `location`, `story`, `achievements`, `image`, `gallery` | `public/images/education/` |
| Chứng nhận VinUni | `training.date`, `credentialId`, `evidence`, `image` | `public/images/achievements/` |
| Giải thưởng | `achievements[]` | `public/images/achievements/` |
| Kinh nghiệm | `experiences[]` | `public/images/lifestyle/` |
| Môn thể thao, câu chuyện, album | `sports[]` | `public/images/sports/` |
| Sở thích và chú thích đời thường | `hobbies[]` | `public/images/lifestyle/` |
| Đang học, đang làm, đang khám phá | `present.learning`, `building`, `exploring`, `updatedAt` | — |
| Ảnh ba mục hiện tại | `assets.presentLearning`, `presentBuilding`, `presentExploring` | `public/images/lifestyle/` |
| Ước mơ, mục tiêu đời sống | `dreams.near`, `long`, `life` | — |
| Định hướng nghề nghiệp | `career.short`, `career.long` | — |
| Ví dụ cho từng bước làm việc | `approach[].example` | — |
| Case study | `projects[]`: `role`, `period`, `personalContribution`, `lessons`, `metrics` | — |
| Ảnh/video dự án | `projects[].media`: `cover`, `alt`, `gallery`, `video` | `public/images/projects/<slug>/` |
| Demo và báo cáo | `projects[].links.demo`, `links.report` | `public/documents/` nếu là file local |

`year` của dự án đang là **năm tạo repo GitHub**, được ghi rõ trên giao diện. Đây không phải ngày bắt đầu/kết thúc dự án; hãy điền `period` cho thời gian thực hiện thật.

## Ví dụ điền ảnh và CV

Đặt file tại `public/images/portraits/hero.webp`, sau đó sửa:

```json
{
  "src": "/images/portraits/hero.webp",
  "alt": {
    "vi": "Chân dung Phan Trọng Đạt",
    "en": "Portrait of Phan Trong Dat"
  },
  "caption": { "vi": "", "en": "" }
}
```

Ảnh dùng đường dẫn bắt đầu bằng `/images/`, không có chữ `public`. `identity.cv` tương tự: `"/documents/phan-trong-dat-cv.pdf"`. Để `""` nếu chưa có; web sẽ hiển thị chỗ trống hoặc nhãn chờ bổ sung, không tạo liên kết hỏng.

Ưu tiên WebP/AVIF, chiều rộng 1200–1800 px, khoảng 150–350 KB/ảnh nếu chất lượng cho phép. Ảnh bên dưới màn hình đầu được lazy load; ảnh có khung giữ kích thước sẵn. Điền alt cho cả hai ngôn ngữ. Video cần URL file phát được trong trình duyệt, không dùng URL trang YouTube trong `media.video`.

## Mẫu thêm thành tích

Thêm một phần tử vào `achievements` khi có dữ liệu thật:

```json
{
  "id": "",
  "title": { "vi": "", "en": "" },
  "date": "",
  "organization": "",
  "result": { "vi": "", "en": "" },
  "role": { "vi": "", "en": "" },
  "story": { "vi": "", "en": "" },
  "image": { "src": "", "alt": { "vi": "", "en": "" } },
  "evidence": ""
}
```

Điền đầy đủ tên và nội dung trước khi thêm phần tử; để `achievements: []` nếu chưa có mục nào. Thẻ sẽ mở câu chuyện/chi tiết; link minh chứng chỉ hiện khi có URL.

## Mẫu thêm kinh nghiệm

Thêm vào `experiences`, tách riêng kinh nghiệm làm việc khỏi bài tập/dự án nhóm:

```json
{
  "period": "",
  "organization": "",
  "role": { "vi": "", "en": "" },
  "challenge": { "vi": "", "en": "" },
  "contribution": { "vi": "", "en": "" },
  "outcome": { "vi": "", "en": "" },
  "image": { "src": "", "alt": { "vi": "", "en": "" } },
  "project": ""
}
```

`project` là slug case study, ví dụ `labguard`; để trống nếu không có dự án liên quan.

## Thông tin dự án còn cần bạn xác nhận

| Dự án | Đã có căn cứ công khai | Còn thiếu |
| --- | --- | --- |
| MedTutor | RAG phục vụ học tập; kiến trúc retrieval và mock/real providers | Vai trò, phần việc cá nhân, ảnh UI, thời gian, benchmark, bài học |
| ParkingAI | Prototype edge-first, async queues, mặc định mock inference | Model thật đã chạy, phần việc cá nhân, ảnh dashboard, FPS/độ chính xác/phần cứng |
| LabGuard | README ghi Product Owner, spec & impact; sáu thành viên | Chi tiết phần việc, ảnh, thời gian dự án, tác động/đánh giá, kết quả hackathon nếu có |
| SentinelAI | README ghi Phase 1 đang phát triển | Đóng góp, dữ liệu/hiệu năng có thể công khai, ảnh dashboard, trạng thái mới nhất |
| FutureVLA | Tài liệu mở rộng trên nền VLA-Adapter, nghiên cứu thử nghiệm | Đóng góp, kết quả thực nghiệm, attribution bổ sung; không tự nhận là tác giả nền tảng |
| PathFinder | README có tên bạn trong nhóm và link frontend demo | Phần việc cụ thể, thời gian, ảnh, đánh giá |
| PSO-Optimize | Bộ thí nghiệm CEC2017, cấu hình và script thống kê | Đóng góp, đồ thị/bảng kết quả thật, phân tích và bài học |

`metrics` nhận các mục dạng `{ "value": "", "label": {"vi":"", "en":""}, "context": {"vi":"", "en":""} }`. Khi bổ sung phải ghi điều kiện đo/dataset/phần cứng và dẫn báo cáo trong `links.report`. Hiện không hiển thị con số hiệu năng hay tỷ lệ hoàn thành suy đoán.

**AdverTest:** tài khoản có repo công khai cùng tên, nhưng chưa có README gốc để xác nhận vai trò/nội dung trong lần kiểm tra này. Chưa dùng chi tiết Demo Day trong bản plan để gán thành tích cho bạn. Bạn có thể cung cấp mô tả, vai trò và minh chứng để đưa vào Selected Work sau.

Các thẻ cũ về Lane Detection, Custom YOLO, BrandDNA và tái lập paper vẫn được giữ trong `src/data/portfolioData.json`. Chưa ánh xạ chắc chắn từng thẻ với repo/đóng góp cụ thể nên không trình bày lại như case study đã xác minh. Nếu muốn đưa chúng vào bản mới, bổ sung repo, phần việc, ảnh và kết quả tương ứng.

## Nguồn đã dùng

- GitHub công khai: [ptdbrain](https://github.com/ptdbrain), đối chiếu README và metadata repo ngày 29/10/2026. Các trang case study có link trực tiếp tới nguồn tương ứng.
- LinkedIn: [phantrongdat-ptdbrain](https://www.linkedin.com/in/phantrongdat-ptdbrain/). Thêm đúng địa chỉ bạn cung cấp; nội dung profile không đọc được công khai trong phiên này, nên chưa lấy trường học/chức danh từ đó.
- [Trang chương trình AI Thực chiến VinUni](https://vinuni.edu.vn/aithucchien/). Trạng thái cá nhân “Đã hoàn thành” dựa trên xác nhận của bạn ở yêu cầu trước; ngày/mã chứng nhận vẫn để trống.
