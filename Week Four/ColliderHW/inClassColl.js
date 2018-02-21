// code 2
// section a
// bfa dt
// spring 2018
// bryan ma

// week 3
// pong

var p1Score = 0;
var p2Score = 0;
var ball;
var p1, p2;
var p1Up = false;
var p1Down = false;
var p2Up = false;
var p2Down = false;
var margin = 20;
var cnv;
var Rcollider;
var Gcollider;
var Bcollider;


var r =0;
var g =0;
var b =0;


function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function setup() 
{ random(0,800),random(0,400)
  cnv = createCanvas(900, 500);
  centerCanvas();
  ball = new Ball();
  p1 = new Paddle(0);
  p2 = new Paddle(1);
  
  // for(var i = 0; i < 25; i++)
  // {
    Rcollider = new RedCollider();
    Gcollider = new GreenCollider();
    Bcollider = new BlueCollider();
  //}
}

function draw() {
  background(r,g,b);
  drawField();
  
  p1.move(p1Up, p1Down);
  p2.move(p2Up, p2Down);

  ball.update();
  p1.update();
  p2.update();

  //for(var i=0; i<collider.length; i++){
  Rcollider.update();
  Rcollider.display();

  Gcollider.update();
  Gcollider.display();

  Bcollider.update();
  Bcollider.display();
//}

  
  p1.display();
  p2.display();
  ball.display(); 



  checkCollisionWithBall(ball, p1);
  checkCollisionWithBall(ball, p2);
  checkCollisionWithBall(ball, Rcollider);
  checkCollisionWithBall(ball, Gcollider);
  checkCollisionWithBall(ball, Bcollider);


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

function windowResized() {
  centerCanvas();
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
  }

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
    // background(255,0,0);
  }
}



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
  }
}


// some students make something colliders...
// other students make other kinds of balls?  or some students make the balls' functions, some students make the colliders?
// both have access to each other. 
// do something visual!
// 
function RedCollider() {
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
    // if (this.height < 500) {
    //   this.width += 10;
    //   this.height += 10;      
    // } 
    
  }
}

function GreenCollider() {
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

function BlueCollider() {
  this.pos = createVector(random(200,600),random(100,400));

  this.speed = 3;
  this.angle = -100;
  this.vel = createVector(0, sin(this.angle) * this.speed);
  this.width = 50;
  this.height = 50;

  this.update = function() {
    //this.pos.add(this.vel);

  //   if(this.pos.y < margin || 
  //       this.pos.y > height - margin - this.height){
  //   this.angle=100;
  // print("hit");

  //   }
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

function keyPressed() {
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