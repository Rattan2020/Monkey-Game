
var monkey , monkey_running;
var ground2,ground,groundImg;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivaltime=0;
var score=0;   
var PLAY=1;
var END=0;
var gState=PLAY;
var monkeycollided;
var gover,go;
var restart,start;

function preload(){
  
  
 monkey_running=loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
  monkeycollided=loadAnimation("monkey_2.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImg=loadImage("road.jpg");
  
  gover=loadImage("gameover.jpg");  
  
  restart=loadImage("restart.png");
}



function setup() {
  createCanvas(400,400);
  
 
  ground=createSprite(200,150,800,10);
  ground.addImage("groun",groundImg);
  
  ground.scale=2;

  
  monkey=createSprite(80,210,0,0);
  monkey.addAnimation("moving",monkey_running);
  monkey.addAnimation("stop",monkeycollided);
  monkey.scale=0.1;
  
  ground2=createSprite(200,240,400,10);
  ground2.visible=false;
  
  FoodGroup=new Group();
  
  obstacleGroup=new Group();
  
  go=createSprite(190,150);
  go.addImage(gover);
  go.scale=0.1;

  start=createSprite(210,200);
  start.addImage(restart);
  start.scale=0.3;
}


function draw() {
  
  background("pink");
 
  monkey.setCollider("circle",0,0,250)
 
  if (gState===PLAY){
    
    go.visible=false;
    start.visible=false;
    survivaltime=Math.ceil(frameCount/frameRate());   
    
    ground.velocityX=-10;
    if(ground.x===50){
    ground.x=200;
  }
  if (keyDown("space")&&(monkey.y>200)){
    monkey.velocityY=-13;
  }
    monkey.velocityY=monkey.velocityY+0.8;
  
    food();
  
    obstacles();
    
  if (monkey.isTouching(FoodGroup)){
    score=score+1;
    FoodGroup.destroyEach();
  }
    if (monkey.isTouching(obstacleGroup)){
    gState=END;
    }
  
  }
  
  if (gState===END){
    
    go.visible=true;
    start.visible=true;
    monkey.changeAnimation("stop",monkeycollided);
    
    
    monkey.y=210;
    monkey.velocityY=0;
    ground.velocityX=0;
    
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
   
    
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
  
    if (mousePressedOver(start)){
    reset();
    }
  }
  
  monkey.collide(ground2);
  
  drawSprites();
  
  fill("black");
  textSize(20);
  text("SCORE: "+score,150,100);
  
  fill("black");
  textSize(20);
  text("SURVIVAL TIME=  "+survivaltime,100,50);

}

function reset(){

  obstacleGroup.destroyEach();
  FoodGroup.destroyEach();
  frameCount=0;
  score=0;
  gState=PLAY;
  monkey.changeAnimation("moving",monkey_running);
  
  
}


function food(){
  
  if (World.frameCount%80===0){
    banana=createSprite(400,Math.round(random(120,200)))
    banana.addImage(bananaImage);
    banana.scale=0.07;
    banana.velocityX=-10;
    banana.lifetime=80;
    FoodGroup.add(banana);
  }
}


function obstacles(){
  
  
  if (World.frameCount%300===0){
    obstacle=createSprite(400,200);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.17;
    obstacle.velocityX=-10;
    obstacle.lifetime=80;
    obstacleGroup.add(obstacle);
  }
}



