//Credits:
//reference:

//GLOBAL VARIABLES:
let canvas;
let thumbnails = [];
let particles = [];
let attractor;


/////////////////////////////////////////////////////////////////
function preload(){
  for (let i = 0; i <= 1; i++) {
    thumbnails[i] = loadImage("./assets/images/thumbnail" + i + ".jpg");
  }
}

/////////////////////////// SETUP //////////////////////////////
function setup() {
  canvas = createCanvas(windowWidth,windowHeight);
  background("rgb(245,245,245)");
}


/////////////////////////// DRAW //////////////////////////////
function draw() {
  //attractor
  attractor = createVector(mouseX, mouseY);
  push();
  stroke(0, 255, 0);
  strokeWeight(5);
  point(attractor.x, attractor.y);
  pop();
  

  //thumbnails
  background(51);
  stroke(255);
  strokeWeight(4);
  particles.push(new Particle(random(width), random(height)));

  if (particles.length > 100) {
    particles.splice(0, 1);
  }

  for (let i = 0; i < particles.length; i++) {
    var particle = particles[i];
    particle.attracted(attractor);
    particle.update();
    particle.show();
  }

}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }
