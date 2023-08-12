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
const createCoach = require('../routes/createCoach.js');
const createTeam = require('../routes/createTeam.js');
const finishCreate = require('../routes/finishCreate.js');
const updatePlayer = require('../routes/updatePlayer.js');
const updateParent = require('../routes/updateParent.js');
const updateEmergency = require('../routes/updateEmergency.js');
const updateTeam = require('../routes/updateTeam.js');
const searchPlayerPopulated = require('../routes/searchPlayerPopulated.js');
const searchPlayerId = require('../routes/searchPlayerId.js');
const searchPlayer = require('../routes/searchPlayer.js');
const searchTeam = require('../routes/searchTeam.js');
const searchTeamId = require('../routes/searchTeamId.js');
const searchParentId = require('../routes/searchParentId.js');
const searchEmergencyId = require('../routes/searchEmergencyId.js');
const searchCoach = require('../routes/searchCoach.js');
const deleteCoach = require('../routes/deleteCoach.js');
const deletePlayer = require('../routes/deletePlayer.js');
const deleteTeam = require('../routes/deleteTeam.js');
const uploadImage = require('../routes/uploadImage.js');
const searchImages = require('../routes/searchImages.js');
const login = require('../routes/login.js');
const refresh = require('../routes/refresh.js');
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
    app.use('/api/createCoach', createCoach);
    app.use('/api/createTeam', createTeam);
    app.use('/api/finishCreate', finishCreate);
    app.use('/api/upload', uploadImage);
    app.use('/api/updatePlayer', updatePlayer);
    app.use('/api/update', updateParent);
    app.use('/api/update', updateEmergency);
    app.use('/api/updateTeam', updateTeam);
    app.use('/api/searchPlayer/:playerId', searchPlayerPopulated);
    app.use('/api/searchPlayerId', searchPlayerId);
    app.use('/api/searchPlayer', searchPlayer);
    app.use('/api/searchTeam/:teamId', searchTeamId);
    app.use('/api/searchTeam', searchTeam); 
    app.use('/api/searchParentId', searchParentId),
    app.use('/api/searchEmergencyId', searchEmergencyId);
    app.use('/api/searchCoach', searchCoach);
    app.use('/api/images', searchImages);
    app.use('/api/deleteCoach', deleteCoach);
    app.use('/api/deletePlayer', deletePlayer);
    app.use('/api/deleteTeam', deleteTeam);
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