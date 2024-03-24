const express = require('express');
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./database.js');
const verifyToken = require('./auth.js');

const router = express.Router();

// Configurazione di multer per memorizzare i file caricati
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Assicurati che questa cartella esista
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Aggiunge un timestamp al nome del file per evitare sovrascritture
    },
});
const upload = multer({ storage: storage });

// API per la registrazione degli utenti
const saltRounds = 10;
router.post('/register',  upload.single('image'), async (req, res) => {
    const { username, password } = req.body;
    const imagePath = req.file.path; // Il percorso dell'immagine caricata

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const sql = `INSERT INTO users (username, password, image_path) VALUES (?, ?, ?)`;
        db.run(sql, [username, hashedPassword, imagePath], function(err) {
            if (err) {
                console.error(err.message);
                res.status(500).send('Impossibile registrare l\'utente.');
            } else {
                console.log(`User created with ID: ${this.lastID}`);
                res.status(201).send('Utente registrato con successo.');
            }
        });
    } catch {
        res.status(500).send();
    }
});

// API login
router.post('/login', async(req, res) => {
    const { username, password } = req.body;
    
    const sql = `SELECT * FROM users WHERE username = ?`;
    db.get(sql, [username], (err, user) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Errore durante il recupero dell\'utente.');
        }
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    // Password corrisponde, genera e restituisce il JWT
                    const accessToken = jwt.sign({ name: user.username, id: user.id }, process.env.JWT_SECRET);
                    res.json({ accessToken });
                } else {
                    // Password non corrispondente
                    res.status(401).send('Username o password non validi.');
                }
            });
        } else {
            // Utente non trovato
            res.status(401).send('Username o password non validi.');
        }
    });
});

// API per memorizzare una sessione
router.post('/sessions', verifyToken, (req, res) => {
    const { username, durata } = req.body;
    const sql = `INSERT INTO sessions (username, durata) VALUES (?, ?)`;
    db.run(sql, [username, durata], function(err) {
        if (err) {
            return console.error(err.message);
        }
        res.json({ id: this.lastID });
    });
});

// API  per recuperare le sessioni
router.get('/sessions', verifyToken, (req, res) => {
    const sql = `
    SELECT sessions.id, users.username, sessions.duration, sessions.date
    FROM sessions
    JOIN users ON sessions.user_id = users.id
    ORDER BY sessions.date DESC, sessions.id DESC`;

    db.all(sql, [], (err, sessions) => {
        if (err) {
            res.status(500).send('Errore nel recupero delle sessioni dal database.');
            return console.error(err.message);
        }
        res.json(sessions);
    });
});

router.get('/users', verifyToken, (req, res) => {
    const sql = `SELECT id, username, image_path from users`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }
        res.json({ users: rows });
    });
});

// Route protetta che richiede un token JWT valido
router.get('/protected', verifyToken, (req, res) => {
    res.json({ message: "Welcome to protected area!", user: req.user });
});

module.exports = router;