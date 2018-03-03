// code 2
// section a
// bfa dt
// spring 2018
// bryan ma

// week 5
// saving/loading paint data
// based on example by Jon Beilin

var paintmarks = [];
var paintDataFile = 'paintData.json';


function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(255);
  for (var i = 0; i < paintmarks.length; i++) {
    paintmarks[i].display();
  }

  fill(0);
  textSize(24);
  text("drag the mouse across the canvas to draw.", 50, 570);
  text("press 'S' to save a json file with the current paint data.", 50, 600);
  text("press 'L' to load a json file from your computer.", 50, 630);
}

function PaintMark(position, red, green, blue,size,size) {
  this.red = red;
  this.green = green;
  this.blue = blue;

  this.size = size;

  this.position = position;

  this.display = function() {
    noStroke();
    fill(this.red,this.green, this.blue);
    ellipse(this.position.x, this.position.y, this.size, this.size);
  }

}

function mouseDragged() {
  paintmarks.push(new PaintMark(createVector(mouseX, mouseY),100 + sin(frameCount * 0.5) * 80,100 + sin(frameCount * 0.5) * 20,100 + sin(frameCount * 0.5) * 100, 
    10 + sin(frameCount * 0.5) *60,10 + sin(frameCount * 0.05) * 70));
}

function keyPressed() {
  if (key === 'S') {
    savePaintData();
  }
  if (key === 'L') {
    loadPaintData();
  }
}

function savePaintData() {
  positionsToSave = [];
  for (var i = 0; i < paintmarks.length; i++) {
    positionsToSave.push(
      { 
        x: paintmarks[i].position.x, 
        y: paintmarks[i].position.y,
        r: paintmarks[i].red,
        g: paintmarks[i].green,
        b: paintmarks[i].blue,
        s: paintmarks[i].size
      }
    );
  }
  saveJSON(positionsToSave, 'paintData.json');
}

function loadPaintData() {
  loadJSON(paintDataFile, parsePaintData);
}

function parsePaintData(data) {
  paintmarks = [];

  for (var i = 0; i < data.length; i++) {
    paintmarks.push(new PaintMark(createVector(data[i].x, data[i].y)), data[i].red,data[i].green, data[i].blue,data[i].size,data[i].size);
  }
}