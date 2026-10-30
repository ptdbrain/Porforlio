# Nội dung GitHub và CV — 30/10/2026

Đã rà danh sách 49 repo công khai của `ptdbrain`, đọc README và các file mã/nhật ký kết quả phù hợp với từng dự án. Theo yêu cầu mới, không đưa các repo bài lab vào portfolio. Dữ liệu hiện có **23 case study**: 22 repo dự án/công cụ (bao gồm PRISM được đọc local) và cánh tay robot từ CV.

Danh sách đầy đủ, commit đối chiếu, file đã đọc và lý do loại trừ nằm trong [github-project-inventory.json](github-project-inventory.json). Repo chỉ chứa README tên dự án (`botbot`, `ML-Project-for-Intro-ML-and-Datamining`), starter chung `P-195-ai20k-agent` và bài thực hành CRUD `IT4409-20252` không được trình bày như sản phẩm hoàn thiện. LabGuard là sản phẩm hackathon riêng, được giữ lại; việc kiểm tra bài lab là chức năng sản phẩm, không phải một repo bài lab.

## Nội dung đã bổ sung

- Mỗi dự án có giới thiệu, bài toán, cách xây dựng, stack, luồng kỹ thuật, kết quả/phạm vi hiện có và giới hạn bằng cả tiếng Việt lẫn tiếng Anh.
- DPOTM, AdverTest và MedTutor được đặt đầu thư viện. Các scene nổi bật hiện có vẫn giữ thứ tự và bố cục V3.
- Case study hiển thị danh sách nguồn: README, file triển khai, báo cáo, CV hoặc bài báo. Link mã nguồn được ghim theo commit khi có thể. Tìm kiếm nhận cả tên repo, ví dụ `medbot`, `BrainFlow`, `DPOTM`.
- Nội dung từ CV gồm vị trí Hà Nội, học vấn HUST/chuyên Vĩnh Phúc, kinh nghiệm GeoIT VNPT/BA GPS/robotics, thành tích và vai trò câu lạc bộ cầu lông. PDF gốc được giữ nguyên; bản phục vụ tải nằm ở `public/CV_PhanTrongDat.pdf`.

## Đóng góp và kết quả có nguồn

- **LLMFeed / DPOTM:** CV liên kết DPOTM với LLMFeed, nêu phần triển khai, baseline, đánh giá và ablation. [ACL Anthology](https://aclanthology.org/2026.emnlp-main.265/) xác nhận bài ở EMNLP 2026 main proceedings và `Dat Phan Trong` là tác giả thứ hai. Kết quả trong bài là kết quả nhóm; không phải phép đo mới chạy lại từ repo. README NeuroMax cũ không được dùng để gán tác giả bài NeuroMax cho Đạt.
- **AdverTest, BrainFlow, MedTutor, AI Parking:** đóng góp cá nhân lấy từ CV và đối chiếu các module tương ứng trong repo. Adapter, integration hoặc mã test có mặt không tự chứng minh deployment hoặc hiệu quả ngoài thực tế.
- **LabGuard:** README và reflection có tên xác định Product Owner, spec và impact. Kết quả golden/self-test được ghi là eval nội bộ, không biến thành tác động người dùng hoặc giải cuộc thi.
- **PRISM:** GitHub công khai trả 404 cả khi thử lại. Đã đọc checkout do người dùng cung cấp tại `/mnt/DATA/PaperResearch/Quantization/PRISM`, gồm README, pipeline, review engineering và artifact run. Checkout có thay đổi chưa commit; SHA HEAD là mốc tham chiếu, không phải hash toàn bộ nội dung đang làm. Hash từng file đã đọc được lưu trong `repositoryReview.fileHashes`. Không đưa mã private hoặc artifact thô vào portfolio. Phân biệt PRISM-original data-free profiling với CBER có calibration split; không nhận engineering test là bằng chứng phục hồi chất lượng hoặc native GPU speedup.
- **Robotic Arm:** nội dung theo CV, không tự tạo repo hoặc gắn giải thưởng khác vào dự án khi chưa có xác nhận.

## Phần bạn còn có thể bổ sung

1. Ảnh thật, video/demo và báo cáo của dự án; hiện ảnh vẫn để trống.
2. Vai trò/module trực tiếp ở các repo chưa có trong CV hoặc chưa có báo cáo phân công: SentinelAI, FutureVLA, FireBite, AHS/BDS, Tour-resQ, TCB Stock Prediction, PSO-Optimize, game, AI-exam, face-detection và KV-cache experiments. PathFinder đã xác nhận là thành viên nhóm nhưng chưa rõ module cá nhân.
3. Thử thách/bài học cá nhân, mốc thời gian hoặc metric đã được phép công bố. Không suy diễn những mục này từ tên repo hoặc tác giả commit.
4. Minh chứng riêng cho thành tích/kinh nghiệm đang ghi theo CV, ảnh học tập và chứng nhận AI Thực chiến.

## Kiểm tra

Kiểm tra ở đây áp dụng cho **portfolio**: build/prerender, dữ liệu, nguồn, route, tìm kiếm, nội dung CV và browser/accessibility. Không cài/chạy lại toàn bộ hệ thống AI, workload GPU hoặc test suite của các repo được mô tả. Các số từ README/artifact được ghi đúng nguồn và phạm vi; thiếu benchmark thì ghi rõ thay vì tự tạo số.

Kết quả kiểm tra bản cập nhật: lint đạt; 32 unit test đạt; 64 E2E đạt, 2 bỏ qua theo cấu hình thiết bị. Build tạo 28 trang tĩnh. Kiểm tra thủ công bằng trình duyệt qua 60 tổ hợp trang/ngôn ngữ/kích thước (320, 375, 768, 1024, 1440 px) không tràn ngang; 6 trang kiểm tra axe không có vi phạm WCAG A/AA. Cả 23 case study đều có phần giới thiệu, triển khai và kết quả trong HTML khi tắt JavaScript; không ghi nhận lỗi JavaScript ở lượt kiểm tra này.

Không tự commit, push hoặc triển khai nội dung mới này.
