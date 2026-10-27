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

-- Dumping data for table u764489444_WealthSphere.financial_goals: ~3 rows (approximately)
INSERT INTO `financial_goals` (`goal_id`, `organization_id`, `user_id`, `family_id`, `goal_type`, `goal_name`, `target_amount`, `current_amount`, `monthly_required`, `target_date`, `priority`, `status`, `currency_code`) VALUES
	(1, 1, 1, NULL, 'EDUCATION', 'Child Education', 5000000.0000, 1250000.0000, 35000.0000, '2034-06-01', 'HIGH', 'ACTIVE', 'INR'),
	(2, 1, 1, NULL, 'EARLY_RETIREMENT', 'Early Retirement', 30000000.0000, 5000000.0000, 65000.0000, '2042-01-01', 'CRITICAL', 'ACTIVE', 'INR'),
	(3, 1, 1, NULL, 'EMERGENCY', 'Emergency Fund', 1000000.0000, 650000.0000, 25000.0000, '2027-03-01', 'HIGH', 'ACTIVE', 'INR');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
