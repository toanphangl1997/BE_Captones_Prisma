/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `binh_luan` (
  `binh_luan_id` int NOT NULL AUTO_INCREMENT,
  `nguoi_dung_id` int DEFAULT NULL,
  `hinh_id` int DEFAULT NULL,
  `ngay_binh_luan` date DEFAULT NULL,
  `noi_dung` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`binh_luan_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  KEY `hinh_id` (`hinh_id`),
  CONSTRAINT `binh_luan_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`),
  CONSTRAINT `binh_luan_ibfk_2` FOREIGN KEY (`hinh_id`) REFERENCES `hinh_anh` (`hinh_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `hinh_anh` (
  `hinh_id` int NOT NULL AUTO_INCREMENT,
  `ten_hinh` varchar(255) DEFAULT NULL,
  `duong_dan` varchar(255) DEFAULT NULL,
  `mo_ta` varchar(255) DEFAULT NULL,
  `nguoi_dung_id` int DEFAULT NULL,
  PRIMARY KEY (`hinh_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  CONSTRAINT `hinh_anh_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `luu_anh` (
  `nguoi_dung_id` int NOT NULL,
  `hinh_id` int NOT NULL,
  `ngay_luu` date DEFAULT NULL,
  PRIMARY KEY (`nguoi_dung_id`,`hinh_id`),
  KEY `hinh_id` (`hinh_id`),
  CONSTRAINT `luu_anh_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`),
  CONSTRAINT `luu_anh_ibfk_2` FOREIGN KEY (`hinh_id`) REFERENCES `hinh_anh` (`hinh_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `nguoi_dung` (
  `nguoi_dung_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `mat_khau` varchar(255) NOT NULL,
  `ho_ten` varchar(255) DEFAULT NULL,
  `tuoi` int DEFAULT NULL,
  `anh_dai_dien` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`nguoi_dung_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `binh_luan` (`binh_luan_id`, `nguoi_dung_id`, `hinh_id`, `ngay_binh_luan`, `noi_dung`) VALUES
(1, 1, 1, '2024-11-01', 'Binh luan 1');
INSERT INTO `binh_luan` (`binh_luan_id`, `nguoi_dung_id`, `hinh_id`, `ngay_binh_luan`, `noi_dung`) VALUES
(2, 2, 2, '2024-11-02', 'Binh luan 2');
INSERT INTO `binh_luan` (`binh_luan_id`, `nguoi_dung_id`, `hinh_id`, `ngay_binh_luan`, `noi_dung`) VALUES
(3, 3, 3, '2024-11-03', 'Binh luan 3');
INSERT INTO `binh_luan` (`binh_luan_id`, `nguoi_dung_id`, `hinh_id`, `ngay_binh_luan`, `noi_dung`) VALUES
(4, 4, 4, '2024-11-04', 'Binh luan 4'),
(5, 7, 4, '2024-11-04', 'Bình luận 4.1'),
(6, 6, 3, '2024-11-04', 'test bình luận nè'),
(7, 5, 3, '2024-11-04', 'test bình luận nè'),
(8, 8, 1, '2024-11-04', 'test bình luận nè'),
(9, 9, 1, '2024-11-04', 'test bình luận nè'),
(10, NULL, 1, NULL, 'test bình luận nè');

INSERT INTO `hinh_anh` (`hinh_id`, `ten_hinh`, `duong_dan`, `mo_ta`, `nguoi_dung_id`) VALUES
(1, 'Hinh 1', 'path/to/image1.jpg', 'Mo ta 1', 1);
INSERT INTO `hinh_anh` (`hinh_id`, `ten_hinh`, `duong_dan`, `mo_ta`, `nguoi_dung_id`) VALUES
(2, 'Hinh 2', 'path/to/image2.jpg', 'Mo ta 2', 2);
INSERT INTO `hinh_anh` (`hinh_id`, `ten_hinh`, `duong_dan`, `mo_ta`, `nguoi_dung_id`) VALUES
(3, 'Hinh 3', 'path/to/image3.jpg', 'Mo ta 3', 3);
INSERT INTO `hinh_anh` (`hinh_id`, `ten_hinh`, `duong_dan`, `mo_ta`, `nguoi_dung_id`) VALUES
(4, 'Hinh 4', 'path/to/image4.jpg', 'Mo ta 4', 4),
(5, 'Hinh 5', 'path/to/image5.jpg', 'Mo ta 5', 1),
(6, 'Hinh 6', 'path/to/image6.jpg', 'Mo ta 6', 1),
(7, 'Hình 7', 'path/to/image6.jpg', 'Mo ta 7', 7),
(8, 'Hình 8', 'path/to/image8.jpg', 'Mo ta 8', 8),
(9, 'Hình 9', 'path/to/image9.jpg', 'Mo ta 9', 9),
(10, 'Hình 10', 'path/to/image10.jpg', 'Mo ta 10', 10);

INSERT INTO `luu_anh` (`nguoi_dung_id`, `hinh_id`, `ngay_luu`) VALUES
(1, 1, '2024-11-05');
INSERT INTO `luu_anh` (`nguoi_dung_id`, `hinh_id`, `ngay_luu`) VALUES
(1, 5, '2024-11-08');
INSERT INTO `luu_anh` (`nguoi_dung_id`, `hinh_id`, `ngay_luu`) VALUES
(1, 6, '2024-11-09');
INSERT INTO `luu_anh` (`nguoi_dung_id`, `hinh_id`, `ngay_luu`) VALUES
(2, 2, '2024-11-06'),
(3, 3, '2024-11-07');

INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `mat_khau`, `ho_ten`, `tuoi`, `anh_dai_dien`) VALUES
(1, 'user1@gmail.com', 'password1', 'Nguyen Van A', 25, 'avatar1.jpg');
INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `mat_khau`, `ho_ten`, `tuoi`, `anh_dai_dien`) VALUES
(2, 'user2@gmail.com', 'password2', 'Tran Thi B', 30, 'avatar2.jpg');
INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `mat_khau`, `ho_ten`, `tuoi`, `anh_dai_dien`) VALUES
(3, 'user3@gmail.com', 'password3', 'Le Van C', 20, 'avatar3.jpg');
INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `mat_khau`, `ho_ten`, `tuoi`, `anh_dai_dien`) VALUES
(4, 'user4@gmail.com', 'password4', 'Phan Đình F', 28, 'avatar004.jpg'),
(5, 'user5@gmail.com', 'password5', 'Phan Đình G', 30, 'avatar0005.jpg'),
(6, 'user6@gmail.com', 'password6', 'Pham Thị H', 23, 'avatar6.jpg'),
(7, 'user7@gmail.com', '$2b$10$HINhfhPL/OcXWdy03KGF3.4q3sBSZMCYHB78.jM/iW0nTt3wus98O', 'Trần Văn J', 34, 'avatar7.jpg'),
(8, 'user9@gmail.com', '$2b$10$B5W9xtNpJUaoRPz4RwH0V.wTxaATbWeVBQ0XiX4Ud7c7qM5W6LUzS', 'Vũ Hoàng K', 65, 'avatar8.jpg'),
(9, 'user10@gmail.com', '$2b$10$JdE9rVCyeppe63j7SIy7.ODnaef8jwHnGYDrr7raKm/7rOB.ee19C', 'Nguyễn Thanh Z', 12, 'avatar9.jpg'),
(10, 'user11@gmail.com', '$2b$10$snqlSm/vIF.8ddPPSCTsB.7xLywR/yKF9ZeqNOIC/kMdf7Bi17hcW', 'Mai Hoàng X', 43, 'avatar10.jpg'),
(11, 'user12@gmail.com', '$2b$10$KeysIknFsmCohCRu59HhEu709aGGwzz/kNhBWJuMN8cU1NIwK0yZC', 'Cao Minh N', 29, 'avatar11.jpg'),
(12, 'user13@gmail.com', '$2b$10$3tzgmpirxpJO.coY1ky2KO.lGV4umRPSgYqZX/3km3hme27O018su', NULL, NULL, NULL);


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;