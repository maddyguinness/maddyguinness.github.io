//data courtesy of dariusk

//broken 	
var data;
var input;

var currentPokemon;
var chosenPokemon;

var sceneState = {
	ONE: 0,
	TWO: 1,
	THREE: 2
};

var currentState = sceneState.ONE;

function setup(){

	createCanvas(500,700);

	

}

function draw(){
	drawScene(currentState);

}
	

function getPokemon(){

	data = loadJSON('data.json', newPokemon);
	text(data.pokemon[0].name);
}

function newPokemon(){
	currentPokemon = chosenPokemon;
}

function drawScene(whichScene){
	switch (currentState){
		case sceneState.ONE:
			background(0);
			var button = select('#search');
	
			input = select('#pokemonName');
			chosenPokemon = input.value();
			button.mousePressed(getPokemon);

		break;
		case sceneState.TWO:

		 	

		break;
		case sceneState.THREE:
			
		default:	
		break;
	}
}