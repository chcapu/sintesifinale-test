//Credits:
//reference for the animated text: https://openprocessing.org/sketch/825026

Matter.use("matter-attractors");

//GLOBAL VARIABLES:

//for the loading animation
let angl = 0;
loading = true;

//for the pixel texture effect
let noiseGra;

//for matter.js interaction
let Engine = Matter.Engine,
  World = Matter.World,
  Body = Matter.Body,
  Bodies = Matter.Bodies,
  Events = Matter.Events,
  Runner = Matter.Runner,
  Render = Matter.Render,
  Composite = Matter.Composite,
  Composites = Matter.Composites,
  Constraint = Matter.Constraint,
  Mouse = Matter.Mouse,
  MouseConstraint = Matter.MouseConstraint;

let image1, image2, image3, image4;
let canvas;
let canvasmouse;

let engine;
let world;
let box1;
let boxes = [];
let attractiveBody;

let boundaries = [];
let myImages = [];
let rx, ry, rz;

let box2;
let mConstraint;
let render;
let mouse;

/////////////////////////////////////////////////////////////////

function preload(){
  for (let i = 0; i <= 3; i++) {
    myImages[i] = loadImage("./assets/images/btn" + i + ".png", imagesLoaded);
  }
}

function imagesLoaded() {
  console.log("images are loaded");
  loading = false;
}

/////////////////////////// SETUP //////////////////////////////
function setup() {
  canvas = createCanvas(windowWidth,windowHeight);
  //canvas.style("z-index", "1");
  background("rgb(245,245,245)");

  //matter.js interaction : setup
  engine = Engine.create();
  let runner = Runner.create();
  world = engine.world;
  engine.world.gravity.y = 0.9;
  Matter.Runner.run(engine);

//Boundaries
  // push()
  // boundaries.push(new Boundary(width / 2, height, width, 10, 0));
  // boundaries.push(new Boundary(width / 2, 0, width, 10, 0));
  // boundaries.push(new Boundary(0, height / 2, 10, height, 0));
  // boundaries.push(new Boundary(width, height / 2, 10, height, 0));
  // pop()

  render = Render.create({
    element: canvas.elt,
    engine: engine,
    options3: {
      showVelocity: false,
      width: 100,
      height: 100,
      wireframes: false,
      background: "rgb(245,245,245)",
    },
  });
  World.add(world, render);

  mouse = Mouse.create(render.canvas.elt); //add mouse control

  attractiveBody = Bodies.circle(mouseX, mouseY, 20, {
    render: {
      fillStyle: `rgb(245,245,245)`,
      strokeStyle: `rgb(245,245,245)`,
      lineWidth: 0,
    },
    isStatic: true,
    plugin: {
      attractors: [
        function (bodyA, bodyB) {
          return {
            x: (bodyA.position.x - bodyB.position.x) * 1e-6,
            y: (bodyA.position.y - bodyB.position.y) * 1e-6,
          };
        },
      ],
    },
  });
  World.add(world, attractiveBody);



  //pixel texture effect : setup
  noiseGra = createGraphics(windowWidth, windowHeight);
	noiseGra.loadPixels()
	for( let  x=0; x<=width; x++){
		for(let y=0; y<=height; y++){
      noiseGra.set(x, y, color(200, noise(x/10,y/10,x*y/50)*random([0,40,80])))
		}
	} noiseGra.updatePixels();
}


/////////////////////////// DRAW //////////////////////////////
function draw() {
  push();
  //blendMode(HARD_LIGHT);
  background("rgb(245,245,245)");
  pop();

  //matter.js interaction : draw
  if (boxes.length <= 3) {
    //for (let i = 0; i < 1; i++) {
    boxes.push(new Box(myImages[0], windowWidth/2, windowHeight/2, 286, 96));
    boxes.push(new Box(myImages[1], windowWidth/2, windowHeight/2, 217, 75));
    boxes.push(new Box(myImages[2], windowWidth/3, windowHeight/2, 162, 60));
    boxes.push(new Box(myImages[3], windowWidth/3, windowHeight/2, 280, 96));
    //}
  }

  for (let i = 0; i < boxes.length; i++) {
    boxes[i].show();
  }

  moveIt();


  //pixel texture effect : draw
  // push();
  // blendMode(MULTIPLY);
  // image(noiseGra, 0, 0);
  // pop();
}

function windowResized() {
  canvas = resizeCanvas(windowWidth, windowHeight);
}
