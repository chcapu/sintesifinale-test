//Credits:
//reference for the animated text: https://openprocessing.org/sketch/825026


let t = 0;
let textArray = ["ARE YOU STILL WATCHING?  ARE YOU STILL WATCHING?  ARE YOU STILL WATCHING?  ARE YOU STILL WATCHING?  ARE YOU STILL WATCHING?"];
let textIndex = 0;
let horSpace = 30;

function preload(){
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  background("white");

  //text settings for animated array
  textFont("IBM Plex Mono");
  textSize(20);
  textAlign(CENTER);
}

function draw() {
  //animated text array effect
  background("white");
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
}
