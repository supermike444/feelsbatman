var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^\Feelsbatman$/;

  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage();
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage() {
  var botResponse, options, body, botReq;

  var randomnum = Math.floor((Math.random() * 20) + 1);
  if (randomnum > 16)
    {
        botResponse = "https://pbs.twimg.com/profile_images/500360904987656193/Hv23DCTk_400x400.jpeg";
    }
    else if (randomnum > 12)
    {
      botResponse = "https://media1.giphy.com/media/Sid4QgwDxJ8l2/200_s.gif"
    }
    else if (randomnum > 8)
    {
      botResponse = "https://media0.giphy.com/media/rR29jBsTB3lZe/200_s.gif"
    }
    else if (randomnum > 4)
    {
      botResponse = "https://media.giphy.com/media/m3SYKzhmod1IY/giphy.gif"
    }
    else if (randomnum > 1)
    {
      botResponse = "http://o.aolcdn.com/hss/storage/midas/a6378bd2a0d0f08566998f5c758a1c9b/200119323/Batman+cartoon.jpg"
    }
    else
    {
      botResponse = "https://lh3.googleusercontent.com/-wrtKyuFuGH8/VifauF9--7I/AAAAAAAAAF0/0yBwTZCpD60/w1000-h1000/Pepe_rare.png"
    }

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
