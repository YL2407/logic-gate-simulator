class StartButton extends Button {
  constructor(x, y, w, h, colour) {
    super(x, y, w, h, colour);
  }
  draw() {
    super.draw();
    fill(0, 255, 0);
    triangle(
      this.x + this.cornerRad * 2,
      this.y + this.cornerRad * 2,
      this.x + this.cornerRad * 2,
      this.y + this.h - this.cornerRad * 2,
      this.x + this.w - this.cornerRad * 2,
      this.y + this.h / 2
    );
  }
  onClickEvent() {
    if (this.checkInBody([mouseX, mouseY])) {
      super.onClickEvent();
      Communicator.toRun=true;
    }
  }
}
