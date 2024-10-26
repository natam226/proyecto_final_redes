import requests

def obtener_correo_estudiante(usuario):
    url = f'http://localhost:3005/CorreoEstudiante/{usuario}'
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        return None

def obtener_informacion_estudiante(): 
    url = f'http://localhost:3005/estudiantes'
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        return None