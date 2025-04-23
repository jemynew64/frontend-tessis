# Etapa 1: Build
FROM node:20-alpine AS build
RUN apk add --no-cache curl

WORKDIR /usr/src/app

COPY package*.json ./
COPY .env .env 
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: Producción
FROM node:20-alpine AS production
RUN apk add --no-cache curl

ENV NODE_ENV=production
ENV PORT=80

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/vite.config.* ./ 

EXPOSE 80
CMD ["npx", "vite", "preview", "--host", "0.0.0.0", "--port", "80"]
