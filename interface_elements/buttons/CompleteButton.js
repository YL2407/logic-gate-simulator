class CompleteButton extends Button {
    constructor(x, y, w, h, colour) {
      super(x, y, w, h, colour);
      this.cornerRad = 0;
    }
    draw() {
      super.draw();
      fill(this.colour[0] * 0.6, this.colour[1] * 0.6, this.colour[2] * 0.6);
      stroke(this.colour[0] * 0.6, this.colour[1] * 0.6, this.colour[2] * 0.6);
      textSize(15);
      textAlign(CENTER, CENTER);
      text("Complete", this.x + this.w / 2, this.y + this.h / 2);
    }
    onClickEvent() {
      if (this.checkInBody([mouseX, mouseY])) {
        super.onClickEvent();
        Communicator.toComplete=true;
      }
    }
  }
  