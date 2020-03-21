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

var graylog2 = require("graylog2");
var grayLogger = new graylog2.graylog({
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

var winston = require("winston");

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
      new winston.transports.Console()
    ]
});   

const logger = function(level, message){
    if(process.env.ENV === 'production'){
        grayLogger[level](message);
    }
    else {
        winstonLogger.log(winstonEnums[level], message);
    }
};

module.exports = logger;