FROM node:20-alpine

WORKDIR /app/backend

# Copiar todo el backend
COPY backend/ .

# Instalar dependencias
RUN npm install

# Compilar TypeScript
RUN npm run build

# Exponer puerto
EXPOSE 10000

# Iniciar aplicación
CMD ["node", "dist/main.js"]
