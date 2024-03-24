require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const apiRoutes = require('./api.js');

const app = express();

app.use(express.json()); // Permette di leggere JSON dal body delle richieste
app.use(cors({
    origin: 'http://localhost:3001'
}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));





app.use('/api', apiRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening @port ${PORT}`));

