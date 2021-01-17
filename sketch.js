var sword;
var PLAY=1;
var END=0;
var gameState=1;
var  fruits,fruit,fruitGroup,enemyGroup,monster,kniefSwooshSound,gameOverSound;
function preload(){
  swordImage=loadImage("sword.png");
  fruit1=loadImage("fruit1.png");
  fruit2=loadImage("fruit2.png");
  fruit3=loadImage("fruit3.png");
  fruit4=loadImage("fruit4.png");
  monsterImage=loadImage("alien1.png");
 monsterImage=loadImage("alien2.png");
gameOverImage=loadImage("gameover.png");
  kniefSwooshSound=loadSound("knifeSwooshSound.mp3");
  gameOverSound=loadSound("gameover.mp3");
}

function setup(){
createCanvas(600,600);
  
  sword=createSprite(40,200,20,20)
  sword.addImage(swordImage);
  sword.scale=0.7
  
  sword.setCollider("rectangle",0,0,40,40)
  
  score=0;
  fruitGroup=createGroup();
  enemyGroup=createGroup();
}

function draw(){
  background("lightblue");
  if (gameState===PLAY){
    fruits();
  enemy();
    if (fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      kniefSwooshSound.play();
      score=score+2;
    }
    
    sword.y=World.mouseY;
    sword.x=World.mouseX;
    text("Score :"+score,300,30);
  if (score==4||score>4){
       fruitGroup.setVelocityXEach(15);
     }
    if (score==10||score>10){
      enemyGroup.setVelocityXEach(-20);
    }
      if (enemyGroup.isTouching(sword)){
    gameState=END
        gameOverSound.play();
  }
  } else if(gameState===END){
    enemyGroup.destroyEach();
    fruitGroup.destroyEach();
    enemyGroup.setVelocityXEach(0);
    fruitGroup.setVelocityXEach(0);
    sword.addImage(gameOverImage);
    sword.x=200;
    sword.y=200;
  }

  
 drawSprites();
}
function fruits(){
  if (World.frameCount%80===0){
    position=Math.round(random(1,2))
    fruit=createSprite(400,200,20,20) 
    fruit.scale=0.2;
    r=Math.round(random(1,4));
    if (r==1){
      fruit.addImage(fruit1);
    } else if(r==2){
      fruit.addImage(fruit2);
    } else if(r==3){
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
     if (position==1){
       fruit.x=400;
       fruit.velocityX=-(7+(score/4));
     }
    else
      {
        if (position==2){
          fruit.x=0
          fruit.velocityX=(7+(score/4))
        }
      }
    fruitGroup.add(fruit);
  }
    
}
function enemy(){
  if (World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving",monsterImage)
    monster.y=Math.round(random(100,300));
    monster.velocityX=-(8+(score/10));
    monster.setlifetime=50;
    enemyGroup.add(monster);
  }
}