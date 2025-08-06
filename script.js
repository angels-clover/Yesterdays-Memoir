/* VARIABLES */
let startButton, instButton, doorway1;
let player, barriers;
let enteredDoorway1 = false, enteredDoorway2 = false;
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
  player = new Sprite ( -400 , - 400 , 10, 10, "k");

  //Create barrier sprites...
  barriers = new Group();
  barriers.collider = "s";
  barriers.color = "#140505";

  new barriers.Sprite( 62, 200 , 6 , 272);
  new barriers.Sprite ( 338, 200, 6, 272 );
  new barriers.Sprite ( 200, 62, 282, 6 );
  new barriers.Sprite ( 200, 338, 282, 6 );

}

/* DRAW LOOP REPEATS */
function draw() {

  //Display start button
  startButton.color = "white";
  startButton.textSize = 25;
  startButton.text = "start";

  //Once start button is pressed, move onto screen 1, the instructions.
  if (startButton.mouse.presses() ) {
    print("pressed");
    screen = 1;
  }


  //The display depends on the screen!
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

  //Player movement...
  if (kb.pressing("left") ){
    player.vel.x = -2;
  } else if (kb.pressing("right") ){
    player.vel.x = 2;
  } else if (kb.pressing("up") ){
    player.vel.y = -2;
  } else if (kb.pressing("down") ){
    player.vel.y = 2;
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

function barrierSetup() {

  if (screen < 2){
    barriers.pos = {x: -400, y: -400};
  }

  new barriers.Sprite( 64, 64, 336, 5);
  
}

function playerEnter() {

  if ( (enteredDoorway1 == true) {
    if (screen == 2){
      //if leaving bedroom to living room, this will happen
    } else if (screen == 3){
      //if going from living room to bedroom
    }
  } else if ( enteredDoorway 2 == true ){
    if (screen == 3){
      //if going from living room to storage
    } else if (screen == 4){
      //if going from storage to living room
    }
  } else {
    player.pos = { x: width / 2, y: height/2 }; //basically only will be used in beginning of game
  }
}