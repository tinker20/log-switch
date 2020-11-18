const LOG_LEVEL = process.env.LOG_LEVEL;
var grayLogger;
const graylog2 = require("graylog2");
/**
 * graylog.emergency
 graylog.alert
 graylog.critical
 graylog.error
 graylog.warning
 graylog.notice
 graylog.info
 graylog.debug
 * */
const graylogEnums = {
    alert: 0,
    critical: 0,
    notice: 0,
    emergency: 0,
    error: 0,
    warning: 1,
    info: 2,
    debug: 3
};

grayLogger = grayLogger || new graylog2.graylog({
        servers: [
            {'host': process.env.GRAYLOG_HOST || 'localhost', port: process.env.GRAYLOG_PORT || '12201'},
        ],
        hostname: process.env.GRAYLOG_HOSTNAME || 'tinker20',
        facility: process.env.GRAYLOG_FACILITY || 'worker',
        bufferSize: 1350
    });


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

const logger = function (level, message) {
    if (process.env.ENV === 'production') {
        console.log(level, LOG_LEVEL, graylogEnums, graylogEnums[level], graylogEnums[LOG_LEVEL]);
        if (graylogEnums[level] <= graylogEnums[LOG_LEVEL]) {
            grayLogger[level](message);
        }
    }
    else {
        winstonLogger[winstonEnums[level]](message);
    }
};

grayLogger.on('error', function (error) {
    console.error('Error while trying to write to graylog2:', error);
});

module.exports = logger;
