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

-- Dumping data for table u764489444_WealthSphere.liabilities: ~2 rows (approximately)
INSERT INTO `liabilities` (`liability_id`, `organization_id`, `user_id`, `liability_type`, `lender`, `liability_name`, `principal_amount`, `outstanding_amount`, `interest_rate`, `monthly_payment`, `currency_code`, `maturity_date`, `status`, `created_at`) VALUES
	(1, 1, 1, 'HOME_LOAN', 'HDFC Bank', 'Home Loan', 5000000.0000, 3250000.0000, 8.2500, 42000.0000, 'INR', '2034-12-31', 'ACTIVE', '2026-10-03 14:14:46'),
	(2, 1, 1, 'CREDIT_CARD', 'ICICI Bank', 'Credit Card', 150000.0000, 85000.0000, 36.0000, 8500.0000, 'INR', '2027-03-31', 'ACTIVE', '2026-10-03 14:14:46');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
