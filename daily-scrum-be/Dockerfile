# Utilizza un'immagine ufficiale di Node come immagine di base
FROM node:18

# Imposta la directory di lavoro all'interno del container
WORKDIR /usr/src/app

# Copia il file package.json e package-lock.json (se disponibile) nella directory di lavoro
COPY package*.json ./

# Installa le dipendenze del progetto
RUN npm install

# Copia i file e le cartelle del progetto nella directory di lavoro del container
COPY . .

# Espone la porta su cui il tuo server sta in ascolto
EXPOSE 3000

# Comando per eseguire il server Node.js
CMD [ "node", "server.js" ]
