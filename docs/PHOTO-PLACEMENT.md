# Ảnh đã bổ sung từ thư mục anh

| Ảnh gốc | Vị trí hiển thị |
| --- | --- |
| `thcs.jpg` | Ảnh chương THCS trong hành trình |
| `thpt1.jpg` | Ảnh chương THPT, collage thể thao, thư viện cầu lông |
| `thptchutichclbcaulong.jpg` | Thành tích Chủ nhiệm CLB Cầu lông, thư viện cầu lông |
| `thptthiroboticgiainhat.jpg` | Thư viện ảnh chương THPT và thành tích Quán quân Robotics Challenge |
| `thptvodichgiaicaulong.jpg` | Ảnh chính phần cầu lông và collage bạn bè |

Ảnh gốc giữ tại `anh/`; bản phục vụ website nằm tại `public/anh/`, được tham chiếu trong `src/content/portfolio.json`. Hai bản giữ nguyên nội dung, không cắt hay chỉnh sửa ảnh gốc. Khi thay ảnh, cập nhật cả hai nơi.

Ảnh dùng `fit: contain` để giữ toàn bộ người và chữ trong khung. Caption VI/EN nằm trong dữ liệu, xem được khi mở ảnh lớn; ảnh contain không có lớp caption phủ lên chữ có sẵn trong poster. Các hiệu ứng lật/mở khung vẫn hoạt động, nhưng không zoom cắt nội dung ảnh contain.

Ba ảnh `thcs.jpg`, `thpt1.jpg`, `thptthiroboticgiainhat.jpg` chỉ có kích thước 206×206 px. Nên thay bằng bản gốc nét hơn khi có, nhất là ảnh hành trình trên desktop.

Người dùng đã xác nhận thành tích Quán quân Robotics Challenge thời THPT; ảnh robotics được gắn vào mục quán quân riêng. Vai trò mentor đội á quân trong CV vẫn là mục riêng.

## Đợt ảnh bổ sung tiếp theo

| Ảnh | Vị trí |
| --- | --- |
| `anhcanhandep.jpg` | Hero Home, thẻ Personal, liên hệ và ảnh chính collage |
| `anhsukiendontongbithuToLamoBachKhoa.jpg` | Chương Đại học và collage học tập; caption dựa trên nội dung sự kiện trong ảnh |
| `venturex.jpg` | Thành tích Venture X, thư viện Đại học và thẻ Work trên Home |
| `giainhiquocgiakhkt.jpg` | Thành tích KHKT quốc gia 2023 và thư viện THPT |
| `giaychungnhandatgiainhikhktcapquocgia.jpg` | Minh chứng trong hộp chi tiết thành tích KHKT quốc gia |
| `giainhatkhktcaptinh.jpg` | Mục mới: giải Nhất KHKT tỉnh Vĩnh Phúc 2023 |
| `giaikhuyenkhichhocsinhgioimontinhoc.jpg` | Mục mới: Khuyến khích Tin học lớp 11 cấp tỉnh 2022 |
| `huychuongtuoitresangtao.jpg` | Mục mới: Huy hiệu Tuổi trẻ sáng tạo 2023, tách khỏi giải Sáng tạo trẻ cấp tỉnh 2022 |
| `thptaquanhocsinhtoannangcvpaward.jpg` | Á quân CVP Awards 2023; tên thành tích cập nhật thành Học sinh toàn năng theo xác nhận của người dùng. Caption ảnh giữ chữ Học sinh của năm trên ảnh. |

Ba chứng nhận chụp ngang được hiển thị xoay -90° bằng trường `rotate` trong dữ liệu và CSS, kể cả khi mở ảnh lớn. File gốc không bị sửa. Ảnh cá nhân được canh khung bằng `object-position` để ưu tiên khuôn mặt; bản gốc có thanh trạng thái điện thoại, có thể thay ảnh gốc không chụp màn hình sau này.
