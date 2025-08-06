/* VARIABLES */
let startButton, instButton, doorway1;
let barrier1, barrier2, barrier3, barrier4;
let bedroomImg;
let screen = 0, fadeIn = 0;

/* PRELOAD LOADS FILES */
function preload(){
  //Load images
  bedroomImg = loadImage("/assets/bedroom.png");
  
}

/* SETUP RUNS ONCE */
function setup() {

  //Display homepage
  createCanvas(400,400);
  background("#F5C75D");
  noStroke();
  textSize(45);
  textAlign(CENTER);
  text("game title", width/2, height/2 - 100);

  //Create sprites
  startButton = new Sprite( width / 2 , height/2 + 100 , 100 , 30 , "k" );
  instButton = new Sprite ( -100, -100 , 100, 30, "k" );
  doorway1 = new Sprite( -150, -150 , 6, 60, "k");

}

/* DRAW LOOP REPEATS */
function draw() {
  
  startButton.color = "white";
  startButton.textSize = 25;
  startButton.text = "start";

  if (startButton.mouse.presses() ) {
    print("pressed");
    screen = 1;
  }
  

  if (screen == 1){
    print("Display instructions");
    showInst();
    
  } else if (screen == 2){
    print("Display bedroom");
    bedroom();
    
  } else if (screen == 3){
    print("Display living room");
    livingRoom();
    
  } else if (screen == 4){
    print("Display storage room");
    storeRoom();
  }

}

/* FUNCTIONS */

function showInst(){ 

  //Move start button off screen 
  startButton.pos = {x: -100, y: -100};

  //Display background information + instructions
  background("#333333");
  
  fill(255, fadeIn);
  textSize(20);
  textAlign(CENTER);
  
  text("Flowers once adorned your belongings,\nplentiful and beautiful,\n until the joy that once blossomed\nin your heart at the sight of them\nwas replaced by a cold indifference.\n\nYou hadn't sought them out in a while.\n\nMaybe today you could?", width/2, height/2 - 100);
  
  fadeIn = fadeIn + 1; //Increases the colour value of the text

  //Display next button
  instButton.pos = { x: width/2 , y: height/2 + 150 };
  fill(0);
  instButton.color = "grey";
  instButton.textSize = 20;
  instButton.text = "continue";

  if (instButton.mouse.presses() ){
    screen = 2;
  }
}

function bedroom() {

  //Move instButton off of screen
  instButton.pos = { x: -100 , y: -100 };

  //Display bedroom
  background("#390F0F");
  image(bedroomImg, 64, 64);

  //Doorway
  doorway1.pos = { x: 67 , y: 230 };
  doorway1.color = "#140505";
  
}

function livingRoom() {
  background("grey");
}

function storeRoom() {
  background("red");
}

function barriers() {
  
}