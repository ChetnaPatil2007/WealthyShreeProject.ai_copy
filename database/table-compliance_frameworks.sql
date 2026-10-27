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

-- Dumping data for table u764489444_WealthSphere.compliance_frameworks: ~8 rows (approximately)
INSERT INTO `compliance_frameworks` (`framework_id`, `framework_code`, `framework_name`, `description`) VALUES
	(1, 'FATCA', 'Foreign Account Tax Compliance Act', 'Cross-border tax reporting'),
	(2, 'CRS', 'Common Reporting Standard', 'International tax information exchange'),
	(3, 'AML', 'Anti-Money Laundering', 'Financial crime controls'),
	(4, 'KYC', 'Know Your Customer', 'Customer identity verification'),
	(5, 'GDPR', 'General Data Protection Regulation', 'Privacy controls'),
	(6, 'ISO27001', 'ISO 27001', 'Information security management'),
	(7, 'SOC2', 'SOC 2', 'Service organization controls'),
	(8, 'PCI_DSS', 'PCI DSS', 'Payment card security');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
