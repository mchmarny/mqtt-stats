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

  var keys = [];
  var timeSpans = [];
  var maxVal = 0;

  for (var key in results){
    keys.unshift(key);
  }

  for(i=0; i<keys.length; i++){
    var itemKey = keys[i];
    var itemVal = results[keys[i]];
    logger.debug("Original Key: %s Val: %s", itemKey, itemVal);
    if (i < 120){
      //add
      data.item.push(itemVal);
      timeSpans.push(itemKey);
      if (itemVal > maxVal) maxVal = itemVal;
    }else{
      //delete
      logger.debug("Deleting: %s", itemKey);
      redis.client.hdel(redis.keyPrefix, itemKey);
    }
  }


  data.settings.axisx.push(timeSpans[timeSpans.length-1]);
  data.settings.axisx.push(timeSpans[0]);
  data.settings.axisy.push(maxVal);

  console.dir(data);


  var msg = { "api_key": config.gecko.key, "data": data };
  var msgStr = JSON.stringify(msg);
  
  gecko.send(msgStr, function(){
    setTimeout(function(){ process.exit(1); }, 1200);
  });

});
