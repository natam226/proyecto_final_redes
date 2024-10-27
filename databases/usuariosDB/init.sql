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
			
ALTER TABLE estudiantes
ADD COLUMN totalCreditos INT DEFAULT 0;
	
create table profesores (
			usuario varchar(20),
			contrasena varchar (30),
			rol ENUM('Profesor', 'Director'),
			nombre varchar(50),
			correo varchar(30),
			ultimoGradoDeFormacion ENUM('Bachiller', 'Pregrado', 'Maestria', 'Doctorado', 'Especializacion'),
			primary key(usuario));


create database asignaturasDB;
use asignaturasDB;
create table asignaturas (
			id int auto_increment, 
			nombreAsignatura varchar (70),
			creditos int,
			cupos int, 
			semestre int,
			primary key(id));

create database cursosDB;
use cursosDB;
create table cursos(
id int auto_increment,
nombreCurso varchar(70),
grupo int,
profesor varchar(50),
correoProfesor varchar(50),
nombreEstudiante varchar(50),
correoEstudiante varchar(50),
nota float,
periodo varchar(20),
UNIQUE KEY unique_curso (nombreCurso, grupo, periodo, nombreEstudiante));
		