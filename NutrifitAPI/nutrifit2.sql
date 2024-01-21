-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 22 nov. 2023 à 17:34
-- Version du serveur : 10.10.2-MariaDB
-- Version de PHP : 8.1.17

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
  `energy` float NOT NULL DEFAULT 0,
  `fats` float NOT NULL DEFAULT 0,
  `carbohydrates` float NOT NULL DEFAULT 0,
  `proteins` float NOT NULL DEFAULT 0,
  `quantity_label` varchar(20) NOT NULL,
  `is_public` int(1) NOT NULL,
  `type` enum('RECIPE','MEAL') NOT NULL,
  `author` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `proportion` float NOT NULL,
  `meal` enum('BREAKFAST','LUNCH','DINNER','SNACKS') NOT NULL DEFAULT 'LUNCH'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `recipecomposition`
--

CREATE TABLE `recipecomposition` (
  `id` bigint(20) NOT NULL,
  `idRecipe` int(11) NOT NULL,
  `idIngredient` int(11) NOT NULL,
  `proportion` float NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `idUser` int(11) NOT NULL,
  `pseudo` varchar(20) NOT NULL,
  `pwdhash` text NOT NULL,
  `gender` enum('M','F') NOT NULL DEFAULT 'M',
  `token` text NOT NULL,
  `tokenValidation` text NOT NULL,
  `mail` varchar(60) NOT NULL,
  `energy_goal` float NOT NULL DEFAULT 2367,
  `fats_goal` float NOT NULL DEFAULT 79,
  `carbohydrates_goal` float NOT NULL DEFAULT 249,
  `proteins_goal` float NOT NULL DEFAULT 165
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  ADD PRIMARY KEY (`id`),
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
  MODIFY `idConsumable` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `consumption`
--
ALTER TABLE `consumption`
  MODIFY `idConsumption` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `recipecomposition`
--
ALTER TABLE `recipecomposition`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT;

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
