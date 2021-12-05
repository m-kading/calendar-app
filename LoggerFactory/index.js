'use strict';

const winston = require('winston');

class LoggerFactory {
  constructor(logLevel){
    this.logLevel = logLevel || 'info';
  }

  createLogger(label){
    return winston.createLogger({
      format: winston.format.combine(
        winston.format.label({label: label}),
        winston.format.timestamp(),
        this.createFormat()
      ),
      transports: [new winston.transports.Console({
        level: this.logLevel,
        format: winston.format.json()
      })]
    })
  }

  createFormat(){
    return winston.format.printf(({ level, message, label, timestamp }) => {
      return {
        message: message,
        level: level,
        label: label,
        timestamp: timestamp
      }
    })
  }
}

module.exports = LoggerFactory;
