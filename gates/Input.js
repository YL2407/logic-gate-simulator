class Input extends OneInputGate {
  constructor(position, scale, input, output) {
    super(position, scale, input, output);
    this.origMX = super.origMX;
    this.origMY = super.origMY;
    this.input = 0;
    this.dragged = super.dragged;
  }
  evaluate() {
    return this.input;
  }
  draw() {
    stroke(0);
    strokeWeight(1);
    fill(255, 0, 0);
    ellipse(
      this.position[0] + this.scale / 2,
      this.position[1] + this.scale / 2,
      this.scale,
      this.scale
    );
    stroke(255);
    fill(255);
    textSize(20);
    textAlign(CENTER, CENTER);
    text(
      Math.floor(parseInt(this.input)),
      this.position[0] + this.scale / 2,
      this.position[1] + this.scale / 2
    );
    fill(0, 0, 255);
    noStroke();
    ellipse(
      this.position[0] + this.scale + this.selectorRadius / 2,
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
  updateVal() {
    if (this.checkInBody([mouseX, mouseY])) {
      if (Math.floor(parseInt(this.input)) == 0) {
        this.input = 1;
      } else {
        this.input = 0;
      }
    }
  }
}
