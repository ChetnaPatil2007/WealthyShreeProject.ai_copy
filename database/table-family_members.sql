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

-- Dumping data for table u764489444_WealthSphere.family_members: ~4 rows (approximately)
INSERT INTO `family_members` (`family_member_id`, `family_id`, `user_id`, `full_name`, `relationship_to_primary`, `date_of_birth`, `gender`, `ownership_percent`, `beneficiary_percent`, `is_dependent`, `status`) VALUES
	(1, 1, 2, 'Amit Nimbalkar', 'Self', NULL, NULL, 60.0000, 50.0000, 0, 'ACTIVE'),
	(2, 1, NULL, 'Meera Nimbalkar', 'Spouse', NULL, NULL, 20.0000, 25.0000, 0, 'ACTIVE'),
	(3, 1, NULL, 'Rohan Nimbalkar', 'Child', NULL, NULL, 10.0000, 12.5000, 1, 'ACTIVE'),
	(4, 1, NULL, 'Anaya Nimbalkar', 'Child', NULL, NULL, 10.0000, 12.5000, 1, 'ACTIVE');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
