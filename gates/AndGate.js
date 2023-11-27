class AndGate extends TwoInputGate {
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
    return inputs[0] && inputs[1];
  }
  draw() {
    //left boundary of gate
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
      this.position[0] + this.scale / 2,
      this.position[1]
    );
    line(
      this.position[0],
      this.position[1] + this.scale,
      this.position[0] + this.scale / 2,
      this.position[1] + this.scale
    );
    //semicircle for AND gate
    noFill();
    arc(
      this.position[0] + this.scale / 2,
      this.position[1] + this.scale / 2,
      this.scale,
      this.scale,
      (3 * PI) / 2,
      PI / 2
    );
    super.draw();
  }
  checkInBody(point) {
    var condition1x =
      point[0] >= this.position[0] &&
      point[0] <= this.position[0] + this.scale / 2;
    var condition1y =
      point[1] >= this.position[1] && point[1] <= this.position[1] + this.scale;
    var condition2x = point[0] >= this.position[0] + this.scale / 2;
    var condition2circle =
      Math.sqrt(
        Math.pow(point[0] - this.position[0] - this.scale / 2, 2) +
          Math.pow(point[1] - this.position[1] - this.scale / 2, 2)
      ) <=
      this.scale / 2;
    if ((condition1x && condition1y) || (condition2x && condition2circle)) {
      return true;
    } else {
      return false;
    }
  }
  checkInCircle(point, centre, radius) {
    return super.checkInCircle(point, centre, radius);
  }
  dragAndDrop(origX, origY, signal) {
    return super.dragAndDrop(origX, origY, signal);
  }
}
