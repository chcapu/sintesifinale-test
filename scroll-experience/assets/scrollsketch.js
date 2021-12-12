//Credits:
//reference: https://brm.io/matter-js/demo/#gravity

//GLOBAL VARIABLES:

//for matter.js
let Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composites = Matter.Composites,
        Common = Matter.Common,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        Composite = Matter.Composite,
        Bodies = Matter.Bodies,
        World = Matter.World,
        Body = Matter.Body,
        Events = Matter.Events,
        Constraint = Matter.Constraint;

let engine;
let world;
let render;
let runner;
let stack;
let mouse;
let mouseConstraint;

let canvas;
let contents = [];

/////////////////////////////////////////////////////////////////

function preload(){
}

/////////////////////////// SETUP //////////////////////////////
function setup() {
  canvas = createCanvas(windowWidth,windowHeight);
  background("rgb(245,245,245)");

  // matter.js : setup
  engine = Engine.create();
  runner = Runner.create();
  world = engine.world;
  //engine.gravity.y = -1;
  Matter.Runner.run(engine);

  render = Render.create({
    element: canvas.elt,
    engine: engine,
    options: {
        width: 800,
        height: 600,
        showVelocity: true,
        showAngleIndicator: true,
        wireframes: false,
        background: "rgb(245,245,245)",
    }
  });
  Composite.add(world, render);
  Render.run(render);
  Runner.run(runner, engine);


  // add bodies
  Composite.add(world, [
      Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
      Bodies.rectangle(400, 600, 800, 50.5, { isStatic: true }),
      Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
      Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
  ]);
  engine.gravity.y = -1;

  // stack = Composites.stack(50, 120, 11, 5, 0, 0, function(x, y) {
  //     switch (Math.round(Common.random(0, 1))) {
  //
  //     case 0:
  //         if (Common.random() < 0.8) {
  //             return Bodies.rectangle(x, y, Common.random(20, 50), Common.random(20, 50));
  //         } else {
  //             return Bodies.rectangle(x, y, Common.random(80, 120), Common.random(20, 30));
  //         }
  //     case 1:
  //         return Bodies.polygon(x, y, Math.round(Common.random(1, 8)), Common.random(20, 50));
  //     }
  // });
  //Composite.add(world, stack);

  // add mouse control
  mouse = Mouse.create(render.canvas);
  mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false
      }
    }
  });

  Composite.add(world, mouseConstraint);

  // keep the mouse in sync with rendering
  render.mouse = mouse;

  // fit the render viewport to the scene
  Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: 800, y: 600 }
  });

  // context for MatterTools.Demo
  return {
      engine: engine,
      runner: runner,
      render: render,
      canvas: render.canvas,
      stop: function() {
          Matter.Render.stop(render);
          Matter.Runner.stop(runner);
      }
    };
}


/////////////////////////// DRAW //////////////////////////////
function mouseClicked() {
  contents.push(new Content(mouseX, mouseY));
  console.log(contents);
}

function draw() {
  // contents.push(new Content(400,500));
  for (let i = 0; i < contents.length; i++) {
    contents[i].show();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
