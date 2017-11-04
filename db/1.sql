SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `laws`
-- ----------------------------
DROP TABLE IF EXISTS `laws`;
CREATE TABLE `laws` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `parameters`
-- ----------------------------
DROP TABLE IF EXISTS `parameters`;
CREATE TABLE `parameters` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `period` varchar(255) NOT NULL,
  `min` varchar(255) DEFAULT NULL,
  `max` varchar(255) DEFAULT NULL,
  `mean` varchar(255) DEFAULT NULL,
  `unit` varchar(255) NOT NULL,
  `noise` tinyint(4) NOT NULL,
  `law_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `law_id` (`law_id`),
  CONSTRAINT `law` FOREIGN KEY (`law_id`) REFERENCES `laws` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
