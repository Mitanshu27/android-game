var ship;
var asteroids = [];
var lasers = [];
var score = 0;
var health = 200;
var mission = "Not on mission";
var rand;
var gamestate = "start";
var bg_img, bg1_img, bg2_img;
var sound;
var timer = 30, timerstatus = "stop";
function preload()
{
  bg_img = loadImage("Bg.png");
  bg1_img = loadImage("Bg2.png");
  bg2_img = loadImage("1.png");
}
function setup() 
{
  createCanvas(windowWidth, windowHeight);
  ship = new Ship();
  sound = loadSound('gun-gunshot-02.mp3');
  for (var i = 0; i < 5; i++) 
  {
    asteroids.push(new Asteroid());
  }
}

function draw() 
{
  if(gamestate === "start")
  {
    background(bg_img);
  }
  if(gamestate === "play")
  {
    background(bg2_img);
  fill(255,255,255);
  rect(10,10,270,120);
  textSize(20);
  fill(0,0,0);
  text("Score:- "+score, 20,30);
  textSize(20);
  fill(0,0,0);
  text("Health:- "+health, 20,60);
  textSize(20);
  fill(0,0,0);
  text("Timer:- "+timer, 20,120);
  textSize(20);
  fill(255,255,255);
  text("Press M to get a new mission and reset the timer ", 280,30);
  textSize(20);
  fill(255,255,255);
  text("Save your Ship from asteroids ", 280,60);
  textSize(20);
  fill(255,255,255);
  text("Press SPACE to destroy asteroids ", 280,90);
  textSize(20);
  fill(0,0,0);
  text("Mission:- "+mission, 20,90);
  if(health === 0)
  {
    gamestate = "end";
  }
  if(rand === 0)
  {
    mission = "Mission Complete";
  }
  if(score = score+rand)
  {
    mission = "Mission Complete";
  }
  if(timerstatus === "start")
  {
    if(frameCount%60 === 0)
    {
      timer -= 1;
    }
  }
  if(timer === 0 && mission != "Mission Complete")
  {
    mission = "Mission Failed";
    timer = 30;
    timerstatus = "stop";
  }
  for (var i = 0; i < asteroids.length; i++) 
  {
    if (ship.hits(asteroids[i])) 
    {
      health -= 1;
    }
    asteroids[i].render();
    asteroids[i].update();
    asteroids[i].edges();
  }

  for (var i = lasers.length - 1; i >= 0; i--) 
  {
    lasers[i].render();
    lasers[i].update();
    if (lasers[i].offscreen()) 
    {
      lasers.splice(i, 1);
    } 
    else 
    {
      for (var j = asteroids.length - 1; j >= 0; j--) 
      {
        if (lasers[i].hits(asteroids[j])) 
        {
          if (asteroids[j].r > 10) 
          {
            var newAsteroids = asteroids[j].breakup();
            asteroids = asteroids.concat(newAsteroids);
            score+=1;
            if(mission != "Mission Failed")
            {
              rand -= 1;
            }
            /*if(score = score+rand)
            {
              mission = "Mission Complete";
            }*/
          }
          asteroids.splice(j, 1);
          lasers.splice(i, 1);
          score += 2;
          break;
        }
      }
    }
  }

  console.log(lasers.length);
  ship.render();
  ship.turn();
  ship.update();
  ship.edges();
  console.log(mouseX);
  console.log(mouseY);
  }
  if(gamestate === "end")
  {
    background(bg1_img);
    console.log("end");
  }
  console.log(gamestate);
}

function keyReleased() 
{
  ship.setRotation(0);
  ship.boosting(false);
}

function keyPressed() 
{
  if (keyCode === 32 || (touches.length > 0 && mouseX)) 
  {
    lasers.push(new Laser(ship.pos, ship.heading));
    sound.play();
    touches = [];
  } 
  else if (keyCode == RIGHT_ARROW) 
  {
    ship.setRotation(0.1);
  } 
  else if (keyCode == LEFT_ARROW) 
  {
    ship.setRotation(-0.1);
  } 
  else if (keyCode == UP_ARROW) 
  {
    ship.boosting(true);
  }
  else if(touches[length-1][0]===240 && touches[length-1][1]===564)
  {
    ship.boosting(true);
  }
  else if(keyCode === 77)
  {
    rand = Math.round(random(1,3));
    mission = "Destroy "+rand+" asteroids";
    timerstatus = "start";
    timer = 30;
  }
  else if(keyCode === 13)
  {
    gamestate = "play";
  }
  else if(touches.length > 0)
  {
    touches = [];
    gamestate = "play";
  }
}