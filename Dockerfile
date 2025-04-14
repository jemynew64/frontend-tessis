# Usar Node 20.16 como base
FROM node:20-alpine AS development
RUN apk add --no-cache postgresql-client curl

# Definir el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copia todos los archivos, incluyendo el schema.prisma
COPY . .

# Construir la aplicación
RUN npm run build

# Exponer el puerto 5173 (por defecto en Vite)
# EXPOSE 5173

# CMD [ "npm","run","dev" ]
 FROM node:20-alpine  AS production
 RUN apk add --no-cache postgresql-client curl

 ARG NODE_ENV=production 
 ENV NODE_ENV=${NODE_ENV}

 WORKDIR /usr/src/app

 COPY package*.json .

 RUN npm ci --only=production
 # Copiar la carpeta dist y prisma desde el contenedor de desarrollo
 COPY --from=development /usr/src/app/dist ./dist
 # Comando para servir la aplicación con un servidor estático
 #CMD ["npx", "vite", "preview", "--host", "--port", "5173"]
