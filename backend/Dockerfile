FROM node:20-alpine AS builder

WORKDIR /app

# Copiar archivos de configuración
COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./

# Instalar dependencias (incluyendo devDependencies para build)
RUN npm ci

# Copiar código fuente
COPY src ./src

# Compilar TypeScript
RUN npm run build

# ===========================================
# Etapa de producción
# ===========================================
FROM node:20-alpine

WORKDIR /app

# Copiar solo lo necesario de la etapa builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Variables de entorno para producción
ENV NODE_ENV=production
ENV PORT=10000

# Exponer puerto (Render usará PORT)
EXPOSE 10000

# Health check (opcional)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:10000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Iniciar la aplicación
CMD ["node", "dist/main.js"]
