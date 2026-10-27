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

-- Dumping data for table u764489444_WealthSphere.permissions: ~14 rows (approximately)
INSERT INTO `permissions` (`permission_id`, `permission_code`, `permission_name`) VALUES
	(1, 'WEALTH_READ', 'Read wealth data'),
	(2, 'WEALTH_WRITE', 'Manage wealth data'),
	(3, 'AI_USE', 'Use AI services'),
	(4, 'AI_ADMIN', 'Manage AI services'),
	(5, 'DOCUMENT_READ', 'Read documents'),
	(6, 'DOCUMENT_WRITE', 'Manage documents'),
	(7, 'COMPLIANCE_READ', 'Read compliance'),
	(8, 'COMPLIANCE_ADMIN', 'Manage compliance'),
	(9, 'LEARNING_READ', 'Access academy'),
	(10, 'LEARNING_ADMIN', 'Manage academy'),
	(11, 'BILLING_READ', 'Read billing'),
	(12, 'BILLING_ADMIN', 'Manage billing'),
	(13, 'AUDIT_READ', 'Read audit logs'),
	(14, 'TENANT_ADMIN', 'Manage tenant');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
