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

-- Dumping data for table u764489444_WealthSphere.organizations: ~4 rows (approximately)
INSERT INTO `organizations` (`organization_id`, `organization_uuid`, `name`, `organization_type`, `country_code`, `base_currency`, `status`, `created_at`, `updated_at`, `deleted_at`, `version_no`) VALUES
	(1, 'c911f006-bf34-11f1-a1df-57eb9422ed3f', 'KPS Wealth Demo', 'INDIVIDUAL', 'IN', 'INR', 'ACTIVE', '2026-10-03 14:14:45', '2026-10-03 14:14:45', NULL, 1),
	(2, 'c911f435-bf34-11f1-a1df-57eb9422ed3f', 'Nimbalkar Family Office', 'FAMILY_OFFICE', 'IN', 'INR', 'ACTIVE', '2026-10-03 14:14:45', '2026-10-03 14:14:45', NULL, 1),
	(3, 'c911f4f1-bf34-11f1-a1df-57eb9422ed3f', 'Global Finance University', 'UNIVERSITY', 'IN', 'INR', 'ACTIVE', '2026-10-03 14:14:45', '2026-10-03 14:14:45', NULL, 1),
	(4, '', 'VIT', 'INDIVIDUAL', 'IN', 'INR', 'ACTIVE', '2026-10-03 14:44:09', '2026-10-03 14:44:47', NULL, 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
