
var blockSize = 150;
var boardSize;

var timer = 20;

var player;

var sceneData;
var currentScene = 0;
var scenes = [];

var crate;

var wallX = 0;
var wallY = 0;

var timerOb;

var playerState = {
	ALIVE: 0,
	DEAD: 1
};


var currentState = playerState.ALIVE;

function preload() {

	boardSize = createVector(5, 5);

	sceneData = loadJSON('Data.json');
	crate = loadImage('crate.png');
	tile = loadImage('Kitchen Tiles.png');

}

function setup() {

	createCanvas(750, 750);

	CreateScenesFromData(sceneData.scenes);

	timerOb = new Timer();
}

function draw() {
	background(0);

	switch (currentState) {

		case playerState.ALIVE:
			scenes[currentScene].display();
			break;

		case playerState.DEAD:
			background(255, 0, 0);
			fill(255);
			text("Game Over", width / 2 - 70, height / 2);
			text("Press X to Restart", width / 2 - 70, height / 2 + 50)

			if (key == 'X') {
				currentScene = 0;
				currentState = playerState.ALIVE;
				timer = 20;
				for(var i = 0; i < sceneData.scenes.length; i++) {
					scenes[i].reset(sceneData.scenes[i]);
				}
			}
		default:
			break;
	}
}

function CreateScenesFromData(data) {

	for (var i = 0; i < data.length; i++) {
		scenes.push(new Scene(data[i]))

	}
}

function DrawGrid(type, position) {

	this.blockSize = blockSize;
	this.type = type;
	this.gridPos = position;

	this.display = function () {
		this.pos = createVector(this.gridPos.x * blockSize, this.gridPos.y * blockSize);
		//fill(50);
		stroke(100);
		noFill();
		rect(this.pos.x, this.pos.y, this.blockSize, this.blockSize);
	}
}

function DrawPlayer(type, state, position) {

	this.gridPos = position;
	this.blockSize = blockSize;
	this.type = type;

	this.display = function () {
		this.pos = createVector(this.gridPos.x * this.blockSize, this.gridPos.y * this.blockSize);

		fill(255, 0, 0);
		rect(this.pos.x, this.pos.y, this.blockSize, this.blockSize);
	}
}

function Timer() {

	this.display = function () {
		fill(255);
		text(timer, 30, 30);

		if (frameCount % 60 == 0 && timer > 0) {
			timer--;
		}
		if (timer == 0) {
			currentState = playerState.DEAD;
		}
	}
}

function Scene(data) {

	this.gridBlocks = [];
	this.levelText = data.levelText;

	this.reset = function(data) {
		if(data.layout) {

			// Go through all rows and columns from the data
			var rows = data.layout;
			for (var i = 0; i < rows.length; i++) {
				// For each row we create a new array of columns for our grid blocks
				this.gridBlocks[i] = [];
				var cols = rows[i];
	
	
				for (var j = 0; j < cols.length; j++) {
					// Depending on the type of object we add it to the grid
					// The position of objects will be relative to the grid and not the the canvas
					// Inside each object its canvas position will be calculated based on the object's
					// position on the grid and the size of each block in pixels
					var tileMap = cols[j];
					var gameObj;
					var position = createVector(j, i);
					if(tileMap == 0) {
						gameObj = new DrawGrid(tileMap, position);
					}
					else if(tileMap == 1) {
						gameObj = new Wall(tileMap, position);
					}
					else if(tileMap == 2) {
						player = new DrawPlayer(tileMap, currentState, position);
						gameObj = player;
					}
					else if(tileMap == 3) {
						gameObj = new Box(tileMap, position);
					}
	
					this.gridBlocks[i].push(gameObj);
				}
			}
		}
	}


	this.display = function () {
		textSize(30);
		fill(0);
		text(this.levelText, 500, 500);


		if (currentScene == 0) {
			textAlign(CENTER);

			fill(255);
			textSize(30);
			text("Sokoban!", width / 2, height / 2);
			textSize(20);
			text("Press S to Start", width / 2, height / 2 + 50);
			text("Use WASD to move", width / 2, height / 2 + 100);


			textSize(40);
		}

		if (currentScene == 1) {
			fill(255);

			for (var i = 0; i < this.gridBlocks.length; i++) {
				for (var j = 0; j < this.gridBlocks.length; j++) {
					this.gridBlocks[i][j].display();
				}
			}

			timerOb.display();
		}

		if (currentScene == 2) {

			for (var i = 0; i < this.gridBlocks.length; i++) {
				for (var j = 0; j < this.gridBlocks.length; j++) {
					this.gridBlocks[i][j].display();
				}
			}

			timerOb.display();
		}

	}

	this.reset(data);
}

function Wall(type, position) {
	this.gridPos = position;
	this.blockSize = blockSize;
	this.imageIncrease = 0;
	this.type = type;

	this.display = function () {
		this.pos = createVector(this.gridPos.x * this.blockSize, this.gridPos.y * this.blockSize);

		image(tile, this.pos.x - this.imageIncrease / 2, this.pos.y - this.imageIncrease / 2, this.blockSize + this.imageIncrease, this.blockSize + this.imageIncrease);
	}
}

function Box(type, position) {
	this.gridPos = position;
	this.blockSize = blockSize;
	this.imageIncrease = 40;
	this.type = type;

	this.display = function () {
		this.pos = createVector(this.gridPos.x * this.blockSize, this.gridPos.y * this.blockSize);

		image(crate, this.pos.x - this.imageIncrease / 2, this.pos.y - this.imageIncrease / 2, this.blockSize + this.imageIncrease, this.blockSize + this.imageIncrease);
	}
}

function keyPressed() {

	if(currentScene == 0 && key == 'S') {
		currentScene = 1;
		return;
	}

	// Check if player can move based on pressed key

	// Calculate what would be the next position
	var x = nx = nnx = player.gridPos.x;
	var y = ny = nny = player.gridPos.y;
	if(key === 'W') {
		ny--;
		nny = ny - 1;
	}
	else if(key === 'S') {
		ny++;
		nny = ny + 1;
	}
	else if(key === 'A') {
		nx--;
		nnx = nx - 1;
	}
	else if(key === 'D') {
		nx++;
		nnx = nx + 1;
	}
	else {
		return;
	}

	if(!scenes || !scenes[currentScene])
		return;

	// Check if we can move to that position
	var blocks = scenes[currentScene].gridBlocks;
	// If that position contains a wall block then we can't go there
	if(!blocks || !blocks[ny][nx] || blocks[ny][nx].type == 1) {
		return;
	}

	// If the next position is a occupied by a block we need to check if that block can move so
	if(blocks[ny][nx].type == 3 &&
		(nny < 0 || nnx < 0 || nny >= boardSize.y || nnx >= boardSize.x || // we start by checking if the next next position is within the bounds of the scene
		blocks[nny][nnx].type != 0)) { // and if the next next position is free
		
		return;
	}

	
	// If we're moving a block we need to update it
	if(blocks[ny][nx].type == 3) {
		// Update the block's position on the grid
		blocks[ny][nx].gridPos = createVector(nnx, nny);
		// Update the block's new position
		blocks[nny][nnx] = blocks[ny][nx];
	}
	
	// Update the player's new position
	blocks[ny][nx] = blocks[y][x];
	// Update the player's old position
	blocks[y][x] = new DrawGrid(0, createVector(x, y) );

	// Update the player's position on the grid
	player.gridPos.x = nx;
	player.gridPos.y = ny;
}