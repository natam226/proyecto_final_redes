from flask import Blueprint, jsonify, request
from src.models.cursosModel import obtener_notas_estudiante
from src.models.estudiantesModel import obtener_correo_estudiante
from src.services.graficoService import generar_grafico_promedio_estudiante

estudiante_bp = Blueprint('estudiante_bp', __name__)

@estudiante_bp.route('/estudiante/<string:usuario>/grafico-promedio', methods=['GET'])
def obtener_grafico_promedio(usuario):
    info = obtener_correo_estudiante(usuario)

    if info and len(info) > 0:  # Asegúrate de que 'info' tenga al menos un resultado
        correo = info['correo']
        notas = obtener_notas_estudiante(correo)
        
    if notas:
        grafico_path = generar_grafico_promedio_estudiante(notas)
        return jsonify({"grafico": grafico_path}), 200
    else:
        return jsonify({"error": "No se encontraron datos"}), 404
