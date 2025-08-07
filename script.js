/* VARIABLES */
let startButton, continueButton, doorway1, doorway2;
let player, barriers, border1, border2, border3;
let bedroomImg, livingRoomImg, storageImg, done;
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
}

/* SETUP RUNS ONCE */
function setup() {

  //Resize images
  tulipImg.resize(300,0);
  sunflowerImg.resize(40, 0);
  orchidImg.resize(40, 0);
  daisyImg.resize(40, 0);
  pansyImg.resize(40, 0);

  //Display homepage
  createCanvas(400,400);
  background("#F5C75D");
  noStroke();
  textSize(45);
  textAlign(CENTER);
  text("game title", width/2, height/2 - 100);

  //Create sprites
  startButton = new Sprite( width / 2 , height/2 + 100 , 100 , 30 , "k" );
  continueButton = new Sprite ( -100, -100 , 100, 30, "k" );
  doorway1 = new Sprite( -150, -150 , 6, 60, "k");
  doorway2 = new Sprite( -150, -150, 60, 6, "k");
  player = new Sprite ( -400 , - 400 , 20, 20);

  tulip = new Sprite( -200, -200, 20, 40, "k");
  sunflower = new Sprite( sunflowerImg, -300, -300, 20, 40, "k");
  orchid = new Sprite ( orchidImg, -300, -300 , 20, 40, "k" )
  daisy = new Sprite ( daisyImg, -250, -250, 20, 40, "k");
  pansy = new Sprite( pansyImg, -250, -250, 20, 40, "k");

  continueButton = new Sprite( -100, -100, 100, 30, "k");


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
  border1 = new Group();
  border1.collider = "none";
  border1.visible = false;

  new border1.Sprite(222, 110, 60, 6);
  new border1.Sprite(134, 120, 100, 70);
  new border1.Sprite(290, 120, 80, 60);
  new border1.Sprite(317, 164, 50,50);
  new border1.Sprite(299, 301, 70,70);
  new border1.Sprite(100, 295, 70, 70);

  border2 = new Group();
  border2.collider = "none";
  border2.visible = false;

  new border2.Sprite(314, 113, 30, 70);
  new border2.Sprite(154, 114, 180, 50);
  new border2.Sprite(143, 233, 100, 60);
  new border2.Sprite(170, 192, 60, 30);
  new border2.Sprite(78, 257, 20, 80);
  new border2.Sprite(272, 111, 50, 5);
  new border2.Sprite(81, 154, 30, 30);
  new border2.Sprite(285, 317, 100, 50)
  new border2.Sprite(308, 274, 50, 50);
  new border2.Sprite(271, 282, 25, 25);
  new border2.Sprite(326, 237, 20,20);

  border3 = new Group();
  border3.collider = "none";
  border3.visible = false;

  new border3.Sprite(86, 258, 30, 120);
  new border3.Sprite(109, 116, 70, 80);
  new border3.Sprite(289, 113, 70, 80);
  new border3.Sprite(264, 304, 120, 50);
  new border3.Sprite(205, 116, 150, 3);
  
  

  //Characteristics for Sprites
  player.color = 0;
  player.rotationLock = true;
  player.visible = false;

  doorway1.color = "#140505";
  doorway2.color = "#140505";

  barriers.visible = false;

  tulip.visible = false;

}

/* DRAW LOOP REPEATS */
function draw() {
  if (mouse.presses ()){
    print("mouse:" + mouse.x + "," + mouse.y , 20, 20);
  }

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
    screen = 1;
  }

  //The display depends on the screen!
  if (screen == 1){
    player.pos = {x: width/2, y: height/2};
    showInst();
    
  } else if (screen == 2){
    bedroom();
    //Leaving bedroom
    if ( player.collides(doorway1) ){
      screen = 3;
      player.pos = {x: width/2 + 110, y: height/2 - 15};
    }

    //Tulip collection
    if ( player.collides(tulip) ) {
      screen = 5;
    }
    
  } else if (screen == 3){
    livingRoom();
    //Entering bedroom
    if (player.collides(doorway1) ){
      screen = 2;
      player.pos = {x: 90, y: 230};
      //Entering storage room
    } else if (player.collides(doorway2) ){
      screen = 4;
      player.pos = {x: 150,y: 295};
    }

    //Sunflower collection
    if ( player.collides(sunflower) ) {
      screen = 6;
    }

    //Orchid collection
    if ( player.collides(orchid) ) {
      screen = 7;
    }
    
  } else if (screen == 4){
    storeRoom();
    //Leaving storage room
    if ( player.collides(doorway2) ){
      screen = 3;
      player.pos = {x: 150, y: 295};
    }

    //Daisy collection
    if ( player.collides(daisy) ) {
      screen = 8;
    }

    //Pansy collection
    if ( player.collides(pansy) ) {
      screen = 9;
    }
    
  } else if (screen == 5) {

    //Set up screen
    flowerCollect();
    background("#333333");
    image(tulipImg, -64, 55);
    fill("#A4A0BF");
    textSize(18);
    text("Tulips were one of the most\ncommonly grown flowers,\nyet that didn't stop them\nfrom having a special place\nin your heart.\n...\nWhat did they mean again?", width/2 + 75, height /2 - 100);

    continueButton.pos = {x: width/2 + 75, y: height /2 + 100};


    //Continue button
    if (continueButton.mouse.presses() ) {
      screen = 2;
      player.pos = {x: 115, y: 188};
      collectRestore();
    }
    
  } else if (screen == 6) {
    print("sunflower collected");
    flowerCollect();
    background("#333333");
    sunflower.pos = {x: -100, y: -100 };
    orchid.pos = {x: -100, y: -100};
    sunflowerImg.resize(300,300);
    image(sunflowerImg, -50, 50);

    fill("#A4A0BF");
    textSize(18);
    text("Sunflowers — adoration,\nthat was easy enough to\nremember, right...?", width/2 + 75, height /2 - 100);

    continueButton.pos = {x: width/2 + 75, y: height /2 + 100};


    //Continue button
    if (continueButton.mouse.presses() ) {
      screen = 2;
      player.pos = {x: 115, y: 188};
      collectRestore();
    
    
  } else if (screen == 7) {
    print("orchid collected");
    flowerCollect();
    
  } else if (screen == 8){
    print("daisy collected");
    flowerCollect();
    
  } else if (screen == 9) {
    print("pansy collected");
    flowerCollect();
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
  continueButton.pos = { x: width/2 , y: height/2 + 150 };
  fill(0);
  continueButton.color = "grey";
  continueButton.textSize = 20;
  continueButton.text = "continue";

  //Move onto bedroom
  if (continueButton.mouse.presses() ){
    screen = 2;
    player.visible = true;
    barriers.visible = true;
  }
}



function bedroom() {
  //Enable the borders
  border1.collider = "k";

  //Turn off other borders
  border2.collider = "n";
  border3.collider = "n";
  
  //Move continueButton off of screen
  continueButton.pos = { x: -100 , y: -100 };

  //Display bedroom
  background("#390F0F");
  image(bedroomImg, 64, 64);

  //Doorway
  doorway1.pos = { x: 67 , y: 230 };
  doorway2.pos = {x: -150, y: -150};

  //Remove prev flowers
  sunflower.pos = {x: -300, y: -300 };
  orchid.pos = {x: -300, y: -300};

  //Add necessary flowers
  tulip.pos = {x:80, y: 170 };
  
  
}



function livingRoom() {
  //Enable the borders
  border2.collider = "k";

  //Turn off other borders
  border1.collider = "n";
  border3.collider = "n";
  
  //Remove prev flowers hitbox
  tulip.pos = {x: -300, y: -300};
  daisy.pos = {x: -250, y: -250};
  pansy.pos = {x: -250, y: -250};

  //Add necessary flowers
  sunflower.pos = {x: 275, y: 119};
  orchid.pos = {x: 83, y: 315};
  
  //Display living room
  image(livingRoomImg, 64, 64);

  //Add doorways
  doorway1.pos = {x: 332, y: height/2 - 15};
  doorway2.pos = {x: 150, y: 332};
  
}

function storeRoom() {
  //Enable the borders
  border3.collider = "k";

  //Turn off other borders
  border2.collider = "n";
  border1.collider = "n";

  //Remove prev flowers
  sunflower.pos = {x: -300,y:  -300 };
  orchid.pos = {x: -300, y: -300};

  //Add necessary flowers
  daisy.pos = {x: 200, y: 128};
  pansy.pos = {x: 312, y: 216};
  
  //Display storage room
  image(storageImg, 64, 64);

  //Add doorways
  doorway1.pos = {x: -150, y: -150};
}

function flowerCollect() {
  player.pos = {x: -250, y: -250};
  barriers.visible = false;
  doorway1.visible = false;
  doorway2.visible = false;
  fadeIn = 0;
}

function collectRestore() {
  barriers.visible = true;
  doorway1.visible = true;
  doorway2.visible = true;
}