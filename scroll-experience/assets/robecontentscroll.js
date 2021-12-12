function Content(x, y) {
  let options = {
    friction: 0.5,
    restitution: 0.5,
    mass: 0.1,
  };
  this.body = Bodies.rectangle(x, y, this.w, this.h);
	Composite.add(world, this.body);
	this.w = 100;
	this.h = 50;

  this.show = function() {
		var pos = this.body.position;
		var angle = this.body.angle;

		push();
		fill(0);
		ellipseMode(CENTER);
		translate(pos.x, pos.y);
		rotate(angle);
		ellipse(x, y, this.w);
		pop();
	}
}
