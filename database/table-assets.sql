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

-- Dumping data for table u764489444_WealthSphere.assets: ~5 rows (approximately)
INSERT INTO `assets` (`asset_id`, `organization_id`, `owner_user_id`, `family_id`, `asset_type`, `asset_name`, `institution`, `quantity`, `purchase_value`, `current_value`, `currency_code`, `acquisition_date`, `risk_level`, `liquidity`, `status`, `created_at`, `updated_at`) VALUES
	(1, 1, 1, NULL, 'MUTUAL_FUND', 'Nifty Index Fund', 'AMC', 2500.00000000, 1500000.0000, 1750000.0000, 'INR', '2023-04-01', 'MEDIUM', 'LIQUID', 'ACTIVE', '2026-10-03 14:14:46', '2026-10-03 14:14:46'),
	(2, 1, 1, NULL, 'STOCK', 'Technology Portfolio', 'Zerodha', 1.00000000, 900000.0000, 1100000.0000, 'INR', '2024-01-10', 'HIGH', 'LIQUID', 'ACTIVE', '2026-10-03 14:14:46', '2026-10-03 14:14:46'),
	(3, 1, 1, NULL, 'GOLD', 'Gold Holdings', 'Vault', 250.00000000, 1200000.0000, 1850000.0000, 'INR', '2020-06-01', 'MEDIUM', 'SEMI_LIQUID', 'ACTIVE', '2026-10-03 14:14:46', '2026-10-03 14:14:46'),
	(4, 2, 2, 1, 'REAL_ESTATE', 'Family Residence', 'Pune', 1.00000000, 8500000.0000, 12500000.0000, 'INR', '2018-05-10', 'LOW', 'ILLIQUID', 'ACTIVE', '2026-10-03 14:14:46', '2026-10-03 14:14:46'),
	(5, 2, 2, 1, 'BUSINESS', 'Family Business', 'Private', 1.00000000, 5000000.0000, 8000000.0000, 'INR', '2015-01-01', 'HIGH', 'ILLIQUID', 'ACTIVE', '2026-10-03 14:14:46', '2026-10-03 14:14:46');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
