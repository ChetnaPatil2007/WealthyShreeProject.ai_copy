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

-- Dumping data for table u764489444_WealthSphere.compliance_events: ~4 rows (approximately)
INSERT INTO `compliance_events` (`compliance_event_id`, `organization_id`, `framework_id`, `event_type`, `status`, `reference_id`, `details`, `event_at`) VALUES
	(1, 1, 1, 'Annual FATCA review', 'PASS', 'FATCA-2026-001', '{"country":"IN","reviewed":true}', '2026-10-03 14:14:46'),
	(2, 1, 3, 'AML screening', 'PASS', 'AML-2026-001', '{"risk":"LOW","screening":"CLEAR"}', '2026-10-03 14:14:46'),
	(3, 1, 4, 'KYC verification', 'PASS', 'KYC-2026-001', '{"identity_verified":true}', '2026-10-03 14:14:46'),
	(4, 1, 5, 'Privacy consent', 'PASS', 'GDPR-2026-001', '{"consent_version":"2.1"}', '2026-10-03 14:14:46');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
