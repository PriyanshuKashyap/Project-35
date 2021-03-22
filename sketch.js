//Create variables here
var dogSprite, dog, happyDog, database, foodS, foodStock;
var feed, addFood, fedTime, lastFed;
var foodObj, button;
function preload()
{
  //load images here
  dog = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");

}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  //createCanvas(900, 500);
  dogSprite = createSprite(width/2, height/2, 10, 10);
  dogSprite.addAnimation("dog", dog);
  dogSprite.scale = 0.5;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  foodObj = new Food();

  feed = createButton("Feed the dog");
  feed.position(675, 165);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(775, 165);
  addFood.mousePressed(addFoods);
  //increment.mousePressed(addFoods);
}


function draw() {  
  background(46, 139, 87);
  /*fill("white");
  text("Note: Press UP_ARROW key to feed Drago Milk!", width/2 - 170, 20);*/
  /*if (keyWentDown(UP_ARROW)) {
    writeStock(foodS);

  }*/
  fill(255, 255, 254);
  textSize(15);
  if (lastFed >= 12) {
    text("Last feed: " + lastFed%12 + " PM", 350, 30);
    //text("Last feed: " + lastFed%12 + " PM", 750, 30);
  } else if (lastFed === 0) {
    text("Last fed: 12 AM", 350, 30);
    //text("Last fed: 12 AM", 750, 30);

  } else {
    text("Last Feed: " + lastFed + " AM", 350, 30);
    //text("Last Feed: " + lastFed + " AM", 750, 30);
  }

  drawSprites();
  //add styles here
  fill("white");
  text("Foodstock remaining: " + foodS, width/2, height/2 - 200);
  textSize(40);
  stroke("white");
  foodObj.display();
  fedTime = database.ref("FeedTime");
  fedTime.on("value", function(data) {
    lastFed = data.val();
  });

  
}

function addFoods() {
  foodS++;
  database.ref("/").update({
    "Food": foodS
  });
}

function feedDog() {

  //foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
  
  if (foodS <= 0) {
    foodS = 0;
    dogSprite.addImage("dog", happyDog);
    
  } else {
    foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
    dogSprite.addImage("dog", dog);
  }

  database.ref("/").update({
    "Food": foodObj.getFoodStock(),
    "FeedTime": hour()
  });
  image(foodObj.img, 350, 200, 50, 50);
}

function readStock(data) {
  foodS = data.val();
  //dogSprite.addImage(happyDog);
}

/*function writeStock(x) {
  if (x <= 0) {
    x = 0
    dogSprite.addImage("dog", happyDog);
  } else {
    x = x - 3;
  }

  database.ref('/').set({
    'Food': x
  });
}*/