//Credits:
//reference for the animated text: https://openprocessing.org/sketch/825026


//GLOBAL VARIABLES:
//for the animated text
let t = 0;
let textArray = ["ARE YOU STILL WATCHING?  ARE YOU STILL WATCHING?  ARE YOU STILL WATCHING?  ARE YOU STILL WATCHING?  ARE YOU STILL WATCHING?"];
let textIndex = 0;
let horSpace = 30;
//for the pixel texture effect
let noiseGra;

function preload(){
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  background("rgb(245,245,245)");

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
  for (var a=0; a<18; a++) {
    for (var b=0; b < textArray[textIndex].length; b++) {
      fill(5,30,145);
      var dx = 40*sin(radians(t*2+b*30));
      var dxOff = 20*sin(radians(t*2+a*20));
      let letters = (textArray[textIndex].length)*textAscent();
      text(textArray[textIndex][b], horSpace*b+a*dxOff, (a*40));
    }
  }; pop();

  //pixel texture effect : draw
  image(noiseGra, 0, 0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
