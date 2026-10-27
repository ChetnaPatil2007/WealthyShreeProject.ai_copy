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

-- Dumping data for table u764489444_WealthSphere.accounts: ~4 rows (approximately)
INSERT INTO `accounts` (`account_id`, `organization_id`, `user_id`, `account_type`, `institution_name`, `account_name`, `account_mask`, `currency_code`, `current_balance`, `available_balance`, `status`, `created_at`) VALUES
	(1, 1, 1, 'BANK', 'HDFC Bank', 'Primary Savings', '****4821', 'INR', 1250000.0000, 1100000.0000, 'ACTIVE', '2026-10-03 14:14:45'),
	(2, 1, 1, 'BROKERAGE', 'Zerodha', 'Investment Account', '****7722', 'INR', 3250000.0000, 3250000.0000, 'ACTIVE', '2026-10-03 14:14:45'),
	(3, 1, 1, 'CREDIT_CARD', 'ICICI Bank', 'Premium Card', '****1188', 'INR', -85000.0000, 165000.0000, 'ACTIVE', '2026-10-03 14:14:45'),
	(4, 2, 2, 'BANK', 'ICICI Bank', 'Family Operating Account', '****9911', 'INR', 2500000.0000, 2400000.0000, 'ACTIVE', '2026-10-03 14:14:45');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
