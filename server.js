var express = require("express")
var io = require('socket.io')
var path = require("path")
var http = require('http')
var app = express()
var server, ioApp
//var vector = {"x" : 1, "y" : 1.3}
var ballPoint = {"cx" : 100, "cy" : 100, "vx" : 10, "vy" : 11}

function startGame(socket) {
  console.log("the game has begun")
  gameLoop(socket)
}

function gameLoop(socket) {

  //socket.broadcast.emit('move', ballPoint)
  console.log(ballPoint)

  ballPoint.cx += ballPoint.vx;
  ballPoint.cy += ballPoint.vy;

  if (ballPoint.cx >= 300 || ballPoint.cx < 0) {
    ballPoint.vx *= -1
    //emit
    socket.broadcast.emit('move', ballPoint)
    console.log('bounce')
  }

  if (ballPoint.cx >= 300 || ballPoint.cy < 0) {
    ballPoint.vy *= -1 + (Math.random()-0.5)
    //emit
    socket.broadcast.emit('move', ballPoint)
    console.log('bounce')
  }

  setTimeout(function() {
    gameLoop(socket);
  }, 200)
}


/*function gameLoop(socket) {
  vector.x = (Math.random()-0.5)*100;
  vector.y = (Math.random()-0.5)*100;
  socket.broadcast.emit('move', vector)
  setTimeout(function() {
    gameLoop(socket);
  }, 5000)
}*/

// Config
app.configure(function() {
  app.use(express.bodyParser())
  app.use(express.methodOverride())
  app.use(app.router)
  app.use(express.static(path.join(__dirname, "public")))
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }))
})

server = http.createServer(app)
ioApp = io.listen(server)



ioApp
  .of('/ping')
  .on('connection', startGame)





    /*items.forEach(function(message) {
      socket.emit('item added', message.user, message.text, message.checked, message.id);
    });


    socket.on('add item', function(data) {
      saveMessage(data);
      socket.broadcast.emit('item added', data.user, data.text, data.checked, data.id);
      socket.emit('item added', data.user, data.text, data.checked, data.id);
    });

    socket.on('check item', function(data) {
      Object.keys(items).forEach(function(key) {
        if (items[key].id === data.id) { // and user
          items[key].checked = data.checked;
        }
      });
    });*/

  //});

// routes
/*app.get('/articles', function(req, res) {
  return ArticleModel.find(function(err, articles) {
    if(!err) {
      return res.send(articles);
    } else {
      return console.log(err);
    }
  });
});*/

// Launch server
server.listen(8086)
console.log("wiki started")