-- phpMyAdmin SQL Dump
-- version 4.6.6deb5ubuntu0.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 27, 2021 at 09:40 PM
-- Server version: 5.7.33-0ubuntu0.18.04.1
-- PHP Version: 7.2.24-0ubuntu0.18.04.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wallet`
--

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `id` int(11) NOT NULL,
  `from_id` varchar(255) CHARACTER SET utf8 NOT NULL,
  `to_id` varchar(255) CHARACTER SET utf8 NOT NULL,
  `amount` varchar(255) CHARACTER SET utf8 NOT NULL,
  `status` int(11) NOT NULL COMMENT '1=pending, 2=success, 3=cancel, 4=top up',
  `notes` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT 'additional notes',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `history`
--

INSERT INTO `history` (`id`, `from_id`, `to_id`, `amount`, `status`, `notes`, `created_at`) VALUES
(1, '1', '4', '25000', 4, 'topup', '2021-02-25 21:58:29'),
(2, '1', '2', '50000', 4, 'topup', '2021-02-26 16:52:36'),
(3, '2', '4', '30000', 2, 'Uang Jajan', '2021-02-26 17:11:10'),
(4, '4', '3', '27000', 3, 'Uang Jajan', '2021-02-26 17:14:12'),
(5, '2', '3', '10000', 2, 'Bayar hutang', '2021-02-26 17:16:18'),
(6, '4', '2', '20000', 3, 'Bayar utang ya', '2021-02-26 17:17:25'),
(7, '4', '2', '117000', 2, 'Stor jual bakso', '2021-02-26 21:16:56'),
(8, '1', '4', '80000', 4, 'topup', '2021-02-26 22:11:38'),
(9, '4', '2', '50000', 2, 'Uang ikan cupang', '2021-02-26 22:24:01'),
(10, '2', '4', '100000', 3, 'Uang Makan', '2021-02-26 22:28:21'),
(11, '1', '5', '100000', 4, 'topup', '2021-02-27 08:04:31'),
(12, '5', '4', '50000', 2, 'Belanja Buku', '2021-02-27 08:06:49'),
(13, '4', '5', '50000', 3, 'Uang Sekolah', '2021-02-27 08:10:13'),
(14, '5', '2', '50000', 2, 'Uang Jajan', '2021-02-27 08:11:43'),
(15, '3', '2', '10000', 2, 'Cashback buat beli odading mang oleh', '2021-02-27 08:37:23'),
(16, '3', '7', '30000', 2, 'dari pak samsul', '2021-02-27 15:03:03'),
(17, '1', '3', '50000000000', 4, 'topup', '2021-02-27 15:05:27'),
(18, '1', '3', '20000', 4, 'topup', '2021-02-27 15:06:22'),
(19, '3', '4', '50000000', 2, 'buat jajan tom', '2021-02-27 15:07:08'),
(20, '3', '7', '49950040993', 2, 'dari hotman paris', '2021-02-27 15:08:47'),
(21, '2', '7', '17000', 2, 'jajan snack', '2021-02-27 15:49:46'),
(22, '4', '7', '5000', 1, 'Untuk jajan', '2021-02-27 16:10:41'),
(23, '7', '4', '20000', 2, 'Tomi tf', '2021-02-27 16:11:59'),
(24, '1', '6', '1000000', 4, 'topup', '2021-02-27 16:13:04'),
(25, '6', '4', '50000', 2, 'Test', '2021-02-27 16:14:07'),
(26, '7', '4', '100000', 3, 'tff', '2021-02-27 16:18:10'),
(27, '4', '2', '500000', 1, 'test', '2021-02-27 16:25:58'),
(28, '1', '3', '20000', 4, 'topup', '2021-02-27 16:26:56'),
(29, '3', '1', '10000', 3, 'buat jajan cilok', '2021-02-27 16:29:54'),
(30, '6', '4', '500000', 3, 'Jajan', '2021-02-27 16:30:02'),
(31, '1', '5', '20000', 4, 'topup', '2021-02-27 16:30:49'),
(32, '5', '4', '20000', 2, 'Jajan', '2021-02-27 16:31:18'),
(33, '4', '6', '100000', 2, 'Jajan', '2021-02-27 16:42:04'),
(34, '1', '5', '1000000', 4, 'topup', '2021-02-27 16:42:30'),
(35, '5', '6', '100000', 2, 'Jajan', '2021-02-27 16:43:08'),
(36, '4', '6', '100000', 2, 'Test Uji', '2021-02-27 16:52:41'),
(37, '5', '6', '900000', 2, 'Jajan', '2021-02-27 17:12:33'),
(38, '1', '5', '500000', 4, 'topup', '2021-02-27 17:24:12'),
(39, '5', '4', '200000', 2, 'Buat beli cupang', '2021-02-27 17:24:48'),
(40, '7', '4', '15000000', 2, 'Buat beli motor', '2021-02-27 17:26:07'),
(41, '2', '4', '70000', 2, 'Uang jajan', '2021-02-27 17:27:15'),
(42, '1', '4', '50000', 4, 'topup', '2021-02-27 17:28:27'),
(43, '4', '7', '100000', 1, 'Jajan', '2021-02-27 17:45:36'),
(44, '2', '7', '200000', 3, 'Jajan', '2021-02-27 17:46:19'),
(45, '6', '7', '150000', 3, 'Jajan', '2021-02-27 17:46:58'),
(46, '7', '4', '500000', 3, 'Uang jajan', '2021-02-27 17:53:35'),
(47, '7', '2', '1000000', 3, 'Beli', '2021-02-27 17:54:12'),
(48, '7', '5', '5000000', 3, 'Jajan', '2021-02-27 18:03:07'),
(49, '7', '4', '20000', 3, 'Jajan', '2021-02-27 18:03:35'),
(50, '7', '4', '10000000', 2, 'Beli Laptop', '2021-02-27 18:10:49'),
(51, '2', '4', '100000', 2, 'Beli Kuota', '2021-02-27 18:11:44'),
(52, '6', '4', '150000', 3, 'Untuk beli makan', '2021-02-27 18:12:32'),
(53, '2', '4', '7000', 3, 'bakwan 4 pisang goreng 3', '2021-02-27 18:36:16'),
(54, '2', '4', '3000', 3, 'ini buat beli kopikap nya', '2021-02-27 18:38:51'),
(55, '2', '4', '20000', 2, 'Beli snack sama sprite', '2021-02-27 18:56:24');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 NOT NULL,
  `image` varchar(255) CHARACTER SET utf8 NOT NULL,
  `pin` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8 DEFAULT '+62',
  `balance` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `image`, `pin`, `phone`, `balance`) VALUES
(1, 'Admin', 'admin@gmail.com', '$2b$10$GrfqfjvMJFDd2X3frAKnn.LPYhTpmhB55RjUoBbruxff2TQL1ePa6', '1614068473168.jpg', '$2b$10$Z/fe5E6KuMrviZVXSNWveukC.i05tsQfehQWkT9b6Fl8rmEdnIsHC', '+62 5637 8882 9901', '1000000000'),
(2, 'Rizaldi', 'rizaldi@gmail.com', '$2b$10$V.LJMwGUYkknEV8tP1BsGu2F88k/k5zQUkoztrt8OhRg7N8g7cP8C', '1614427045298.jpg', '$2b$10$ih6.MP1n3Hs2WWk9Eo30hehrS5/CBKDjEWkuaQlrYi59qhKPTSEZW', '+62082931048123', '130000'),
(3, 'Ramadhanu', 'ram@dhanu.com', '$2b$10$PdxzsgQx5mrkshIZcDuGZeERkEGax/DJfBpx9PIhKRZvQgVtOBGoi', '1614414402527.png', '$2b$10$t0Kwt9Ba7Bqn4RJYw4Cw6eGFikw2iTxgkkl.nKIHlCfCSgaUzPeOy', '+62899', '20000'),
(4, 'Tomi', 'tomi@gmail.com', '$2b$10$9ovvN/aS86FDDYEVDeReW.zbCGGkwqn5rm8P3CBseZUZDPYwJOT1K', '1614402266841.png', '$2b$10$jibCNnWxhBe3ldt3qVOeke5vAuWkSi3I22pLFL0btqx1ywn29/lBi', '+6285269027000', '74825000'),
(5, 'Sinta', 'sinta@gmail.com', '$2b$10$sk7Ixvws9Y2MYNNE2woJu.TDwJO2F7f9w7eIMQ/99.vQJIuRDJh26', '1614403357636.png', '$2b$10$NJJgTX55ptsGOdAt1l..YOcmY/X7d0vtmSXCGQqrr5qlUK/ql2Kg6', '+62', '300000'),
(6, 'Samsul Bahri', 'samsul@gmail.com', '$2b$10$bw3OcTeNuSCFypgKnvXg.OTO1Ec1PWszUN01bStw8z/7.wUV9IZje', '1614401458880.jpg', '$2b$10$i7ZJD8cHuAKAU0L4p7pZl.koWVBVkxspcYaVZ4otrq3cfARoYTzI.', '+62', '2150000'),
(7, 'Fadella Amirah', 'fadella@gmail.com', '$2b$10$bzOVwCh2LmgTeFW/qVG5R.72dPOBbbeTozbEVOUqqh8qHae.uspES', '1614434741805.png', '$2b$10$L8YP6BwY2ju9EbWDramQBOkxVK2CdHm.WIutxCapMqb0/KiAMGzDq', '+621263594760', '49925087993');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
