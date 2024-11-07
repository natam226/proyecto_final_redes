from pyspark.sql import SparkSession

# Inicia la sesión de Spark
spark = SparkSession.builder.appName("Dashboard Información Estudiantes") \
    .config("spark.jars", "/usr/share/java/mysql-connector-java-8.0.30.jar") \
    .getOrCreate()

# URLs de conexión JDBC para MySQL
jdbc_url_usuarios = "jdbc:mysql://usuariosdb:3306/usuariosdb"
jdbc_url_cursos = "jdbc:mysql://cursosdb:3306/cursosdb"
connection_properties = {
    "password": "password",
    "driver": "com.mysql.cj.jdbc.Driver"
}

# Leer las tablas de MySQL
df_estudiantes = spark.read.jdbc(url=jdbc_url_usuarios, table="estudiantes", properties=connection_properties)
df_cursos = spark.read.jdbc(url=jdbc_url_cursos, table="cursos", properties=connection_properties)

# Crear vistas temporales
df_estudiantes.createOrReplaceTempView("estudiantes")
df_cursos.createOrReplaceTempView("cursos")

# Consultas SQL para generar los diferentes DataFrames
rendimiento_genero = spark.sql("SELECT e.genero, c.nombreCurso, c.nota, c.periodo FROM estudiantes e JOIN cursos c ON e.correo = c.correoEstudiante")
rendimiento_estado_civil = spark.sql("SELECT e.estadoCivil, c.nombreCurso, c.nota, c.periodo FROM estudiantes e JOIN cursos c ON e.correo = c.correoEstudiante")
rendimiento_necesidadesEspeciales = spark.sql("SELECT e.necesidadesEspecialesEducacion, c.nombreCurso, c.nota, c.periodo FROM estudiantes e JOIN cursos c ON e.correo = c.correoEstudiante")
rendimiento_beca = spark.sql("SELECT e.beca, c.nombreCurso, c.nota, c.periodo FROM estudiantes e JOIN cursos c ON e.correo = c.correoEstudiante")
rendimiento_pais = spark.sql("SELECT e.paisOrigen, c.nombreCurso, c.nota, c.periodo FROM estudiantes e JOIN cursos c ON e.correo = c.correoEstudiante")
rendimiento_prestamo = spark.sql("SELECT e.prestamo, c.nombreCurso, c.nota, c.periodo FROM estudiantes e JOIN cursos c ON e.correo = c.correoEstudiante")
rendimiento_desplazado = spark.sql("SELECT e.desplazado, c.nombreCurso, c.nota, c.periodo FROM estudiantes e JOIN cursos c ON e.correo = c.correoEstudiante")

# Exporta cada DataFrame como CSV
output_dir = "/home/vagrant/clusterAnalisis/"
rendimiento_genero.write.csv(f"{output_dir}/rendimiento_genero.csv", header=True, mode="overwrite")
rendimiento_estado_civil.write.csv(f"{output_dir}/rendimiento_estado_civil.csv", header=True, mode="overwrite")
rendimiento_necesidadesEspeciales.write.csv(f"{output_dir}/rendimiento_necesidadesEspeciales.csv", header=True, mode="overwrite")
rendimiento_beca.write.csv(f"{output_dir}/rendimiento_beca.csv", header=True, mode="overwrite")
rendimiento_pais.write.csv(f"{output_dir}/rendimiento_pais.csv", header=True, mode="overwrite")
rendimiento_prestamo.write.csv(f"{output_dir}/rendimiento_prestamo.csv", header=True, mode="overwrite")
rendimiento_desplazado.write.csv(f"{output_dir}/rendimiento_desplazado.csv", header=True, mode="overwrite")

print("CSV files generated successfully.")