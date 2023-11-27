class Gate {
  static gateDragged = false;
  static wireDragged = false;
  constructor(
    position,
    scale,
    input,
    output,
    wireLocations
  ) {
    if (this.constructor === Gate) {
      throw new Error("Abstract classes can't be instantiated.");
    }
    this.position = position;
    this.scale = scale;
    this.input = input;
    this.output = output;
    this.drawing = false;
    this.wireLocations = wireLocations;
    this.colouredWires=false;
    this.origMX = this.position[0] + this.scale / 2;
    this.origMY = this.position[1] + this.scale / 2;
    this.dragged = false;
    Gate.prototype.selectorRadius=10;
  }
  evaluate() {
    throw new Error("Method evaluate() must be implemented.");
  }
  draw() {
    if(Communicator.toRun){
      this.colouredWires=true;
    }
    if(Communicator.toClear){
      this.colouredWires=false;
    }
  }
  drawWires() {
    if (this.wireLocations == null || this.wireLocations == []) {
      return;
    }
    stroke(0);
    strokeWeight(3);
    line(
      this.position[0] + this.scale + this.selectorRadius / 2,
      this.position[1] + this.scale / 2,
      wireLocations[0],
      wireLocations[1]
    );
  }
  dragAndDrop(origX, origY, signal) {
    if (origX >= 0 && origY >= 0) {
      this.origMX = origX;
      this.origMY = origY;
    }
    if (Communicator.completedDrag&&
      (this.checkInBody([
        mouseX,
        mouseY,
      ])&&
        signal == 1 &&
        !Gate.gateDragged &&
        !Gate.wireDragged) ||
      (this.dragged && mouseIsPressed))
     {
      this.dragged = true;
      Gate.gateDragged = true;
      this.position[0] += mouseX - this.origMX;
      this.position[1] += mouseY - this.origMY;
      this.origMX = mouseX;
      this.origMY = mouseY;
    }else {
      this.dragged = false;
      Gate.gateDragged = false;
      Communicator.completedDrag=true;
    }
  }
  checkInCircle(point, centre, radius) {
    return (
      Math.sqrt(
        Math.pow(point[0] - centre[0], 2) + Math.pow(point[1] - centre[1], 2)
      ) <= radius
    );
  }
  createWire(signal) {
    if (
      Communicator.completedDrag&&((this.checkInCircle(
        [mouseX, mouseY],
        [
          this.position[0] + this.scale + this.selectorRadius / 2,
          this.position[1] + this.scale / 2,
        ],
        Gate.prototype.selectorRadius
      ) &&
        signal == 1&&
        !(this.output instanceof Gate)) ||
      (this.drawing && mouseIsPressed && !(this.output instanceof Gate)))
    ) {
      Gate.wireDragged = true;
      this.drawing = true;
    } else {
      Gate.wireDragged = false;
      this.drawing = false;
      Communicator.completedDrag=true;
    }
  }
  deleteWire() {
    if (
      this.checkInCircle(
        [mouseX, mouseY],
        [
          this.position[0] + this.scale + this.selectorRadius / 2,
          this.position[1] + this.scale / 2,
        ],
        Gate.prototype.selectorRadius
      )
    ) {
      if (this.output instanceof Gate) {
        if (Object.is(this.output.input[0], this)) {
          this.output.input[0] = 0;
        } else {
          this.output.input[1] = 0;
        }
      }
      this.output = 0;
    }
  }
  drawWire() {
    if (this.drawing) {
      if(!this.colouredWires){
        stroke(0);
      }
      if((this.evaluate())&&this.colouredWires){
        stroke(255, 0, 0);
      }else{
        stroke(0);
      }
      strokeWeight(3);
      line(
        this.position[0] + this.scale + this.selectorRadius / 2,
        this.position[1] + this.scale / 2,
        mouseX,
        mouseY
      );
    }
  }
}
