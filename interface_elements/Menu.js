class Menu {
  constructor(x, y, buttons, flow, spacing, dir) {
    this.x = x;
    this.y = y;
    this.buttons = buttons;
    this.flow = flow;
    this.spacing = spacing;
    this.dir = dir;
    this.totalWidth = 0;
    this.totalHeight = 0;
    if (!this.flow) {
      //horizontal
      var runningT = this.x;
      if (dir == -1) {
        this.x -= this.buttons[0].w;
        runningT = this.x;
      }
      for (var i = 0; i < this.buttons.length; i++) {
        this.buttons[i].x = runningT;
        runningT += this.dir * this.buttons[i].w;
        runningT += this.dir * this.spacing;
        this.totalWidth = Math.abs(runningT - this.x);
        this.buttons[i].y = this.y;
        if (this.buttons[i].h > this.totalHeight) {
          this.totalHeight = this.buttons[i].h;
        }
      }
    } else {
      //vertical
      var runningT = this.y;
      if (dir == -1) {
        this.y -= this.buttons[0].w;
        runningT = this.y;
      }
      for (var i = 0; i < this.buttons.length; i++) {
        this.buttons[i].y = runningT;
        runningT += this.dir * this.buttons[i].h;
        runningT += this.dir * this.spacing;
        this.totalHeight = runningT - this.y;
        this.buttons[i].x = this.x;
        if (this.buttons[i].h > this.totalWidth) {
          this.totalWidth = this.buttons[i].h;
        }
      }
    }
  }

  draw() {
    for (var i = 0; i < this.buttons.length; i++) {
      this.buttons[i].draw();
    }
  }
  onClickEvents() {
    for (var i = 0; i < this.buttons.length; i++) {
      this.buttons[i].onClickEvent();
    }
  }
}
