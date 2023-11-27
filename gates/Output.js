class Output extends OneInputGate {
  constructor(position, scale, input, output) {
    super(position, scale, input, output);
    this.origMX = super.origMX;
    this.origMY = super.origMY;
    this.dragged = super.dragged;
    this.display = 0;
  }
  evaluate() {
    if (this.input[0] instanceof Gate) {
      var inputs = super.evaluate();
      this.display=inputs;
      return inputs;
    } else {
      this.display=0;
      return 0;
    }
  }
  draw() {
    stroke(0);
    strokeWeight(1);
    fill(0, 255, 0);
    ellipse(
      this.position[0] + this.scale / 2,
      this.position[1] + this.scale / 2,
      this.scale,
      this.scale
    );
    stroke(0);
    fill(0);
    textSize(20);
    textAlign(CENTER, CENTER);
    text(
      this.display ? 1 : 0,
      this.position[0] + this.scale / 2,
      this.position[1] + this.scale / 2
    );
    fill(0, 0, 255);
    noStroke();
    ellipse(
      this.position[0] - this.selectorRadius / 2,
      this.position[1] + this.scale / 2,
      this.selectorRadius,
      this.selectorRadius
    );
  }
  
  checkInCircle(point, centre, radius) {
    return super.checkInCircle(point, centre, radius);
  }
  checkInBody(point) {
    return this.checkInCircle(
      point,
      [this.position[0] + this.scale / 2, this.position[1] + this.scale / 2],
      this.scale / 2
    );
  }
  dragAndDrop(origX, origY, signal) {
    return super.dragAndDrop(origX, origY, signal);
  }
}
