require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const apiRoutes = require('./api.js');

const app = express();
app.set('trust proxy', true); // Solo se sei dietro a un proxy come Nginx o HAProxy

const morganFormat = ':remote-addr - :method :url :status';

app.use(express.json()); // Permette di leggere JSON dal body delle richieste
app.use(cors({
    origin: 'http://localhost:3001'
}));
app.use(morgan(morganFormat));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening @port ${PORT}`));

