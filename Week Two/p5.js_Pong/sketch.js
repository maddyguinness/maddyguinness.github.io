var ball1;
var ball2;
var ball3;
var paddle;
var paddle2;

var p1Score = 0;
var p2Score = 0;

var x = 40;
var y ;

var p1Up = false;
var p2Up = false;
var p1Down = false;
var p2Down = false;

var r = 20;
var g = 20;
var c = 10;

var Ball;

function setup() {

createCanvas(1000,700);
y = width/2; 
paddle = new Paddle(1);
paddle2 = new Paddle(0);
ball1 = new Ball();
ball2 = new Ball();
ball3 = new Ball();
}

function draw() {
var p = 255;
p -= 5;
background(p,200,200);

var l = random(0, 255);
var p = random(0, 255);
var q = random(0, 255);

ball1.display();
ball1.update();
ball1.checkColl();

ball2.display();
ball2.update();
ball2.checkColl();

ball3.display();
ball3.update();
ball3.checkColl();

paddle.display(1);
// console.log(paddle.x) ;
paddle.update();

paddle2.display(0);
// console.log(paddle2.x) ;
paddle2.update();
 

for (var dot=1; dot<30; dot++) {
    var dotx=width/2;
    var doty=30*dot-10;
    fill(l,p,q);
    rect(dotx, doty, 10, 10);
}

textSize(60);

  fill(l,p,q);
  text(p1Score,width/2 - 95,50);
  text(p2Score,width/2 +80,50);
}

	


function Ball(){
 this.x = width/2;
 this.y = height/2;
 this.dx = random(-15,15);    
 this.dy = random(-5, 5);

this.display = function(){

	noStroke();
    var r = random(0, 255);
    var g = random(0, 255);
    var b = random(0, 255);
    fill(r, g, b);
    rectMode(CENTER);
    rect(this.x, this.y, random(0, 80), random(0, 80));
}

this.update = function(){

this.x += this.dx;

if (this.x < 0 || this.x > width) {

      if (this.x < 0) {
        p2Score++;
      }

      if (this.x > width) {
        background(255);
        p1Score++;
      }

      this.x = width/2;
      this.y = height/2;
      this.dx = random(-15,15);    
      this.dy = random(-20, 20);
    } 

    if (this.y < 0 || this.y > height) {
      this.dy *= -1;
      this.y += this.dy;
    } else { 
      this.y += this.dy;
    }  
  }


   this.checkColl = function(){
if (this.x > paddle.x && this.x < paddle.x + paddle.w) {
      if (this.y > paddle.y && this.y < paddle.y + paddle.h) {
        this.dx = this.dx * -1;
        this.dy = random(-10, 10);
        console.log("this ran") ;
      }
    }
if (this.x > paddle2.x && this.x < paddle2.x + paddle2.w) {
      if (this.y > paddle2.y && this.y < paddle2.y + paddle2.h) {
        this.dx = this.dx * -1;
        this.dy = random(-10, 10);
        console.log("this ran") ;
      }
    }

   }
}


function Paddle(whichPlayer){
  this.x;
  this.y;
  this.w;
  this.h;
  this.playerNum = whichPlayer;

  if (whichPlayer === 0) {
    this.x = 30;
    this.y = height/2;
    this.w = 20;
    this.h = 150;
  } else if (whichPlayer === 1) {
    this.y = height/2;
    this.w = 20;
    this.h = 150;
    this.x = width-30-this.w;
  }

  this.display = function(){

    rectMode(CENTER);
    var r = random(0, 255);
    var g = random(0, 255);
    var b = random(0, 255);
    fill(this.r, this.g, this.b);
    rect(this.x, this.y, 10, random(-10,200));
  }

  this.update = function(){
  	if (this.playerNum === 0) {
      if (p1Up) {
        this.y-=10;
      } 
      if (p1Down) {
        this.y+=10;
      }
    } 
    if (this.playerNum ===1) {
      if (p2Up) {
        this.y-=10;
      } 
      if (p2Down) {
        this.y+=10;
      }
    }
  }
}


function keyPressed(){
  if(key === 'W'){
    p1Up = true;
  }

  if(key === 'S'){
    p1Down = true; 
  }

  if(keyCode === UP_ARROW){
    p2Up = true;  
  }

  if(keyCode === DOWN_ARROW){
    p2Down = true;
  }
}


function keyReleased(){
  if(key === 'W'){
    p1Up = false;
  }

  if(key === 'S'){
    p1Down = false; 
  }

  if(keyCode === UP_ARROW){
      p2Up = false;  
  }

  if(keyCode === DOWN_ARROW){
    p2Down = false;
  }
}



	
