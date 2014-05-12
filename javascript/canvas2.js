// Get Canvas
var canvas = document.getElementById("canvas"), 
  ctx = canvas.getContext("2d"),
  width = 512,
  height = 480;

canvas.width = width;
canvas.height = height;

// Background Image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
  bgReady = true;
};
bgImage.src = "http://placekitten.com//512/480";
// Hero Image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
  heroReady = true;
};
heroImage.src = "http://placekitten.com/32/32";

// Monster Image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
  monsterReady = true;
};
monsterImage.src = "http://placekitten.com/30/32";

// Game objects
var hero = {
  speed: 256,
  x: 0,
  y: 0
};

var monster = {
  x: 0,
  y: 0
};
var monstersCaught = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
  keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
  delete keysDown[e.keyCode];
}, false);

var reset = function () {
  hero.x = (canvas.width / 2) - 16;
  hero.y = (canvas.height / 2) - 16;
  
  monster.x = 32 + (Math.random() * (canvas.width - 64));
  monster.y = 32 + (Math.random() * (canvas.height - 64));
};

// Update game objects
var update = function (modifier) {
  if (38 in keysDown) {
    hero.y -= hero.speed * modifier;
  }
  if (40 in keysDown) {
    hero.y += hero.speed * modifier;
  }
  if (37 in keysDown) {
    hero.x -= hero.speed * modifier;
  }
  if (39 in keysDown) {
    hero.x += hero.speed * modifier;
  }
  
  // Stop from going off the page
  if (hero.x >= canvas.width - 32) {
    hero.x = canvas.width - 32;
  } else if (hero.x <= 0) {
    hero.x = 0;
  }
  
  if (hero.y >= canvas.height - 32) {
    hero.y = canvas.height - 32;
  } else if (hero.y <= 0) {
    hero.y = 0;
  }
  
  // Collision
  if (hero.x <= (monster.x + 32) && monster.x <= (hero.x + 32) && hero.y <= (monster.y + 32) && monster.y <= (hero.y + 32)) {
    ++monstersCaught;
    reset();
  }
};

// Render
var render = function () {
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }
  
  if (heroReady) {
    ctx.drawImage(heroImage, hero.x, hero.y);
  }
  
  if (monsterReady) {
    ctx.drawImage(monsterImage, monster.x, monster.y);
  }
  
  ctx.fillStyle = "rgb(250, 250, 250)";
  ctx.font = "24px Helvetica";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Monsters caught : " + monstersCaught + ". " + countDown, 32, 32);
  //ctx.fillText("Seconds Up : " + countDown, 32, 32);
};

var main = function () {
  now = Date.now();
  var delta = now - then;
  
  var nowSwitch = Date.now();
  countDown = nowSwitch - thenSwitch;
  
  update(delta / 1000);
  if (countDown >= 1500) {
    thenSwitch = nowSwitch;
    reset();
  }
  render();
  
  then = now;
  
  requestAnimationFrame(main);
};

var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

var then = Date.now(), nowSwitch = Date.now();
var thenSwitch = Date.now();
var countDown = 0;
reset();
main();
