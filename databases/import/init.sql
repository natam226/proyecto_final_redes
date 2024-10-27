create database usuariosdb;
use usuariosdb;
create table estudiantes(
			usuario varchar(20),
			contrasena varchar(30),
			nombre varchar(50),
			correo varchar(30),
			paisOrigen varchar(20),
			necesidadesEspecialesEducacion ENUM('si', 'no'),
			genero ENUM('Masculino','Femenino','Otro'),
			estadoCivil ENUM('Soltero','Casado','Divorciado', 'Viudo', 'Union libre'),
			prestamo ENUM('si', 'no'),
			beca ENUM('si','no'),
			desplazado ENUM('si','no'),
			primary key(usuario));

LOAD DATA INFILE '/var/lib/mysql-files/data_estudiantes.csv'
INTO TABLE estudiantes
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;
	
create table profesores (
			usuario varchar(20),
			contrasena varchar (30),
			rol ENUM('Profesor', 'Director'),
			nombre varchar(50),
			correo varchar(30),
			ultimoGradoDeFormacion ENUM('Bachiller', 'Pregrado', 'Maestria', 'Doctorado', 'Especializacion'),
			primary key(usuario));

LOAD DATA INFILE '/var/lib/mysql-files/data_profesores.csv'
INTO TABLE profesores
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;
	
create database asignaturasDB;
use asignaturasDB;
create table asignaturas (
			id int auto_increment, 
			nombreAsignatura varchar (70),
			creditos int,
			cupos int, 
			semestre int,
			primary key(id));

LOAD DATA INFILE '/var/lib/mysql-files/data_asignaturas.csv'
INTO TABLE asignaturas
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

create database cursosDB;
use cursosDB;
create table cursos(
nombreCurso varchar(70),
grupo int,
profesor varchar(50),
correoProfesor varchar(50),
nombreEstudiante varchar(50),
correoEstudiante varchar(50),
nota float,
periodo varchar(20),
UNIQUE KEY unique_curso (nombreCurso, grupo, periodo, nombreEstudiante));

LOAD DATA INFILE '/var/lib/mysql-files/data_cursos.csv'
INTO TABLE cursos
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;