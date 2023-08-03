const jwt = require('jsonwebtoken');
require('dotenv').config();

function authorize(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ Error: 'Access Denied. No Token Provided' });
        const token = authHeader.split(' ')[1];
    
    jwt.verify(token, process.env.jwtPrivateKey, (err, decoded) => {
        if (err) return res.status(403).json({ Error: 'Invalid Token' });
        req.email = decoded.email;
        req.name = decoded.name;
        req.admin = decoded.admin;
        next();
    })   
    
}

module.exports = authorize;