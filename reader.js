var config = require("./config"),
    logger = require("./lib/logger").init(config),
    redis = require("./lib/redis").init(config, logger),
    gecko = require("./lib/gecko").init(config, logger);


// data
var data = {
    "item": [],
    "settings": {
     "axisx": [],
     "axisy": [ 0 ],
     "colour": "ff9900"
    }
};

// loop
redis.client.hgetall(redis.keyPrefix, function(err, results) {

  if (err) {
    logger.error("Error getting counts: ", err);
    process.exit(1);
  } 

  var timeSpan = [];
  var maxVal = 0;
      
  for (var item in results){
    var itemVal = results[item];
    logger.debug("Item: %j", item);
    data.item.push(itemVal);
    timeSpan.push(item);
    if (itemVal > maxVal) maxVal = itemVal;
  }

  data.settings.axisx.push(timeSpan[0]);
  data.settings.axisx.push(timeSpan[timeSpan.length-1]);
  data.settings.axisy.push(maxVal);

  var msg = { "api_key": config.gecko.key, "data": data };
  var msgStr = JSON.stringify(msg);
  
  gecko.send(msgStr, function(){
    setTimeout(function(){ process.exit(1); }, 1200);
  });

});
