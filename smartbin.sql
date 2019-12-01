-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3307
-- Generation Time: Dec 01, 2019 at 09:42 AM
-- Server version: 5.7.24-log
-- PHP Version: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `smartbin`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `barcode` varchar(20) NOT NULL,
  `name` varchar(250) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `manufacturer` varchar(250) DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL,
  `size` varchar(150) DEFAULT NULL,
  `brand` varchar(100) DEFAULT NULL,
  `detected_date` varchar(100) NOT NULL,
  `status` varchar(4) NOT NULL DEFAULT '1',
  `amount` varchar(11) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`barcode`, `name`, `description`, `manufacturer`, `image`, `size`, `brand`, `detected_date`, `status`, `amount`) VALUES
('4960999980034', 'RP-108 Colour Ink Cartridge', NULL, NULL, NULL, '500 ml', NULL, '1574077585500', '3', '3'),
('609728949310', 'Einstok White Wheat Beer', NULL, '\r\nEinstok Beer Company', NULL, '330ml', NULL, '1574077595500', '1', '1'),
('612615091580', 'Water Glass Water Bottle', '', NULL, NULL, NULL, NULL, '1574077585500', '1', '1'),
('62105976277', 'wholesale borosilicate milk cup dairy milk cup Milk carton', NULL, NULL, NULL, NULL, NULL, '1574077595500', '1', '1'),
('7611471003624', 'Aptamil Sensivia 2 Follow-Up Milk', NULL, NULL, NULL, NULL, NULL, '1574077596500', '2', '1'),
('9421902090035', '\r\nKarma Cola Gingerella', NULL, NULL, NULL, NULL, NULL, '1574077595500', '3', '1');

-- --------------------------------------------------------

--
-- Table structure for table `shoppinglist`
--

CREATE TABLE `shoppinglist` (
  `shoppingList_id` int(11) NOT NULL,
  `shoppingList_name` varchar(100) NOT NULL,
  `created_date` bigint(100) NOT NULL,
  `owner_id` int(11) NOT NULL DEFAULT '1',
  `status` tinyint(4) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `shoppinglist`
--

INSERT INTO `shoppinglist` (`shoppingList_id`, `shoppingList_name`, `created_date`, `owner_id`, `status`) VALUES
(1, 'sl1', 0, 2, 2),
(2, 'sl2', 1234556, 1, 1),
(3, 'sl3', 12345, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `shoppinglistdetails`
--

CREATE TABLE `shoppinglistdetails` (
  `detail_id` int(11) NOT NULL,
  `sl_id` int(11) NOT NULL,
  `product` varchar(100) NOT NULL,
  `amount` int(11) NOT NULL DEFAULT '1',
  `created_date` bigint(100) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `shoppinglistdetails`
--

INSERT INTO `shoppinglistdetails` (`detail_id`, `sl_id`, `product`, `amount`, `created_date`, `status`) VALUES
(1, 1, 'p1', 1, 1234343, 3),
(2, 1, 'p2', 1, 1234, 3),
(3, 2, 'p3', 3, 1234, 1),
(4, 3, 'p4', 1, 12345, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `created_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `password`, `name`, `last_name`, `created_date`) VALUES
(1, 'reyhan', '123', 'reyhan', 'kalhor', '2019-11-17'),
(2, 'sam', '123', 'samuel', 'Ngugi', '2019-11-17');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`barcode`,`name`,`detected_date`,`status`);

--
-- Indexes for table `shoppinglist`
--
ALTER TABLE `shoppinglist`
  ADD PRIMARY KEY (`shoppingList_id`),
  ADD UNIQUE KEY `shoppingListNameUnique` (`shoppingList_name`);

--
-- Indexes for table `shoppinglistdetails`
--
ALTER TABLE `shoppinglistdetails`
  ADD PRIMARY KEY (`detail_id`),
  ADD KEY `sl_id` (`sl_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_name` (`user_name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `shoppinglist`
--
ALTER TABLE `shoppinglist`
  MODIFY `shoppingList_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `shoppinglistdetails`
--
ALTER TABLE `shoppinglistdetails`
  MODIFY `detail_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `shoppinglistdetails`
--
ALTER TABLE `shoppinglistdetails`
  ADD CONSTRAINT `ShoppingListDetails_ibfk_1` FOREIGN KEY (`sl_id`) REFERENCES `shoppinglist` (`shoppingList_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
