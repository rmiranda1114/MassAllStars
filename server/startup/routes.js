const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOption = require('../config/corsOption.js');
const credentials = require('../middleware/credentials.js');
const { logger } = require('../middleware/logEvent.js');
const error = require('../middleware/error.js');
const createParent = require('../routes/createParent.js');
const createPlayer = require('../routes/createPlayer.js');
const createEmergency = require('../routes/createEmergency.js');
const finishCreate = require('../routes/finishCreate.js');
const updatePlayer = require('../routes/updatePlayer.js');
const updateParent = require('../routes/updateParent.js');
const updateEmergency = require('../routes/updateEmergency.js');
const deletePlayer = require('../routes/deletePlayer.js');
const createCoach = require('../routes/createCoach.js');
const login = require('../routes/login.js');
const searchPlayerPopulated = require('../routes/searchPlayerPopulated.js');
const searchPlayer = require('../routes/searchPlayer.js');
const refresh = require('../routes/refresh.js');
const searchCoach = require('../routes/searchCoach.js');
const deleteCoach = require('../routes/deleteCoach.js');
const uploadImage = require('../routes/uploadImage.js');
const searchImages = require('../routes/searchImages.js');
const logout = require('../routes/logout.js');



module.exports = function (app){

    app.use(cookieParser());
    app.use(credentials);
    app.use(cors(corsOption));
    app.use(express.urlencoded({ limit: '50mb', extended: true }));
    app.use(express.json({ limit: '50mb' }));
    app.use(express.static('public'));
    
    app.use('/api/login', login);
    app.use('/api/refresh', refresh);
    app.use('/api/createEmergency', createEmergency);
    app.use('/api/createParent', createParent);
    app.use('/api/createPlayer', createPlayer);
    app.use('/api/users', createCoach);
    app.use('/api/finishCreate', finishCreate);
    app.use('/api/upload', uploadImage);
    app.use('/api/update', updatePlayer);
    app.use('/api/update', updateParent);
    app.use('/api/update', updateEmergency);
    app.use('/api/search/:playerId', searchPlayerPopulated);
    app.use('/api/search', searchPlayer); 
    app.use('/api/coaches', searchCoach);
    app.use('/api/images', searchImages);
    app.use('/api/deleteCoach', deleteCoach);
    app.use('/api/deletePlayer', deletePlayer);
    app.use('/api/refresh', refresh);
    app.use('/api/logout', logout);

    app.all('*', (req, res) => {
        res.status(404);
        if (req.accepts('html')) {
            res.send('');
        } else if (req.accepts('json')) {
            res.json({ error: "404 Not Found" });
        } else {
            res.type('txt').send("404 Not Found");
        }
    })

    app.use(error);
} 