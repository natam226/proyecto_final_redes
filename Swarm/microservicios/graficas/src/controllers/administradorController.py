from flask import Blueprint, jsonify, request
from src.models.cursosModel import obtener_notas_estudiantes
from src.models.estudiantesModel import obtener_informacion_estudiante
from src.services.graficoService import generar_grafico_necesidades_especiales
from src.services.graficoService import generar_grafico_estado_civil
from src.services.graficoService import generar_grafico_prestamo
from src.services.graficoService import generar_grafico_beca
from src.services.graficoService import generar_grafico_desplazado

administrador_bp = Blueprint('administrador_bp', __name__)

@administrador_bp.route('/admin/grafico-necesidades', methods=['GET'])
def grafico_necesidades():
    infoEstudiante = obtener_informacion_estudiante()
    # Obtener datos de la base de datos
    datos = obtener_notas_estudiantes()
    
    grafico_path = generar_grafico_necesidades_especiales(datos, infoEstudiante)
    return jsonify({"grafico_json": grafico_path}), 200

@administrador_bp.route('/admin/grafico-estadoCivil', methods=['GET'])
def grafico_estado_civil():
    infoEstudiante = obtener_informacion_estudiante()
    # Obtener datos de la base de datos
    datos = obtener_notas_estudiantes()
    
    grafico_path = generar_grafico_estado_civil(datos, infoEstudiante)
    return jsonify({"grafico": grafico_path}), 200

@administrador_bp.route('/admin/grafico-prestamo', methods=['GET'])
def grafico_prestamo():
    infoEstudiante = obtener_informacion_estudiante()
    # Obtener datos de la base de datos
    datos = obtener_notas_estudiantes()
    
    grafico_path = generar_grafico_prestamo(datos, infoEstudiante)
    return jsonify({"grafico": grafico_path}), 200

@administrador_bp.route('/admin/grafico-beca', methods=['GET'])
def grafico_beca():
    infoEstudiante = obtener_informacion_estudiante()
    # Obtener datos de la base de datos
    datos = obtener_notas_estudiantes()
    
    grafico_path = generar_grafico_beca(datos, infoEstudiante)
    return jsonify({"grafico": grafico_path}), 200

@administrador_bp.route('/admin/grafico-desplazado', methods=['GET'])
def grafico_desplazado():
    infoEstudiante = obtener_informacion_estudiante()
    # Obtener datos de la base de datos
    datos = obtener_notas_estudiantes()
    
    grafico_path = generar_grafico_desplazado(datos, infoEstudiante)
    return jsonify({"grafico": grafico_path}), 200

