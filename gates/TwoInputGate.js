class TwoInputGate extends Gate {
  constructor(
    position,
    scale,
    input,
    output,
    wireLocations
  ) {
    super(position, scale, input, output, wireLocations);
    TwoInputGate.prototype.selectorRadius = super.selectorRadius;
  }
  evaluate() {
    var inputValues = [];
    var inp1;
    var inp2;
    if(this.input[0] instanceof Gate){
      inp1=this.input[0].evaluate();
    } else{
      inp1=0
    }
    if(this.input[1] instanceof Gate){
      inp2=this.input[1].evaluate();
    } else{
      inp2=0
    }
    inputValues.push(inp1);
    inputValues[1]=inp2;
    return inputValues;
  }
  draw() {
    super.draw();
    noStroke();
    fill(0, 0, 255);
    ellipse(
      this.position[0] - this.selectorRadius / 2,
      this.position[1],
      this.selectorRadius,
      this.selectorRadius
    );
    ellipse(
      this.position[0] - this.selectorRadius / 2,
      this.position[1] + this.scale,
      this.selectorRadius,
      this.selectorRadius
    );
    ellipse(
      this.position[0] + this.scale + this.selectorRadius / 2,
      this.position[1] + this.scale / 2,
      this.selectorRadius,
      this.selectorRadius
    );
  }
  checkInBody(point) {
    throw new Error("Method checkInBody() must be implemented.");
  }
  checkInCircle(point, centre, radius) {
    return super.checkInCircle(point, centre, radius);
  }
  createWire(signal) {
    super.createWire(signal);
  }
  drawWire() {
    super.drawWire();
  }
  deleteConnections() {
    if(this.input[0] instanceof Gate){
      this.input[0].output=0;
    }
    if(this.input[1] instanceof Gate){
      this.input[1].output=0;
    }
    this.input = [0, 0];
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
