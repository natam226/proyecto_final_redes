-- Crear bases de datos si no existen
CREATE DATABASE IF NOT EXISTS usuariosdb;
USE usuariosdb;

CREATE TABLE IF NOT EXISTS estudiantes (
    usuario varchar(20) PRIMARY KEY,
    contrasena varchar(30),
    nombre varchar(50),
    correo varchar(30),
    paisOrigen varchar(20),
    necesidadesEspecialesEducacion ENUM('si', 'no'),
    genero ENUM('Masculino', 'Femenino', 'Otro'),
    estadoCivil ENUM('Soltero', 'Casado', 'Divorciado', 'Viudo', 'Union libre'),
    prestamo ENUM('si', 'no'),
    beca ENUM('si', 'no'),
    desplazado ENUM('si', 'no'),
    totalCreditos INT DEFAULT 0
);

LOAD DATA INFILE '/var/lib/mysql-files/data_estudiantes.csv'
INTO TABLE estudiantes
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

CREATE TABLE IF NOT EXISTS profesores (
    usuario varchar(20),
    contrasena varchar(30),
    rol ENUM('Profesor', 'Director'),
    nombre varchar(50),
    correo varchar(30),
    ultimoGradoDeFormacion ENUM('Bachiller', 'Pregrado', 'Maestria', 'Doctorado', 'Especializacion'),
    primary key(usuario)
);


LOAD DATA INFILE '/var/lib/mysql-files/data_profesores.csv'                                                                                                       INTO TABLE profesores                                                                                                                                       FIELDS TERMINATED BY ','                                                                                                                                    ENCLOSED BY '"'                                                                                                                                             LINES TERMINATED BY '\n'                                                                                                                                    IGNORE 1 ROWS;


CREATE DATABASE IF NOT EXISTS asignaturasDB;
USE asignaturasDB;

CREATE TABLE IF NOT EXISTS asignaturas (
    id int auto_increment PRIMARY KEY,
    nombreAsignatura varchar(70),
    creditos int,
    cupos int,
    semestre int
);

LOAD DATA INFILE '/var/lib/mysql-files/data_asignaturas.csv'
INTO TABLE asignaturas
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

CREATE DATABASE IF NOT EXISTS cursosDB;
USE cursosDB;

CREATE TABLE IF NOT EXISTS cursos (
    id int auto_increment PRIMARY KEY,
    nombreCurso varchar(70),
    grupo int,
    profesor varchar(50),
    correoProfesor varchar(50),
    nombreEstudiante varchar(50),
    correoEstudiante varchar(50),
    nota float,
    periodo varchar(20),
    UNIQUE KEY unique_curso (nombreCurso, grupo, periodo, nombreEstudiante)
);

LOAD DATA INFILE '/var/lib/mysql-files/data_cursos.csv'
INTO TABLE cursos
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

