var dataHeart;
var hearts;
var direction;
var heartSprite
var heartNumber;


function preload()
{
	data = loadJSON('data.json');

}

function setup() 
{
  	createCanvas(800,700);
  	background(200,0,50);

  	textSize(15);
  	text("Catch the hearts <3",width/2 - 80,650);

  	
  	hearts = new Group();

	  	for(var i=0; i< data[0].heartNum; i++)
	  	{
	  		heartNumber = i;
	  		direction = random(0,360);

		    var heartImg = loadImage('heart.png');
		  	heartSprite = createSprite(random(0,width),random(0,height));
		 	heartSprite.addImage('heart',heartImg);
		 	heartSprite.setSpeed(2,direction);
		 	heartSprite.scale =random(0.2,1.5);
		 	heartSprite.setCollider("circle", 0,0,100)
		 	heartSprite.mouseActive = true;

			hearts.add(heartSprite);

			heartSprite.onMouseOver = function(){
		 	
		 		print("over");
		 		
		 			this.remove();
		 			heartNumber--;
		 	    
		 	}
		}	
}

function burst(){
	background(255);

	for(var d =0; d< data[2].heartNum; d++){
		  	
					  	direction = random(0,360);

						var heartImg = loadImage('heart.png');
						var newHeart = createSprite(width/2, height/2);
						newHeart.addImage('heart',heartImg);
						newHeart.setSpeed(6,direction);
						newHeart.scale = 0.1;
						newHeart.setCollider("circle", 0,0,100)
						newHeart.mouseActive = true;

						newHeart.onMouseOver = function(){
					 			this.remove();
					 	    
					 	}

	}
}

function draw() {
	
	if(heartNumber < 0){

		print('noHearts');
		heartNumber = 0;
		background(0);
	  	
	  	for(var d =0; d< data[1].heartNum; d++){
		  	
		  	direction = random(0,360);

			var heartImg = loadImage('heart.png');
			var newHeart = createSprite(mouseX, mouseY);
			newHeart.addImage('heart',heartImg);
			newHeart.setSpeed(6,direction);
			newHeart.scale = 0.2;
			newHeart.setCollider("circle", 0,0,100)
			newHeart.mouseActive = true;

			newHeart.onMouseOver = function(){
		 			this.remove();
		 			burst();  
		 	}
		}
	}


  for(var i=0; i< allSprites.length; i++){
  		var s = allSprites[i];
	  	
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

  	fill(255);
	drawSprites();
	textSize(15);
  	text("Catch the hearts <3",width/2,650);
		
}