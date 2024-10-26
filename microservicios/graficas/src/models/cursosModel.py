import requests
    
def obtener_rendimiento_estudiantes(correoProf):
    url = f'http://localhost:3007/cursos/rendimiento/{correoProf}'
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        return None
    
def obtener_notas_estudiante(correoEstudiante):
    url = f'http://localhost:3007/cursos/notas/{correoEstudiante}'
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        return None

def obtener_notas_estudiantes(): 
    url = f'http://localhost:3007/cursos'
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        return None