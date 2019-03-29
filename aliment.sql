-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le :  ven. 29 mars 2019 à 01:14
-- Version du serveur :  10.1.36-MariaDB
-- Version de PHP :  7.2.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `aliment`
--

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` int(11) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `commentaires`
--

CREATE TABLE `commentaires` (
  `id` int(11) NOT NULL,
  `id_recettes` int(11) NOT NULL,
  `id_utilisateurs` int(11) NOT NULL,
  `commentaire` text NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `etapes`
--

CREATE TABLE `etapes` (
  `id` int(11) NOT NULL,
  `id_recettes` int(11) NOT NULL,
  `description` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `ingredients`
--

CREATE TABLE `ingredients` (
  `id` int(11) NOT NULL,
  `id_recettes` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `recettes`
--

CREATE TABLE `recettes` (
  `id` int(11) NOT NULL,
  `nameRecette` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `category` int(11) NOT NULL,
  `id_utilisateurs` int(11) NOT NULL,
  `nbrvue` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

CREATE TABLE `utilisateurs` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(50) NOT NULL,
  `lastname` varchar(250) NOT NULL,
  `phone` varchar(30) NOT NULL,
  `passwordconfirm` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`id`, `name`, `email`, `password`, `lastname`, `phone`, `passwordconfirm`) VALUES
(1, 'eunice', 'eunice.priscille@gmail.com', 'ftyujh', 'fhc gcdhfee', '45267892', 'bghuj'),
(2, 'eunice', 'eunice.priscille@gmail.com', '', 'fhc gcdhfee', '45267892', ''),
(3, 'eunice', 'eunice.priscille@gmail.com', 'gtyuui985', 'fhc gcdhfee', '45267892', 'hjuyr985'),
(4, 'eunice', 'eunice.priscille@gmail.com', 'gtyuui985', 'fhc gcdhfee', '45267892', 'hjuyr985'),
(5, 'hiy', 'tano.tano@uvci.edu.ci', 'fyfufufj', 'dtdtd', 'hggfhfhfh', 'jgjjj'),
(6, 'hiy', 'tano.tano@uvci.edu.ci', 'fyfufufj', 'dtdtd', 'hggfhfhfh', 'jgjjj'),
(7, 'eunice', 'eunice.priscille@gmail.com', 'ggyyuj7895', 'fhc gcdhfee', '45267892', 'iuyt965');

-- --------------------------------------------------------

--
-- Structure de la table `vues`
--

CREATE TABLE `vues` (
  `id` int(11) NOT NULL,
  `id_recettes` int(11) NOT NULL,
  `id_utilisateurs` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `commentaires`
--
ALTER TABLE `commentaires`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_recettes` (`id_recettes`,`id_utilisateurs`),
  ADD KEY `id_utilisateurs` (`id_utilisateurs`);

--
-- Index pour la table `etapes`
--
ALTER TABLE `etapes`
  ADD KEY `id_recettes` (`id_recettes`);

--
-- Index pour la table `ingredients`
--
ALTER TABLE `ingredients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_recettes` (`id_recettes`);

--
-- Index pour la table `recettes`
--
ALTER TABLE `recettes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category` (`category`,`id_utilisateurs`),
  ADD KEY `id_utilisateurs` (`id_utilisateurs`);

--
-- Index pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `vues`
--
ALTER TABLE `vues`
  ADD KEY `id_recettes` (`id_recettes`,`id_utilisateurs`),
  ADD KEY `id_utilisateurs` (`id_utilisateurs`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `commentaires`
--
ALTER TABLE `commentaires`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `ingredients`
--
ALTER TABLE `ingredients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `recettes`
--
ALTER TABLE `recettes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `commentaires`
--
ALTER TABLE `commentaires`
  ADD CONSTRAINT `commentaires_ibfk_1` FOREIGN KEY (`id_utilisateurs`) REFERENCES `utilisateurs` (`id`),
  ADD CONSTRAINT `commentaires_ibfk_2` FOREIGN KEY (`id_recettes`) REFERENCES `recettes` (`id`);

--
-- Contraintes pour la table `etapes`
--
ALTER TABLE `etapes`
  ADD CONSTRAINT `etapes_ibfk_1` FOREIGN KEY (`id_recettes`) REFERENCES `recettes` (`id`);

--
-- Contraintes pour la table `ingredients`
--
ALTER TABLE `ingredients`
  ADD CONSTRAINT `ingredients_ibfk_1` FOREIGN KEY (`id_recettes`) REFERENCES `recettes` (`id`);

--
-- Contraintes pour la table `recettes`
--
ALTER TABLE `recettes`
  ADD CONSTRAINT `recettes_ibfk_1` FOREIGN KEY (`category`) REFERENCES `categories` (`id`),
  ADD CONSTRAINT `recettes_ibfk_2` FOREIGN KEY (`id_utilisateurs`) REFERENCES `utilisateurs` (`id`);

--
-- Contraintes pour la table `vues`
--
ALTER TABLE `vues`
  ADD CONSTRAINT `vues_ibfk_1` FOREIGN KEY (`id_recettes`) REFERENCES `recettes` (`id`),
  ADD CONSTRAINT `vues_ibfk_2` FOREIGN KEY (`id_utilisateurs`) REFERENCES `utilisateurs` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
