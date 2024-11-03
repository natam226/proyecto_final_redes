import requests

def obtener_correo_profesor(usuario):
    url = f'http://192.168.100.2:3005/correoprof/{usuario}'
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        return None