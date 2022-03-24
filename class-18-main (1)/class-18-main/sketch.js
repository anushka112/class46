var PLAY = 1;
var END = 0;
var gameState = PLAY;

var girl,girl_running , girl_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var flowersGroup, flower1, flower2, flower3, flower4;
var groundImg
var score=0;
var jumpSound, collidedSound;

var gameOver, restart;


function preload(){
  jumpSound = loadSound("assets/sounds/jump.wav")
  collidedSound = loadSound("assets/sounds/collided.wav")
  
  groundImg = loadImage("ground1.png")
  
  
  girl_running = loadAnimation("girl1.png");
  girl_collided = loadAnimation("girl2.png");
  
  
  
  cloudImage = loadImage("cloud.png");
  
  flower1 = loadImage("flower1.png");
  flower2 = loadImage("flower2.png");
  flower3 = loadImage("flower3.png");
  flower4 = loadImage("flower4.png");
  flower5 = loadImage("flower5.png");
  flower6 = loadImage("flower6.png");
  flower7 = loadImage("flower7.png");
  flower8 = loadImage("flower8.png");
  
  gameOverImg = loadImage("assets/gameOver.png");
  restartImg = loadImage("assets/restart.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  
  
  girl = createSprite(50,height-70,20,50);
  
  
  girl.addAnimation("running", girl_running);
  girl.addAnimation("collided", girl_collided);
  girl.setCollider('circle',0,0,350)
  girl.scale = 0.5;
  // trex.debug=true
  
  invisibleGround = createSprite(width/2,height-10,width,125);  
  invisibleGround.shapeColor = "#f4cbaa";
  
  ground = createSprite(width/2,height,width,2);
  ground.addImage("ground",groundImg);
  ground.x = width/2
  ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(width/2,height/2- 50);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(width/2,height/2);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.1;

  gameOver.visible = false;
  restart.visible = false;
  
 
  // invisibleGround.visible =false

  cloudsGroup = new Group();
  flowersGroup = new Group();
  
  score = 0;
}

function draw() {
  //trex.debug = true;
  background(groundImg);
  textSize(20);
  fill("black")
  text("Score: "+ score,30,50);
  
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
    
    if((touches.length > 0 || keyDown("SPACE")) && girl.y  >= height-120) {
      jumpSound.play( )
      girl.velocityY = -10;
       touches = [];
    }
    
    girl.velocityY = girl.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    girl.collide(invisibleGround);
    spawnClouds();
    spawnflowers();
  
    if(flowersGroup.isTouching(girl)){
        collidedSound.play()
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    girl.velocityY = 0;
    flowersGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    girl.changeAnimation("collided",girl_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    flowersGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(touches.length>0 || keyDown("SPACE")) {      
      reset();
      touches = []
    }
  }
  
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(width+20,height-300,40,10);
    cloud.y = Math.round(random(100,220));
    cloud.addImage(cloudImage);
    cloud.scale = 0.01;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 300;
    
    //adjust the depth
    cloud.depth = girl.depth;
    girl.depth = girl.depth+1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnflowers() {
  if(frameCount % 60 === 0) {
    var flower = createSprite(600,height-95,20,30);
    flower.setCollider('circle',0,0,45)
    // obstacle.debug = true
  
    flower.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,8));
    switch(rand) {
      case 1: flower.addImage(flower1);
      flower.scale = 0.2;
              break;
      case 2: flower.addImage(flower2);
      flower.scale = 0.008;
              break;
      case 3: flower.addImage(flower3);
      flower.scale = 0.4;
              break;
      case 4: flower.addImage(flower4);
       flower.scale = 0.4;
              break;
      case 5: flower.addImage(flower5);
      flower.scale = 0.5;
              break;
      case 6: flower.addImage(flower6);
      flower.scale = 0.6;
              break;
      case 7: flower.addImage(flower7);
      flower.scale = 0.7;
              break;
      case 8: flower.addImage(flower8);
      flower.scale = 0.001;
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    
    flower.lifetime = 300;
    flower.depth = girl.depth;
    girl.depth +=1;
    //add each obstacle to the group
    flowersGroup.add(flower);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  flowersGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  girl.changeAnimation("running",girl_running);
  
  score = 0;
  
}
