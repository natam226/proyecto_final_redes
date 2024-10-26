# Usar la imagen base de Python
FROM python:3.9

# Establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar el requirements.txt
COPY requirements.txt ./

# Instalar las dependencias
RUN pip install --no-warn-script-location -r requirements.txt

# Copiar el resto de la aplicación
COPY src ./src

# Exponer el puerto
EXPOSE 3008

# Comando para ejecutar la aplicación
CMD ["python3", "src/app.py"]

