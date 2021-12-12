function Content(x, y) {
  let options = {
    friction: 0.5,
    restitution: 0.5,
    mass: 0.1,
    isStatic: false
  };
  this.body = Bodies.rectangle(x, y, this.w, this.h);
	this.w = 100;
	this.h = 50;
  Composite.add(world, this.body);

  this.show = function() {
		let pos = this.body.position;
		let angle = this.body.angle;

		push();
		fill(0);
    translate(pos.x, pos.y);
		rotate(angle);
    ellipseMode(CENTER);
		ellipse(x, y, this.w);
		pop();
	}
}
