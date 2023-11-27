class OrGate extends TwoInputGate {
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
    return inputs[0] || inputs[1];
  }
  draw() {
    stroke(0);
    strokeWeight(1);
    noFill();
    arc(
      this.position[0],
      this.position[1] + this.scale / 2,
      this.scale / 2,
      this.scale,
      (3 * PI) / 2,
      PI / 2
    );
    arc(
      this.position[0],
      this.position[1] + this.scale / 2,
      this.scale * 2,
      this.scale,
      (3 * PI) / 2,
      PI / 2
    );
    super.draw();
  }
  checkInBody(point) {
    var condition1 = !this.checkInEllipse(
      point,
      [this.position[0], this.position[1] + this.scale / 2],
      this.scale / 4,
      this.scale / 2
    );
    var condition2 = this.checkInEllipse(
      point,
      [this.position[0], this.position[1] + this.scale / 2],
      this.scale,
      this.scale / 2
    );
    if (
      condition1 &&
      condition2 &&
      point[0] > this.position[0] &&
      point[1] > this.position[1]
    ) {
      return true;
    } else {
      return false;
    }
  }
  checkInEllipse(point, centre, a, b) {
    return (
      Math.pow(point[0] - centre[0], 2) / Math.pow(a, 2) +
        Math.pow(point[1] - centre[1], 2) / Math.pow(b, 2) <=
      1
    );
  }
  checkInCircle(point, centre, radius) {
    return super.checkInCircle(point, centre, radius);
  }
  dragAndDrop(origX, origY, signal) {
    return super.dragAndDrop(origX, origY, signal);
  }
}
