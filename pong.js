//Use the mouse to move the paddle from left to right. Keep the ball in the air. If it touches the ground, you lose.

/* VARIABLES */
let paddle, ball, restart;
let ahImg, obsImg;
let score = 0;

/* PRELOAD LOADS FILES */
function preload() {

  ahImg = loadImage("/assets/alhairham.jpg");
  obsImg = loadImage("/assets/obstexjpg.jpg");

}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(400,400);
  background(224,224,224);

  //Resiz
  ahImg.resize(40,0);
  obsImg.resize(80,30);

  //Create paddle 
  paddle = new Sprite(obsImg, 200,380,100,20);
  paddle.color = color(95,158,160);
  paddle.rotationLock = true;
  
  //Create ball
  ball = new Sprite(ahImg, 100, 50, 20);
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

  //restart button
  restart = new Sprite ( - 200, -200 );
}

/* DRAW LOOP REPEATS */
function draw() {
  background(224,224,224);

  //Move the paddle
  paddle.moveTowards(mouse.x, 380, 1);

  //When ball collides with paddle bounce off and increase score
  if (ball.collides(paddle)) {
    ball.speed = 8;
    score = score + 1;
    ball.direction = ball.direction + random ( -10, 10 );
  }

  //When ball hits ground you lose
  if (ball.y > 390) {
    ball.y = 430
    ball.speed = 0;
    
    // Draw you lose to screen
    fill(0);
    textSize(20);
    textAlign(CENTER);
    text('ALHAITHAM IS NOT\nBRAIN DAMAGED ENOUGH!', width/2, 160); 
    textAlign(LEFT);
  }

  //Draw the score
  fill(0, 128, 128);
  textAlign(LEFT);
  textSize(20);
  text('brain damage rating = ' + score, 10, 30);

  //Display restart button
  restart.pos = {x: width-20, y: height/10 - 20};
  restart.w = width/10
  restart.h = height/10
  restart.collider = "k";
  restart.color = "#5f9ea0";
  restart.text = "⟳";

  if (restart.mouse.presses () ) {
    score = 0;
    ball.pos = {x: 100, y: 50};
    ball.direction = "down";
    ball.speed = 5;
    
  }
}	