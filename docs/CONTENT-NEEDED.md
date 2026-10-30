# Nội dung bạn cần bổ sung

> **Cập nhật 30/10/2026:** Work đã có hai section V3. CV PDF, tiểu sử chuyên môn, THPT/đại học, kinh nghiệm và thành tích đã được điền từ `CV_PhanTrongDat.pdf`; 23 dự án đã có mô tả song ngữ. Xem [bản rà soát nội dung](PROJECT-CONTENT-REVIEW.md) để biết nguồn và phần còn thiếu. Các mục lịch sử phía dưới chỉ áp dụng cho trường vẫn trống trong dữ liệu hiện tại.


Bản mới đã dựng theo `newidea.md`. Các dữ kiện chưa biết được lưu bằng chuỗi rỗng hoặc mảng rỗng, không dùng ảnh AI, ảnh người khác hoặc số liệu minh họa làm thành tích thật.

## Bổ sung trước

1. **Ảnh chân dung hero:** 1 ảnh dọc 4:5, khoảng 1200 × 1500 px trở lên. Thêm một ảnh đời thường và một ảnh học/làm việc cho hai lựa chọn ở trang chủ.
2. **Tiểu sử:** 80–120 từ về bạn ngoài công việc; có thể thêm ba từ khóa tính cách do bạn tự chọn.
3. **Học tập:** THCS, câu chuyện cá nhân và ảnh từng giai đoạn; THPT/đại học và ngành học đã điền theo CV.
4. **Dự án:** ảnh giao diện/kết quả, phần việc trực tiếp, thời gian thực hiện, thử thách và bài học. Ưu tiên MedTutor, FutureVLA và LabGuard; ParkingAI vẫn có case study riêng.
5. **Vai trò đang tìm**, hình thức/khu vực làm việc mong muốn. CV đã có tại `/CV_PhanTrongDat.pdf`.
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


## Bổ sung cho Work Studio (newidea2.md)

Bố cục Work hiện theo `newidea2.md`, với dữ liệu riêng tại **`src/content/studio.json`**:

- **Hero và flagship:** điền `projects[].media.cover` trong `portfolio.json` cho MedTutor, ParkingAI, LabGuard. Hero tự dùng lại đúng ba ảnh này.
- **Bốn khung LabGuard:** `studio.json → demoFrames[] → image.src`, `image.alt`, `video`. Ảnh/video để trống nếu chưa có. `video` là URL file video phát được; trình phát có controls, không autoplay. Mỗi tab đã có mô tả từ repo, không dùng mock screenshot giả.
- **Blueprint ParkingAI:** nội dung nền từ `projects[].pipeline`. Có thể bổ sung `decision: {"vi":"", "en":""}` và `image: {"src":"", "alt":{"vi":"", "en":""}}` vào node khi có quyết định kỹ thuật hoặc ảnh minh chứng thật.
- **Vai trò và phạm vi:** role còn thiếu của MedTutor/ParkingAI để trống. Các nhãn Outcome ghi phạm vi prototype/mock được tài liệu mô tả, không phải benchmark độc lập.
- **Experience:** đã có hồ sơ nhóm LabGuard từ vai trò trong README, gắn nhãn nhóm dự án. Cần bổ sung thời gian thật, chi tiết phần việc và ảnh. Mục này không phải xác nhận việc làm tại công ty. `type` có thể là `employment`, `internship`, `collaboration`, `competition`, `student-team`; `sortDate` dùng để xếp mới nhất trước.
- **Lab notebook:** `studio.json → labGroups[].items[]`. Điền `note`, `image`, `updatedAt` (YYYY-MM-DD) khi có cập nhật thật. Nhóm Learning đang trống. Không dùng ngày push repo thay cho ngày xác nhận bạn đang thực hiện công việc.
- **Open to:** điền `identity.availability` cùng `studio.availabilityUpdatedAt` thì trạng thái cơ hội mới xuất hiện. Chỉ điền một trường sẽ không tạo trạng thái thiếu ngày xác nhận.
- **Case study nâng cao:** `projects[].technicalDecisions` nhận các mục `{ "title":{"vi":"","en":""}, "why":{"vi":"","en":""}, "alternatives":{"vi":"","en":""}, "tradeoffs":{"vi":"","en":""} }`; `failedExperiments` và `nextSteps` là chuỗi song ngữ. Các module chỉ xuất hiện khi có nội dung, tránh tạo trải nghiệm nghiên cứu không được xác minh.

Các kỹ năng/category và số dự án liên quan được lấy từ dữ liệu thật. Không thêm nhóm Speech hay các tỷ lệ kỹ năng khi chưa có repo làm minh chứng.


## Kinetic Cinema V2 — các trường hiện hành

| Cần bổ sung | Đường dẫn dữ liệu |
| --- | --- |
| Vai trò hiện tại chính xác | `portfolio.json → identity.currentRole.vi/en` |
| CV PDF | `portfolio.json → identity.cv` (URL `/documents/...pdf`) |
| Hero + orbit + cover case study | `portfolio.json → projects[].media.cover`, `media.alt` |
| Ảnh/clip chân dung ending | `portfolio.json → assets.contact` |
| Ba shot Product Film | `cinema.json → productShots[].src`, `alt`, `label`; có thể dùng ảnh cover làm shot overview |
| Video sản phẩm | `portfolio.json → projects[].media.video` (file video; không autoplay) |
| What / Why / Trade-off của research | `portfolio.json → projects[].pipeline[].detail`, tùy chọn `decision`, `tradeoff` |
| Thử nghiệm A/B, đánh đổi | `projects[].technicalDecisions` (chỉ hiện khi có dữ liệu) |
| Số liệu/kết quả thật | `projects[].metrics` + điều kiện đo, `links.report`; không tự điền phần trăm |
| Bốn frame LabGuard | `studio.json → demoFrames[].image`, `video`, `title` (Work dùng lại dữ liệu frame, không dùng layout Studio) |
| Ví dụ public có output đã lưu | `cinema.json → savedExamples[]`: `project`, `title`, `input`, `output`, `source` |
| Ghi chú experiment | `cinema.json → experiments[]`: `updatedAt`, `hypothesis`, `tried`, `learned`, `next`, `image` |
| Nghề nghiệp mong muốn | `cinema.json → future.role.vi/en`, `future.master`, `future.create` |

Ảnh thiếu được thể hiện bằng typography có chủ đích và nhãn chờ bổ sung; không tạo screenshot giả. `updatedAt` để chuỗi rỗng khi chưa có ngày xác nhận, không lấy ngày commit để giả cập nhật hôm nay.

Ví dụ **schema trống**, chỉ thêm vào `savedExamples` sau khi có đủ dữ liệu public thật:

```json
{
  "project": "labguard",
  "title": { "vi": "", "en": "" },
  "input": { "vi": "", "en": "" },
  "output": { "vi": "", "en": "" },
  "source": ""
}
```

`input`, `output` phải có ít nhất một chuỗi ngôn ngữ có nội dung và `source` phải là URL thật. Khi chưa có, để `savedExamples: []`; Work hiển thị gallery fallback và nói rõ không phải demo AI trực tiếp.
