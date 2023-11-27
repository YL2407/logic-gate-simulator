class ZoomOutButton extends Button {
  constructor(x, y, w, h, colour) {
    super(x, y, w, h, colour);
    this.cornerRad = 0;
  }
  draw() {
    super.draw();
    stroke(this.colour[0] * 0.6, this.colour[1] * 0.6, this.colour[2] * 0.6);
    strokeWeight(4);
    line(
      this.x + this.w / 8,
      this.y + this.h / 2,
      this.x + (7 * this.w) / 8,
      this.y + this.h / 2
    );
  }
  onClickEvent() {
    if (this.checkInBody([mouseX, mouseY])) {
      super.onClickEvent();
      if(Communicator.globalScale>=60){
        Communicator.globalScale/=1.1;
        Communicator.zoomedOut=true;
      }
    }
  }
}
