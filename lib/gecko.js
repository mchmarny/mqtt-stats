var https = require('https');
    
function GeckoPostUtils(config, logger){

  var self = this;

  self.logger = logger;
  self.config = config;

};


GeckoPostUtils.prototype.send = function(data, cb){

  var self = this;

  var postheaders = {
      "Content-Type" : 'application/json',
      "Content-Length" : Buffer.byteLength(data, "utf8")
  };

  var optionspost = {
    host: "push.geckoboard.com",
    port: 443,
    path: "/v1/send/" + self.config.gecko.widget,
    method: "POST",
    rejectUnauthorized: false,
    headers : postheaders
  };

  var reqPost = https.request(optionspost, function(res) {
      self.logger.debug("statusCode: ", res.statusCode);   
      res.on('data', function(d) {
          self.logger.debug('POST:');
          process.stdout.write(d);
          self.logger.debug('POST');
      });
  });
   
  reqPost.write(data);
  reqPost.end();
  reqPost.on('error', function(e) {
      self.logger.error('ERROR: ', e);
  });

  cb();

}

exports.init = function(config, logger) {
  return new GeckoPostUtils(config, logger);
};  
