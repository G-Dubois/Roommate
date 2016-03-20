-- MySQL dump 10.13  Distrib 5.5.47, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: room8
-- ------------------------------------------------------
-- Server version	5.5.47-0ubuntu0.14.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Bills`
--

DROP TABLE IF EXISTS `Bills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Bills` (
  `BillId` int(11) NOT NULL AUTO_INCREMENT,
  `ChargeToId` int(11) NOT NULL,
  `DayOfTheMonth` date NOT NULL,
  `PaymentTotal` float(10,2) NOT NULL,
  `BillName` varchar(100) NOT NULL,
  `CompanyName` varchar(100) NOT NULL,
  PRIMARY KEY (`BillId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `HouseholdFinances`
--

DROP TABLE IF EXISTS `HouseholdFinances`;
/*!50001 DROP VIEW IF EXISTS `HouseholdFinances`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `HouseholdFinances` (
  `HouseId` tinyint NOT NULL,
  `Address` tinyint NOT NULL,
  `TenantId` tinyint NOT NULL,
  `LivingAtId` tinyint NOT NULL,
  `IsPrimary` tinyint NOT NULL,
  `BillPercentage` tinyint NOT NULL,
  `TenantName` tinyint NOT NULL,
  `BillId` tinyint NOT NULL,
  `ChargeToId` tinyint NOT NULL,
  `DayOfTheMonth` tinyint NOT NULL,
  `PaymentTotal` tinyint NOT NULL,
  `IndividualPayment` tinyint NOT NULL,
  `BillName` tinyint NOT NULL,
  `CompanyName` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `Households`
--

DROP TABLE IF EXISTS `Households`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Households` (
  `HouseId` int(11) NOT NULL AUTO_INCREMENT,
  `Address` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`HouseId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Tenants`
--

DROP TABLE IF EXISTS `Tenants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Tenants` (
  `TenantId` int(11) NOT NULL AUTO_INCREMENT,
  `TenantName` varchar(100) NOT NULL,
  `IsPrimary` tinyint(1) NOT NULL,
  `BillPercentage` float(4,2) NOT NULL,
  `LivingAtId` int(11) NOT NULL,
  PRIMARY KEY (`TenantId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Final view structure for view `HouseholdFinances`
--

/*!50001 DROP TABLE IF EXISTS `HouseholdFinances`*/;
/*!50001 DROP VIEW IF EXISTS `HouseholdFinances`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `HouseholdFinances` AS select `h`.`HouseId` AS `HouseId`,`h`.`Address` AS `Address`,`t`.`TenantId` AS `TenantId`,`t`.`LivingAtId` AS `LivingAtId`,`t`.`IsPrimary` AS `IsPrimary`,`t`.`BillPercentage` AS `BillPercentage`,`t`.`TenantName` AS `TenantName`,`b`.`BillId` AS `BillId`,`b`.`ChargeToId` AS `ChargeToId`,`b`.`DayOfTheMonth` AS `DayOfTheMonth`,`b`.`PaymentTotal` AS `PaymentTotal`,(`b`.`PaymentTotal` * `t`.`BillPercentage`) AS `IndividualPayment`,`b`.`BillName` AS `BillName`,`b`.`CompanyName` AS `CompanyName` from ((`Households` `h` join `Tenants` `t` on((`h`.`HouseId` = `t`.`LivingAtId`))) join `Bills` `b` on((`h`.`HouseId` = `b`.`ChargeToId`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-03-19 20:35:39
