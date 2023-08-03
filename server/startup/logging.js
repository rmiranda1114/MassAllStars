const winston = require('winston');
require('winston-mongodb');

module.exports = function () {
    //winston.handleExceptions( new winston.transports.File({ filename: '../logfile.log' }));

    process.on('unhandledRejection', (ex) => {
        throw ex;
    });

    const logger = winston.createLogger({
        transports: [
          new winston.transports.Console(),
          new winston.transports.File({ filename: 'logfile.log' })
        ]
      });
    
   /* winston.add(winston.transports.File, { filename: 'logfile.log' });

    winston.add(winston.transports.MongoDB, {
        db: 'mongodb://localhost/massallstarz',
        level: 'info'
    });*/
    
}