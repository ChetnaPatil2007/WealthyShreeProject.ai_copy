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

-- Dumping data for table u764489444_WealthSphere.notifications: ~3 rows (approximately)
INSERT INTO `notifications` (`notification_id`, `organization_id`, `user_id`, `notification_type`, `title`, `message`, `severity`, `is_read`, `created_at`) VALUES
	(1, 1, 1, 'RISK_ALERT', 'Insurance coverage gap detected', 'Review the AI-generated insurance coverage analysis.', 'WARNING', 0, '2026-10-03 14:14:46'),
	(2, 1, 1, 'GOAL_PROGRESS', 'Retirement goal updated', 'Your retirement projection has been recalculated.', 'INFO', 0, '2026-10-03 14:14:46'),
	(3, 1, 1, 'TAX_REMINDER', 'Tax planning review', 'Review your tax plan and supporting documents.', 'INFO', 0, '2026-10-03 14:14:46');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
