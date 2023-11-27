class GateFactory {
  constructor(h, sw, sh) {
    this.h = h;
    this.sw = sw;
    this.sh = sh;
    this.marginy = this.h / 4;
    this.marginx = (this.sw - (Communicator.globalScale) * 8) / 9;
    this.topcoord = sh - h;
    this.andGate = new AndGate(
      [this.marginx, this.sh - (this.h / 2 + this.marginy)],
      Communicator.globalScale,
      [0, 0],
      0,
      [0, 0]
    );
    this.orGate = new OrGate(
      [
        this.marginx * 2 + this.andGate.scale,
        this.sh - (this.h / 2 + this.marginy),
      ],
      Communicator.globalScale,
      [0, 0],
      0,
      [0, 0]
    );
    this.nandGate = new NandGate(
      [
        this.marginx * 3 + this.andGate.scale * 2,
        this.sh - (this.h / 2 + this.marginy),
      ],
      Communicator.globalScale,
      [0, 0],
      0,
      [0, 0]
    );
    this.norGate = new NorGate(
      [
        this.marginx * 4 + this.andGate.scale * 3,
        this.sh - (this.h / 2 + this.marginy),
      ],
      Communicator.globalScale,
      [0, 0],
      0,
      [0, 0]
    );
    this.notGate = new NotGate(
      [
        this.marginx * 5 + this.andGate.scale * 4,
        this.sh - (this.h / 2 + this.marginy),
      ],
      Communicator.globalScale,
      [0],
      0,
      [0, 0]
    );
    this.xorGate = new XorGate(
      [
        this.marginx * 6 + this.andGate.scale * 5,
        this.sh - (this.h / 2 + this.marginy),
      ],
      Communicator.globalScale,
      [0, 0],
      0,
      [0, 0]
    );
    this.output = new Output(
      [
        this.marginx * 7 + this.andGate.scale * 6,
        this.sh - (this.h / 2 + this.marginy),
      ],
      Communicator.globalScale,
      [0],
      0,
      [0, 0]
    );
    this.input = new Input(
      [
        this.marginx * 8 + this.andGate.scale * 7,
        this.sh - (this.h / 2 + this.marginy),
      ],
      Communicator.globalScale,
      [0],
      0,
      [0, 0]
    );
  }
  draw() {
    stroke(0);
    strokeWeight(4);
    line(0, this.sh - this.h, this.sw, this.sh - this.h);
    this.andGate.draw();
    this.orGate.draw();
    this.nandGate.draw();
    this.norGate.draw();
    this.notGate.draw();
    this.xorGate.draw();
    this.output.draw();
    this.input.draw();
  }
  checkInGates(mX, mY) {
    var inAndGate = this.andGate.checkInBody([mX, mY]);
    var inOrGate = this.orGate.checkInBody([mX, mY]);
    var inNandGate = this.nandGate.checkInBody([mX, mY]);
    var inNorGate = this.norGate.checkInBody([mX, mY]);
    var inNotGate = this.notGate.checkInBody([mX, mY]);
    var inXorGate = this.xorGate.checkInBody([mX, mY]);
    var inOutput = this.output.checkInBody([mX, mY]);
    var inInput = this.input.checkInBody([mX, mY]);
    var inGates = [
      inAndGate ||
        inOrGate ||
        inNandGate ||
        inNorGate ||
        inNotGate ||
        inXorGate ||
        inOutput ||
        inInput,
      inAndGate,
      inOrGate,
      inNandGate,
      inNorGate,
      inNotGate,
      inXorGate,
      inOutput,
      inInput,
    ];
    return inGates;
  }
  onClickCreate(gate) {
    //TODO: fix weird dragging issues
    Gate.gateDragged = false;
    switch (gate) {
      case 0:
        var tempGate = new AndGate(
          [this.marginx, this.sh - (this.h / 2 + this.marginy)],
          Communicator.globalScale,
          [0, 0],
          0
        );
        tempGate.dragged = true;
        return tempGate;
      case 1:
        var tempGate = new OrGate(
          [
            this.marginx * 2 + this.andGate.scale,
            this.sh - (this.h / 2 + this.marginy),
          ],
          Communicator.globalScale,
          [0, 0],
          0
        );
        tempGate.dragged = true;
        return tempGate;
      case 2:
        var tempGate = new NandGate(
          [
            this.marginx * 3 + this.andGate.scale * 2,
            this.sh - (this.h / 2 + this.marginy),
          ],
          Communicator.globalScale,
          [0, 0],
          0
        );
        tempGate.dragged = true;
        return tempGate;
      case 3:
        var tempGate = new NorGate(
          [
            this.marginx * 4 + this.andGate.scale * 3,
            this.sh - (this.h / 2 + this.marginy),
          ],
          Communicator.globalScale,
          [0, 0],
          0
        );
        tempGate.dragged = true;
        return tempGate;
      case 4:
        var tempGate = new NotGate(
          [
            this.marginx * 5 + this.andGate.scale * 4,
            this.sh - (this.h / 2 + this.marginy),
          ],
          Communicator.globalScale,
          [0, 0],
          0
        );
        tempGate.dragged = true;
        return tempGate;
      case 5:
        var tempGate = new XorGate(
          [
            this.marginx * 6 + this.andGate.scale * 5,
            this.sh - (this.h / 2 + this.marginy),
          ],
          Communicator.globalScale,
          [0, 0],
          0
        );
        tempGate.dragged = true;
        return tempGate;
      case 6:
        var tempGate = new Output(
          [
            this.marginx * 7 + this.andGate.scale * 6,
            this.sh - (this.h / 2 + this.marginy),
          ],
          Communicator.globalScale,
          [0, 0],
          0
        );
        tempGate.dragged = true;
        return tempGate;
      case 7:
        var tempGate = new Input(
          [
            this.marginx * 8 + this.andGate.scale * 7,
            this.sh - (this.h / 2 + this.marginy),
          ],
          Communicator.globalScale,
          [0, 0],
          0
        );
        tempGate.dragged = true;
        return tempGate;
    }
  }
}
