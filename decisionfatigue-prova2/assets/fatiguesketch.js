//Credits:
//reference: https://codepen.io/rkgttr/pen/ZGZzJG
let n = 0;
let thumbX;
let thumbY;
let thumbs = [];
let x = thumbX,
    y = thumbY,
    strength = 1000; // higher is stronger

function preload() {
  for (let i = 0; i <= 1; i++) {
    thumbs[i] = loadImage("./assets/images/thumbnail" + i + ".jpg");
  }
}

let mouseMoveHandler = function(e) {
      x = e.pageX;
      y = e.pageY;
    };

function draw() {
  while (n < 30) {
    n++;
    //console.log(n);
    thumbX = (n % 6 * 40)+50;
    thumbY = (Math.floor((n-1) / 6) * 40)+50;

    image (thumbs[i], thumbX, thumbY);

  }
}



let points = Array.from(document.querySelectorAll('img'),
    el => {
      return {
        thumbnail: el,
        x:Number(el.getAttribute('cx')),
        y:Number(el.getAttribute('cy')),
        ox:Number(el.getAttribute('cx')),
        oy:Number(el.getAttribute('cy'))
      };
    }),
    animate = function(){
      let dx,
          dy,
          dist,
          angle;
      points.forEach( ( el, i ) => {
        // start repulsion calculation
        dx = el.x - x;
        dy = el.y - y;
        angle = Math.atan2( dy, dx );
        dist = strength / Math.sqrt( dx * dx + dy * dy );
        el.x += Math.cos( angle ) * dist;
        el.y += Math.sin( angle ) * dist;
        el.x += (el.ox - el.x)*.1;
        el.y += (el.oy - el.y)*.1;
        // end repulsion calculation
        el.thumbnail.setAttribute('cx', el.x);
        el.thumbnail.setAttribute('cy', el.y);
      });
      window.requestAnimationFrame(animate);

    };

window.addEventListener('mousemove', mouseMoveHandler);
animate();
