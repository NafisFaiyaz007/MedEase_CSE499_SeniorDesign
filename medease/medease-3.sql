-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 03, 2024 at 07:21 PM
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
-- Table structure for table `admissions`
--

CREATE TABLE `admissions` (
  `admission_id` int(11) NOT NULL,
  `patient_id` int(11) DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `admission_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admissions`
--

INSERT INTO `admissions` (`admission_id`, `patient_id`, `reason`, `admission_date`) VALUES
(1, 1, 'Emergency', '2024-02-15'),
(2, 2, 'Surgery', '2024-02-16'),
(3, 3, 'Orthopedic consultation', '2024-02-17'),
(4, 4, 'Dermatological treatment', '2024-02-18'),
(5, 5, 'Neurological examination', '2024-02-19'),
(6, 6, 'Ophthalmology check-up', '2024-02-20'),
(7, 7, 'Gastrointestinal problem', '2024-02-21'),
(8, 8, 'Psychiatric evaluation', '2024-02-22'),
(9, 9, 'Urological procedure', '2024-02-23'),
(10, 10, 'OB/GYN consultation', '2024-02-24');

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `appointment_id` int(11) NOT NULL,
  `doctor_id` int(11) DEFAULT NULL,
  `patient_id` int(11) DEFAULT NULL,
  `appointment_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`appointment_id`, `doctor_id`, `patient_id`, `appointment_date`) VALUES
(1, 1, 1, '2024-02-15 10:00:00'),
(2, 2, 2, '2024-02-16 11:00:00'),
(3, 3, 3, '2024-02-17 12:00:00'),
(4, 4, 4, '2024-02-18 13:00:00'),
(5, 5, 5, '2024-02-19 14:00:00'),
(6, 6, 6, '2024-02-20 15:00:00'),
(7, 7, 7, '2024-02-21 16:00:00'),
(8, 8, 8, '2024-02-22 17:00:00'),
(9, 9, 9, '2024-02-23 18:00:00'),
(10, 10, 10, '2024-02-24 19:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `doctors`
--

CREATE TABLE `doctors` (
  `doctor_id` int(11) NOT NULL,
  `dateOfBirth` date NOT NULL,
  `degree` varchar(255) DEFAULT NULL,
  `specialization` varchar(255) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `designation` varchar(255) DEFAULT NULL,
  `hospital_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `doctors`
--

INSERT INTO `doctors` (`doctor_id`, `dateOfBirth`, `degree`, `specialization`, `phone_number`, `address`, `designation`, `hospital_id`, `user_id`) VALUES
(1, '0000-00-00', 'MD', 'Cardiology', '+1234567890', 'Hospital XYZ', 'Cardiologist', NULL, NULL),
(2, '0000-00-00', 'MD', 'Pediatrics', '+1987654321', 'Hospital XYZ', 'Pediatrician', NULL, NULL),
(3, '0000-00-00', 'MD', 'Orthopedics', '+1122334455', 'Hospital XYZ', 'Orthopedic Surgeon', NULL, NULL),
(4, '0000-00-00', 'MD', 'Dermatology', '+1555555555', 'Hospital XYZ', 'Dermatologist', NULL, NULL),
(5, '0000-00-00', 'MD', 'Neurology', '+1777777777', 'Hospital XYZ', 'Neurologist', NULL, NULL),
(6, '0000-00-00', 'MD', 'Ophthalmology', '+1999999999', 'Hospital XYZ', 'Ophthalmologist', NULL, NULL),
(7, '0000-00-00', 'MD', 'Gastroenterology', '+1666666666', 'Hospital XYZ', 'Gastroenterologist', NULL, NULL),
(8, '0000-00-00', 'MD', 'Psychiatry', '+1888888888', 'Hospital XYZ', 'Psychiatrist', NULL, NULL),
(9, '0000-00-00', 'MD', 'Urology', '+1444444444', 'Hospital XYZ', 'Urologist', NULL, NULL),
(10, '0000-00-00', 'MD', 'Obstetrics and Gynecology', '+1222222222', 'Hospital XYZ', 'OB/GYN', NULL, NULL),
(11, '1970-11-24', 'MBBS', 'Cardiology', '01911221', 'Dhaka', 'Cardiologist', 1, 35),
(12, '1980-02-13', 'jsauidji', 'suidnih', '01929293224', 'daisjdj', 'isand', 1, 41),
(13, '1968-05-31', 'sad', 'sdad', '029212', 'sad', 'ada', 2, 51),
(14, '1980-02-13', 'sda', 'asd', '01923', 'as', 'asd', 2, 52);

-- --------------------------------------------------------

--
-- Table structure for table `hospitals`
--

CREATE TABLE `hospitals` (
  `hospital_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone_number` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hospitals`
--

INSERT INTO `hospitals` (`hospital_id`, `user_id`, `address`, `phone_number`) VALUES
(1, 32, 'Dhaka', '01911221'),
(2, 33, 'Dhaka', '01911221'),
(3, 53, 'Dhanmondi Dhaka', '0192231');

-- --------------------------------------------------------

--
-- Table structure for table `patients`
--

CREATE TABLE `patients` (
  `patient_id` int(11) NOT NULL,
  `dateOfBirth` date NOT NULL,
  `gender` enum('Male','Female','Other') DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `address` varchar(255) NOT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `patients`
--

INSERT INTO `patients` (`patient_id`, `dateOfBirth`, `gender`, `phone_number`, `address`, `user_id`) VALUES
(1, '0000-00-00', 'Male', '+1234567890', '', NULL),
(2, '0000-00-00', 'Female', '+1987654321', '', NULL),
(3, '0000-00-00', 'Female', '+1122334455', '', NULL),
(4, '0000-00-00', 'Male', '+1555555555', '', NULL),
(5, '0000-00-00', 'Female', '+1777777777', '', NULL),
(6, '0000-00-00', 'Male', '+1999999999', '', NULL),
(7, '0000-00-00', 'Female', '+1666666666', '', NULL),
(8, '0000-00-00', 'Male', '+1888888888', '', NULL),
(9, '0000-00-00', 'Female', '+1444444444', '', NULL),
(10, '0000-00-00', 'Male', '+1222222222', '', NULL),
(11, '1980-01-21', 'Male', '01911221', 'nsjdnow', 28),
(12, '1968-05-31', 'Male', '01929383828', 'asm', 55),
(13, '2024-02-15', 'Male', '', '', 56),
(14, '2024-01-31', 'Male', '2', 'sd', 57);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('0nVLmqB85iZmbC7Ol4D-N3M-Aczn5wAc', 1709269755, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}'),
('4IaWIsAMaiM9dq1vqdviRbOdDlmFb4Xt', 1709217857, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}'),
('5BRtPK2sR0qpFU__EM_KwIEW-bgI_UjG', 1709271769, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}'),
('9CYjoIaKJN1PPV7OdpL0czzqWd9c3EQI', 1709269738, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}'),
('A-b0AedoeCn30eBN314KgTR7-RsHVmWA', 1709269755, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}'),
('BuJe0ybNVDbfV4o_qUoYQn7x8SgGMT_0', 1709269738, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}'),
('eOo9lQBCmkd7KoyKz3WFinobI35L_ob1', 1709146090, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}'),
('gOUrMwVowCSgCkaVdaHUR7KAO34nrl12', 1709240360, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `userType` int(11) NOT NULL,
  `Image` blob DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `UUID` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `userType`, `Image`, `password`, `UUID`) VALUES
(2, 'ia', 'sa@gmail.com', 1, NULL, 'sadansd', NULL),
(3, 'Steve Smith', 'ssmith@gmail.com', 1, NULL, '$2b$10$LIbtrBVzMV2cKEr7CvyoveM7aXwwskSw1Ga6rr/QlxoZJUqR/M72W', NULL),
(6, 'Steve waugh', 'swaugh@gmail.com', 1, NULL, '$2b$10$4kGoDibPF6/LUPBcP/b5d.wuhOdE1KpOiG0M8XVZf4/vH1JoUn3li', NULL),
(7, 'Steve waugh', 'swauagh@gmail.com', 1, NULL, '$2b$10$PoVA89Qah.CpiEzrka8SjO.nEHASXHEFJIzhKOXlXaxzg8OpiQ4am', NULL),
(8, 'Steve waugh', 'swauaasgh@gmail.com', 1, NULL, '$2b$10$NMsFlEZBKLOMl9ThFR8Tt.OduN.MXVkN9p3onj8GN7.bBsommaQca', NULL),
(9, 'Steve waugh', '2swauaasgh@gmail.com', 1, NULL, '$2b$10$uXwlIHy0S/cBjDtHlu3pped2KIjK/dXM7YuXBJ1.b77cO4j6nMz0i', NULL),
(10, 'Steve waugh', '22swauaasgh@gmail.com', 1, NULL, '$2b$10$MNcBoW.oCgYRKjLcygmS0.E6OntniGMppSkRfhvUQQYRJxmmdKkSW', NULL),
(11, 'Steve waugh', 'sad@gmail.com', 1, NULL, '$2b$10$RvMR83HmxLbmCSis4ScCQu44sozCLkHh.nPACZoc2wOYODVdOnSN.', NULL),
(12, 'k', 'k', 3, NULL, 'k', NULL),
(13, 'sdasd', 'sdsa', 3, NULL, 'sdkasdwd9w', NULL),
(15, 'Dummy Hospital', 'dummyhospital@gmail.com', 2, NULL, '$2b$10$gdjo3BsTQGEnn2rKl1hbDOP7mIuWyC5RjGQQYNDrKR84TSA/HGVWa', NULL),
(16, 'sad', '11q1w@ad.com', 3, NULL, '$2b$10$k4sJwmXA2PHygFGP3NBWWu0lWAOearvp2xe3K8qpgghuR0K0k.ocC', NULL),
(17, 'psd', 'daw', 5, NULL, '$2b$10$opvR0iNjIG9PodfshRicBeV5GXgNC6EJHFa2f7QWLOfe0/vxt6qii', NULL),
(18, 'mmo', 'kmlm', 2, NULL, '$2b$10$3GqZb8F5Ra2za6xSnO.PQu2TNIgqGJsBKhLhFKaEPnM3GqZFUL4Xa', NULL),
(19, 'nkjn', 'nkjn', 3, NULL, '$2b$10$6rksHnsDSILfwRglQlCkZ.d9/AeOVtVcshrW5SBfZuqmhe0qX.6/u', NULL),
(20, 'mm', 'nn@bhb', 4, NULL, '$2b$10$qmgUKAHlfO9lwozS8JEXl.6EimD5pXuWein7/rgq/t6HO48Vur8y6', NULL),
(22, 'mm', 'nn@bhba', 4, NULL, '$2b$10$uWu8iebyd0zYEwBK28rU4.EX1k44vQJb0bn7QOdg/DuGbuAjKUuxy', NULL),
(23, 'dummy user', 'dummyuser@gmail.com', 4, NULL, '$2b$10$6h3fL5yRh41g60asgviCnueuABvm4HcBRp.2nu/TtGGiDWRaIAcPW', NULL),
(24, 'dummy user2', 'dummyuser2@gmail.com', 4, NULL, '$2b$10$s/8LuIJia1VhsKTufJf6Lu.IllcSrLOCT1giC0q9MaS2GF97KGKTW', NULL),
(25, 'ksakdom', 'mnlms@nd', 4, NULL, '$2b$10$8yQrp6tEHlQMn9nNuP2KKeDsSantfFIninwYmBNojS1AmPiTwcxgG', NULL),
(26, 'Sam Smith', 'smithsam@gmail.com', 1, NULL, '$2b$10$U8MwV3WOIxtbGDQgqXb0F.w.SNQJDVVYUEPeWVsUlSfmJQWEXwexi', NULL),
(28, 'Sam Smith', 'smithsam1@gmail.com', 1, NULL, '$2b$10$zc8rhLrYlggLNgb6mROo0e9kcOWMS3D7NywXEewjDWm/7SuYZZOmu', NULL),
(30, 'Dhaka Medical', 'dmh@gmail.com', 2, NULL, '$2b$10$gyxKouxM3UAq3O1Mqc.Na.OFSrCROhQvL6mk7MCDlCre5N7Tbus3S', NULL),
(32, 'Dhaka Medical', 'dmh1@gmail.com', 2, NULL, '$2b$10$536CmaAUjh79c4SWR0WI6OAQ8fybpJV8pr7oA3YQCasILJP3rliM6', NULL),
(33, 'Dr Habib', 'drhabib@gmail.com', 3, NULL, '$2b$10$HRxkB3reR82DndEkXwwh7.RA2XLMDlDIM6lSvA2ueV5eqdUTzHOeW', NULL),
(34, 'Dr Habib', 'drhabib1@gmail.com', 3, NULL, '$2b$10$HnrL7WSoc8TWO/RIJv4/ue5jcTg/rG/j8anTUOJz4n/pOrRKhZOpa', NULL),
(35, 'Dr Habib', 'drhabib11@gmail.com', 3, NULL, '$2b$10$xBL4WTANSW68Wng0LIm9dO27Hf/wgjFH5C5SV9lytfgM5y/61GUWC', NULL),
(36, 'daskd', 's@s.com', 3, NULL, '$2b$10$ZGU55ivB7/OLhkygwEhdn.rsFwXJgpqsoCvtXfkIUVPQZGId7nR.W', NULL),
(38, 'daskd', 's@sa.com', 3, NULL, '$2b$10$/EMhOkvfh6bBkml162VSC.aQ3yU0Qg7C/as5eWQIUr.JNIHJOFa1u', NULL),
(39, 'daskd', 's@saa.com', 3, NULL, '$2b$10$Q09smWtelAUEfGOOO/Ho7.y9qShoJVOlwjfXFwuOP12WXsLw8wPmq', NULL),
(41, 'daskd', 's@saaa.com', 3, NULL, '$2b$10$H9QKm3vY37GL4S2vr.QJJeqQ1QC1BE8F5vQKwixiggoBzQQgXLzta', NULL),
(42, 'knkn', 'jsnkn', 3, NULL, '$2b$10$3V59yHEwlNLW8zwCLQFVEeb7VdrhoB4y6e22x9KCTnX2NweQxg5A6', NULL),
(43, 'Mr. T', 'mrt@nsu.edu', 4, NULL, '$2b$10$C4Zy2KsOr26pykGyU5UitOodXcFMNRkMIP7mSE50ETEVKnpC9KMy2', NULL),
(46, 'kuddus', 'asd@as.com', 3, NULL, '$2b$10$t5oniDqXic80CdMx0ZxkD.Jjb7U30qc3PU89FEhJ7RgSdYInjN5B.', NULL),
(48, 'kuddus', 'asad@as.com', 3, NULL, '$2b$10$cG0o6YRNGxcT0ZVzlw8OpuMz8gKyO5NDLlqMazn.MfuZog67cLkX.', NULL),
(50, 'kuddus', 'asaad@as.com', 3, NULL, '$2b$10$2btbfsOa2DelSAA3xmpD8.bqwyqR3/vsxQgBQVXefmzOEC2q2c4ym', NULL),
(51, 'asd', 'ad@js.com', 3, NULL, '$2b$10$syFtv3unJtPkkSBRyYfQWO32er0cP/3OegfZ5iWpSSiZ1umaWeBV6', NULL),
(52, 'jssa', 'jsq@gmail.com', 3, NULL, '$2b$10$KQ63LZJSccc7aj4YXBtTzuEAWm6wAsZn3D1Q8s2fVxTvEM7R9LTR6', NULL),
(53, 'Ibn Sina', 'ibnsina@gmail.com', 2, NULL, '$2b$10$vhtKJ/ix9kKAE1k5XIr49Ocqs/nWLcyda5d0kuvUy23eOganzUj7i', NULL),
(55, 'Mr. T', 'mr2t@nsu.edu', 4, NULL, '$2b$10$NE7MKSIMqgoNKPl43I582enyNP3G0dzBWkfd0dwWX0VczXHdelOtS', NULL),
(56, '', '', 4, NULL, '$2b$10$Zs3K6HFXsgDUesfv6Gm/7euSXqAhR.8DEo6O9udpD30tCZInwro52', NULL),
(57, 'kuddus', 'admasain@nsu.edu', 4, NULL, '$2b$10$ZfGaJNIexhWQ.HxJNOmxZ.F/JbY6uygWBek7cpcXCGPOVXKGVpJ7.', NULL);

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
-- Indexes for table `admissions`
--
ALTER TABLE `admissions`
  ADD PRIMARY KEY (`admission_id`),
  ADD KEY `patient_id` (`patient_id`);

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`appointment_id`),
  ADD KEY `doctor_id` (`doctor_id`),
  ADD KEY `patient_id` (`patient_id`);

--
-- Indexes for table `doctors`
--
ALTER TABLE `doctors`
  ADD PRIMARY KEY (`doctor_id`),
  ADD KEY `fk_hospital_id` (`hospital_id`),
  ADD KEY `fk_usr_id` (`user_id`);

--
-- Indexes for table `hospitals`
--
ALTER TABLE `hospitals`
  ADD PRIMARY KEY (`hospital_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`patient_id`),
  ADD KEY `fk_user_id` (`user_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

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
-- AUTO_INCREMENT for table `admissions`
--
ALTER TABLE `admissions`
  MODIFY `admission_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `appointment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `doctors`
--
ALTER TABLE `doctors`
  MODIFY `doctor_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `hospitals`
--
ALTER TABLE `hospitals`
  MODIFY `hospital_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `patients`
--
ALTER TABLE `patients`
  MODIFY `patient_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admissions`
--
ALTER TABLE `admissions`
  ADD CONSTRAINT `admissions_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`patient_id`);

--
-- Constraints for table `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`doctor_id`),
  ADD CONSTRAINT `appointments_ibfk_2` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`patient_id`);

--
-- Constraints for table `doctors`
--
ALTER TABLE `doctors`
  ADD CONSTRAINT `fk_hospital_id` FOREIGN KEY (`hospital_id`) REFERENCES `hospitals` (`hospital_id`),
  ADD CONSTRAINT `fk_usr_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `hospitals`
--
ALTER TABLE `hospitals`
  ADD CONSTRAINT `hospitals_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `patients`
--
ALTER TABLE `patients`
  ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`userType`) REFERENCES `user_types` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
