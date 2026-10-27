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

-- Dumping data for table u764489444_WealthSphere.users: ~3 rows (approximately)
INSERT INTO `users` (`user_id`, `organization_id`, `user_uuid`, `email`, `password_hash`, `first_name`, `last_name`, `phone`, `preferred_language`, `country_code`, `timezone`, `mfa_enabled`, `status`, `last_login_at`, `created_at`, `updated_at`, `deleted_at`, `version_no`) VALUES
	(1, 1, 'c915992e-bf34-11f1-a1df-57eb9422ed3f', 'demo@wealthsphere.ai', '$2y$12$DEMO_HASH_NOT_FOR_PRODUCTION', 'Sachin', 'Demo', '+91-9000000000', 'en', 'IN', 'UTC', 1, 'ACTIVE', NULL, '2026-10-03 14:14:45', '2026-10-03 14:14:45', NULL, 1),
	(2, 2, 'c9159c56-bf34-11f1-a1df-57eb9422ed3f', 'family@wealthsphere.ai', '$2y$12$DEMO_HASH_NOT_FOR_PRODUCTION', 'Amit', 'Nimbalkar', '+91-9000000001', 'en', 'IN', 'UTC', 1, 'ACTIVE', NULL, '2026-10-03 14:14:45', '2026-10-03 14:14:45', NULL, 1),
	(3, 3, 'c9159d3b-bf34-11f1-a1df-57eb9422ed3f', 'student@wealthsphere.ai', '$2y$12$DEMO_HASH_NOT_FOR_PRODUCTION', 'Priya', 'Sharma', '+91-9000000002', 'en', 'IN', 'UTC', 1, 'ACTIVE', NULL, '2026-10-03 14:14:45', '2026-10-03 14:14:45', NULL, 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
