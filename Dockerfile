# --------------------------
# Etapa 1: Build de producción
# --------------------------
    FROM node:20-alpine AS build
    WORKDIR /app
    
    # Copiar package.json e instalar dependencias
    COPY package*.json ./
    RUN npm install
    
    # Copiar todo el proyecto
    COPY . .
    
    # 👉 Aquí Render inyecta las variables de entorno automáticamente
    # como VITE_BASE_URL al hacer este build
    RUN npm run build
    
    # --------------------------
    # Etapa 2: Servidor estático
    # --------------------------
    FROM node:20-alpine
    WORKDIR /app
    
    # Instalar servidor de archivos estáticos
    RUN npm install -g http-server
    
    # Copiar solo el build final
    COPY --from=build /app/dist ./dist
    
    # Exponer el puerto 80 (Render lo usa por defecto)
    EXPOSE 80
    
    # Servir el contenido de la carpeta dist
    CMD ["http-server", "dist", "-p", "80"]
    