# ------------------------------
# Etapa 1: Build
# ------------------------------
    FROM node:20-alpine AS build
    WORKDIR /usr/src/app
    
    # Copiar solo los archivos necesarios primero (mejor caché)
    COPY package*.json ./
    RUN npm install
    
    # Copiar el resto del proyecto
    COPY . .
    
    # Build de producción (donde VITE_BASE_URL se inyecta si está definida en Render)
    RUN npm run build
    
    # ------------------------------
    # Etapa 2: Producción con vite preview
    # ------------------------------
    FROM node:20-alpine AS production
    WORKDIR /usr/src/app
    
    # Variables de entorno necesarias
    ENV NODE_ENV=production
    ENV PORT=80
    
    # Copiamos todo el proyecto para ejecutar el build y servir desde ahí
    COPY --from=build /usr/src/app /usr/src/app
    
    # Instalamos solo las dependencias necesarias en producción
    RUN npm ci --omit=dev
    
    # Exponemos el puerto donde se servirá la app
    EXPOSE 80
    
    # Ejecutamos la app con vite preview
    CMD ["npm", "run", "preview"]
    