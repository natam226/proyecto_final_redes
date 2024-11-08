from pyspark.sql import SparkSession

# Inicia la sesión de Spark
spark = SparkSession.builder.appName("Dashboard Información Estudiantes").getOrCreate()

# Leer las tablas de MySQL
df_estudiantes = spark.read.csv("/root/proyecto_final_redes/clusterAplicacion/data_estudiantes.csv", header=True, inferSchema=True)
df_cursos = spark.read.csv("/root/proyecto_final_redes/clusterAplicacion/data_cursos.csv", header=True, inferSchema=True)

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
rendimiento_genero.write.csv(f"{output_dir}/rendimiento_genero", header=True, mode="overwrite")
rendimiento_estado_civil.write.csv(f"{output_dir}/rendimiento_estado_civil", header=True, mode="overwrite")
rendimiento_necesidadesEspeciales.write.csv(f"{output_dir}/rendimiento_necesidadesEspeciales", header=True, mode="overwrite")
rendimiento_beca.write.csv(f"{output_dir}/rendimiento_beca", header=True, mode="overwrite")
rendimiento_pais.write.csv(f"{output_dir}/rendimiento_pais", header=True, mode="overwrite")
rendimiento_prestamo.write.csv(f"{output_dir}/rendimiento_prestamo", header=True, mode="overwrite")
rendimiento_desplazado.write.csv(f"{output_dir}/rendimiento_desplazado", header=True, mode="overwrite")

print("CSV files generated successfully.")