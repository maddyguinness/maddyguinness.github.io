var blocks = [];
var canvasSize = 750;
var blockSize = 50;
var player;
var playerX = 400;
var playerY = 400;

function preload(){
	//levelData = loadJSON('Data.json');
}

function setup(){
	createCanvas(751,751);

	player = new Player(createVector(playerX,playerY));
	
	for(var i =0; i<15; i++){
	for(var j =0; j<15; j++){
	blocks.push(new Grid(createVector(i * blockSize, j * blockSize)));
}
}
}

function draw(){
	

	background(0);

	for(var i =0; i<blocks.length; i++){
	blocks[i].display();
	
	player.display();
}

}

function Scene(level, blocks, walls, nextLevel){

this.level = level;
this.numberOfBlocks = blocks;
this.numberOfWalls = walls;
this.nextLevel = nextLevel;

this.display = function(){

	
}

}

function Grid(position){
	
	this.pos = position;
	this.blockSize = 50;

	this.display = function(){
		fill(0);
		
		rect(this.pos.x, this.pos.y,this.blockSize,this.blockSize);
}
}

function Player(position){
	this.pos = position;
	this.blockSize = 50;

	this.display = function(){
		fill(0);
		rect(this.pos.x, this.pos.y,this.blockSize,this.blockSize);	}
}

function keyPressed(){
var playerX = player.pos.x;
var playerY = player.pos.y;

if(key === 'W'){
	
	player.pos.y  -= blockSize;
	
	if(playerY < 50){
		
		player.pos.y = 0;
	}
}

if(key === 'S'){
	player.pos.y += blockSize;
	
	if(playerY > 650)
	{
		player.pos.y = 700
	}
}
if(key === 'D'){
	player.pos.x += blockSize;

	if (playerX > 650){
		player.pos.x = 700;
	}

}
if(key === 'A'){
	player.pos.x -= blockSize;

	if(playerX < 50){
		player.pos.x = 0;
	}

}
}
