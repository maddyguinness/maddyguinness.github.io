int p1Score;
int p2Score;

int ballSize;

PFont f;

boolean p1Up = false;
boolean p1Down = false;
boolean p2Up = false;
boolean p2Down = false;

float r = 20;
float g = 10;
float c = 10;

/// \n = new line in console 

Ball b;
Ball b2;
Ball b3;
Ball b4;
Paddle p1;
Paddle p2;

void setup() {
  size(1000, 700);

  b = new Ball();
  b2 = new Ball();
  b3 = new Ball();
  b4 = new Ball();
  p1 = new Paddle(0);
  p2 = new Paddle(1);
}

void draw() {
  c+=1;
  g+=1;
  r+=2;

  if (r<0 ||g<0 ||c<0) {
    c+=1;
    g+=1;
    r+=2;
  }
  


  background(r, g, c);
  // middle line
  for (int dot=1; dot<30; dot++) {
    int dotx=width/2;
    int doty=30*dot-10;
    rect(dotx, doty, 10, 10);
  }

  b.checkCollisionWithPaddle(p1);
  b.checkCollisionWithPaddle(p2);


  b.update();
  b.display();

  p1.display();
  p1.update();

  p2.display();
  p2.update();


  b3.display();
  b3.update();
  b2.display();
  b2.update();



  f = createFont("Minecraft", 17, true);

  textFont(f);
  textSize(60);
  float l = random(0, 255);
  float p = random(0, 255);
  float q = random(0, 255);
  fill(l,p,q);
  textAlign(CENTER, CENTER);

  text(p1Score, width/2 - 100, 50);
  text(p2Score, width/2 + 100, 50);
}




void keyPressed() {
  if (key == CODED) {
    if (keyCode == UP) {
      p2Up = true;
      p1Up = true;
    }
    if (keyCode == DOWN) {
      p2Down = true;
      p1Down = true;
    }
  } else {
    if (key == 'w') {
      p1Up = true;
      p2Up = true;
    }
    if (key == 's') {
       p2Down = true;
      p1Down = true;
    }
  }
}

void keyReleased() {
  if (key == CODED) {
    if (keyCode == UP) {
      p2Up = false;
      p1Up = false;
    }
    if (keyCode == DOWN) {
      p2Down = false;
      p1Down = false;
    }
  } else {
    if (key == 'w') {
      p1Up = false;
      p2Up = false;
    }
    if (key == 's') {
      p1Down = false;
      p2Down = false;
    }
  }
}