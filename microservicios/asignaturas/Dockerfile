# Usar la imagen base de Node.js
FROM node:14

# Establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar el package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de la aplicación
COPY src ./src

# Exponer el puerto
EXPOSE 3006

# Comando para ejecutar la aplicación
CMD ["node", "src/index.js"]

