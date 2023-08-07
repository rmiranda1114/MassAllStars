const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { logger } = require('../middleware/logEvent.js');
const error = require('../middleware/error.js');
const createParent = require('../routes/createParent.js');
const createPlayer = require('../routes/newPlayer.js');
const createEmergency = require('../routes/createEmergency.js');
const update = require('../routes/update.js');
const deletePlayer = require('../routes/deletePlayer.js');
const newUsers = require('../routes/newUsers.js');
const login = require('../routes/login.js');
const fullSearch = require('../routes/fullSearch.js');
const search = require('../routes/search.js');
const refresh = require('../routes/refresh.js');
const coaches = require('../routes/coaches.js');
const deleteCoach = require('../routes/deleteCoach.js');
const upload = require('../routes/upload.js');
const images = require('../routes/images');
const logout = require('../routes/logout.js');
const corsOption = require('../config/corsOption.js');
const credentials = require('../middleware/credentials.js');


module.exports = function (app){


    app.use(logger);
    app.use(cookieParser());
    app.use(credentials);
    app.use(cors(corsOption));
    app.use(express.urlencoded({ limit: '50mb', extended: true }));
    app.use(express.json({ limit: '50mb' }));
    
    app.use(express.static('public'));
    
    app.use('/api/register', createEmergency);
    app.use('/api/register', createParent);
    app.use('/api/register', createPlayer);
    app.use('/api/update', update);
    app.use('/api/users', newUsers);
    app.use('/api/login', login);
    app.use('/api/search/:playerId', fullSearch);
    app.use('/api/search', search); 
    app.use('/api/coaches', coaches);
    app.use('/api/deleteCoach', deleteCoach);
    app.use('/api/upload', upload);
    app.use('/api/deletePlayer', deletePlayer);
    app.use('/api/images', images);
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