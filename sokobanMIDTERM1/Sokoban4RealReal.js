
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

var type;

var playerState = {
	ALIVE: 0,
	DEAD: 1,
	WIN: 2
};


var currentState = playerState.ALIVE;

function preload() {

	boardSize = createVector(5, 5);

	sceneData = loadJSON('Data.json');
	crate = loadImage('crate.png');
	tile = loadImage('Kitchen Tiles.png');

	type = loadFont('Paintbrush.ttf');

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

			if (key == 'X') {
				timer = 20;
				for(var i = 0; i < sceneData.scenes.length; i++) {
					scenes[i].reset(sceneData.scenes[i]);
				}
			}
			break;


		case playerState.DEAD:
			background(255, 0, 0);
			fill(255);
			textAlign(CENTER);
			textFont(type);
			textSize(50);
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
			break;

		case playerState.WIN:
			background(0, 255, 0);
			fill(255);
			textAlign(CENTER);
			textFont(type);
			textSize(50);

			text("You Win!", width / 2, height / 2);
			text("Press X to Restart", width / 2, height / 2 + 50)
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

function NextLevel() {
	currentScene++;
	player.gridPos = scenes[currentScene].playerPos;
}

function DrawGrid(type, position) {

	this.blockSize = blockSize;
	this.type = type;
	this.gridPos = position;

	this.display = function () {
		this.pos = createVector(this.gridPos.x * blockSize, this.gridPos.y * blockSize);
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

			var rows = data.layout;
			for (var i = 0; i < rows.length; i++) {
				this.gridBlocks[i] = [];
				var cols = rows[i];
	
	
				for (var j = 0; j < cols.length; j++) {
					
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
					else if(tileMap == 4) {
						gameObj = new Goal(tileMap, position);
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
			textSize(50);

			textFont(type);
			text("Sokoban!", width / 2, height / 2-50);
			textSize(20);
			text("Press S to Start", width / 2, height / 2 );
			text("Use WASD to move", width / 2, height / 2 + 50);
			text("Press X to reset at any time", width / 2, height / 2 + 100);
			text("Push the Crate into the Green Marker", width / 2, height / 2 + 150);


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

function Goal(type, position) {

	this.blockSize = blockSize;
	this.type = type;
	this.gridPos = position;

	this.display = function () {
		this.pos = createVector(this.gridPos.x * blockSize, this.gridPos.y * blockSize);
		stroke(100);
		fill(0,255,0);
		rect(this.pos.x, this.pos.y, this.blockSize, this.blockSize);
	}
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

	var blocks = scenes[currentScene].gridBlocks;
	if(!blocks || !blocks[ny][nx] || blocks[ny][nx].type == 1) {
		return;
	}

	if(blocks[ny][nx].type == 3 &&
		(nny < 0 || nnx < 0 || nny >= boardSize.y || nnx >= boardSize.x || 
		blocks[nny][nnx].type == 2 || blocks[nny][nnx].type == 1)) { 
		
		return;
	}


	if(blocks[ny][nx].type == 3 &&
		(nny < 0 || nnx < 0 || nny >= boardSize.y || nnx >= boardSize.x || 
		blocks[nny][nnx].type == 4)) { 

		
			currentState = playerState.WIN;
	
		
	}



	
	if(blocks[ny][nx].type == 3) {
		blocks[ny][nx].gridPos = createVector(nnx, nny);
		blocks[nny][nnx] = blocks[ny][nx];
	}
	
	blocks[ny][nx] = blocks[y][x];
	blocks[y][x] = new DrawGrid(0, createVector(x, y) );

	player.gridPos.x = nx;
	player.gridPos.y = ny;
}