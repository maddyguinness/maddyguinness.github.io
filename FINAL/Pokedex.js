//data courtesy of dariusk
var jName;
var speciesText ;
var weightText;
var heightText;

var backgroundImage;

var pokeImage = '';
var numberPressed;


var allpokemon = [];	
var pokeAnim;
var prof;

var doOnce = true;

var input;
var nameData;

var font;

var pokedex;

var currentScene = 0;

var currentPokemon;
var chosenPokemon = 'Bulbasaur';

var paintmarks = [];

var sceneState = {
	ONE: 0,
	TWO: 1,
	THREE: 2
};

var currentState = sceneState.ONE;

var button;

var colourSlider;

function setup(){
	background(0);	

	createCanvas(900,700);
	pokedex = loadImage('pokedexDrawing.png')
	pokeAnim = loadAnimation('Bulbasaur.png', 'Charmander.png', 
							'Gengar.png', 'Jigglypuff.png', 'Pidgey.png', 'Pikachu.png',
							'Squirtle.png', 'Togepi.png');
	prof = loadImage('ProfessorOak.png');

	loadJSON('data.json', gotData);
	font = loadFont('Pokemon Solid.ttf');
	
	backgroundImage = loadImage('background.jpeg');


	sel = createSelect();
	colourSlider = createSlider(0, 255, 100);
  	colourSlider.position(20, 70);

}

function searchPokemon(){
  	chosenPokemon = sel.value();
	loadJSON('data.json', gotData);

	
}

function gotData(data){
	currentPokemon = data;
	for(var i = 0; i < 500; i++){
		print('findingPokemon ');
		if (chosenPokemon === currentPokemon.pokemon[i].name) {
			
			var id = [i + 1];
			fill(0);
			print('found pokemon')
			textSize(40);
			speciesText = currentPokemon.pokemon[i].species;
			weightText = currentPokemon.pokemon[i].weight;
			heightText = currentPokemon.pokemon[i].height;
			jName =  currentPokemon.pokemon[i].name_jp_romaji;

			if([i]<=9){
			pokeImage = loadImage('POKEMON-2/000'+id+'.png');
			}
			if([i] >= 10 && [i] <= 99){
			pokeImage = loadImage('POKEMON-2/00'+id+'.png');
			}
			if([i] >=100){
			pokeImage = loadImage('POKEMON-2/0'+id+'.png');
			}
		
		}
	}
	for (var i = 0; i < paintmarks.length; i++) {
		paintmarks.splice(0, paintmarks.length);
	}
}


function draw(){
	textFont(font);
	drawScene(currentState);
	checkTransition(currentState);

	fill(255);
	textSize(20);
	text("Press: 1 for Start Screen, 2 for Pokedex and 3 for the Gallery", 100,670)
	
}

function keyTyped(){
	console.log(int(key))
	numberPressed = int(key);
}

function keyPressed(){
	
	if(keyCode === BACKSPACE){
			print('delete');	  	
		for (var i = 0; i < paintmarks.length; i++) {
				    paintmarks.splice(0, paintmarks.length);
				  }
			}
	}

function mouseDragged() {
	if(currentState == sceneState.THREE && mouseY >100){
  		paintmarks.push(new PaintMark(createVector(mouseX, mouseY),10 , 10));
	}
}

function PaintMark(position,size,size) {
  
  this.size = size;

  this.position = position;

  this.display = function() {
    noStroke();
    fill(colourSlider.value(), 255, 255, 255);
    ellipse(this.position.x, this.position.y, this.size, this.size);
  }

}


function drawScene(whichScene){
	switch (currentState){
		case sceneState.ONE:
			
			if(sel != null){
			sel.hide();
			colourSlider.hide();
			}

			push();
			var oak = createSprite(width- 250, height-300);
			oak.addImage(prof);
			
			background(0,100,0);
			pop();
			
			push();
			scale(0.3);
			animation(pokeAnim, width, height);
			pop();
			drawSprites();

			fill(255);
			textSize(37);
			text('Welcome to the online Pokedex!', 20,600);



		break;
		case sceneState.TWO:

			if(sel != null)
				{
				colourSlider.hide();
				}

			background(0,100,0);
			push();
			scale(0.6);
			image(pokedex, -180, -35);
			pop();

			fill(255);
			textSize(30);


			//text(chosenPokemon,585,290);

			fill(0);
			textSize(15);
			text("Species: " + speciesText,135,250);
			text("Japanese Name:" + jName,135,290);
			text("Height: " + heightText,135,330);
			text("Weight: " + weightText,135,370);

			sel.show();

			if(doOnce == true){
			textAlign(CENTER);
			sel.position(550,275);

			
			for(i = 0; i< 500; i++){
				sel.option(currentPokemon.pokemon[i].name);
			}
			
			sel.changed(searchPokemon);
			doOnce = false;
		}
		break;
		case sceneState.THREE:
				colorMode(HSB, 255);

				if(sel != null)
				{
				sel.hide();
				}

				image(backgroundImage,0,0,900,700);			
				image(pokeImage, 250, 150, 500,500);
			
				for (var i = 0; i < paintmarks.length; i++) {
				    paintmarks[i].display();
				  }
				textSize(15);
				fill(0);
				text('Decorate your pokemon by clicking and dragging the mouse. Press backspace to start over', 10 , 30);
				colourSlider.show();

				  
		default:	
		break;
	}
}
function checkTransition(whichScene) {
  switch (whichScene) {
    case sceneState.ONE:
      
      
      if (numberPressed === 2) {
      	
        currentState = sceneState.TWO;  
      }
      if (numberPressed === 3) {
      	
        currentState = sceneState.THREE;  
      }
     break;
    case sceneState.TWO:
      
      if (numberPressed === 1) {
      	
        currentState = sceneState.ONE;  
      }
      if (numberPressed === 3) {
      	
        currentState = sceneState.THREE;  
      }
      
      break;
    
    case sceneState.THREE:
      
      if (numberPressed === 1) {
      	
        currentState = sceneState.ONE;  
      }
      if (numberPressed === 2) {
      	
        currentState = sceneState.TWO;  
      }
      
    default:
    break;
  }
}



