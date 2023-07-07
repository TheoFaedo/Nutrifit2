-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : ven. 07 juil. 2023 à 23:18
-- Version du serveur : 10.4.22-MariaDB
-- Version de PHP : 8.1.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `nutrifit2`
--

-- --------------------------------------------------------

--
-- Structure de la table `consumable`
--

CREATE TABLE `consumable` (
  `idConsumable` int(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  `energy` float NOT NULL,
  `fats` float NOT NULL,
  `carbohydrates` float NOT NULL,
  `proteins` float NOT NULL,
  `quantity_label` varchar(20) NOT NULL,
  `public` int(1) NOT NULL,
  `type` enum('RECIPE','MEAL') NOT NULL,
  `author` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `consumable`
--

INSERT INTO `consumable` (`idConsumable`, `name`, `energy`, `fats`, `carbohydrates`, `proteins`, `quantity_label`, `public`, `type`, `author`) VALUES
(1, 'test1', 200, 10, 50, 20, '1g', 1, 'MEAL', 1),
(2, 'test2', 320, 25, 50, 30, '1g', 0, 'MEAL', 0);

-- --------------------------------------------------------

--
-- Structure de la table `consumption`
--

CREATE TABLE `consumption` (
  `idConsumption` int(11) NOT NULL,
  `idConsumable` int(10) NOT NULL,
  `idUser` int(11) NOT NULL,
  `consumed_on` datetime NOT NULL,
  `last_update` datetime NOT NULL,
  `proportion` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `recipecomposition`
--

CREATE TABLE `recipecomposition` (
  `idRecipe` int(11) NOT NULL,
  `idIngredient` int(11) NOT NULL,
  `proportion` float NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `idUser` int(11) NOT NULL,
  `pseudo` varchar(20) NOT NULL,
  `pwdhash` text NOT NULL,
  `gender` varchar(1) NOT NULL DEFAULT 'M',
  `token` text NOT NULL,
  `tokenValidation` text NOT NULL,
  `mail` varchar(60) NOT NULL,
  `energy_goal` float NOT NULL DEFAULT 2367,
  `fats_goal` float NOT NULL DEFAULT 79,
  `carbohydrates_goal` float NOT NULL DEFAULT 249,
  `proteins_goal` float NOT NULL DEFAULT 165
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`idUser`, `pseudo`, `pwdhash`, `gender`, `token`, `tokenValidation`, `mail`, `energy_goal`, `fats_goal`, `carbohydrates_goal`, `proteins_goal`) VALUES
(0, 'test5', 'test5', '', '', '', 'fdfsfs', 0, 0, 0, 0),
(1, 'test', 'test', 'H', 'etze', 'tretert', 'zsfgsdf', 2367, 79, 249, 165),
(10000011, 'test10', '$2y$10$K1zhjTbelrGWqdC.VXBm5.9iRuuv/vzyjCy2xiOTeZhzOP9uY7ebm', 'M', '9579256dbf68cdb7444948b9fe7483794ea7f996', 'ed4ec22e8bcf11f315e5f10385f3941b21089314', 'test.d@gmail.com', 2600, 80, 330, 140);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `consumable`
--
ALTER TABLE `consumable`
  ADD PRIMARY KEY (`idConsumable`),
  ADD KEY `fk_consumable_author` (`author`);

--
-- Index pour la table `consumption`
--
ALTER TABLE `consumption`
  ADD PRIMARY KEY (`idConsumption`,`consumed_on`),
  ADD KEY `fk_consumption_consomable` (`idConsumable`),
  ADD KEY `fk_consumption_user` (`idUser`);

--
-- Index pour la table `recipecomposition`
--
ALTER TABLE `recipecomposition`
  ADD KEY `fk_recipecomposition_recipe` (`idRecipe`),
  ADD KEY `fk_recipecomposition_ingredient` (`idIngredient`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`idUser`),
  ADD UNIQUE KEY `mail` (`mail`),
  ADD UNIQUE KEY `pseudo` (`pseudo`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `consumable`
--
ALTER TABLE `consumable`
  MODIFY `idConsumable` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `consumption`
--
ALTER TABLE `consumption`
  MODIFY `idConsumption` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10000012;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `consumable`
--
ALTER TABLE `consumable`
  ADD CONSTRAINT `fk_consumable_author` FOREIGN KEY (`author`) REFERENCES `user` (`idUser`);

--
-- Contraintes pour la table `consumption`
--
ALTER TABLE `consumption`
  ADD CONSTRAINT `fk_consumption_consomable` FOREIGN KEY (`idConsumable`) REFERENCES `consumable` (`idConsumable`),
  ADD CONSTRAINT `fk_consumption_user` FOREIGN KEY (`idUser`) REFERENCES `user` (`idUser`);

--
-- Contraintes pour la table `recipecomposition`
--
ALTER TABLE `recipecomposition`
  ADD CONSTRAINT `fk_recipecomposition_ingredient` FOREIGN KEY (`idIngredient`) REFERENCES `consumable` (`idConsumable`),
  ADD CONSTRAINT `fk_recipecomposition_recipe` FOREIGN KEY (`idRecipe`) REFERENCES `consumable` (`idConsumable`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
