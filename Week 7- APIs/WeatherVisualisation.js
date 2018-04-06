var currentWeather;



var description;
var input;
var api = '//api.openweathermap.org/data/2.5/weather?q=';
var apiKey = '&APPID=60bc5c9d42ac4995d6aa2fbd0baea13c';
var celcius = '&units=metric';

var cold;
var freezing;
var tooHot;
var sweatBox;
var okay;
var medium;

function setup(){
  cold = loadImage('cold.png');
  tooHot = loadImage("tooHot.png");
  freezing = loadImage("freezing.png");
  sweatBox = loadImage("sweatBox.png");
  okay = loadImage("okay.jpeg");
  medium = loadImage("medium.png");

  createCanvas(600,600);
  

  var button = select('#search');
  button.mousePressed(weatherSearch);

  input = select('#city');
}

function weatherSearch(){
  var url = api+input.value()+apiKey+celcius;
  loadJSON(url, gotData);
}

function gotData(data){
currentWeather = data;
}

function draw(){

  
  
  textSize(50);
  if(currentWeather)
  {
       background(255,255,255);

    text(input.value(), 200,100);
    text(currentWeather.main.temp+'c',200,200);

    if(currentWeather.main.temp<5){
      image(freezing,180,230,280,360);
    }
    if(currentWeather.main.temp >3 && currentWeather.main.temp <6){
      image(cold,width/2,250,300,300);
    }
    if(currentWeather.main.temp >6 && currentWeather.main.temp <10){
      image(medium,250,250,300,300);
    }
    if(currentWeather.main.temp >10 && currentWeather.main.temp <20){
      image(okay,150,250,320,300);
    }
    
    if(currentWeather.main.temp >20 && currentWeather.main.temp <30){
      image(tooHot,170,230,240,340);
    }
    if(currentWeather.main.temp >30){
      image(sweatBox,150,240,280,350);
    }


    // var r = color(currentWeather.main.temp);
    // var g = color(currentWeather.main.temp);
    // var b= color(currentWeather.main.temp);
    // var r1 = map(color(r,0,255,0,currentWeather.main.temp));
    // var g1 = map(color(g,0,255,0,currentWeather.main.temp));
    // var b1 = map(color(b,0,255,0,currentWeather.main.temp));
  }

}