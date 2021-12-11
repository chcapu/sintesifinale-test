//Credits:
//reference for the animated text: https://openprocessing.org/sketch/825026

Matter.use("matter-attractors");

//GLOBAL VARIABLES:

//for the animated text
let t = 0;
let textArray = ["ARE YOU STILL WATCHING?  ARE YOU STILL WATCHING?  ARE YOU STILL WATCHING?  ARE YOU STILL WATCHING?  ARE YOU STILL WATCHING?"];
let textIndex = 0;
let horSpace = 30;

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
  image1 = loadImage("./assets/images/ehi.jpg");
  image2 = loadImage("./assets/images/2.JPG");
  image3 = loadImage("./assets/images/1.jpeg");
  image4 = loadImage("./assets/images/4.jpg");
}

/////////////////////////// SETUP //////////////////////////////
function setup() {
  canvas = createCanvas(windowWidth,windowHeight);
  background("rgb(245,245,245)");

  //matter.js interaction : setup
  engine = Engine.create();
  let runner = Runner.create();
  world = engine.world;
  engine.world.gravity.y = 0.9;
  Matter.Runner.run(engine);
  myImages.push(image1, image2, image3, image4);

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

  attractiveBody = Bodies.circle(mouseX, mouseY, 10, {
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



  //text settings for animated array : setup
  textFont("IBM Plex Mono");
  textSize(20);
  textStyle(NORMAL);
  textAlign(CENTER);

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
  blendMode(HARD_LIGHT);
  background("rgba(245,245,245,1)");
  pop();

  //animated text array effect : draw
  t++;
  let textWid = textWidth(textArray[textIndex]);
  push();
  translate((windowWidth/2)-(textWid/2+400), -50);
  // for (var a=0; a<18; a++) {
  //   for (var b=0; b < textArray[textIndex].length; b++) {
  //     fill(5,30,145);
  //     var dx = 40*sin(radians(t*2+b*30));
  //     var dxOff = 20*sin(radians(t*2+a*20));
  //     let letters = (textArray[textIndex].length)*textAscent();
  //     text(textArray[textIndex][b], horSpace*b+a*dxOff, (a*40));
  //   }
  // };
  pop();

  //matter.js interaction : draw
  if (boxes.length <= 3) {
    //for (let i = 0; i < 1; i++) {
    boxes.push(new Box(myImages[0], windowWidth/2, windowHeight/2, 280, 280, "Netflix")); //netflix
    boxes.push(new Box(myImages[1], windowWidth/2, windowHeight/2, 270, 270, "Prime Video")); //prime video
    boxes.push(new Box(myImages[2], windowWidth/2, windowHeight/2, 250, 250, "YouTube")); //youtube
    boxes.push(new Box(myImages[3], windowWidth/2, windowHeight/2, 220, 220, "Twitch")); //twitch
    boxes.push(new Box(myImages[4], windowWidth/2, windowHeight/2, 190, 190, "Disney+"));
    boxes.push(new Box(myImages[5], windowWidth/2, windowHeight/2, 150, 150, "Apple TV+"));
    boxes.push(new Box(myImages[6], windowWidth/2, windowHeight/2, 130, 130, "Hulu"));
    boxes.push(new Box(myImages[7], windowWidth/2, windowHeight/2, 120, 120, "HBO"));
    boxes.push(new Box(myImages[8], windowWidth/2, windowHeight/2, 110, 110, "Peacock"));
    boxes.push(new Box(myImages[9], windowWidth/2, windowHeight/2, 100, 100, "DAZN"));
    //}
  }

  for (let i = 0; i < boxes.length; i++) {
    boxes[i].show();
  }

  moveIt();


  //pixel texture effect : draw
  //image(noiseGra, 0, 0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
