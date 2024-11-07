from google.cloud import bigquery
import os

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/home/vagrant/datosdashboardestudiantes-868d39a47bd5.json"

# Configura el cliente de BigQuery
client = bigquery.Client()

# Define el dataset
dataset_id = 'datosdashboardestudiantes.datosestudiantes'

# Lista de subcarpetas y sus correspondientes IDs de tabla
csv_files = [
    ("rendimiento_genero/*.csv", "datosdashboardestudiantes.datosestudiantes.rendimiento_genero"),
    ("rendimiento_estado_civil/*.csv", "datosdashboardestudiantes.datosestudiantes.rendimiento_estado_civil"),
    ("rendimiento_necesidadesEspeciales/*.csv", "datosdashboardestudiantes.datosestudiantes.rendimiento_necesidadesEspeciales"),
    ("rendimiento_beca/*.csv", "datosdashboardestudiantes.datosestudiantes.rendimiento_beca"),
    ("rendimiento_pais/*.csv", "datosdashboardestudiantes.datosestudiantes.rendimiento_pais"),
    ("rendimiento_prestamo/*.csv", "datosdashboardestudiantes.datosestudiantes.rendimiento_prestamo"),
    ("rendimiento_desplazado/*.csv", "datosdashboardestudiantes.datosestudiantes.rendimiento_desplazado")
]

# Directorio donde se encuentran los CSVs
output_dir = "/home/vagrant/clusterAnalisis/"

# Configura la carga de datos
job_config = bigquery.LoadJobConfig(
    source_format=bigquery.SourceFormat.CSV,
    skip_leading_rows=1,  # Si tienes encabezados
    autodetect=True,  # Detecta automáticamente el esquema
)

# Carga cada CSV a BigQuery
for csv_subpath, table_id in csv_files:
    csv_file_path = os.path.join(output_dir, csv_subpath)
    
    with open(csv_file_path, "rb") as source_file:
        job = client.load_table_from_file(source_file, table_id, job_config=job_config)
    
    job.result()  # Espera a que el trabajo se complete
    print(f"Cargados {job.output_rows} filas en {table_id}.")

print("Todos los archivos CSV han sido subidos a BigQuery exitosamente.")
