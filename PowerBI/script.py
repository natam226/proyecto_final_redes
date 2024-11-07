from google.cloud import bigquery
import os
import glob

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/home/vagrant/datosdashboardestudiantes-868d39a47bd5.json"

# Configura el cliente de BigQuery
client = bigquery.Client()

# Define el dataset
dataset_id = 'datosdashboardestudiantes.datosestudiantes'

# Lista de subcarpetas y sus correspondientes IDs de tabla
csv_files = [
    ("rendimiento_genero", "datosdashboardestudiantes.datosestudiantes.rendimiento_genero"),
    ("rendimiento_estado_civil", "datosdashboardestudiantes.datosestudiantes.rendimiento_estado_civil"),
    ("rendimiento_necesidadesEspeciales", "datosdashboardestudiantes.datosestudiantes.rendimiento_necesidadesEspeciales"),
    ("rendimiento_beca", "datosdashboardestudiantes.datosestudiantes.rendimiento_beca"),
    ("rendimiento_pais", "datosdashboardestudiantes.datosestudiantes.rendimiento_pais"),
    ("rendimiento_prestamo", "datosdashboardestudiantes.datosestudiantes.rendimiento_prestamo"),
    ("rendimiento_desplazado", "datosdashboardestudiantes.datosestudiantes.rendimiento_desplazado")
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
for folder_name, table_id in csv_files:
    # Busca el archivo CSV en la subcarpeta correspondiente
    csv_file_path_pattern = os.path.join(output_dir, folder_name, "*.csv")
    csv_file_paths = glob.glob(csv_file_path_pattern)
    
    # Si hay archivos en la carpeta, cargarlos (toma el primer archivo encontrado)
    if csv_file_paths:
        csv_file_path = csv_file_paths[0]  # Asume que solo hay un CSV por carpeta
        
        with open(csv_file_path, "rb") as source_file:
            job = client.load_table_from_file(source_file, table_id, job_config=job_config)
        
        job.result()  # Espera a que el trabajo se complete
        print(f"Cargados {job.output_rows} filas en {table_id}.")
    else:
        print(f"No se encontró archivo CSV en la carpeta: {folder_name}")

print("Todos los archivos CSV han sido subidos a BigQuery exitosamente.")
