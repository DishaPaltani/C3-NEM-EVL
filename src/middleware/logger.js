const logger = require('../config/winston.config');


const logRequests = (res, res, next)=>{
    logger.info(`${req.method} ${req.url}`);
    next();
};

const logErros = (err, req, res, next)=>{
    logger.error(err.stack);
    next(err);
};

module.exports = {
    logRequests,
    logErrors,
}