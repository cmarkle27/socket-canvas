(function() {

  var paper = Raphael(10, 50, 500, 500);
  var circle = paper.circle(50, 40, 10);
  var socketMsg = io.connect("/ping");
  //var ballPoint = {"cx" : 100, "cy" : 100, "vx" : 10, "vy" : 17};

/*  function gameLoop() {
    ballPoint.cx += ballPoint.vx;
    ballPoint.cy += ballPoint.vy;

    circle.attr(ballPoint);

    setTimeout(function() {
      gameLoop();
    }, 100)
  }*/

  circle.attr({"cx" : 100, "cy" : 100});

  circle.attr("fill", "#f00");
  circle.attr("stroke", "#fff");

 // gameLoop();

  socketMsg.on("move", function(serverPoint) {
    //serverPoint.
    circle.animate(serverPoint, 100);
    console.log(serverPoint);
  });

})();