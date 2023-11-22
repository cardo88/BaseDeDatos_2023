# Dockerfile para frontend
# Etapa de construcción
FROM node:latest as build

WORKDIR /app

COPY frontend/package*.json ./

RUN npm install

COPY frontend/ ./

RUN npm run build

# Etapa de producción
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
