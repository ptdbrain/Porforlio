# Kinetic Cinema V2 — kế hoạch triển khai

Áp dụng bản mới nhất của `newidea2.md`; thay thế Work Studio. Chỉ đổi nhánh Work và skin/format case study, giữ Personal, routes, nguồn dữ liệu và SEO.

1. Base: `src/content/cinema.json`, `cinemaCopy.js`; các scene trong `src/components/cinema/`; `cinema.css`; ghép ở `editorial/Work.jsx`.
2. Motion foundation: `CinemaMotion.jsx` quản lý tiến độ từng cảnh, Simple view/reduced motion/thiết bị yếu; App thêm nút và shortcut, portal transition; display font Sora local.
3. Signature: ColdOpenHero, KineticManifesto, ProjectOrbit có điều khiển, fallback snap/list; một controller scroll, không chặn wheel/touch.
4. Project worlds: MedTutor Product Film; FutureVLA Research Motion; LabGuard Interactive Experience dùng screenshot/documented scope nếu chưa có output thật. Không mô phỏng kết quả AI chưa tồn tại.
5. Story: ExperienceCredits, SkillsInMotion, ExperimentRoom, FutureHorizon, WorkClosing; giữ thư viện dự án tìm/lọc được trong chế độ đọc nhanh.
6. Verify: build, kiểm tra node/source dữ liệu, browser desktop/mobile, accessibility, Simple view/reduced motion, deep link, Back, normal motion và CPU throttle. Không deploy hoặc commit tự động.

Tài sản chưa có vẫn để trống. Typography thay ảnh thiếu; không tạo ảnh sản phẩm, kết quả, ngày cập nhật, chức danh hay metric giả. Các thử nghiệm chưa có dữ liệu A/B hoặc metrics không hiện biểu đồ/nhánh giả.
