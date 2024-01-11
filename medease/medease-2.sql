-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 11, 2024 at 03:04 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `medease`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `userType` int(11) NOT NULL,
  `dateOfBirth` date DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(255) NOT NULL,
  `isValidated` int(11) DEFAULT NULL,
  `Image` blob DEFAULT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `userType`, `dateOfBirth`, `sex`, `address`, `phone`, `isValidated`, `Image`, `password`) VALUES
(2, 'ia', 'sa@gmail.com', 1, '1978-09-21', NULL, NULL, '099119', NULL, NULL, 'sadansd'),
(3, 'Steve Smith', 'ssmith@gmail.com', 1, '1980-01-21', NULL, NULL, '01911221', NULL, NULL, '$2b$10$LIbtrBVzMV2cKEr7CvyoveM7aXwwskSw1Ga6rr/QlxoZJUqR/M72W'),
(6, 'Steve waugh', 'swaugh@gmail.com', 1, '1940-11-01', NULL, NULL, '0212', NULL, NULL, '$2b$10$4kGoDibPF6/LUPBcP/b5d.wuhOdE1KpOiG0M8XVZf4/vH1JoUn3li'),
(7, 'Steve waugh', 'swauagh@gmail.com', 1, '1940-11-01', NULL, NULL, '0212', NULL, NULL, '$2b$10$PoVA89Qah.CpiEzrka8SjO.nEHASXHEFJIzhKOXlXaxzg8OpiQ4am'),
(8, 'Steve waugh', 'swauaasgh@gmail.com', 1, '1940-11-01', NULL, NULL, '0212', NULL, NULL, '$2b$10$NMsFlEZBKLOMl9ThFR8Tt.OduN.MXVkN9p3onj8GN7.bBsommaQca'),
(9, 'Steve waugh', '2swauaasgh@gmail.com', 1, '1940-11-01', NULL, NULL, '0212', NULL, NULL, '$2b$10$uXwlIHy0S/cBjDtHlu3pped2KIjK/dXM7YuXBJ1.b77cO4j6nMz0i'),
(10, 'Steve waugh', '22swauaasgh@gmail.com', 1, '1940-11-01', NULL, NULL, '0212', NULL, NULL, '$2b$10$MNcBoW.oCgYRKjLcygmS0.E6OntniGMppSkRfhvUQQYRJxmmdKkSW'),
(11, 'Steve waugh', 'sad@gmail.com', 1, '1940-11-01', NULL, NULL, '0212', NULL, NULL, '$2b$10$RvMR83HmxLbmCSis4ScCQu44sozCLkHh.nPACZoc2wOYODVdOnSN.'),
(12, 'k', 'k', 3, NULL, NULL, 'k', '0213', NULL, NULL, 'k'),
(13, 'sdasd', 'sdsa', 3, NULL, NULL, 'sadsa', '02i20', NULL, NULL, 'sdkasdwd9w'),
(15, 'Dummy Hospital', 'dummyhospital@gmail.com', 2, '1900-01-23', NULL, 'k', '021', NULL, NULL, '$2b$10$gdjo3BsTQGEnn2rKl1hbDOP7mIuWyC5RjGQQYNDrKR84TSA/HGVWa'),
(16, 'sad', '11q1w@ad.com', 3, NULL, NULL, 'jjjijsd', '9090', NULL, NULL, '$2b$10$k4sJwmXA2PHygFGP3NBWWu0lWAOearvp2xe3K8qpgghuR0K0k.ocC'),
(17, 'psd', 'daw', 5, NULL, NULL, 'wdw', 'sdw', NULL, NULL, '$2b$10$opvR0iNjIG9PodfshRicBeV5GXgNC6EJHFa2f7QWLOfe0/vxt6qii'),
(18, 'mmo', 'kmlm', 2, NULL, NULL, 'mklmk', 'mklm', NULL, NULL, '$2b$10$3GqZb8F5Ra2za6xSnO.PQu2TNIgqGJsBKhLhFKaEPnM3GqZFUL4Xa'),
(19, 'nkjn', 'nkjn', 3, NULL, NULL, 'jkn', 'n', NULL, NULL, '$2b$10$6rksHnsDSILfwRglQlCkZ.d9/AeOVtVcshrW5SBfZuqmhe0qX.6/u'),
(20, 'mm', 'nn@bhb', 4, NULL, NULL, 'ibn', '89798', NULL, NULL, '$2b$10$qmgUKAHlfO9lwozS8JEXl.6EimD5pXuWein7/rgq/t6HO48Vur8y6'),
(22, 'mm', 'nn@bhba', 4, NULL, NULL, 'ibn', '89798', NULL, NULL, '$2b$10$uWu8iebyd0zYEwBK28rU4.EX1k44vQJb0bn7QOdg/DuGbuAjKUuxy'),
(23, 'dummy user', 'dummyuser@gmail.com', 4, NULL, 'male', 'Dhaka, Bangladesh', '01928381727', NULL, NULL, '$2b$10$6h3fL5yRh41g60asgviCnueuABvm4HcBRp.2nu/TtGGiDWRaIAcPW'),
(24, 'dummy user2', 'dummyuser2@gmail.com', 4, NULL, 'female', 'Chittagong, Bangladesh', '019337282891', NULL, NULL, '$2b$10$s/8LuIJia1VhsKTufJf6Lu.IllcSrLOCT1giC0q9MaS2GF97KGKTW'),
(25, 'ksakdom', 'mnlms@nd', 4, NULL, 'male', 'sadm', '23921803981', NULL, NULL, '$2b$10$8yQrp6tEHlQMn9nNuP2KKeDsSantfFIninwYmBNojS1AmPiTwcxgG');

-- --------------------------------------------------------

--
-- Table structure for table `user_types`
--

CREATE TABLE `user_types` (
  `id` int(11) NOT NULL,
  `role` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_types`
--

INSERT INTO `user_types` (`id`, `role`) VALUES
(1, 'Admin'),
(2, 'Hospital'),
(3, 'Doctor'),
(4, 'Patient'),
(5, 'Pharmacy');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Email` (`email`),
  ADD KEY `Type` (`userType`);

--
-- Indexes for table `user_types`
--
ALTER TABLE `user_types`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`userType`) REFERENCES `user_types` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
