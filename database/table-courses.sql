-- --------------------------------------------------------
-- Host:                         srv1873.hstgr.io
-- Server version:               11.8.9-MariaDB-log - MariaDB Server
-- Server OS:                    Linux
-- HeidiSQL Version:             12.21.0.7344
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping data for table u764489444_WealthSphere.courses: ~10 rows (approximately)
INSERT INTO `courses` (`course_id`, `course_code`, `title`, `category`, `level`, `duration_hours`, `accreditation_body`, `certificate_enabled`, `active`) VALUES
	(1, 'PF101', 'Personal Finance', 'Personal Finance', 'BEGINNER', 12.00, 'CPD-aligned', 1, 1),
	(2, 'FP201', 'Financial Planning', 'Financial Planning', 'INTERMEDIATE', 24.00, 'CPD-aligned', 1, 1),
	(3, 'WM301', 'Wealth Management', 'Wealth Management', 'ADVANCED', 30.00, 'CPD-aligned', 1, 1),
	(4, 'IA301', 'Investment Analysis', 'Investment Analysis', 'ADVANCED', 32.00, 'CPD-aligned', 1, 1),
	(5, 'FO401', 'Family Office Management', 'Family Office', 'PROFESSIONAL', 36.00, 'CPD-aligned', 1, 1),
	(6, 'RP301', 'Retirement Planning', 'Retirement Planning', 'ADVANCED', 20.00, 'CPD-aligned', 1, 1),
	(7, 'EP301', 'Estate Planning', 'Estate Planning', 'ADVANCED', 20.00, 'CPD-aligned', 1, 1),
	(8, 'TP301', 'Tax Planning', 'Tax Planning', 'ADVANCED', 24.00, 'CPD-aligned', 1, 1),
	(9, 'ESG301', 'ESG Investing', 'ESG', 'INTERMEDIATE', 16.00, 'CPD-aligned', 1, 1),
	(10, 'AIF301', 'AI in Finance', 'AI', 'PROFESSIONAL', 18.00, 'CPD-aligned', 1, 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
