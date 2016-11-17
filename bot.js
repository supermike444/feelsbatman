var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]);
  var regex = /2d2/;
  
  
  

  if(request.name != "Math Lad") {
    postMessage("1d1");
  }

  //var doot = request.split("");
  var doot = request;
  
  if(request.text && regex.test(request.text)) {
    this.res.writeHead(200);
    postMessage(doot);
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage(input) {
  var botResponse, options, body, botReq;
/*
  var madlads = input.split(""); 
  var multiple = Number(madlads[0])*Number(madlads[2]);
  var i;
  var array = [];
  var jew = Number(madlads[0]);
  var lad = Number(madlads[2]);
  for(i = 0; i < jew; i++) {
  array.push(Math.floor(Math.random()*lad) + 1);
  }
  var sum = array.reduce(add, 0);
  function add(a,b) {
  return a + b;
  }
  */
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
