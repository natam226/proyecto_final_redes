CREATE DATABASE IF NOT EXISTS asignaturasdb;
USE asignaturasdb;

DROP TABLE IF EXISTS `asignaturas`;
CREATE TABLE `asignaturas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombreAsignatura` varchar(70) DEFAULT NULL,
  `creditos` int(11) DEFAULT NULL,
  `cupos` int(11) DEFAULT NULL,
  `semestre` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



LOCK TABLES `asignaturas` WRITE;
INSERT INTO `asignaturas` VALUES (1,'Introduccion a la Ingenieria de Datos e Inteligencia Artificial',4,40,1),(2,'Ingles 1',3,35,1),(3,'Comunicacion Oral y Escrita',4,20,1),(4,'Matematicas Fundamentales',4,40,1),(5,'Logica y Matematica Discreta',3,35,1),(6,'Programacion',6,25,2),(7,'Ingles 2',3,45,2),(8,'Formacion Ciudadana I : Identidades y Pluralismo',3,35,2),(9,'Calculo 1',3,35,2),(10,'Algebra Lineal',3,40,2),(11,'Redes e Infraestructura',6,35,3),(12,'Ingles 3',3,40,3),(13,'Formacion Ciudadana II: Sociedad y Estado',3,40,3),(14,'Electiva de Lectura y Escritura',2,35,3),(15,'Calculo 2',4,25,3),(16,'Almacenamiento de Datos',6,40,4),(17,'Formacion Ciudadana III: Paz y Convivencia',3,35,4),(18,'Ingles 4',3,30,4),(19,'Estadistica y Probabilidad I',3,40,4),(20,'Sistemas Operativos',3,35,4),(21,'ETL (Extraccion Transformación y Carga)',6,30,5),(22,'Ingenieria y Sostenibilidad',3,40,5),(23,'Ingles 5',3,35,5),(24,'Estadistica y Probabilidad II',3,35,5),(25,'Electiva de Ciencias Sociales',3,40,5),(26,'Inteligencia Artificial',9,35,6),(27,'Innovacion y Emprendimiento',3,40,6),(28,'Electiva Libre I',3,40,6),(29,'Seguridad de la informacion',3,35,6),(30,'Analitica de Datos',9,35,7),(31,'Administracion para Ingenieros',3,40,7),(32,'Legislacion y etica en el manejo de Datos',3,20,7),(33,'Electiva Profesional 1',3,25,7),(34,'Electiva Profesional 2',3,40,8),(35,'Electiva Profesional 3',3,35,8),(36,'Electiva Profesional 4',3,35,8),(37,'Seminario de Ing. de Datos e I.A.',3,40,8),(38,'Electiva Profesional 5',3,35,8);
UNLOCK TABLES;