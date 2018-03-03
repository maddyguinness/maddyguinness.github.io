var sceneData;

var Holly;
var Diane;
var John;
var Mike;
var Jane;

var currentScene = 0;
//var currentChar = 0;

var scenes = [];
//var characters = [];

function preload() {
  sceneData = loadJSON('scenes.json');

}

function setup() {
  createCanvas(800, 800);
  CreateScenesFromData(sceneData.scenes);

 Holly = loadImage("Holly.png");
 Diane= loadImage("Diane.png");
 John= loadImage("John.png");
 Mike= loadImage("Mike.png");
 Jane= loadImage("Jane.png");

}

function draw() {
  background(180, 0, 150);
  scenes[currentScene].display();
  fill(0);
  textSize(18);
  text("press the option number to advance to the indicated scene", 50, 40);
  textSize(25);
  text("Talk to everyone in the room to hear a riddle! John has the answer.", 47, 75);
}

function CreateScenesFromData(data) {
  for (var i = 0; i < data.length; i++) {
    scenes.push(new Scene(data[i].character, data[i].speech, data[i].sceneText, data[i].options, data[i].nextScenes))

    console.log(data[i].character) ;
  }


}



function Scene(character, speech, sceneText, options, nextScenes) {
  this.sceneText = sceneText;
  this.options = options;
  this.nextScenes = nextScenes;
  this.character = character;
  this.speech = speech;

  

  this.display = function() {
    fill(0);
    textSize(20);
    text(this.sceneText, 47, 150);

    text(this.character, 500, 110);

    text(this.speech, 50, 710);

    textSize(15);
    for (var i = 0; i < options.length; i++) {
      text('OPTION ' + (i + 1) + ': ' + this.options[i], 50, 200 + i * 50);
    }

    if(character === "Jane"){
      image(Jane, -20, -210);
    }

    if(character === "John"){
      image(John, -60, -250);

    }

    if(character === "Mike"){
      image(Mike, -110, -600);

    }

    if(character === "Holly"){
      image(Holly, 320,0); 
    }

    if(character === "Diane"){
      image(Diane, -160, -270);

    }
  }
}


function keyPressed() {
  var numberPressed = parseInt(key);
  var newScene = scenes[currentScene].nextScenes[numberPressed - 1];
  
  if (newScene !== undefined) {
    currentScene = newScene;
  }
}