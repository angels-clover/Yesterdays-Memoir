/* VARIABLES */
let startButton, continueButton, doorway1, doorway2;
let player, barriers, border1, border2, border3;
let bedroomImg, livingRoomImg, storageImg, done;
let tulip, daisy, orchid, sunflower, pansy;
let tulipImg, daisyImg, orchidImg, sunflowerImg, pansyImg;
let daisyDisp, orchidDisp, sunflowerDisp, pansyDisp;
let screen = 0, fadeIn = 0, fadeIn1 = 0; collected = 0;
//collection style game
let catcher, photo;
let catcherImg, photoImg;
let score = 0;
//pong
let paddle, ball;
let success = 0, failure = 0;

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

  daisyDisp = loadImage ( "/assets/daisy1.png" );
  orchidDisp = loadImage ( "/assets/orchid1.png" );
  sunflowerDisp = loadImage ( "/assets/sunflower1.png" );
  pansyDisp = loadImage ( "/assets/pansy1.png" );

  //for collection style minigame
  catcherImg = loadImage("/assets/catcher.png");
  photoImg = loadImage("/assets/Ocean Picture.png");

  
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
  text("yesterday's\nmemoir", width/2, height/2 - 100);

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
    //TULIPS
    //get rid of unnecessary environment parts
    flowerCollect();

    //set up bg
    background("#333333");
    image(tulipImg, -64, 55);

    //emotion associated with tulip
    fill("#A4A0BF");
    textSize(18);
    text("Tulips were one of the most\ncommonly grown flowers,\nyet that didn't stop them\nfrom having a special place\nin your heart.\n...\nWhat did they mean again?", width/2 + 75, height /2 - 100);
    textSize(10);
    text("(since this tulip is potted, it's best if you just leave it here...)", width/2 + 60, height/2 + 150)

    continueButton.pos = {x: width/2 + 75, y: height /2 + 100};


    //Continue button
    if (continueButton.mouse.presses() ) {

      //return player to where they were before
      screen = 2;
      player.pos = {x: 115, y: 188};
      collectRestore();

      //make tulip not-interactable again
      tulip.collider = "none";

      //collected score
      collected = collected + 1;
      print(collected);
    }
    
  } else if (screen == 6) {

    //set up bg and remove unnecessary aspects from environment
    flowerCollect();
    background("#333333");
    sunflower.pos = {x: -100, y: -100 };
    orchid.pos = {x: -100, y: -100};
    image(sunflowerDisp, 0, 0);

    //text and button
    fill("#A4A0BF");
    textSize(18);
    text("Sunflowers — adoration,\nthat was easy enough to\nremember, right...?", width/2 + 100, height /2 - 100);

    continueButton.pos = {x: width/2 + 105, y: height /2 + 130};

    //create false buttons background
    rectMode(CENTER);
    fill("grey");
    rect(101, 304, 100, 30);
    rect(330, 64, 100, 30);
    rect(347, 380,100,30);
    rect(190, 233, 100,30);
    rect(320, 261, 100, 30 );
    rect(164, 374, 100, 30);
    rect(337, 176, 100, 30);
    rect(196, 28, 100, 30);

    //text for false buttons
    fill(0);
    textSize(20);
    text("continue", 101, 309);
    text("continue",330, 69);
    text("continue",347,385);
    text("continue",190,238);
    text("continue",320,267);
    text("continue",164,380);
    text("continue",337,180);
    text("continue",196,33);
    


    //Continue button
    if (continueButton.mouse.presses() ) {

      //return player to where they were before
      screen = 3;
      player.pos = {x: 270, y: 159};
      collectRestore();

      //take the flower away
      sunflowerImg.resize(1,0);
      sunflower.collider = "none";

      //collected score
      collected = collected + 1;
      print(collected);
    }
    
  } else if (screen == 7) {

    //set up bg and remove unnessary elemetns
    flowerCollect();
    background("#333333");
    sunflower.pos = {x: -100, y: -100 };
    orchid.pos = {x: -100, y: -100};
    image(orchidDisp, 0, 0);

    //text and button
    fill("#A4A0BF");
    textSize(18);
    text("Orchids were associated\nwith wealth and luxury,\nand though you never\nfit that description, you\nliked having them around.", width/2 + 80, height /2 - 50);

    continueButton.pos = {x: width/2 + 105, y: height /2 + 100};

    //press button
    if (continueButton.mouse.presses() ) {
      screen = 3;
      player.pos = {x: 128, y: 300};
      collectRestore();

      //take the flower away
      orchidImg.resize(1, 0);
      orchid.collider = "none";

      //collect
      collected += 1;
      print(collected);
    }
    
  } else if (screen == 8){

    //bg + remove unneceuaay
    flowerCollect();
    background("#333333");
    daisy.pos = {x: -100, y: -100 };
    pansy.pos = {x: -100, y: -100};
    image(daisyDisp, 0, 0);

    //text + button
    fill("#A4A0BF");
    textSize(18);
    text("To keep those memories\nof childhood close, you\nhad planted daises\nprobably the most out\nof all flowers.", width/2 + 80, height /2 - 50);

    continueButton.pos = {x: width/2 + 105, y: height /2 + 100};

    //click button
    if (continueButton.mouse.presses() ) {
      gameSetup1();
      screen = 10;
      
    }
    
  } else if (screen == 9) {

    //bg  + removal
    flowerCollect();
    background("#333333");
    daisy.pos = {x: -100, y: -100 };
    pansy.pos = {x: -100, y: -100};
    image(pansyDisp, 0, 0);

    //text + button
    fill("#A4A0BF");
    textSize(18);
    text("Pansies,\na broken heart.", width/2 + 80, height /2 - 50);

    continueButton.pos = {x: width/2 + 75, y: height /2 + 100};

    //click
    if (continueButton.mouse.presses() ) {

      gameSetup2();
      screen = 11;
     }

  } else if (screen == 10) {

    background("#333333");

    // Draw directions to screen
    fill("#FCFAF7");
    textSize(12);
    text("move using the left and right keys\nto keep hold of those dear memories.", width-100, 20);

    //If photo reaches bottom, move back to random position at random position at top with a random velocity from 1 to 5
    if (photo.y >= height) {
      photo.y = 0;
      photo.x = random(width);
      photo.vel.y = random(1,5);

      score = score - 1;
    }

    //Move catcher
    if ( kb.pressing ( "left" ) ) {
      catcher.vel.x = -3;
    } else if ( kb.pressing ( "right" ) ) {
      catcher.vel.x = 2;
    } else {
      catcher.vel.x = 0
    }

    //Stop catcher at edges of screen
    if (catcher.x < 50) {
      catcher.x = 50;
    } else if (catcher.x > 350) {
      catcher.x = 350;
    }

    //If photo collides with catcher, move back to random position at top
    if ( photo.collides (catcher) ) {
      photo.y = 0;
      photo.x = random (width);
      photo.vel.y = random (2, 7);
      photo.direction = "down";

      score = score + 1;
    }

    //Display score on the screen
    textSize(20)
    text ( "photos\ncollected: " + score, 60, 25 );

    //Win screen
    if (score >= 7) {
      catcher.pos = { x: -100, y: -100 };
      photo.pos = { x: -150, y: -150 };
      textSize ( 25 );
      text ( "if you spend any more time\nreminiscing, you might be sick." , width/2 , height/2 - 50);
      textSize(15)
      text( "click to return home.", width/2, height/2 + 10);

      if (mouseIsPressed) {
        //restore player pos
        collectRestore();
        screen = 4;
        player.pos = {x: 201, y: 172};
      

        //take the flower away
        daisyImg.resize(1, 0);
        daisy.collider = "none";

        //collect
        collected += 1;
      }
    }

    
  } else if (screen == 11) {
    background("#333333");

    //Move the paddle
    paddle.moveTowards(mouse.x, 380, 1);

    //When ball collides with paddle bounce off and increase success
    if (ball.collides(paddle)) {
      ball.speed = 8;
      success = success + 1;
      ball.direction = ball.direction + random ( -10, 10 );
    }

    //When ball hits ground you lose
    if (ball.y > 390) {
      ball.y = 430
      ball.speed = 0;

      // Draw you lose to screen
      fill(240);
      textSize(20);
      textAlign(CENTER);
      text("making a mistake was inevitable,\nand here it was the only way forward.\nbut i'm glad we got to share this moment." , width/2, 160); 

      textSize(15);
      text("click to keep on going.", width/2, height/2 + 50);
      textAlign(LEFT);
      failure = 1;

      if (mouseIsPressed) {
        //restore player pos
        collectRestore();
        screen = 4;
        player.pos = {x: 277, y: 222};

        //take the flower away
        pansyImg.resize(1, 0);
        pansy.collider = "none";

        //collect
        collected += 1;
      }
    }

    //Draw the success
    fill(0, 128, 128);
    textAlign(CENTER);
    textSize(20);
    text('successes = ' + success, 70, 30);
    text("failure = " + failure , 330, 30);




    
  } else if (screen == 12) {
    
    flowerCollect();
    background("#333333");
    fill(255, fadeIn1);
    textSize(20);
    textAlign(CENTER);

    text("The bouqet these five flowers have\nmade definitely isn't the prettiest,\nbut it's yours.\nAccept it or not,\nthe fact won't change.\n\n\nThere's always tomorrow, though.\n\n[END]", width/2, height/2 - 100);

    fadeIn1 += 1; //Increases the colour value of the text

    
  }

  if (collected == 5) {
    if (screen == 2) {
      screen = 12;
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
  continueButton.pos = { x: width/2 , y: height/2 + 150 };
  fill(0);
  continueButton.color = "grey";
  continueButton.textSize = 20;
  continueButton.text = "continue";

  //Move onto bedroom
  if (continueButton.mouse.presses() ){
    fadeIn = 0;
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
  background("#390F0F");
  
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
  background("#390F0F");
  
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
  barriers.collider = "none";
  doorway1.visible = false;
  doorway2.visible = false;
  fadeIn = 0;
  border1.collider = "n";
  border2.collider = "n";
  border3.collider = "n";
  doorway1.collider = "n";
  doorway2.collider = "n";
}

function collectRestore() {
  barriers.visible = true;
  doorway1.visible = true;
  doorway2.visible = true;
  continueButton.pos = {x: -150, y: -150};
  barriers.collider = "k";
  doorway1.collider = "k";
  doorway2.collider = "k";

  //cleans up sprites
  if (screen == 10) {
    catcher.pos = {x: -350, y:-350 };
    photo.pos = {x: -400, y: -400};
    
  } else if (screen == 11) {
    paddle.pos = {x: -400, y: -400};
    ball.pos = {x: -350, y: -350};
    walls.collider = "none";
  }


  
}

function gameSetup1() {
  //collection style minigame setup!

  continueButton.pos = {x: -350, y: -350 };
  
  //Resize images
  catcherImg.resize(100,0);
  photoImg.resize(40,0);

  //Create catcher 
  catcher = new Sprite(catcherImg, 200,380,100,20, "k");
  catcher.color = color(95,158,160);

  //Create falling object
  photo = new Sprite(photoImg, 100,0,10);
  photo.color = color(0,128,128);
  photo.rotationLock= true;
  photo.vel.y = 2;

  textAlign(CENTER);
}

function gameSetup2(){
  background("#333333");
  continueButton.pos = {x: -350, y: -350 };

  //Create paddle 
  paddle = new Sprite(200,380,100,20);
  paddle.color = color(95,158,160);
  paddle.rotationLock = true;

  //Create ball
  ball = new Sprite( 100, 50, 20);
  ball.color = color(0,128,128);
  ball.direction = "down";
  ball.speed = 5;
  ball.bounciness = 1;
  ball.friction = 0;

  //Create walls
  walls = new Group();
  walls.w = 10;
  walls.h = 400;
  walls.collider = "static";
  walls.visible = false;

  // left and right walls
  new walls.Sprite(0, height / 2);
  new walls.Sprite(width, height / 2);

  //top wall
  let wallTop = new walls.Sprite(width / 2, 0);
  wallTop.rotation = 90;
}

function ending() {
  flowerCollect();
  background("#333333");
  fill(255, fadeIn);
  textSize(20);
  textAlign(CENTER);

  text("Flowers once adorned your belongings,\nplentiful and beautiful,\n until the joy that once blossomed\nin your heart at the sight of them\nwas replaced by a cold indifference.\n\nYou hadn't sought them out in a while.\n\nMaybe today you could?", width/2, height/2 - 100);

  fadeIn = fadeIn + 1; //Increases the colour value of the text
}