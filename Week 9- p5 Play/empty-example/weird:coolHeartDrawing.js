var backgroundImg;
var hearts;
var direction;
var heartSprite
var heartNumber;

function preload()
{
	//data = loadJSON('data.json');

}

function setup() 
{
  createCanvas(800,700);
  background(0);
  //backgroundImg = loadImage('brick wall.png');
  	
  	hearts = new Group();

  	for(var i=0; i<45; i++)
  	{
  		heartNumber = i+1;
  		direction = random(0,360);

	    var heartImg = loadImage('heart.png');
	  	heartSprite = createSprite(random(0,width),random(0,height));
	 	heartSprite.addImage('heart',heartImg);
	 	heartSprite.setSpeed(2,direction);
	 	heartSprite.scale =0.6
	 	heartSprite.setCollider("circle", 0,0,100)
	 	heartSprite.mouseActive = true;

		hearts.add(heartSprite);

		heartSprite.onMouseOver = function(){
	 	
	 		print("over");
	 		this.scale-= 0.15;
	 		if(this.scale<0){
	 			this.remove();
	 			heartNumber--;
	 		}
	 	}
	}
	 

	 

}

function draw() {
  //image(backgroundImg,0,0);

  for(var i=0; i< hearts.length; i++){
  	var s = hearts[i];
	  	if(s.position.x<0) {
	    s.position.x = 1;
	    s.velocity.x = abs(s.velocity.x);
	  }
	  
	  if(s.position.x>width) {
	    s.position.x = width-1;
	    s.velocity.x = -abs(s.velocity.x);
	    }
	  
	  if(s.position.y<0) {
	    s.position.y = 1;
	    s.velocity.y = abs(s.velocity.y);
	  }
	  
	  if(s.position.y>height) {
	    s.position.y = height-1;
	    s.velocity.y = -abs(s.velocity.y);
	    } 
  	}
   

	

	if(heartNumber == 0){
		print('no hearts');

	}

	drawSprites();
		
}