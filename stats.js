var dateFormat = require('dateformat'),
	  mqtt = require('mqtt'),
	  config = require("./config"),
    logger = require("./lib/logger").init(config),
    data = require("./lib/redis").init(config, logger);


var broker = null;

if (config.mqtt.secure){
  logger.info("Creating secure MQTT subscription...");
  broker = mqtt.createSecureClient(config.mqtt.port, 
  	                                config.mqtt.host, 
  	                                config.mqtt.args);
}else{
  logger.info("Creating basic MQTT subscription...");
  broker = mqtt.createClient(config.mqtt.port, 
  	                          config.mqtt.host, 
  	                          config.mqtt.args);                
}

broker.subscribe(config.mqtt.topic)
      .on('message', function(topic, message){
  var now = dateFormat(new Date(), config.redis.resolution);
  logger.debug(topic);
	data.client.hincrby(data.keyPrefix, now, 1);
}); 

process.on("uncaughtException", function(err) {
  logger.error("UncaughtException:", err.message);
  logger.error(err.stack);
  process.exit(1);
});






