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

-- Dumping data for table u764489444_WealthSphere.risk_alerts: ~3 rows (approximately)
INSERT INTO `risk_alerts` (`risk_alert_id`, `organization_id`, `user_id`, `alert_type`, `severity`, `title`, `description`, `risk_score`, `status`, `created_at`, `resolved_at`) VALUES
	(1, 1, 1, 'INSURANCE_GAP', 'HIGH', 'Health insurance coverage gap', 'AI identified insufficient family health coverage.', 78.00, 'OPEN', '2026-10-03 14:14:46', NULL),
	(2, 1, 1, 'CONCENTRATION', 'MEDIUM', 'Equity concentration', 'Technology holdings exceed target allocation.', 61.00, 'OPEN', '2026-10-03 14:14:46', NULL),
	(3, 1, 1, 'HIGH_DEBT', 'MEDIUM', 'Credit card balance', 'Revolving credit balance requires attention.', 55.00, 'OPEN', '2026-10-03 14:14:46', NULL);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
