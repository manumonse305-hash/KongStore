FROM node:20-alpine

WORKDIR /app

# Copiar todo
COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./
COPY src ./src

# Instalar dependencias y compilar
RUN npm ci && \
    npm run build && \
    npm prune --production

# Limpiar código fuente (opcional, ahorra espacio)
RUN rm -rf src

EXPOSE 10000

CMD ["node", "dist/main.js"]
