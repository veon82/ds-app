const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./dailyscrum.db', (err) => {
    if (err) {
        console.error('Error connecting to the SQLite database:', err.message);
    }
    console.log('Connected to the SQLite database.');
});

// Initialize database schema
const initDb = () => {
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            image_path TEXT
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS sessions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            duration INTEGER NOT NULL,
            date DATE DEFAULT CURRENT_DATE
        )`);
    });
};

initDb();

module.exports = db;
