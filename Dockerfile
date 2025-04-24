# -------------------------- Etapa 1: Build --------------------------
    FROM node:20-alpine AS build
    WORKDIR /app
    
    COPY package*.json ./
    RUN npm install
    
    COPY . .
    
    # ✅ Agregamos las líneas clave para que Render inyecte la variable
    ARG VITE_BASE_URL
    ENV VITE_BASE_URL=$VITE_BASE_URL
    
    RUN npm run build
    
    # -------------------------- Etapa 2: Servidor --------------------------
    FROM node:20-alpine
    WORKDIR /app
    
    RUN npm install -g http-server
    COPY --from=build /app/dist ./dist
    
    EXPOSE 80
    CMD ["http-server", "dist", "-p", "80"]
    