ALTER TABLE `digital_hack`.`parameters` ADD COLUMN `dispersion` float AFTER `noise`;
ALTER TABLE `digital_hack`.`laws` CHANGE COLUMN `name` `name` varchar(255) NOT NULL, ADD COLUMN `title` varchar(255) AFTER `name`;
