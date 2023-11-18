# Utiliza la imagen oficial de Node.js versión 18 desde Docker Hub como imagen base
FROM node:18

# Establece el directorio de trabajo dentro del contenedor como /myapp
WORKDIR /myapp

# Copia el archivo package.json al directorio de trabajo
COPY package.json .

# Instala las dependencias del proyecto usando npm
RUN npm install

# Copia todos los archivos del contexto actual al directorio de trabajo en el contenedor
COPY . .

# Comando que se ejecutará al iniciar el contenedor para iniciar la aplicación
CMD npm start
