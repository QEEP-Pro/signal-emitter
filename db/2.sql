ALTER TABLE `parameters` ADD COLUMN `dispersion` float AFTER `noise`;
ALTER TABLE `laws` CHANGE COLUMN `name` `name` varchar(255) NOT NULL, ADD COLUMN `title` varchar(255) AFTER `name`;
