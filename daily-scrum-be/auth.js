const jwt = require('jsonwebtoken');

// Middleware per verificare il token JWT
const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        // Divide l'header in "Bearer" e il token
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;

        try {
            const decoded = jwt.verify(req.token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (err) {
            if (err.name == 'TokenExpiredError') {
                res.status(403).send('Token scaduto');
            } else {
                res.status(403).send('Token non valido.');
            }
        }
    } else {
        // Se non c'è header di autorizzazione o non è in formato Bearer
        res.status(401).send('Accesso negato. Nessun token fornito.');
    }
};

module.exports = verifyToken;