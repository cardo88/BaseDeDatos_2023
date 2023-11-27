# Dockerfile para backend

# Usar una imagen base de Node.js
FROM node:latest

# Establecer el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copiar los archivos del proyecto al contenedor
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Exponer el puerto que utiliza tu aplicación
EXPOSE 3001

# Comando para ejecutar la aplicación usando `nodemon`
# CMD ["npx", "nodemon", "src/index.js"]
 CMD [ "npm", "run", "start" ]
# CMD ["npx", "start"]
# CMD ["./node_modules/.bin/nodemon", "src/index.js"]

