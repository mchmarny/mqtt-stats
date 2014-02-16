var winston = require('winston');

exports.init = function(conf) {
  return new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({ 
            level: conf.log.level || 'debug',
            "colorize": conf.log.colorize || true,
            "timestamp": conf.log.timestamp || true
      })
    ],
    exitOnError: false
  });
};  
