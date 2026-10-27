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

-- Dumping data for table u764489444_WealthSphere.transactions: ~6 rows (approximately)
INSERT INTO `transactions` (`transaction_id`, `organization_id`, `account_id`, `transaction_date`, `transaction_type`, `category`, `description`, `amount`, `currency_code`, `merchant`, `created_at`) VALUES
	(1, 1, 1, '2026-09-01', 'INCOME', 'SALARY', 'Monthly salary', 160000.0000, 'INR', 'Employer', '2026-10-03 14:14:45'),
	(2, 1, 1, '2026-09-03', 'EXPENSE', 'HOUSING', 'Home expenses', 30000.0000, 'INR', 'Housing', '2026-10-03 14:14:45'),
	(3, 1, 1, '2026-09-05', 'EXPENSE', 'EDUCATION', 'Education fees', 25000.0000, 'INR', 'School', '2026-10-03 14:14:45'),
	(4, 1, 1, '2026-09-10', 'INVESTMENT', 'SIP', 'Monthly mutual fund SIP', 20000.0000, 'INR', 'AMC', '2026-10-03 14:14:45'),
	(5, 1, 1, '2026-09-15', 'EXPENSE', 'UTILITIES', 'Utilities', 8500.0000, 'INR', 'Utilities', '2026-10-03 14:14:45'),
	(6, 1, 1, '2026-09-25', 'EXPENSE', 'LIFESTYLE', 'Lifestyle', 12000.0000, 'INR', 'Card', '2026-10-03 14:14:45');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
