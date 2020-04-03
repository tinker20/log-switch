/**
 * graylog.emergency
 * graylog.alert
 * graylog.critical
 * graylog.error
 * graylog.warning
 * graylog.notice
 * graylog.info
 * graylog.debug
 */

const graylog2 = require("graylog2");
const grayLogger = new graylog2.graylog({
    servers: [
        { 'host': process.env.GRAYLOG_HOST || 'localhost', port: process.env.GRAYLOG_PORT || '12201' },
    ],
    hostname: process.env.GRAYLOG_HOSTNAME || 'tinker20',
    facility: process.env.GRAYLOG_FACILITY || 'worker',
    bufferSize: 1350
});

/**
 * error
 * warn
 * info
 * verbose
 * debug
 * silly - Not supported currently.
 */

const winston = require("winston");

const winstonEnums = {
    emergency: 'error',
    alert: 'error',
    critical: 'error',
    error: 'error',
    warning: 'warn',
    notice: 'warn',
    info: 'info',
    debug: 'debug'
};

const winstonLogger = winston.createLogger({
    transports: [
      new winston.transports.Console({level: winstonEnums[process.env.LOG_LEVEL]})
    ]
});   

const logger = function(level, message){
    if(process.env.ENV === 'production'){
        grayLogger[level](message);
    }
    else {
        winstonLogger[winstonEnums[level]](message);
    }
};

grayLogger.on('error', function (error) {
    console.error('Error while trying to write to graylog2:', error);
});

module.exports = logger;