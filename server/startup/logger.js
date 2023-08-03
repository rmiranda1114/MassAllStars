const { createLogger, format, transports } = require('winston');
require('winston-mongodb');

const myFormat = format.printf(({level, meta, timestamp}) => {
    return `${timestamp} ${level}: ${meta}`;
})


const logger = createLogger({
    transports: [
        new transports.Console(),
        new transports.File({
            level: 'warn',
            filename: 'loggerfile.log'
        })
        /*,
        new transports.MongoDB({
            db: 'mongodb://127.0.0.1:27017/massallstarz',
            collection: 'logs'
        })*/
    ],
    format: format.combine(
        format.json(),
        format.timestamp(),
        format.metadata(),
        format.prettyPrint()
    )
})



module.exports = logger

