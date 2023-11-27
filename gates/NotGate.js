class NotGate extends OneInputGate {
  constructor(
    position,
    scale,
    input,
    output,
    wireLocations
  ) {
    super(position, scale, input, output, wireLocations);
    this.origMX = super.origMX;
    this.origMY = super.origMY;
    this.dragged = super.dragged;
  }
  evaluate() {
    var inputs = super.evaluate();
    return !inputs;
  }
  draw() {
    stroke(0);
    strokeWeight(1);
    line(
      this.position[0],
      this.position[1],
      this.position[0],
      this.position[1] + this.scale
    );
    line(
      this.position[0],
      this.position[1],
      this.position[0] + this.scale,
      this.position[1] + this.scale / 2
    );
    line(
      this.position[0],
      this.position[1] + this.scale,
      this.position[0] + this.scale,
      this.position[1] + this.scale / 2
    );
    super.draw();
  }
  area(x1, y1, x2, y2, x3, y3) {
    return Math.abs((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2.0);
  }
  checkInBody(point) {
    var x = point[0];
    var y = point[1];
    var x1 = this.position[0];
    var y1 = this.position[1];
    var x2 = this.position[0];
    var y2 = this.position[1] + this.scale;
    var x3 = this.position[0] + this.scale;
    var y3 = this.position[1] + this.scale / 2;
    var diff_x = x - x1;
    var diff_y = y - y1;

    var cond_ab = (x2 - x1) * diff_y - (y2 - y1) * diff_x > 0;

    if ((x3 - x1) * diff_y - (y3 - y1) * diff_x > 0 == cond_ab) return false;
    if ((x3 - x2) * (y - y2) - (y3 - y2) * (x - x2) > 0 != cond_ab) {
      return false;
    }
    return true;
  }
  checkInCircle(point, centre, radius) {
    return super.checkInCircle(point, centre, radius);
  }
  dragAndDrop(origX, origY, signal) {
    return super.dragAndDrop(origX, origY, signal);
  }
}
