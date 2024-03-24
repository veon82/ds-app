# Fase di build
FROM node:18 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Fase di run
FROM nginx:alpine

# Copia l'output della build dallo step precedente
COPY --from=build /app/build /usr/share/nginx/html

# Espone la porta 80 per l'accesso all'applicazione
EXPOSE 80

# Nginx avvia già il server in foreground, quindi non è necessario CMD
