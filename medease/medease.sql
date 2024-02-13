-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 13, 2024 at 06:45 PM
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
(11, '1970-11-24', 'MBBS', 'Cardiology', '01911221', 'Dhaka', 'Cardiologist', 1, 35);

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
(2, 33, 'Dhaka', '01911221');

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
(11, '1980-01-21', 'Male', '01911221', 'nsjdnow', 28);

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
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `userType`, `Image`, `password`) VALUES
(2, 'ia', 'sa@gmail.com', 1, NULL, 'sadansd'),
(3, 'Steve Smith', 'ssmith@gmail.com', 1, NULL, '$2b$10$LIbtrBVzMV2cKEr7CvyoveM7aXwwskSw1Ga6rr/QlxoZJUqR/M72W'),
(6, 'Steve waugh', 'swaugh@gmail.com', 1, NULL, '$2b$10$4kGoDibPF6/LUPBcP/b5d.wuhOdE1KpOiG0M8XVZf4/vH1JoUn3li'),
(7, 'Steve waugh', 'swauagh@gmail.com', 1, NULL, '$2b$10$PoVA89Qah.CpiEzrka8SjO.nEHASXHEFJIzhKOXlXaxzg8OpiQ4am'),
(8, 'Steve waugh', 'swauaasgh@gmail.com', 1, NULL, '$2b$10$NMsFlEZBKLOMl9ThFR8Tt.OduN.MXVkN9p3onj8GN7.bBsommaQca'),
(9, 'Steve waugh', '2swauaasgh@gmail.com', 1, NULL, '$2b$10$uXwlIHy0S/cBjDtHlu3pped2KIjK/dXM7YuXBJ1.b77cO4j6nMz0i'),
(10, 'Steve waugh', '22swauaasgh@gmail.com', 1, NULL, '$2b$10$MNcBoW.oCgYRKjLcygmS0.E6OntniGMppSkRfhvUQQYRJxmmdKkSW'),
(11, 'Steve waugh', 'sad@gmail.com', 1, NULL, '$2b$10$RvMR83HmxLbmCSis4ScCQu44sozCLkHh.nPACZoc2wOYODVdOnSN.'),
(12, 'k', 'k', 3, NULL, 'k'),
(13, 'sdasd', 'sdsa', 3, NULL, 'sdkasdwd9w'),
(15, 'Dummy Hospital', 'dummyhospital@gmail.com', 2, NULL, '$2b$10$gdjo3BsTQGEnn2rKl1hbDOP7mIuWyC5RjGQQYNDrKR84TSA/HGVWa'),
(16, 'sad', '11q1w@ad.com', 3, NULL, '$2b$10$k4sJwmXA2PHygFGP3NBWWu0lWAOearvp2xe3K8qpgghuR0K0k.ocC'),
(17, 'psd', 'daw', 5, NULL, '$2b$10$opvR0iNjIG9PodfshRicBeV5GXgNC6EJHFa2f7QWLOfe0/vxt6qii'),
(18, 'mmo', 'kmlm', 2, NULL, '$2b$10$3GqZb8F5Ra2za6xSnO.PQu2TNIgqGJsBKhLhFKaEPnM3GqZFUL4Xa'),
(19, 'nkjn', 'nkjn', 3, NULL, '$2b$10$6rksHnsDSILfwRglQlCkZ.d9/AeOVtVcshrW5SBfZuqmhe0qX.6/u'),
(20, 'mm', 'nn@bhb', 4, NULL, '$2b$10$qmgUKAHlfO9lwozS8JEXl.6EimD5pXuWein7/rgq/t6HO48Vur8y6'),
(22, 'mm', 'nn@bhba', 4, NULL, '$2b$10$uWu8iebyd0zYEwBK28rU4.EX1k44vQJb0bn7QOdg/DuGbuAjKUuxy'),
(23, 'dummy user', 'dummyuser@gmail.com', 4, NULL, '$2b$10$6h3fL5yRh41g60asgviCnueuABvm4HcBRp.2nu/TtGGiDWRaIAcPW'),
(24, 'dummy user2', 'dummyuser2@gmail.com', 4, NULL, '$2b$10$s/8LuIJia1VhsKTufJf6Lu.IllcSrLOCT1giC0q9MaS2GF97KGKTW'),
(25, 'ksakdom', 'mnlms@nd', 4, NULL, '$2b$10$8yQrp6tEHlQMn9nNuP2KKeDsSantfFIninwYmBNojS1AmPiTwcxgG'),
(26, 'Sam Smith', 'smithsam@gmail.com', 1, NULL, '$2b$10$U8MwV3WOIxtbGDQgqXb0F.w.SNQJDVVYUEPeWVsUlSfmJQWEXwexi'),
(28, 'Sam Smith', 'smithsam1@gmail.com', 1, NULL, '$2b$10$zc8rhLrYlggLNgb6mROo0e9kcOWMS3D7NywXEewjDWm/7SuYZZOmu'),
(30, 'Dhaka Medical', 'dmh@gmail.com', 2, NULL, '$2b$10$gyxKouxM3UAq3O1Mqc.Na.OFSrCROhQvL6mk7MCDlCre5N7Tbus3S'),
(32, 'Dhaka Medical', 'dmh1@gmail.com', 2, NULL, '$2b$10$536CmaAUjh79c4SWR0WI6OAQ8fybpJV8pr7oA3YQCasILJP3rliM6'),
(33, 'Dr Habib', 'drhabib@gmail.com', 3, NULL, '$2b$10$HRxkB3reR82DndEkXwwh7.RA2XLMDlDIM6lSvA2ueV5eqdUTzHOeW'),
(34, 'Dr Habib', 'drhabib1@gmail.com', 3, NULL, '$2b$10$HnrL7WSoc8TWO/RIJv4/ue5jcTg/rG/j8anTUOJz4n/pOrRKhZOpa'),
(35, 'Dr Habib', 'drhabib11@gmail.com', 3, NULL, '$2b$10$xBL4WTANSW68Wng0LIm9dO27Hf/wgjFH5C5SV9lytfgM5y/61GUWC');

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
  MODIFY `doctor_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `hospitals`
--
ALTER TABLE `hospitals`
  MODIFY `hospital_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `patients`
--
ALTER TABLE `patients`
  MODIFY `patient_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

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
