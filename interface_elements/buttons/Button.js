class Button {
  constructor(x, y, w, h, colour) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.colour = colour;
    this.cornerRad = 5;
    this.tinted = false;
  }
  draw() {
    if (!this.tinted) {
      fill(this.colour[0], this.colour[1], this.colour[2]);
    } else {
      fill(
        (this.colour[0] * 1.5 + 50) % 255,
        (this.colour[1] * 1.5 + 50) % 255,
        (this.colour[2] * 1.5 + 50) % 255
      );
      if (!mouseIsPressed) {
        this.tinted = false;
      }
    }
    strokeWeight(1);
    stroke(0);
    rect(this.x, this.y, this.w, this.h, this.cornerRad);
  }
  onClickEvent() {
    this.tinted = true;
  }
  checkInBody(point) {
    if (
      point[0] > this.x + this.cornerRad &&
      point[0] < this.x + this.w - this.cornerRad &&
      point[1] > this.y &&
      point[1] < this.y + this.h
    ) {
      return true;
    } else if (
      point[0] > this.x &&
      point[0] < this.x + this.cornerRad &&
      point[1] > this.y + this.cornerRad &&
      point[1] < this.y + this.h - this.cornerRad
    ) {
      return true;
    } else if (
      point[0] > this.x + this.w - this.cornerRad &&
      point[0] < this.x + this.w &&
      point[1] > this.y + this.cornerRad &&
      point[1] < this.y + this.h - this.cornerRad
    ) {
      return true;
    } else if (
      this.checkInCircle(
        point,
        [this.x + this.cornerRad, this.y + this.cornerRad],
        this.cornerRad
      ) ||
      this.checkInCircle(
        point,
        [this.x + this.cornerRad, this.y + this.h - this.cornerRad],
        this.cornerRad
      ) ||
      this.checkInCircle(
        point,
        [this.x + this.w - this.cornerRad, this.y + this.cornerRad],
        this.cornerRad
      ) ||
      this.checkInCircle(
        point,
        [this.x + this.w - this.cornerRad, this.y + this.h - this.cornerRad],
        this.cornerRad
      )
    ) {
      return true;
    } else {
      return false;
    }
  }
  checkInCircle(point, centre, radius) {
    return (
      Math.sqrt(
        Math.pow(point[0] - centre[0], 2) + Math.pow(point[1] - centre[1], 2)
      ) <= radius
    );
  }
}
