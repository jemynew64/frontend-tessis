# ------------------------------
# Etapa 1: Desarrollo y Build
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
    
    COPY package*.json ./
    RUN npm ci --omit=dev
    
    COPY --from=build /usr/src/app/dist ./dist
    
    # 👉 Servimos la app en el puerto 80 (Render escucha ahí)
    EXPOSE 80
    
    # 👉 Preview sirve la app build-eada
    CMD ["npx", "vite", "preview", "--host", "0.0.0.0", "--port", "80"]
    