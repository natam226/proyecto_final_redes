# Usar una imagen base de Ubuntu (puedes usar otra base que prefieras)
FROM ubuntu:20.04

# Establecer las variables de entorno necesarias para la instalación
ENV SPARK_VERSION=3.5.3
ENV HADOOP_VERSION=3.2
ENV SPARK_HOME=/opt/spark
ENV PATH=$SPARK_HOME/bin:$PATH

# Actualizar el sistema e instalar las dependencias necesarias
RUN apt-get update && apt-get install -y \
    openjdk-11-jdk \
    curl \
    wget \
    python3 \
    python3-pip \
    python3-dev \
    build-essential \
    git \
    && apt-get clean

# Descargar e instalar Apache Spark
RUN curl -sL "https://dlcdn.apache.org/spark/spark-$SPARK_VERSION/spark-$SPARK_VERSION-bin-hadoop$HADOOP_VERSION.tgz" | tar -xz -C /opt && \
    mv /opt/spark-$SPARK_VERSION-bin-hadoop$HADOOP_VERSION /opt/spark

# Instalar el conector MySQL para Spark
RUN wget https://dev.mysql.com/get/Downloads/Connector-J/mysql-connector-java_8.0.30-1ubuntu22.04_all.deb -P /tmp && \
    dpkg -i mysql-connector-java_8.0.30-1ubuntu22.04_all.deb -C /tmp && \
    mv /tmp/mysql-connector-java-8.0.30/mysql-connector-java-8.0.30.jar /opt/spark/jars/

# Instalar dependencias de Python
RUN pip3 install pyspark mysql-connector-python

# Copiar el código fuente de tu aplicación al contenedor
COPY /root/proyecto_final_redes/clusterAplicacion /app

# Establecer el directorio de trabajo
WORKDIR /app

# Comando para ejecutar tu aplicación
CMD ["spark-submit", "--jars", "/opt/spark/jars/mysql-connector-java-8.0.30.jar", "/app/appRendimientoEstudiantes.py"]
