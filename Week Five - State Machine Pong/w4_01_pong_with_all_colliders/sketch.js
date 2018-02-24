// code 2
// section a
// bfa dt
// spring 2018
// bryan ma

// week 4
// pong with all colliders

var ball;
var p1, p2;
var p1Score = 0;
var p2Score = 0;
var p1Up = false;
var p1Down = false;
var p2Up = false;
var p2Down = false;
var margin = 20;
var cnv;
//var paddleBounceSFX, hitColliderSFX;
var colliders = [];
var r = 0;
var g=0;
var b = 0;
var Rcollider;
var Gcollider;
var Bcollider;
var Allysa;
var ellie;
var spaceDown = false;

// var levelTimer;
// var timeForLevel = 5000;



var sceneState = {
  START: 0,
  LV1: 1,
  LV2: 2,
  LV3: 3,
  P1WINS: 4,
  P2WINS: 5
}

var currentState = sceneState.START;

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function windowResized() {
  centerCanvas();
}

function setup() {
  //paddleBounceSFX = loadSound('assets/ballCollide.mp3', function() { console.log("loaded"); });
  //hitColliderSFX = loadSound('assets/hitCollider.mp3', function() { console.log("loaded"); });
  cnv = createCanvas(900, 500);
  centerCanvas();
  ball = new Ball();
  p1 = new Paddle(0);
  p2 = new Paddle(1);

  Rcollider = new MaddyRed();
  Gcollider = new MaddyGreen();
  Bcollider = new MaddyBlue();
  Allysa = new AlyssaForrest();
  ellie = new Ellie();
}
  

function draw() {
  drawScene(currentState);
  checkTransition(currentState);

}

function drawScene(whichScene){
 
switch(currentState){
  case sceneState.START:
    background(mouseX,mouseY,mouseX);
    textSize(50);
    textAlign(CENTER,CENTER);
    text("Welcome to Pong!",width/2,height/2- 50);
    textSize(30);
    text("Press Space to Begin",width/2,height/2+50);
  break;

  case sceneState.LV1:
    background(r,g,b);
    drawField();

    textAlign(CENTER,0);
    textSize(13);
    text("LEVEL   ONE",width/2-5,30);

    p1.move(p1Up, p1Down);
    p2.move(p2Up, p2Down);

    Rcollider.update();
    Rcollider.display();

    Gcollider.update();
    Gcollider.display();

    Bcollider.update();
    Bcollider.display();
    ball.update();
    
    p1.update();
    p2.update();
    p1.display();
    p2.display();

    ball.display(); 

    checkCollisionWithBall(ball, p1);
    checkCollisionWithBall(ball, p2);

    checkCollisionWithBall(ball, Rcollider);
    checkCollisionWithBall(ball, Gcollider);
    checkCollisionWithBall(ball, Bcollider);

  break;
  case sceneState.LV2:
    levelTimer = millis();

    background(0,0,50);
    drawField();

    textAlign(CENTER,0);
    textSize(13);
    text("LEVEL   TWO",width/2-5,30);
    //print(levelTimer);

    p1.move(p1Up, p1Down);
    p2.move(p2Up, p2Down);

    ball.update();
    p1.update();
    p2.update();
 
    p1.display();
    p2.display();

    ball.display(); 

    checkCollisionWithBall(ball, p1);
    checkCollisionWithBall(ball, p2);

    checkCollisionWithBall(ball, Allysa);

    Allysa.update();
    Allysa.display();

  break;
  case sceneState.LV3:
    background(0,50,0);
    drawField();

    textAlign(CENTER,0);
    textSize(13);
    text("LEVEL     THREE",width/2-5,30);


    p1.move(p1Up, p1Down);
    p2.move(p2Up, p2Down);

    ball.update();
    p1.update();
    p2.update();
   
    p1.display();
    p2.display();

    ball.display(); 

    ellie.update();
    ellie.display();

    checkCollisionWithBall(ball, p1);
    checkCollisionWithBall(ball, p2);
    checkCollisionWithBall(ball, ellie);


  break;
  // case sceneState.END:
  //   textAlign(CENTER,CENTER);
  //   fill(255);
  //   textSize(60);
  //   text("The End",width/2, height/2);
  // break
  case sceneState.P1WINS:
    textAlign(CENTER,CENTER);
    fill(255);
    textSize(60);
    text("Player One Wins!",width/2, height/2-20);
    textSize(30);
    text("Press Space to Restart",width/2,height/2+50);

  break;
  
  case sceneState.P2WINS:
    textAlign(CENTER,CENTER);
    fill(255);
    textSize(60);
    text("Player Two Wins!",width/2, height/2-20);
    textSize(30);
    text("Press Space to Restart",width/2,height/2+50);
  default:
  break;
 }
}

function checkTransition(whichScene){
switch(whichScene){
  case sceneState.START:
  if (currentState == sceneState.START){
    if(spaceDown){
      currentState = sceneState.LV1;
      spaceDown = false;
    }
  }
  break;
  case sceneState.LV1:
    if (p1Score == 3){
      currentState = sceneState.LV2;
      // p1Score = 0;
      // p2Score = 0;
    }
    if (p2Score == 3){
      currentState = sceneState.LV2;
      // p1Score = 0;
      // p2Score = 0;
    }
  break;
  case sceneState.LV2:
      // 
      if (p1Score == 6){
      currentState = sceneState.LV3;
      // p1Score = 0;
      // p2Score = 0;
    }
    if (p2Score == 6){
      currentState = sceneState.LV3;
      // p1Score = 0;
      // p2Score = 0;
    }

  break;
  case sceneState.LV3:
    if (p1Score == 10){
      currentState = sceneState.P1WINS;
      // p1Score = 0;
      // p2Score = 0;
    }
    if (p2Score == 10){
      currentState = sceneState.P2WINS;
      // p1Score = 0;
      // p2Score = 0;
    }
  break;
  
  case sceneState.P1WINS:
  if (currentState == sceneState.P1WINS){
    if(spaceDown){
      currentState = sceneState.START;
      spaceDown = false;
      p1Score = 0;
      p2Score = 0;
    }
  }
  break;
  case sceneState.P2WINS:
  if (currentState == sceneState.P2WINS){
    if(spaceDown){
      spaceDown = false;
      currentState = sceneState.START;
      p1Score = 0;
      p2Score = 0;
    }
  }
  default:
  break;
}
}

function drawField() {
  stroke(255);
  noFill();
  line(0, margin, width, margin);
  line(0, height - margin, width, height - margin);
    for (var i = margin; i < height - margin - 15; i += 35) {
      var start = i;
      var finish = start + 15;
      line(width/2, start, width/2, finish);
    }

  fill(255);
  noStroke();
  textSize(64);
  textAlign(CENTER, CENTER);
  text(p1Score, width/2-50, 70);
  text(p2Score, width/2+50, 70);
}

function checkCollisionWithBall(ball, other) {
  if (ball.pos.x + ball.width/2 > other.pos.x && 
      ball.pos.x + ball.width/2 < other.pos.x + other.width && 
      ball.pos.y + ball.height/2 > other.pos.y &&
      ball.pos.y + ball.height/2 < other.pos.y + other.height) {
    ball.collided(other);
    other.collided(ball);
  }
}

function Ball() {
  this.pos = createVector(width/2, height/2);
  this.vel = createVector(0, 0);
  this.angle = random(TWO_PI);
  this.speed = 7;
  this.vel.x = cos(this.angle) * this.speed;
  this.vel.y = sin(this.angle) * this.speed;
  this.width = 15;
  this.height = 15;

  this.update = function() {
    if (this.pos.x < -this.width) {
      p2Score++;
      this.resetAfterPoint(0);
    } else if (this.pos.x > width) {
      p1Score++;
      this.resetAfterPoint(1);
    }

    if (this.pos.y < margin || 
        this.pos.y > height - margin - this.height) {
      this.vel.y *= -1;
    }

    this.pos.add(this.vel);
  };

  this.display = function() {
    noStroke();
    fill(255);
    rectMode(CORNER);
    rect(this.pos.x, this.pos.y, this.width, this.height);
  }

  this.resetAfterPoint = function(whichPlayer) {
    this.pos = createVector(width/2, height/2);
    this.vel = createVector(0, 0);
    this.speed = 7;
    if (whichPlayer === 1) {
      this.getStartingAngle(4 * PI/6, 8 * PI/6);
    } else if (whichPlayer === 0) {
      this.getStartingAngle(-PI/3, PI/3);
    }
  }

  this.getStartingAngle = function(angleLow, angleHigh) {  
    var angle = random(angleLow, angleHigh);
    this.vel.x = cos(angle) * this.speed;
    this.vel.y = sin(angle) * this.speed;
  }

  this.collided = function(other) {
    
  }
};

function Paddle(num) {
  this.num = num;
  this.width = 15;
  this.height = 80;
  if (num == 0) {
    this.pos = createVector(margin, height/2);
  } else {
    this.pos = createVector(width-this.width-margin, height/2);
  }
  this.vel = createVector(0, 0);

  this.update = function() {
    this.pos.add(this.vel);
  }

  this.display = function() {
    noStroke();
    fill(255);
    rectMode(CORNER);
    rect(this.pos.x, this.pos.y, this.width, this.height);
  }

  this.move = function(up, down) {
    this.vel.y = 0;
    if (up) {
      if (this.pos.y > margin) {
        this.vel.y = -5;
      } else {
        this.pos.y = margin;
      } 
    }
    if (down) {
      if (this.pos.y + this.height < height - margin) {
        this.vel.y = 5;
      } else {
        this.pos.y = height - this.height - margin;
      }
    } 
  }

  this.collided = function(other) {
    var diff = (other.pos.y + other.height/2) - this.pos.y;
    if (this.num === 0) {
      angle = map(diff, 0, this.height, -PI/3, PI/3);
    }
    if (this.num === 1) {
      angle = map(diff, this.height, 0, 4*PI/6, 8*PI/6);
    }
    other.speed += 1;
    other.vel.x = cos(angle) * other.speed;
    other.vel.y = sin(angle) * other.speed;
    //paddleBounceSFX.play();
  }
}



 function keyPressed() {
  if (key === ' ') {
    spaceDown = true;
  }

  if (key === 'W') {
    p1Up = true;
  }
  if (key === 'S') {
    p1Down = true;
  }

  if (keyCode === UP_ARROW) {
    p2Up = true;
  }
  if (keyCode === DOWN_ARROW) {
    p2Down = true;
  }
}

function keyReleased() {
  if (key === 'W') {
    p1Up = false;
  }
  if (key === 'S') {
    p1Down = false;
  }

  if (keyCode === UP_ARROW) {
    p2Up = false;
  }
  if (keyCode === DOWN_ARROW) {
    p2Down = false;
  }
}


function MaddyRed() {
  this.pos = createVector(random(200,600),random(100,400));

  this.speed = 3;
  this.angle = -100;
  this.vel = createVector(0, sin(this.angle) * this.speed);
  this.width = 50;
  this.height = 50;

  this.update = function() {
    //this.pos.add(this.vel);

    if(this.pos.y < margin || 
        this.pos.y > height - margin - this.height){
    this.angle=100;
  print("hit");

    }
  }

  this.display = function() {
    fill(255,0,0);
    ellipse(this.pos.x, this.pos.y, this.width, this.height);
  }

  this.collided = function(other) {
    
    other.angle = random(TWO_PI);
    other.vel.x = cos(other.angle) * other.speed;
    other.vel.y = sin(other.angle) * other.speed;
    r = 255;
    g=0;
    b=0; 
  }
}

function MaddyGreen() {
  this.pos = createVector(random(200,600),random(100,400));

  this.speed = 3;
  this.angle = -100;
  this.vel = createVector(0, sin(this.angle) * this.speed);
  this.width = 50;
  this.height = 50;

  this.update = function() {

    if(this.pos.y < margin || 
        this.pos.y > height - margin - this.height){
    this.angle=100;
  print("hit");

    }
  }

  this.display = function() {
    fill(0,255,0);
    ellipse(this.pos.x, this.pos.y, this.width, this.height);
  }

  this.collided = function(other) {
    
    other.angle = random(TWO_PI);
    other.vel.x = cos(other.angle) * other.speed;
    other.vel.y = sin(other.angle) * other.speed;
    g = 255;
    r =0;
    b=0;
    
  }
}

function MaddyBlue() {
  this.pos = createVector(random(200,600),random(100,400));

  this.speed = 3;
  this.angle = -100;
  this.vel = createVector(0, sin(this.angle) * this.speed);
  this.width = 50;
  this.height = 50;

  this.update = function() {
 
  }

  this.display = function() {
    fill(0,0,255);
    ellipse(this.pos.x, this.pos.y, this.width, this.height);
  }

  this.collided = function(other) {
    
    other.angle = random(TWO_PI);
    other.vel.x = cos(other.angle) * other.speed;
    other.vel.y = sin(other.angle) * other.speed;
    g = 0;
    r =0;
    b=255;
    
  }
}

function AlyssaForrest() {
  this.pos = createVector(width/2, height/2);
  this.speed = 0;
  this.angle = 0;
  this.vel = createVector(cos(this.angle) * this.speed, sin(this.angle) * this.speed);
  this.height = 0;
  this.width = 0;

  this.update = function() {
    this.pos.add(this.vel);
    if (this.height < height-40){
    this.height = this.height + 0.5;
    this.width = this.width + 0.5;
    } else {
    this.height = this.height;
    this.width = this.width;
    }
  }

  this.display = function() {
    fill(255,0,0);
    ellipse(this.pos.x, this.pos.y, this.width, this.height);
  }

  this.collided = function(other) {
    other.vel.x *= -1;
    this.width = this.width - 5;
    this.height = this.height - 5;
  }
}

function Ellie() {
this.speed = 2;
  this.angle = PI;
  this.vel = createVector(0, sin(this.angle) * this.speed);
  this.width = 50;
  this.height = 50;
  this.pos = createVector(random(margin, width - margin), random(margin, height - margin));
  this.counter = 0;
  this.amplitude = 10;
  this. r = 0;

  this.update = function() {
    this.angle = this.angle + 1;
    this.pos.add(this.vel);
    this.counter ++;
          //check borders
          if(this.pos.x > (width - (margin + this.width))) {
            this.vel.x = -2;
          }
          if(this.pos.x < margin) {
            this.vel.x = 2;
          }

          if(this.pos.y > (height - (margin + this.height))) {
            this.vel.y = -2;
          }
          if(this.pos.y < margin) {
            this.vel.y = 2;
          }

          if (this.counter % 40 == 0) {
      //set x vel
      this.r = random(1);
      if (this.r > .5) {
        this.vel.x = 2;
      } else {
        this.vel.x = -2;
      }
      //set y vel
      this.r = random(1);
      if (this.r > .5) {
        this.vel.y = 2;
      } else {
        this.vel.y = -2;
      }
    }
  }

  this.display = function() {

    fill(map(this.pos.y, 0, height, 0, 255), 150, map(this.pos.x, 0, width, 0, 255), 200);
   rect(this.pos.x, this.pos.y, this.width, this.height);



 }

 this.collided = function(other) {
  if (other.speed > 1) {
    other.speed -= 0.5;
  }
  other.angle = random(TWO_PI);
  other.vel.x = cos(other.angle) * other.speed;
  other.vel.y = sin(other.angle) * other.speed;
     //teleport
     other.pos.y = random(height);
     if(other.pos.x > width/2) {
      other.pos.x = random(width/2);
    } else{
     other.pos.x = random(width/2, width);
   }

}
}