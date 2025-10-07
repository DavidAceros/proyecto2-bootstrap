# Etapa base
FROM node:18-alpine

# Carpeta de trabajo
WORKDIR /app

COPY . .

# Instalar servidor HTTP simple
RUN npm install -g http-server

# Exponer el puerto 8080
EXPOSE 8080

# Comando de ejecución
CMD ["http-server", "-p", "8080"]
