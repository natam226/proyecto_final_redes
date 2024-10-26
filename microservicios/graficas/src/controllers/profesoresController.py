from flask import Blueprint, jsonify
from src.models.profesoresModel import obtener_correo_profesor
from src.models.cursosModel import obtener_rendimiento_estudiantes
from src.services.graficoService import generar_grafico_rendimiento_estudiantes

profesor_bp = Blueprint('profesor_bp', __name__)

@profesor_bp.route('/profesor/<string:usuario>/grafico-aprobados-reprobados', methods=['GET'])
def grafico_aprobados_reprobados(usuario):

    info = obtener_correo_profesor(usuario)
    
    if info and len(info) > 0:  # Asegúrate de que 'info' tenga al menos un resultado
        correo = info['correo']

        datos = obtener_rendimiento_estudiantes(correo)
    
        if datos is None:
            return jsonify({"error": "Error al conectar con la base de datos"}), 500
        if not datos:
            return jsonify({"error": "No se encontraron datos para el profesor"}), 404
    
        grafico_path = generar_grafico_rendimiento_estudiantes(datos)
        return jsonify({"grafico": grafico_path}), 200
    else:
        return jsonify({"error": "No se encontró el correo del profesor"}), 404
