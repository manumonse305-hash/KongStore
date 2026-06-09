# Usa la imagen oficial de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias desde la carpeta 'backend'
COPY backend/package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación desde la carpeta 'backend'
COPY backend/ .

# Construye la aplicación NestJS
RUN npm run build

# Expone el puerto que usará la aplicación (Render usará el puerto dinámico)
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "dist/main.js"]
