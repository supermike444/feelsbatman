var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

if(request.name != "Chad") {
function respond() {
  var request = JSON.parse(this.req.chunks[0]);
  var MarathonRegex = /Marathon/;
  var gasRegex = /gas/;
  var randomnum = Math.floor((Math.random() * 100) + 1);
  
  if(request.text && MarathonRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage("I work for Marathon");
    this.res.end();
  }
  else if(request.text && gasRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage("Did someone say gas? Because I work for Marathon");
    this.res.end();
  }
  else if(request.text && randomnum > 99) {
    this.res.writeHead(200);
    postMessage("We should talk about how I work at Marathon");
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}
}

function postMessage(input) {
  var botResponse, options, body, botReq;

  botResponse = input;


  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;
