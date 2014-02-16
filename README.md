# mqtt-stats

Simple MQQT monitor with dynamically defined publishers


## Installation

Clone the repo:

    git clone git@github.com:mchmarny/mqtt-stats.git

## Collect

Once you have a copy locally, execute the collection start script:

    cd mqtt-stats
    ./start.sh

## Publish

Right now the publish part is an external process. Simplest way to schedule this is using cron

    crontab -e
    
Publish data every minute

    * * * * * /home/ubuntu/mqtt-stats/send.sh > /home/ubuntu/mqtt-stats/stats.log 2>&1
    
### Configuration

The stats app has four distinct way configuration sections: log, mqtt, redid, gecko

#### Log

	"level": "debug",
	"timestamp": true

#### MQTT

	"topic": "#",
	"secure": false,
	"host": "127.0.0.1",
	"port": 1883,
	"args": {
		"keepalive": 59000
	}

#### Redis

	"prefix": "topic",
	"resolution": "yyyy-mm-dd-HH-MM",
	"topic": "#",
	"host": "127.0.0.1",
	"port": 6379,
	"options": {}

#### Gecko

You can find more about the configuration of custom widgets [here](http://www.geckoboard.com/developers/custom-widgets/push).

	"key": "YOUR_GECKO_KEY",
	"widget": "YOUT_CUSTOM_WIDGET_ID"
