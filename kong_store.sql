CREATE DATABASE  IF NOT EXISTS `kong_store` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `kong_store`;
-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: kong_store
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `id_categoria` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `activo` tinyint NOT NULL DEFAULT '1',
  `creado_en` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `actualizado_en` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'PlayStation','Consolas Sony PlayStation (PS4, PS5, PS5 PRO, m)',1,'2026-06-08 03:47:48.294016','2026-06-08 14:29:44.000000'),(2,'Xbox','Consolas Microsoft Xbox (Series S, Series X)',1,'2026-06-08 03:47:48.294016','2026-06-08 03:47:48.294016'),(3,'Nintendo','Consolas Nintendo (Switch, Switch Lite, Switch OLED)',1,'2026-06-08 03:47:48.294016','2026-06-08 03:47:48.294016'),(4,'Mandos y Controles','Controles, joysticks, volantes y más',1,'2026-06-08 03:47:48.294016','2026-06-08 03:47:48.294016'),(5,'Audífonos Gaming','Headsets, audífonos con micrófono',1,'2026-06-08 03:47:48.294016','2026-06-08 03:47:48.294016'),(6,'Mouse Gaming','Mouse ergonómicos para gaming',1,'2026-06-08 03:47:48.294016','2026-06-08 03:47:48.294016'),(7,'Monitores','Monitores de alta tasa de refresco',1,'2026-06-08 03:47:48.294016','2026-06-08 03:47:48.294016'),(8,'Sillas Gamer','Sillas ergonómicas para gaming',1,'2026-06-08 03:47:48.294016','2026-06-08 03:47:48.294016'),(9,'Juegos PlayStation','Juegos físicos y digitales PS4/PS5',1,'2026-06-08 03:47:48.294016','2026-06-08 03:47:48.294016'),(10,'Juegos Xbox','Juegos físicos y digitales Xbox',1,'2026-06-08 03:47:48.294016','2026-06-08 03:47:48.294016'),(11,'Juegos Nintendo','Juegos físicos y digitales Nintendo Switch',1,'2026-06-08 03:47:48.294016','2026-06-08 03:47:48.294016'),(12,'Streaming','Cámaras, micrófonos, luces para streamers',1,'2026-06-08 03:47:48.294016','2026-06-08 03:47:48.294016'),(13,'Captura de Video','Tarjetas de captura y accesorios',1,'2026-06-08 03:47:48.294016','2026-06-08 03:47:48.294016'),(14,'mono feo','prueba xd peroo',1,'2026-06-08 06:59:46.872380','2026-06-08 07:00:21.000000'),(15,'mono','bbbbbbbbbbbbbbbbbbbb',0,'2026-06-08 14:40:27.014679','2026-06-08 14:41:09.000000');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  `apellido_p` varchar(150) NOT NULL,
  `apellido_m` varchar(150) NOT NULL,
  `telefono` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `activo` tinyint NOT NULL DEFAULT '1',
  `creado_en` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `actualizado_en` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (1,'Juan','Pérez','García','71234567','juan.perez@email.com',1,'2026-06-08 04:33:15.161605','2026-06-08 04:33:15.161605'),(2,'María','López','Flores','72345678','maria.lopez@email.com',1,'2026-06-08 04:33:15.161605','2026-06-08 04:33:15.161605'),(3,'Carlos','Mamani','Quispe','73456789','carlos.mamani@email.com',1,'2026-06-08 04:33:15.161605','2026-06-08 04:33:15.161605'),(4,'Ana','Rodríguez','Vargas','74567890','ana.rodriguez@email.com',1,'2026-06-08 04:33:15.161605','2026-06-08 04:33:15.161605'),(5,'Luis','Fernández','Torres','75678901','luis.fernandez@email.com',1,'2026-06-08 04:33:15.161605','2026-06-08 04:33:15.161605'),(6,'Laura','Gutiérrez','Mendoza','76789012','laura.gutierrez@email.com',1,'2026-06-08 04:33:15.161605','2026-06-08 04:33:15.161605'),(7,'Pedro','Sánchez','Rojas','77890123','pedro.sanchez@email.com',1,'2026-06-08 04:33:15.161605','2026-06-08 04:33:15.161605'),(8,'Sofía','Díaz','Castro','78901234','sofia.diaz@email.com',1,'2026-06-08 04:33:15.161605','2026-06-08 04:33:15.161605'),(9,'Diego','Torres','Ramírez','79012345','diego.torres@email.com',1,'2026-06-08 04:33:15.161605','2026-06-08 04:33:15.161605'),(10,'Valentina','Morales','Cruz','70123456','valentina.morales@email.com',1,'2026-06-08 04:33:15.161605','2026-06-08 04:33:15.161605'),(11,'Andrés','Ortiz','Jiménez','71234568','andres.ortiz@email.com',1,'2026-06-08 04:33:15.161605','2026-06-08 04:33:15.161605'),(12,'Camila','Reyes','Aguilar','72345679','camila.reyes@email.com',1,'2026-06-08 04:33:15.161605','2026-06-08 04:33:15.161605'),(13,'Javier','Flores','Molina','73456780','javier.flores@email.com',1,'2026-06-08 04:33:15.161605','2026-06-08 04:33:15.161605'),(14,'Isabella','Gómez','Peña','74567891','isabella.gomez@email.com',1,'2026-06-08 04:33:15.161605','2026-06-08 04:33:15.161605'),(15,'Ricardo','Vargas','Silva','75678902','ricardo.vargas@email.com',1,'2026-06-08 04:33:15.161605','2026-06-08 04:33:15.161605'),(16,'Fernanda','Castro','Ortega','76789013','fernanda.castro@email.com',1,'2026-06-08 04:33:15.161605','2026-06-08 04:33:15.161605'),(17,'Alejandro','Mendoza','Ramos','77890124','alejandro.mendoza@email.com',1,'2026-06-08 04:33:15.161605','2026-06-08 04:33:15.161605'),(18,'Daniela','Aguilar','Medina','78901235','daniela.aguilar@email.com',1,'2026-06-08 04:33:15.161605','2026-06-08 04:33:15.161605'),(19,'Francisco','Rojas','Luna','79012346','francisco.rojas@email.com',1,'2026-06-08 04:33:15.161605','2026-06-08 04:33:15.161605'),(20,'Gabriela','Peña','Ríos','70123457','gabriela.pena@email.com',1,'2026-06-08 04:33:15.161605','2026-06-08 04:33:15.161605'),(21,'Elizabeth','Layme','Quispe','77750199','manumonse305@gmail.com',1,'2026-06-08 15:08:12.639404','2026-06-08 15:08:12.639404'),(22,'Manuela','Choque','Quispe','77754526','manumonse305@gmail.com',1,'2026-06-08 15:08:53.747928','2026-06-08 15:08:53.747928'),(23,'Harlen','Mamani ','Gutierres','77755677','hatrlen5@gmail.com',1,'2026-06-08 21:20:58.360730','2026-06-08 21:20:58.360730'),(24,'Juan','Perez','Garcia','71234567','juan@test.com',1,'2026-06-08 21:24:34.903343','2026-06-08 21:24:34.903343'),(25,'Pedro','Condori','Montes','70568423','pedroCm05@gmail.com',1,'2026-06-08 21:32:47.337249','2026-06-08 21:36:27.000000');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `compras`
--

DROP TABLE IF EXISTS `compras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `compras` (
  `compraId` int NOT NULL AUTO_INCREMENT,
  `proveedor_id` int NOT NULL,
  `usuario_id` int NOT NULL,
  `fecha_compra` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `total` decimal(12,2) NOT NULL DEFAULT '0.00',
  `creado_en` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`compraId`),
  KEY `FK_d7b3950fea313d15e46e0c59286` (`proveedor_id`),
  KEY `FK_ec0332a11c8fa9c4330aaca0aea` (`usuario_id`),
  CONSTRAINT `FK_d7b3950fea313d15e46e0c59286` FOREIGN KEY (`proveedor_id`) REFERENCES `proveedores` (`id_proveedor`),
  CONSTRAINT `FK_ec0332a11c8fa9c4330aaca0aea` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compras`
--

LOCK TABLES `compras` WRITE;
/*!40000 ALTER TABLE `compras` DISABLE KEYS */;
INSERT INTO `compras` VALUES (1,1,1,'2026-06-08 04:51:38.000000',1.00,'2026-06-08 04:51:38.714091'),(2,2,1,'2026-06-08 04:51:38.000000',1.00,'2026-06-08 04:51:38.789389'),(3,3,1,'2026-06-08 04:51:38.000000',1.00,'2026-06-08 04:51:38.847145'),(4,4,1,'2026-06-08 04:51:38.000000',1.00,'2026-06-08 04:51:38.915508'),(5,5,1,'2026-06-08 04:51:38.000000',1.00,'2026-06-08 04:51:38.972290'),(6,6,1,'2026-06-08 04:51:39.000000',1.00,'2026-06-08 04:51:39.031407'),(7,1,1,'2026-06-08 04:53:22.000000',0.00,'2026-06-08 04:53:22.489315'),(8,2,1,'2026-06-08 04:56:57.000000',0.00,'2026-06-08 04:56:57.589902'),(9,3,1,'2026-06-08 04:58:59.000000',0.00,'2026-06-08 04:58:59.011576'),(10,4,1,'2026-06-08 04:59:58.000000',0.00,'2026-06-08 04:59:58.250266'),(11,5,1,'2026-06-08 05:04:20.000000',0.00,'2026-06-08 05:04:20.505017'),(12,6,1,'2026-06-08 05:04:42.000000',0.00,'2026-06-08 05:04:42.417029'),(13,6,3,'2026-06-08 05:47:12.822609',0.00,'2026-06-08 05:47:12.822609'),(14,1,3,'2026-06-08 05:51:57.321569',0.00,'2026-06-08 05:51:57.321569'),(15,5,3,'2026-06-08 05:57:24.032878',0.00,'2026-06-08 05:57:24.032878'),(16,2,3,'2026-06-08 06:02:23.580366',5100.00,'2026-06-08 06:02:23.580366'),(17,2,3,'2026-06-08 06:46:44.890757',3000.00,'2026-06-08 06:46:44.890757'),(18,1,3,'2026-06-08 06:57:40.758565',0.00,'2026-06-08 06:57:40.758565'),(19,8,3,'2026-06-08 07:05:00.364617',0.00,'2026-06-08 07:05:00.364617'),(20,8,4,'2026-06-08 21:08:43.068706',0.00,'2026-06-08 21:08:43.068706'),(21,8,4,'2026-06-08 21:14:42.892666',0.00,'2026-06-08 21:14:42.892666'),(22,10,4,'2026-06-08 21:19:30.715790',220.00,'2026-06-08 21:19:30.715790');
/*!40000 ALTER TABLE `compras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_compras`
--

DROP TABLE IF EXISTS `detalle_compras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_compras` (
  `id_detalle` int NOT NULL AUTO_INCREMENT,
  `id_compra` int NOT NULL,
  `id_producto` int NOT NULL,
  `cantidad` int NOT NULL,
  `costo_unitario` decimal(10,2) NOT NULL,
  `subtotal` decimal(12,2) NOT NULL,
  PRIMARY KEY (`id_detalle`),
  KEY `FK_1642c2168019e20641cc269b6ed` (`id_compra`),
  KEY `FK_e20e9e96432dfb25c4c4d3246bc` (`id_producto`),
  CONSTRAINT `FK_1642c2168019e20641cc269b6ed` FOREIGN KEY (`id_compra`) REFERENCES `compras` (`compraId`),
  CONSTRAINT `FK_e20e9e96432dfb25c4c4d3246bc` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_compras`
--

LOCK TABLES `detalle_compras` WRITE;
/*!40000 ALTER TABLE `detalle_compras` DISABLE KEYS */;
INSERT INTO `detalle_compras` VALUES (1,1,1,5,3800.00,19000.00),(2,1,2,3,4200.00,12600.00),(3,1,4,2,4400.00,8800.00),(4,2,7,4,1800.00,7200.00),(5,2,8,2,4500.00,9000.00),(6,2,10,6,750.00,4500.00),(7,3,12,5,2500.00,12500.00),(8,3,13,4,1400.00,5600.00),(9,3,16,10,380.00,3800.00),(10,3,18,3,280.00,840.00),(11,4,35,15,250.00,3750.00),(12,4,38,20,80.00,1600.00),(13,4,28,8,450.00,3600.00),(14,5,36,10,250.00,2500.00),(15,5,37,8,130.00,1040.00),(16,5,33,5,500.00,2500.00),(17,6,42,3,1400.00,4200.00),(18,6,55,20,250.00,5000.00),(19,6,56,15,230.00,3450.00),(20,13,7,5,1800.00,9000.00),(21,14,7,2,1800.00,3600.00),(22,15,86,1,400.00,400.00),(23,16,7,6,700.00,4200.00),(24,16,16,3,300.00,900.00),(25,17,15,50,60.00,3000.00),(26,18,17,5,150.00,750.00),(27,19,90,34,67.00,2278.00),(28,20,90,3,90.00,270.00),(29,21,1,1,45.00,45.00),(30,22,90,1,60.00,60.00),(31,22,90,8,20.00,160.00);
/*!40000 ALTER TABLE `detalle_compras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_ventas`
--

DROP TABLE IF EXISTS `detalle_ventas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_ventas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `venta_id` int NOT NULL,
  `producto_id` int NOT NULL,
  `cantidad` int NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL,
  `subtotal` decimal(12,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_ebfe4ddaa56d1a98410cb4b7f67` (`venta_id`),
  KEY `FK_41f061fb15d8454df77e5806478` (`producto_id`),
  CONSTRAINT `FK_41f061fb15d8454df77e5806478` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id_producto`),
  CONSTRAINT `FK_ebfe4ddaa56d1a98410cb4b7f67` FOREIGN KEY (`venta_id`) REFERENCES `ventas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_ventas`
--

LOCK TABLES `detalle_ventas` WRITE;
/*!40000 ALTER TABLE `detalle_ventas` DISABLE KEYS */;
INSERT INTO `detalle_ventas` VALUES (1,1,1,1,4800.00,4800.00),(2,1,18,4,280.00,1120.00),(3,2,16,3,500.00,1500.00),(4,3,15,1,480.00,480.00),(5,3,20,1,480.00,480.00),(6,4,90,4,67.00,268.00),(7,4,35,1,350.00,350.00);
/*!40000 ALTER TABLE `detalle_ventas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estados_servicio`
--

DROP TABLE IF EXISTS `estados_servicio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estados_servicio` (
  `id_estado_s` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id_estado_s`),
  UNIQUE KEY `IDX_c0b7d469056818c08f4413cfa1` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estados_servicio`
--

LOCK TABLES `estados_servicio` WRITE;
/*!40000 ALTER TABLE `estados_servicio` DISABLE KEYS */;
INSERT INTO `estados_servicio` VALUES (2,'EN_REPARACION'),(4,'ENTREGADO'),(1,'RECIBIDO'),(3,'TERMINADO');
/*!40000 ALTER TABLE `estados_servicio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `log_accesos`
--

DROP TABLE IF EXISTS `log_accesos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `log_accesos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `ip` varchar(100) DEFAULT NULL,
  `browser` varchar(255) DEFAULT NULL,
  `evento` enum('INGRESO','SALIDA') NOT NULL,
  `fecha_hora` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `log_accesos`
--

LOCK TABLES `log_accesos` WRITE;
/*!40000 ALTER TABLE `log_accesos` DISABLE KEYS */;
INSERT INTO `log_accesos` VALUES (1,4,'172.18.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36','SALIDA','2026-06-08 00:00:28.493229'),(2,4,'172.18.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36','INGRESO','2026-06-08 01:42:41.158753'),(3,4,'172.18.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36','INGRESO','2026-06-08 01:46:45.811918'),(4,4,'172.18.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36','SALIDA','2026-06-08 01:47:36.076455'),(5,3,'172.18.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36','INGRESO','2026-06-08 01:48:10.972121'),(6,3,'172.18.0.1','Thunder Client (https://www.thunderclient.com)','INGRESO','2026-06-08 01:54:20.298617'),(7,3,'172.18.0.1','Thunder Client (https://www.thunderclient.com)','INGRESO','2026-06-08 02:02:59.212255'),(8,3,'172.18.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36','SALIDA','2026-06-08 02:11:05.236522'),(9,3,'172.18.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36','INGRESO','2026-06-08 02:12:00.137464'),(10,3,'172.18.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36','SALIDA','2026-06-08 02:13:59.626565'),(11,3,'172.18.0.1','Mozilla/5.0 (Linux; Android 8.0.0; SM-G955U Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36','INGRESO','2026-06-08 02:14:55.166331'),(12,3,'172.18.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36','SALIDA','2026-06-08 02:17:15.616792'),(13,3,'172.18.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36','INGRESO','2026-06-08 02:17:52.974705'),(14,3,'172.18.0.1','Thunder Client (https://www.thunderclient.com)','INGRESO','2026-06-08 02:26:43.271246'),(15,3,'172.18.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36','INGRESO','2026-06-08 14:16:17.605737'),(16,5,'172.18.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36','INGRESO','2026-06-08 15:06:11.576321'),(17,3,'172.18.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36','INGRESO','2026-06-08 15:12:56.493454'),(18,3,'172.18.0.1','Thunder Client (https://www.thunderclient.com)','INGRESO','2026-06-08 16:35:26.884703'),(19,3,'172.18.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36','INGRESO','2026-06-08 19:09:07.188709'),(20,3,'172.18.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36','INGRESO','2026-06-08 19:21:04.201153'),(21,4,'172.18.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36','INGRESO','2026-06-08 20:31:48.033045'),(22,3,'172.18.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36','INGRESO','2026-06-08 20:37:23.316178'),(23,4,'172.18.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36','INGRESO','2026-06-08 20:56:23.517570'),(24,3,'172.18.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36','INGRESO','2026-06-08 20:58:47.439507'),(25,4,'172.18.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36','INGRESO','2026-06-08 20:59:45.315902'),(26,4,'172.18.0.1','Thunder Client (https://www.thunderclient.com)','INGRESO','2026-06-08 21:23:51.390478'),(27,3,'172.18.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36','INGRESO','2026-06-08 21:47:04.359673'),(28,4,'172.18.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36','INGRESO','2026-06-08 22:37:48.675041');
/*!40000 ALTER TABLE `log_accesos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id_producto` int NOT NULL AUTO_INCREMENT,
  `id_categoria` int NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `descripcion` text,
  `precio_venta` decimal(10,2) NOT NULL,
  `stock_minimo` int NOT NULL DEFAULT '1',
  `stock` int NOT NULL DEFAULT '0',
  `activo` tinyint NOT NULL DEFAULT '1',
  `creado_en` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `actualizado_en` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id_producto`),
  KEY `FK_67e14062fdfd39fba436bccaff3` (`id_categoria`),
  CONSTRAINT `FK_67e14062fdfd39fba436bccaff3` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,1,'PlayStation 5 Edición Digital','PS5 sin lector de discos, 825GB SSD  cccccccc',4800.00,1,23,1,'2026-06-08 03:58:07.882418','2026-06-08 21:14:42.000000'),(2,1,'PlayStation 5 con Lector','PS5 estándar con lector de discos',5500.00,1,11,1,'2026-06-08 03:58:07.882418','2026-06-08 04:56:25.986108'),(3,1,'PlayStation 4 Pro','PS4 Pro 1TB, rendimiento mejorado',2500.00,2,10,1,'2026-06-08 03:58:07.882418','2026-06-08 03:58:07.882418'),(4,1,'PlayStation 5 Slim','Versión más compacta de PS5',5200.00,1,7,1,'2026-06-08 03:58:07.882418','2026-06-08 04:56:25.998208'),(5,4,'DualSense Edge','Mando profesional con personalización',850.00,1,6,1,'2026-06-08 03:58:07.882418','2026-06-08 03:58:07.882418'),(6,1,'PlayStation Portal','Dispositivo remoto para jugar en cualquier lugar',1400.00,1,4,1,'2026-06-08 03:58:07.882418','2026-06-08 03:58:07.882418'),(7,2,'Xbox Series S 512GB','Consola digital, todo blanco',2200.00,2,33,1,'2026-06-08 03:58:07.907563','2026-06-08 06:02:23.000000'),(8,2,'Xbox Series X 1TB','La consola más potente de Microsoft',5200.00,1,10,1,'2026-06-08 03:58:07.907563','2026-06-08 04:57:52.789147'),(9,2,'Xbox Series X 2TB Galaxy Edition','Edición especial negra con puntos brillantes',6200.00,1,2,1,'2026-06-08 03:58:07.907563','2026-06-08 03:58:07.907563'),(10,4,'Xbox Elite Series 2','Mando profesional con paddle traseros',950.00,1,17,1,'2026-06-08 03:58:07.907563','2026-06-08 04:57:52.806128'),(11,2,'Xbox Series S 1TB Carbon Black','Versión negra con más almacenamiento',2800.00,1,7,1,'2026-06-08 03:58:07.907563','2026-06-08 03:58:07.907563'),(12,3,'Nintendo Switch OLED','Pantalla OLED de 7 pulgadas',3200.00,2,20,1,'2026-06-08 03:58:07.925448','2026-06-08 04:59:20.136458'),(13,3,'Nintendo Switch Lite','Portátil solo para modo manual',1800.00,1,16,1,'2026-06-08 03:58:07.925448','2026-06-08 04:59:20.159457'),(14,3,'Nintendo Switch (Modelo 2019)','Modelo estándar con mejor batería',2800.00,1,6,1,'2026-06-08 03:58:07.925448','2026-06-08 03:58:07.925448'),(15,4,'Joy-Con Neon (Par)','Pares de controles azul/rojo',480.00,3,64,1,'2026-06-08 03:58:07.925448','2026-06-08 06:58:28.000000'),(16,4,'Joy-Con Verde/ Rosa','Edición especial Splatoon',500.00,2,28,1,'2026-06-08 03:58:07.925448','2026-06-08 06:37:35.000000'),(17,4,'Pro Controller','Mando profesional Nintendo',350.00,2,17,1,'2026-06-08 03:58:07.925448','2026-06-08 06:57:40.000000'),(18,3,'Nintendo Switch Dock','Base para conectar a TV',280.00,1,7,1,'2026-06-08 03:58:07.925448','2026-06-08 06:31:41.000000'),(19,4,'DualSense Galactic Purple','Mando PS5 color morado galáctico',480.00,2,10,1,'2026-06-08 03:58:07.938666','2026-06-08 03:58:07.938666'),(20,4,'DualSense Cosmic Red','Mando PS5 color rojo cósmico',480.00,2,7,1,'2026-06-08 03:58:07.938666','2026-06-08 06:58:28.000000'),(21,4,'DualSense Nova Pink','Mando PS5 color rosa nova',480.00,1,6,1,'2026-06-08 03:58:07.938666','2026-06-08 03:58:07.938666'),(22,4,'Xbox Carbon Black','Mando Xbox estándar negro',380.00,3,15,1,'2026-06-08 03:58:07.938666','2026-06-08 03:58:07.938666'),(23,4,'Xbox Electric Volt','Mando Xbox color amarillo neón',400.00,1,5,1,'2026-06-08 03:58:07.938666','2026-06-08 03:58:07.938666'),(24,4,'Xbox Mineral Camo','Edición especial camuflaje',450.00,1,4,1,'2026-06-08 03:58:07.938666','2026-06-08 03:58:07.938666'),(25,4,'Volante Logitech G29','Volante para PS5/PC con pedales',2200.00,1,3,1,'2026-06-08 03:58:07.938666','2026-06-08 03:58:07.938666'),(26,4,'Volante Thrustmaster T300','Volante profesional para simulación',3500.00,1,2,1,'2026-06-08 03:58:07.938666','2026-06-08 03:58:07.938666'),(27,4,'Joystick Flight Simulator','Joystick para juegos de aviones',680.00,1,4,1,'2026-06-08 03:58:07.938666','2026-06-08 03:58:07.938666'),(28,5,'PlayStation PULSE 3D','Audífonos oficiales PS5, 3D audio',650.00,2,28,1,'2026-06-08 03:58:07.949304','2026-06-08 05:01:13.157612'),(29,5,'Xbox Wireless Headset','Audífonos oficiales Xbox',600.00,2,8,1,'2026-06-08 03:58:07.949304','2026-06-08 03:58:07.949304'),(30,5,'Nintendo Switch Headset','Audífonos compatibles con Switch',280.00,2,10,1,'2026-06-08 03:58:07.949304','2026-06-08 03:58:07.949304'),(31,5,'HyperX Cloud II','Audífonos gamer con sonido 7.1',550.00,3,15,1,'2026-06-08 03:58:07.949304','2026-06-08 03:58:07.949304'),(32,5,'Logitech G335','Audífonos ligeros para gaming',380.00,2,10,1,'2026-06-08 03:58:07.949304','2026-06-08 03:58:07.949304'),(33,5,'Razer BlackShark V2','Audífonos profesionales para eSports',700.00,1,16,1,'2026-06-08 03:58:07.949304','2026-06-08 05:04:36.080461'),(34,5,'SteelSeries Arctis 7','Audífonos inalámbricos con micrófono retráctil',850.00,1,5,1,'2026-06-08 03:58:07.949304','2026-06-08 03:58:07.949304'),(35,6,'Logitech G502 Hero','Mouse gamer con 11 botones programables',350.00,4,49,1,'2026-06-08 03:58:07.961733','2026-06-08 21:07:06.000000'),(36,6,'Razer DeathAdder V2','Mouse ergonómico para diestros',320.00,3,35,1,'2026-06-08 03:58:07.961733','2026-06-08 05:04:35.991607'),(37,6,'Razer Viper Mini','Mouse ultraligero para eSports',180.00,2,28,1,'2026-06-08 03:58:07.961733','2026-06-08 05:04:36.060290'),(38,6,'Logitech G203 Lightsync','Mouse gamer económico RGB',120.00,5,65,1,'2026-06-08 03:58:07.961733','2026-06-08 05:01:13.146024'),(39,6,'SteelSeries Rival 3','Mouse con sensor TrueMove Core',200.00,2,10,1,'2026-06-08 03:58:07.961733','2026-06-08 03:58:07.961733'),(40,6,'Redragon Cobra M711','Mouse gamer con 7 botones',110.00,3,18,1,'2026-06-08 03:58:07.961733','2026-06-08 03:58:07.961733'),(41,6,'Alienware AW610M','Mouse inalámbrico premium',580.00,1,4,1,'2026-06-08 03:58:07.961733','2026-06-08 03:58:07.961733'),(42,7,'LG UltraGear 27\" 144Hz','Monitor 1ms, 144Hz, Full HD',1800.00,1,12,1,'2026-06-08 03:58:07.972596','2026-06-08 05:04:59.994573'),(43,7,'Samsung Odyssey G5 32\"','Monitor curvo 144Hz, 1440p',2500.00,1,4,1,'2026-06-08 03:58:07.972596','2026-06-08 03:58:07.972596'),(44,7,'ASUS TUF 24\" 165Hz','Monitor gaming 165Hz, G-Sync',1500.00,2,8,1,'2026-06-08 03:58:07.972596','2026-06-08 03:58:07.972596'),(45,7,'Acer Nitro 27\" 165Hz','Monitor IPS 165Hz, 1ms',1900.00,1,5,1,'2026-06-08 03:58:07.972596','2026-06-08 03:58:07.972596'),(46,7,'MSI Optix 34\" Curvo','Monitor ultrawide 144Hz',3800.00,1,2,1,'2026-06-08 03:58:07.972596','2026-06-08 03:58:07.972596'),(47,7,'Zowie XL2546K','Monitor 240Hz para eSports',3200.00,1,3,1,'2026-06-08 03:58:07.972596','2026-06-08 03:58:07.972596'),(48,7,'Gigabyte M27Q 27\"','Monitor 170Hz, 1440p, KVM',2100.00,1,4,1,'2026-06-08 03:58:07.972596','2026-06-08 03:58:07.972596'),(49,8,'Corsair T3 Rush','Silla gamer de tela transpirable',1800.00,1,5,1,'2026-06-08 03:58:07.985644','2026-06-08 03:58:07.985644'),(50,8,'DXRacer Racing','Silla gamer clásica reclinable',2200.00,1,3,1,'2026-06-08 03:58:07.985644','2026-06-08 03:58:07.985644'),(51,8,'Cougar Armor S','Silla gamer con soporte lumbar',1500.00,1,4,1,'2026-06-08 03:58:07.985644','2026-06-08 03:58:07.985644'),(52,8,'Razer Iskur','Silla con soporte lumbar ajustable',2800.00,1,2,1,'2026-06-08 03:58:07.985644','2026-06-08 03:58:07.985644'),(53,8,'Secretlab Titan Evo','Silla premium para gaming',3500.00,1,2,1,'2026-06-08 03:58:07.985644','2026-06-08 03:58:07.985644'),(54,8,'Nitro Concepts S300','Silla gamer económica',1200.00,2,6,1,'2026-06-08 03:58:07.985644','2026-06-08 03:58:07.985644'),(55,9,'Marvel Spider-Man 2','Exclusivo PS5',380.00,5,60,1,'2026-06-08 03:58:08.001270','2026-06-08 05:05:00.009106'),(56,9,'God of War Ragnarök','PS4/PS5, edición estándar',350.00,4,48,1,'2026-06-08 03:58:08.001270','2026-06-08 05:05:00.022165'),(57,9,'The Last of Us Part I','Remake para PS5',380.00,3,15,1,'2026-06-08 03:58:08.001270','2026-06-08 03:58:08.001270'),(58,9,'Horizon Forbidden West','Aventura mundo abierto',320.00,3,12,1,'2026-06-08 03:58:08.001270','2026-06-08 03:58:08.001270'),(59,9,'Final Fantasy XVI','RPG exclusivo PS5',360.00,2,10,1,'2026-06-08 03:58:08.001270','2026-06-08 03:58:08.001270'),(60,9,'Gran Turismo 7','Simulador de carreras',300.00,3,14,1,'2026-06-08 03:58:08.001270','2026-06-08 03:58:08.001270'),(61,9,'Demon Souls','Remake del clásico PS5',320.00,2,8,1,'2026-06-08 03:58:08.001270','2026-06-08 03:58:08.001270'),(62,9,'Ratchet & Clank: Rift Apart','Aventura dimensional',300.00,2,10,1,'2026-06-08 03:58:08.001270','2026-06-08 03:58:08.001270'),(63,10,'Halo Infinite','Campaña y multijugador',280.00,5,20,1,'2026-06-08 03:58:08.013611','2026-06-08 03:58:08.013611'),(64,10,'Forza Horizon 5','Carreras mundo abierto México',300.00,4,18,1,'2026-06-08 03:58:08.013611','2026-06-08 03:58:08.013611'),(65,10,'Starfield','RPG espacial de Bethesda',350.00,3,15,1,'2026-06-08 03:58:08.013611','2026-06-08 03:58:08.013611'),(66,10,'Gears 5','Acción en tercera persona',220.00,3,12,1,'2026-06-08 03:58:08.013611','2026-06-08 03:58:08.013611'),(67,10,'Microsoft Flight Simulator','Simulación de vuelo realista',450.00,2,8,1,'2026-06-08 03:58:08.013611','2026-06-08 03:58:08.013611'),(68,10,'Sea of Thieves','Aventura pirata multijugador',250.00,2,10,1,'2026-06-08 03:58:08.013611','2026-06-08 03:58:08.013611'),(69,11,'Super Mario Bros Wonder','Nuevo juego de Mario 2D',320.00,5,25,1,'2026-06-08 03:58:08.028158','2026-06-08 03:58:08.028158'),(70,11,'The Legend of Zelda: Tears of the Kingdom','Secuela de Breath of the Wild',380.00,5,20,1,'2026-06-08 03:58:08.028158','2026-06-08 03:58:08.028158'),(71,11,'Pokémon Escarlata','RPG mundo abierto',320.00,4,18,1,'2026-06-08 03:58:08.028158','2026-06-08 03:58:08.028158'),(72,11,'Pokémon Púrpura','RPG mundo abierto',320.00,4,18,1,'2026-06-08 03:58:08.028158','2026-06-08 03:58:08.028158'),(73,11,'Mario Kart 8 Deluxe','Carreras multijugador',310.00,5,22,1,'2026-06-08 03:58:08.028158','2026-06-08 03:58:08.028158'),(74,11,'Animal Crossing','Simulación de vida',310.00,3,15,1,'2026-06-08 03:58:08.028158','2026-06-08 03:58:08.028158'),(75,11,'Super Smash Bros Ultimate','Peleas multijugador',350.00,3,12,1,'2026-06-08 03:58:08.028158','2026-06-08 03:58:08.028158'),(76,11,'Metroid Dread','Acción y exploración',310.00,2,8,1,'2026-06-08 03:58:08.028158','2026-06-08 03:58:08.028158'),(77,11,'Luigi Mansion 3','Aventura de fantasmas',310.00,2,10,1,'2026-06-08 03:58:08.028158','2026-06-08 03:58:08.028158'),(78,12,'Logitech StreamCam','Cámara 1080p 60fps para streaming',850.00,1,6,1,'2026-06-08 03:58:08.041904','2026-06-08 03:58:08.041904'),(79,12,'Elgato Key Light','Panel LED regulable para streamers',850.00,1,4,1,'2026-06-08 03:58:08.041904','2026-06-08 03:58:08.041904'),(80,12,'Blue Yeti Nano','Micrófono USB para streaming',550.00,2,8,1,'2026-06-08 03:58:08.041904','2026-06-08 03:58:08.041904'),(81,12,'Razer Seiren Mini','Micrófono compacto',320.00,2,10,1,'2026-06-08 03:58:08.041904','2026-06-08 03:58:08.041904'),(82,12,'Elgato Stream Deck','Panel de control con teclas LCD',950.00,1,5,1,'2026-06-08 03:58:08.041904','2026-06-08 03:58:08.041904'),(83,12,'Logitech Litra Glow','Luz LED para streaming',380.00,1,7,1,'2026-06-08 03:58:08.041904','2026-06-08 03:58:08.041904'),(84,13,'Elgato HD60 X','Tarjeta de captura 4K para streaming',1450.00,1,5,1,'2026-06-08 03:58:08.057309','2026-06-08 03:58:08.057309'),(85,13,'Elgato Cam Link 4K','Convierte cámara en webcam',750.00,1,4,1,'2026-06-08 03:58:08.057309','2026-06-08 03:58:08.057309'),(86,13,'AverMedia Live Gamer 4K','Captura 4K60 HDR',1800.00,1,4,1,'2026-06-08 03:58:08.057309','2026-06-08 05:57:24.000000'),(87,13,'AverMedia GC311','Captura Full HD económica',550.00,1,6,1,'2026-06-08 03:58:08.057309','2026-06-08 03:58:08.057309'),(88,13,'Elgato 4K60 S+','Captura externa 4K sin PC',2800.00,1,2,1,'2026-06-08 03:58:08.057309','2026-06-08 03:58:08.057309'),(89,13,'Razer Ripsaw HD','Tarjeta de captura HD',1200.00,1,4,1,'2026-06-08 03:58:08.057309','2026-06-08 03:58:08.057309'),(90,14,'prueba','prueba del mono feo',67.00,3,42,1,'2026-06-08 07:02:21.400253','2026-06-08 21:19:30.000000');
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proveedores`
--

DROP TABLE IF EXISTS `proveedores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proveedores` (
  `id_proveedor` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  `telefono` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `activo` tinyint NOT NULL DEFAULT '1',
  `creado_en` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `actualizado_en` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id_proveedor`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedores`
--

LOCK TABLES `proveedores` WRITE;
/*!40000 ALTER TABLE `proveedores` DISABLE KEYS */;
INSERT INTO `proveedores` VALUES (1,'Sony Bolivia','71234567','ventas@sony.com.bo','Av. América 123, La Paz',1,'2026-06-08 04:35:51.260422','2026-06-08 20:37:44.000000'),(2,'Microsoft Bolivia','72345678','ventas@microsoft.com.bo','Calle Comercio 456, Santa Cruz',1,'2026-06-08 04:35:51.260422','2026-06-08 04:35:51.260422'),(3,'Nintendo Latinoamérica','73456789','ventas@nintendo.lat','Av. Busch 789, Cochabamba',1,'2026-06-08 04:35:51.260422','2026-06-08 04:35:51.260422'),(4,'Logitech Bolivia','74567890','ventas@logitech.com.bo','Calle Potosí 101, La Paz',1,'2026-06-08 04:35:51.260422','2026-06-08 04:35:51.260422'),(5,'Razer Store','75678901','ventas@razer.com.bo','Av. San Martín 202, Santa Cruz',1,'2026-06-08 04:35:51.260422','2026-06-08 04:35:51.260422'),(6,'Distribuidora Gamer','76789012','info@gamer.com.bo','Calle 25 de Mayo 303, Cochabamba',1,'2026-06-08 04:35:51.260422','2026-06-08 04:35:51.260422'),(7,'Corporacion CB','77754526','manumonse305@gmail.com','sopocachi',0,'2026-06-08 05:55:14.141446','2026-06-08 05:56:10.000000'),(8,'prueba xxd','777777','manumonse305@gmail.com','mmmmmmmmmmmmmmmmmm 88',1,'2026-06-08 07:01:09.859539','2026-06-08 15:35:29.000000'),(9,'.','89890998','manumonse305@gmail.com','mmmmmm',0,'2026-06-08 15:34:55.303843','2026-06-08 15:35:08.000000'),(10,'Productores S.A','77501999','productores40@gmail.com','Final Muñoz Cornejo',1,'2026-06-08 16:10:45.201917','2026-06-08 16:10:45.201917');
/*!40000 ALTER TABLE `proveedores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `activo` tinyint NOT NULL DEFAULT '1',
  `creado_en` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `actualizado_en` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_a5be7aa67e759e347b1c6464e1` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'ADMIN',1,'2026-06-08 00:05:47.307424','2026-06-08 00:05:47.307424'),(2,'VENDEDOR',1,'2026-06-08 00:05:47.307424','2026-06-08 00:05:47.307424');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicios_tecnicos`
--

DROP TABLE IF EXISTS `servicios_tecnicos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servicios_tecnicos` (
  `id_servicio` int NOT NULL AUTO_INCREMENT,
  `cliente_id` int NOT NULL,
  `estado_id` int NOT NULL,
  `equipo` varchar(150) NOT NULL,
  `problema` text,
  `diagnostico` text,
  `costo` decimal(10,2) DEFAULT NULL,
  `fecha_ingreso` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `fecha_entrega` datetime DEFAULT NULL,
  `activo` tinyint NOT NULL DEFAULT '1',
  `creado_en` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `actualizado_en` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id_servicio`),
  KEY `FK_6afd5f3df2f74fd04cd6f61f759` (`cliente_id`),
  KEY `FK_24d5c8c6a6b11eb4bbebeb46a97` (`estado_id`),
  CONSTRAINT `FK_24d5c8c6a6b11eb4bbebeb46a97` FOREIGN KEY (`estado_id`) REFERENCES `estados_servicio` (`id_estado_s`),
  CONSTRAINT `FK_6afd5f3df2f74fd04cd6f61f759` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicios_tecnicos`
--

LOCK TABLES `servicios_tecnicos` WRITE;
/*!40000 ALTER TABLE `servicios_tecnicos` DISABLE KEYS */;
INSERT INTO `servicios_tecnicos` VALUES (1,8,3,'mono','monohhhhhhhhhhh','dentro de 2 dias',100.00,'2026-06-08 06:05:36.411846','2026-06-12 00:00:00',1,'2026-06-08 06:05:36.411846','2026-06-08 18:32:44.000000'),(2,13,3,'Play Station  xxx','pruebacc vvvvvvv','prueba888888888888',3.00,'2026-06-08 15:09:51.817001','2026-06-08 00:00:00',1,'2026-06-08 15:09:51.817001','2026-06-08 21:37:28.000000'),(3,13,1,'Reparacion de Control','botones desgastados','se podra entregar dentro de 2 horas',100.00,'2026-06-08 21:38:46.545153',NULL,1,'2026-06-08 21:38:46.545153','2026-06-08 21:38:46.545153');
/*!40000 ALTER TABLE `servicios_tecnicos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  `apellido_p` varchar(150) NOT NULL,
  `apellido_m` varchar(150) NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `email` varchar(150) DEFAULT NULL,
  `password_hash` varchar(255) NOT NULL,
  `id_rol` int NOT NULL,
  `activo` tinyint NOT NULL DEFAULT '1',
  `creado_en` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `actualizado_en` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `IDX_0790a401b9d234fa921e9aa177` (`usuario`),
  KEY `FK_98bf89ebf4b0be2d3825f54e56c` (`id_rol`),
  CONSTRAINT `FK_98bf89ebf4b0be2d3825f54e56c` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Admin','Sistema','Admin','admin','admin@kong.com','$2b$10$Id.GuO6OIMmD199WD2u7VeOkZXAbxCx2HYNWvtwunNX3qgNKH0SMq',1,1,'2026-06-08 00:14:52.070546','2026-06-08 18:49:50.000000'),(2,'Natalia','Sanchez','Lopez','naty','admin@gmail.com','$2b$10$E/MDHSWMmB9bjmN/XRkNGegnGK6jdN4BlvAScF7OB2QV8ca8Qx1Mq',2,1,'2026-06-08 01:32:43.143336','2026-06-08 22:05:39.000000'),(3,'Fran','Sanjines','Choque','franzMc','admiin@gmail.com','$2b$10$jClLQAxRtdFtjbPQhnq4Pejrb7Yz8Ch5d6akSfJDY2F5f3fEtMbiC',1,1,'2026-06-08 01:39:50.995457','2026-06-08 01:39:50.995457'),(4,'Monserrath','Quispe','Laime','Mons','vendedor@gmail.com','$2b$10$U/cdskEvh74sDuGzVCex3eDFtmX9UvltW2r58fDlnny75Ggn7wMaK',2,1,'2026-06-08 01:41:37.364406','2026-06-08 01:41:37.364406'),(5,'Isrrael','Choque','Oliveira','hache','vend123@gmail.com','$2b$10$8ENhuiKx5ewlrsPTmls49e2DZV2kJEzduwENPN3qXqzlZAqBBAAIW',2,1,'2026-06-08 03:05:36.394033','2026-06-08 03:05:36.394033'),(6,'Patricia','Gutierrez','Maidana','paty123','maylen123@gmail.com','$2b$10$We6JDIepOVbuZ6KuhUBkaO6OyVBlj54v6WfgcdgxhjBKNuNz/uhiu',1,1,'2026-06-08 21:56:19.907099','2026-06-08 21:56:19.907099');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ventas`
--

DROP TABLE IF EXISTS `ventas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ventas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `fecha_venta` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `total` decimal(12,2) NOT NULL,
  `costo_total` decimal(12,2) NOT NULL DEFAULT '0.00',
  `ganancia` decimal(12,2) NOT NULL DEFAULT '0.00',
  `creado_en` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  KEY `FK_5c564fe8d2b5182a37211405827` (`usuario_id`),
  CONSTRAINT `FK_5c564fe8d2b5182a37211405827` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ventas`
--

LOCK TABLES `ventas` WRITE;
/*!40000 ALTER TABLE `ventas` DISABLE KEYS */;
INSERT INTO `ventas` VALUES (1,3,'2026-06-08 06:31:41.179049',5920.00,0.00,5920.00,'2026-06-08 06:31:41.179049'),(2,3,'2026-06-08 06:37:35.231220',1500.00,0.00,1500.00,'2026-06-08 06:37:35.231220'),(3,3,'2026-06-08 06:58:28.840215',960.00,60.00,900.00,'2026-06-08 06:58:28.840215'),(4,4,'2026-06-08 21:07:06.425801',618.00,518.00,100.00,'2026-06-08 21:07:06.425801');
/*!40000 ALTER TABLE `ventas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-08 18:51:40
