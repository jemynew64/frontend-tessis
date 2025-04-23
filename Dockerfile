# ------------------------------
# Etapa 1: Build
# ------------------------------
    FROM node:20-alpine AS build
    RUN apk add --no-cache curl
    
    WORKDIR /usr/src/app
    
    COPY package*.json ./
    RUN npm install
    
    COPY . .
    RUN npm run build
    
    # ------------------------------
    # Etapa 2: Producción
    # ------------------------------
    FROM node:20-alpine AS production
    RUN apk add --no-cache curl
    
    ENV NODE_ENV=production
    ENV PORT=80
    
    WORKDIR /usr/src/app
    
    # Solo las dependencias de producción
    COPY package*.json ./
    RUN npm ci --omit=dev
    
    # Copia la app ya build-eada
    COPY --from=build /usr/src/app/dist ./dist
    
    # Servidor estático confiable (más estable que vite preview)
    RUN npm install -g http-server
    
    EXPOSE 80
    CMD ["http-server", "dist", "-p", "80"]
    