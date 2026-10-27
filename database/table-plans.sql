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

-- Dumping data for table u764489444_WealthSphere.plans: ~8 rows (approximately)
INSERT INTO `plans` (`plan_id`, `plan_code`, `plan_name`, `target_user`, `monthly_price`, `annual_price`, `currency_code`, `max_users`, `ai_enabled`, `academy_enabled`, `enterprise_enabled`, `active`) VALUES
	(1, 'FREE', 'Free', 'Students and individuals', 0.00, 0.00, 'USD', 1, 1, 1, 0, 1),
	(2, 'PERSONAL', 'Personal', 'Individuals', 19.00, 190.00, 'USD', 1, 1, 1, 0, 1),
	(3, 'FAMILY', 'Family', 'Families', 49.00, 490.00, 'USD', 8, 1, 1, 0, 1),
	(4, 'PROFESSIONAL', 'Professional', 'Financial advisors', 99.00, 990.00, 'USD', 25, 1, 1, 0, 1),
	(5, 'PREMIUM', 'Premium', 'High-net-worth individuals', 199.00, 1990.00, 'USD', 5, 1, 1, 0, 1),
	(6, 'FAMILY_OFFICE', 'Family Office', 'Multi-generational wealth management', 499.00, 4990.00, 'USD', 50, 1, 1, 1, 1),
	(7, 'ENTERPRISE', 'Enterprise', 'Banks, NBFCs, insurers, corporates', 1999.00, 19990.00, 'USD', 500, 1, 1, 1, 1),
	(8, 'UNIVERSITY', 'University', 'Educational institutions', 999.00, 9990.00, 'USD', 1000, 1, 1, 1, 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
