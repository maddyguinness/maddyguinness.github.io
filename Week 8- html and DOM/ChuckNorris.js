var buttonElement;
var currentJoke;
var newJoke = "";
var randomNum;
var buttonColour;
var title;
var subHeader;
var shout;


function setup(){
  noCanvas();

  shout = createAudio('chuck-norris_1.mp3');  
  buttonColour = color(150,20,200);

  loadJSON('https://api.icndb.com/jokes/', gotJoke);

  title = createElement('h1', 'Joke Generator');
  //title.center('horizontal');
  title.position(10,10);


  subHeader = createElement('h2', 'Press the button to generate a random Chuck Norris-related joke');
  //subHeader.center('horizontal');
  subHeader.position(10,70);


  buttonElement = createButton('Make me laugh (hopefully)');
  buttonElement.mousePressed(onClick);

  buttonElement.position(350,170);
  buttonElement.size(200,100);
  buttonElement.style('font-size','23'+'px');
  buttonElement.style('background-color', buttonColour);
  buttonElement.center('horizontal');


}

function gotJoke(data){
  currentJoke = data;
}

function onClick(){

    randomNum = floor(random(0,602));
    
    if(newJoke != "") { 
      console.log("new") ;
      newJoke.remove();
    }
    shout.play();
    newJoke = createElement('h3', currentJoke.value[randomNum].joke);
    newJoke.position(30,350);
   

}

