from flask import Flask
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from flask_cors import CORS


from src.controllers.estudiantesController import estudiante_bp
from src.controllers.profesoresController import profesor_bp
from src.controllers.administradorController import administrador_bp

app = Flask(__name__)
CORS(app)

# Registrar blueprints
app.register_blueprint(estudiante_bp)
app.register_blueprint(profesor_bp)
app.register_blueprint(administrador_bp)

if __name__ == '__main__':
    app.run(debug=True, port=3008, host='0.0.0.0')
