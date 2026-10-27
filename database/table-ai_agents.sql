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

-- Dumping data for table u764489444_WealthSphere.ai_agents: ~10 rows (approximately)
INSERT INTO `ai_agents` (`agent_id`, `agent_code`, `agent_name`, `domain`, `description`, `model_provider`, `model_name`, `active`) VALUES
	(1, 'FINANCIAL_PLANNER', 'Financial Planner Agent', 'Planning', 'Financial health and planning', 'Local/Cloud', 'LLM', 1),
	(2, 'TAX', 'Tax Agent', 'Tax', 'Country-specific tax planning', 'Local/Cloud', 'LLM', 1),
	(3, 'INVESTMENT', 'Investment Agent', 'Investments', 'Portfolio analysis and allocation', 'Local/Cloud', 'LLM', 1),
	(4, 'INSURANCE', 'Insurance Agent', 'Insurance', 'Coverage analysis', 'Local/Cloud', 'LLM', 1),
	(5, 'ESTATE', 'Estate Agent', 'Estate', 'Wills, trusts and succession', 'Local/Cloud', 'LLM', 1),
	(6, 'LEGAL', 'Legal Agent', 'Legal', 'Document and workflow assistance', 'Local/Cloud', 'LLM', 1),
	(7, 'BANKING', 'Banking Agent', 'Banking', 'Accounts and cash-flow assistance', 'Local/Cloud', 'LLM', 1),
	(8, 'WEALTH_COACH', 'Wealth Coach Agent', 'Coaching', 'Multilingual wealth coaching', 'Local/Cloud', 'LLM', 1),
	(9, 'FAMILY_OFFICE', 'Family Office Agent', 'Family Office', 'Multi-generational wealth management', 'Local/Cloud', 'LLM', 1),
	(10, 'REBALANCING', 'Portfolio Rebalancing Agent', 'Portfolio', 'Portfolio drift analysis', 'Local/Cloud', 'LLM', 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
