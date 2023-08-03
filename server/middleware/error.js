const { logEvents } = require('./logEvent.js');

function error (err, req, res, next) {
    logEvents(`${err.name}: ${err.message}`, 'errLog.txt');
    res.status(500).send(err.message).json({ error: 'Unable to Process'});
}

module.exports = error