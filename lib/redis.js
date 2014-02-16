var redis = require("redis");
    
function RedisUtils(config, logger){

	var self = this;

	self.logger = logger;
	self.config = config;
	self.keyPrefix = config.redis.prefix;

	var host = config.redis.host || "127.0.0.1";
	var port = config.redis.port || 6379;
	var options = config.redis.options || {};
	var client = redis.createClient(port, host, options);

	client.on("error", function (err) {
  		logger.error("Redis Error ", err);
  		console.dir(err);
	});

	self.client = client;

};

exports.init = function(config, logger) {
  return new RedisUtils(config, logger);
};  
