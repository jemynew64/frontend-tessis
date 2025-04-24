# Etapa 1: Build
FROM node:20-alpine AS build
WORKDIR /usr/src/app

# Copiar dependencias y hacer npm install
COPY package*.json ./
RUN npm install

# Copiar el resto del proyecto (incluye vite.config, src, etc.)
COPY . .

# ⚠️ Asegúrate que Render tenga seteada la variable VITE_BASE_URL
# Hacemos el build y las variables VITE_* se inyectan aquí
RUN npm run build

# Etapa 2: Producción
FROM node:20-alpine AS production
WORKDIR /usr/src/app

# Instalar solo http-server para servir la app
RUN npm install -g http-server

# Copiar solo los archivos de la app ya construida
COPY --from=build /usr/src/app/dist ./dist

# Puerto donde Render sirve (obligatorio)
EXPOSE 80

# Usamos http-server para servir dist (no vite preview)
CMD ["http-server", "dist", "-p", "80"]
