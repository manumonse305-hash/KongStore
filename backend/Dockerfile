FROM node:18-alpine

WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar código y construir
COPY . .
RUN npm run build

# Exponer puerto
EXPOSE 3000

# Iniciar la aplicación
CMD ["node", "dist/main.js"]
