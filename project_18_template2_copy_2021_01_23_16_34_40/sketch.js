var banana,bananaImage,bananaGroup;

var jungle,jungleImage;

var monkey,monkeyImage;

var ground,groundImage;

var score;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var stone,stoneImage,obstaclesGroup;

var gameOver,gameOverImage;

var restart,restartImage;




function preload(){
  
  monkeyImage = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  
  bananaImage = loadImage("banana.png");
  
  jungleImage = loadImage("jungle.jpg");
  
  stoneImage = loadImage("stone.png");
  
  gameOverImage = loadImage("gameOver.png");
  
  restartImage = loadImage("restart.png");
  
  
  bananaGroup = new Group();
  obstaclesGroup = new Group();
  
}

function setup(){
  createCanvas(600, 400);
  jungle = createSprite(300,200,600,400);
  jungle.addAnimation("jungle",jungleImage);
  jungle.scale = 1.2;
  
  monkey = createSprite(90,350,50,70);
  monkey.addAnimation("monkey",monkeyImage);
  monkey.scale = 0.2;
  
  ground = createSprite(300,400,600,20);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  gameOver = createSprite(300,100,40,70);
  gameOver.addImage("GAMEOVER",gameOverImage);
  gameOver.scale = 0.5
  
  restart = createSprite(300,160,20,20);
  restart.addImage("restart",restartImage)
  restart.scale = 1
  
  score = 0;
  
}

function draw(){

  monkey.collide(ground);
  
  ground.visible = false;
  
  if(gameState === PLAY){
    
  spawnfruits();
  spawnstone();
    
    
    
  jungle.velocityX = -3
    
   if(keyDown("space") && monkey.y > 150) {
    monkey.velocityY = -10;
     }
    
     monkey.velocityY = monkey.velocityY + 0.8;
  
  if (ground.x < 0){
    ground.x = ground.width/4;
  }
  
  if (jungle.x < 0){
    jungle.x = jungle.width/2;
  } 
    
    if(bananaGroup.isTouching(monkey)){
      score = score+2
      bananaGroup.destroyEach ();
      
     }
     
    switch(score){
      case 10 : monkey.scale = 0.25
               break;
      case 20 : monkey.scale = 0.3
               break;
      case 30 : monkey.scale = 0.35
               break;          
      case 40 : monkey.scale = 0.4
               break;
      case 50 : monkey.scale = 0.45
               break; 
      case 60 : monkey.scale = 0.5
               break;
      case 70 : monkey.scale = 0.55
               break;  
      case 80 : monkey.scale = 0.6
               break;           
      case 90 : monkey.scale = 0.65
               break;           
      case 100 : monkey.scale = 0.7
               break;           
               
      default : break;
      }
     
                
   if(obstaclesGroup.isTouching(monkey) && monkey.scale === 0.2)
{
  gameState = END; 
} 
    
    if(obstaclesGroup.isTouching(monkey) && monkey.scale === 0.25 || monkey.scale === 0.3 || monkey.scale === 0.35 || monkey.scale === 0.4 || monkey.scale === 0.45 || monkey.scale === 0.5 || monkey.scale === 0.55 || monkey.scale === 0.6 || monkey.scale === 0.65 || monkey.scale === 0.7 ){
      monkey.scale = 0.2;
      obstaclesGroup.destroyEach();
    
      
    }
    

 gameOver.visible = false;
    restart.visible = false; 
  }
  
  else if(gameState === END)
  {
   gameOver.visible = true;
    restart.visible = true;
    
    jungle.velocityX = 0;
  
  ground.velocityX = 0;
  
    
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
    ground.velocityX = 0;
    
    monkey.velocityY = 0;
    
    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
    if(mousePressedOver(restart)){
      reset();
    } 
    
    
  }
  
  
  
  
  drawSprites();
  
  textSize(20);
  stroke("white");
  fill("white");
  text("Survival Time: "+ score, 430,50);
  
}

function spawnfruits(){
  
  if (frameCount % 120 === 0) {
    banana = createSprite(600,120,40,10);
    banana.addImage("banana",bananaImage);
    banana.scale = 0.07;
    
    banana.y = Math.round(random(180,290));
    
    banana.velocityX = -5;
    banana.lifetime = 250;
    
    banana.depth = monkey.depth;
    banana.depth = monkey.depth + 1;
    
    bananaGroup.add(banana);
  }
  
}

 function spawnstone() {
    if(World.frameCount % 300 === 0) {
    var stone = createSprite(600,490,10,40);
    stone.velocityX = -6;
    stone.y = 345
    stone.addImage("Stone",stoneImage);  
    stone.scale = 0.30;
    stone.lifetime = 120;
    obstaclesGroup.add(stone);
    }
    }

function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  bananaGroup.destroyEach();
  score = 0;

}

