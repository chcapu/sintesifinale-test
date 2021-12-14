//Credits:
//reference: https://codepen.io/rkgttr/pen/ZGZzJG

let x = 0,
    y = 0,
    strength = 1000, // higher is stronger
    mouseMoveHandler = function(e) {
      x = e.pageX;
      y = e.pageY;
    },
    points = Array.from(document.querySelectorAll('circle'), el => {
      return {
        circle: el,
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
        el.circle.setAttribute('cx', el.x);
        el.circle.setAttribute('cy', el.y);
      });
      window.requestAnimationFrame(animate);

    };
window.addEventListener('mousemove', mouseMoveHandler);
animate();
