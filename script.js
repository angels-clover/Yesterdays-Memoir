/* VARIABLES */
let startButton, instButton, doorway1, doorway2;
let player, barriers, borders, border1, border2, border3;
let bedroomImg, livingRoomImg, storageImg, idle;
let tulip, daisy, orchid, sunflower, pansy;
let tulipImg, daisyImg, orchidImg, sunflowerImg, pansyImg;
let screen = 0, fadeIn = 0;

/* PRELOAD LOADS FILES */
function preload(){
  
  //Load images
  bedroomImg = loadImage("/assets/bedroom.png");
  livingRoomImg = loadImage("/assets/livingRoom.png");
  storageImg = loadImage("/assets/storage.png");

  tulipImg = loadImage("/assets/tulip.png");
  daisyImg = loadImage("/assets/daisy.png");
  orchidImg = loadImage("/assets/orchid.png");
  sunflowerImg = loadImage("/assets/sunflower.png");
  pansyImg = loadImage("/assets/pansy.png");

  //Player animations
  //player.addAni("idle","/asstes/idle.png", {width: 16, height: 18, frames: 2} );
  //player.addAni("run","/asstes/run.png", {width: 16, height: 18, frames: 2} );
  
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
  doorway2 = new Sprite( -150, -150, 60, 6, "k");
  player = new Sprite ( -400 , - 400 , 20, 20);

  tulip = new Sprite( -200, -200, 20, 40, "k");


  //Create barrier sprites...
  barriers = new Group();
  barriers.collider = "s";
  barriers.color = "#140505";

  new barriers.Sprite( 62, 200 , 6 , 272);
  new barriers.Sprite ( 338, 200, 6, 272 );
  new barriers.Sprite ( 200, 62, 282, 6 );
  new barriers.Sprite ( 200, 338, 282, 6 );

  //Border sprites. super painful.
  //Bedroom
  borders = new Group();
  borders.collider = "s";
  borders.opacity = 0;

  border1 = new border1.Group();
  border.w = 10;

  //Characteristics for Sprites
  player.color = 0;
  player.rotationLock = true;
  player.visible = false;

  doorway1.color = "#140505";
  doorway2.color = "#140505";

  barriers.visible = false;

}

/* DRAW LOOP REPEATS */
function draw() {

  //Player movement
  if (kb.pressing("left")) {
    player.vel.x = -2;

  } else if (kb.pressing("right")) {
    player.vel.x = 2;

  } else if (kb.pressing("up")) {
    player.vel.y = -2;

  } else if (kb.pressing("down")) {
    player.vel.y = 2;

  } else {
    player.vel.x = 0;
    player.vel.y = 0;

  }

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
    player.pos = {x: width/2, y: height/2};
    print("Display instructions");
    showInst();
    
  } else if (screen == 2){
    print("Display bedroom");
    bedroom();
    if ( player.collides(doorway1) ){
      screen = 3;
      player.pos = {x: width/2 + 110, y: height/2 - 15};
    }
    
  } else if (screen == 3){
    print("Display living room");
    livingRoom();

    if (player.collides(doorway1) ){
      screen = 2;
      player.pos = {x: 90, y: 230};
    } else if (player.collides(doorway2) ){
      screen = 4;
      player.pos = {x: 150,y: 295};
    }
    
  } else if (screen == 4){
    print("Display storage room");
    storeRoom();

    if ( player.collides(doorway2) ){
      screen = 3;
      player.pos = {x: 150, y: 295};
    }
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

  //Move onto bedroom
  if (instButton.mouse.presses() ){
    screen = 2;
    player.visible = true;
    barriers.visible = true;
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
  doorway2.pos = {x: -150, y: -150};

  //Tulip
  tulip.pos = {x:80, y: 170 };
  
  
}



function livingRoom() {
  //Remove prev flowers hitbox
  tulip.pos = {x: -300, y: -300};
  
  //Display living room
  image(livingRoomImg, 64, 64);

  //Add doorways
  doorway1.pos = {x: 332, y: height/2 - 15};
  doorway2.pos = {x: 150, y: 332};
  
}

function storeRoom() {
  //Display storage room
  image(storageImg, 64, 64);

  //Add doorways
  doorway1.pos = {x: -150, y: -150};
}