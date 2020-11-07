var dog, dogImg, happyDog;
var database;
var foodS,foodStock;
function preload()
{
 dogImg=loadImage("images/dogImg.png");
 happyDog=loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  dog=createSprite(250,250);
  dog.addImage('dog', dogImg);
  dog.scale=0.2;
  database=firebase.database();
  foodStock=database.ref('food');
  foodStock.on("value", readStock, showerror);
  
}


function draw() {  
  background(46, 139, 87);
  

  if(keyDown(UP_ARROW)){
    writeStocks(foodS);
    dog.addImage(happyDog);
  }
  drawSprites();
  //add styles here
  text("Press UP_ARROW to feed the dog", 250, 20);
}

function readStock(data){
  foodS-data.val();
  console.log(foodS);
}
function showerror(){
  console.log("error");
}
function writeStocks(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    food:x
  })
}


