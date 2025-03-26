# Usar Node 20.16 como base
FROM node:20.16

# Actualizar el sistema e instalar Git
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

# Definir el directorio de trabajo dentro del contenedor
WORKDIR /app

# Clonar el repositorio del frontend (COMENTADO)
# RUN git clone https://github.com/jemynew64/frontend-tessis.git /app

# Copiar los archivos locales del frontend al contenedor
COPY . /app

# Instalar dependencias
RUN npm install

# Construir la aplicación
RUN npm run build

# Exponer el puerto 5173 (por defecto en Vite)
EXPOSE 5173

# Comando para servir la aplicación con un servidor estático
CMD ["npx", "vite", "preview", "--host", "--port", "5173"]
