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

-- Dumping data for table u764489444_WealthSphere.insurance_policies: ~3 rows (approximately)
INSERT INTO `insurance_policies` (`policy_id`, `organization_id`, `user_id`, `policy_type`, `insurer`, `policy_number`, `coverage_amount`, `premium_amount`, `currency_code`, `start_date`, `expiry_date`, `status`, `ai_coverage_gap`) VALUES
	(1, 1, 1, 'HEALTH', 'Star Health', 'SH-DEMO-1001', 1000000.0000, 35000.0000, 'INR', '2026-01-01', '2027-01-01', 'ACTIVE', 500000.0000),
	(2, 1, 1, 'LIFE', 'LIC', 'LIC-DEMO-2001', 10000000.0000, 20000.0000, 'INR', '2026-01-01', '2046-01-01', 'ACTIVE', 2500000.0000),
	(3, 1, 1, 'VEHICLE', 'ICICI Lombard', 'MOTOR-DEMO-3001', 800000.0000, 18000.0000, 'INR', '2026-06-01', '2027-06-01', 'ACTIVE', 0.0000);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
