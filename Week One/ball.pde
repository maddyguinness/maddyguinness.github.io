class Ball {
  float x;   
  float y;   
  float dx;
  float dy;  


  Ball() {
    x = width/2;
    y = height/2;
   dx = random(-15,15);    
    dy = random(-5, 5);
  }

  
  void display() {
    noStroke();
    float r = random(0, 255);
    float g = random(0, 255);
    float b = random(0, 255);
    fill(r, g, b);
    rectMode(CENTER);
    rect(x, y, random(0, 80), random(0, 80));
  }

 
  void update() {

    x += dx;

    if (x < 0 || x > width) {

      if (x < 0) {
        //background(0);
        p2Score++;
      }

      if (x > width) {
         background(255);
        p1Score++;
      }

      x = width/2;
      y = height/2;
      dx = random(-15,15);    
      dy = random(-20, 20);
    } 

    if (y < 0 || y > height) {
      dy *= -1;
      y += dy;
    } else { 
      y += dy;
    }

  
  }

  void checkCollisionWithPaddle(Paddle p) {
    if (x > p.x && x < p.x + p.w) {
      if (y > p.y && y < p.y + p.h) {
        dx = -dx;
        dy = random(-10, 10);
      }
    }
  }
}