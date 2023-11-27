var gateFactory;
var gates = [];
var output;
var globalScale;
var startMenu;
var zoomMenu;
var fileMenu;
var completeMenu;
function setup() {
  //Most convenient canvas size
  createCanvas(windowWidth - 1, windowHeight - 1);
  //Construct gate factory
  gateFactory = new GateFactory(100, width, height);
  //Ensure standard initial scale
  globalScale = gateFactory.andGate.scale;
  //Construct menus
  zoomMenu = new Menu(
    width-60,
    0,
    [
      new ZoomInButton(0, 0, 20, 20, [220, 220, 220]),
      new ZoomOutButton(0, 0, 20, 20, [220, 220, 220]),
    ],
    false,
    0,
    1
  );
  clearMenu = new Menu(
    width,
    zoomMenu.totalHeight+10,
    [new ClearButton(0, 0, 60, 30, [220, 220, 220])],
    false,
    0,
    -1
  );
  completeMenu = new Menu(
    width,
    clearMenu.totalHeight+clearMenu.y+10,
    [new CompleteButton(0,0,80,30,[220,220,220])],
    false,
    0,
    -1
  );
  fileMenu = new Menu(
    0,
    0,
    [
      new SaveButton(0, 0, 60, 30, [220, 220, 220]),
      new LoadButton(0, 0, 60, 30, [220, 220, 220]),
    ],
    false,
    0,
    1
  );
}

function draw() {
  //If save button has been clicked
  if(Communicator.toSave){
    Communicator.toSave=false;
    //Storing information in correct format for save file
    var toBlob = [];
    for(var i=0; i<gates.length; i++){
      toBlob.push([]);
      toBlob[i].push(gates[i].constructor.name);
      toBlob[i].push(gates[i].position);
      toBlob[i].push(gates[i].scale);
      //Adding in pointers to inputs and outputs
      var tempContainer = [];
      for(var j=0;j<gates[i].input.length;j++){
        tempContainer.push(gates.indexOf(gates[i].input[j]));
      }
      toBlob[i].push(tempContainer);
      toBlob[i].push(gates.indexOf(gates[i].output));
      toBlob[i].push(gates[i].drawing);
    }
    toBlob.push(Communicator.globalScale);
    toBlob=JSON.stringify(toBlob);
    var blob = new Blob([toBlob], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "logic_gate_save.txt");
  }
  //If load button has been pressed
  if(Communicator.toLoad){
    var fileLoadDiv = document.getElementById("file_load_div");
    fileLoadDiv.style.display="block";
    //When file has been selected
    fileLoadDiv.addEventListener('change', function() {
              
            var fileReader=new FileReader();
            fileReader.onload=function(){
                Communicator.loadedFile=fileReader.result;
                fileLoadDiv.style.display="none";
                fileLoadDiv.value="";
            }
              
            fileReader.readAsText(this.files[0]);
        });
        Communicator.toLoad=false;
      }
    if(Communicator.loadedFile!=""){
      Communicator.toLoad=false;
      try {
        gates=[];
      //Parsing in information based on save format and constructing gates.
      var parsedLoadFile = JSON.parse(Communicator.loadedFile);
      for(var i=0; i<parsedLoadFile.length-1; i++){
        switch(parsedLoadFile[i][0]){
          case "AndGate":
            tempContainer = new AndGate(parsedLoadFile[i][1], parsedLoadFile[i][2], [0,0], 0, [0,0]);
            break;
          case "Input":
            tempContainer = new Input(parsedLoadFile[i][1], parsedLoadFile[i][2], [0], 0, [0,0]);
            break;
          case "NandGate":
            tempContainer = new NandGate(parsedLoadFile[i][1], parsedLoadFile[i][2], [0,0], 0, [0,0]);
            break;
          case "NorGate":
            tempContainer = new NorGate(parsedLoadFile[i][1], parsedLoadFile[i][2], [0,0], 0, [0,0]);
            break;
          case "NotGate":
            tempContainer = new NotGate(parsedLoadFile[i][1], parsedLoadFile[i][2], [0], 0, [0,0]);
            break;
          case "OrGate":
            tempContainer = new OrGate(parsedLoadFile[i][1], parsedLoadFile[i][2], [0,0], 0, [0,0]);
            break;
          case "Output":
            tempContainer = new Output(parsedLoadFile[i][1], parsedLoadFile[i][2], [0], 0, [0,0]);
            break;
          case "XorGate":
            tempContainer = new XorGate(parsedLoadFile[i][1], parsedLoadFile[i][2], [0,0], 0, [0,0]);
            break;     
        }
        gates.push(tempContainer);
      }
      //Setting pointers
      for(var i=0; i<gates.length; i++){
        if(parsedLoadFile[i][3][0]!=-1){
          gates[i].input[0]=gates[parsedLoadFile[i][3][0]];
        }
        if(parsedLoadFile[i][3].length>1&&parsedLoadFile[i][3][1]!=-1){
          gates[i].input[1]=gates[parsedLoadFile[i][3][1]];
        }
        if(parsedLoadFile[i][4]!=-1){
          gates[i].output=gates[[parsedLoadFile[i][4]]];
        }
        gates[i].drawing=parsedLoadFile[i][5];
      }
      Communicator.globalScale=parsedLoadFile[parsedLoadFile.length-1];
      //Resetting for next use
      Communicator.loadedFile="";
      } catch (error) {
        alert("Invalid file");
        Communicator.loadedFile="";
      }
    }
    //If clear button has been pressed
    if(Communicator.toClear){
      Communicator.toClear=false;
      //Clearing gates array
      gates = [];
    }
    //If complete button has been pressed
    if(Communicator.toComplete){
      Communicator.toComplete=false;
      for(var j=0; j<gates.length; j++){
        if(!(gates[j] instanceof Input)){
          //Checking for blank first input
          if(gates[j].input[0]==0){
            if(gates[j] instanceof TwoInputGate){
              var inputToAdd = new Input([
                gates[j].position[0]-2*gates[j].scale,
                gates[j].position[1]-gates[j].scale/2,
              ],
              Communicator.globalScale,
              [0],
              gates[j],
              [0, 0]);
            } else{
              var inputToAdd = new Input([
                gates[j].position[0]-2*gates[j].scale,
                gates[j].position[1],
              ],
              Communicator.globalScale,
              [0],
              gates[j],
              [0, 0]);
            }
            gates.push(inputToAdd);
            gates[j].input[0]=inputToAdd;
          }
          //Checking for blank second input (if applicable)
          if(gates[j] instanceof TwoInputGate && gates[j].input[1]==0){
            var inputToAdd = new Input([
              gates[j].position[0]-2*gates[j].scale,
              gates[j].position[1]+gates[j].scale/2,
            ],
            Communicator.globalScale,
            [0],
            gates[j],
            [0, 0]);
            gates.push(inputToAdd);
            gates[j].input[1]=inputToAdd;
          }
        }
      }
    }
  background(255);
  for (var i = 0; i < gates.length; i++) {
    //Check for gates to be deleted
    if (
      gates[i].position[1] + gates[i].scale > gateFactory.topcoord &&
      !gates[i].dragged
    ) {
      gates[i].deleteConnections();
      gates.splice(i, 1);
      i--;
      continue;
    }
    //Evaluating all outputs (which recursively collapse to evaluate all gates)
    if (gates[i] instanceof Output) {
      gates[i].evaluate();
    }
    if(Communicator.zoomedIn){
      Communicator.zoomedIn=false;
      for(var j=0; j<gates.length; j++){
        gates[j].position[0]=gates[j].position[0]+(gates[j].position[0]-width/2)*0.1;
        gates[j].position[1]=gates[j].position[1]+(gates[j].position[1]-height/2)*0.1;
      }
    }else if(Communicator.zoomedOut){
      Communicator.zoomedOut=false;
      for(var j=0; j<gates.length; j++){
        gates[j].position[0]=(0.1*(width/2)+gates[j].position[0])/1.1;
        gates[j].position[1]=(0.1*(height/2)+gates[j].position[1])/1.1;
      }
    }
    gates[i].scale=Communicator.globalScale;
    gates[i].draw();
    gates[i].dragAndDrop(-1, -1, 0);
    stroke(0);
    strokeWeight(3);
    if (!(gates[i] instanceof OneInputGate)) {
      if (gates[i].input[0] instanceof Gate) {
        if(!gates[i].input[0].evaluate()){
          stroke(0);
        }
        if((gates[i].input[0].evaluate())){
          stroke(255, 0, 0);
        } else if(gates[i].input[0] instanceof Input && gates[i].input[0].evaluate()==1){
          stroke(255, 0, 0);
        }else{
          stroke(0);
        }
        line(
          gates[i].position[0] - gates[i].selectorRadius / 2,
          gates[i].position[1],
          gates[i].input[0].position[0] +
            gates[i].input[0].scale +
            gates[i].input[0].selectorRadius / 2,
          gates[i].input[0].position[1] + gates[i].input[0].scale / 2
        );
      }
      if (gates[i].input[1] instanceof Gate) {
        if((gates[i].input[1].evaluate())){
          stroke(255, 0, 0);
        } else if(gates[i].input[1] instanceof Input && gates[i].input[1].evaluate()==1){
          stroke(255, 0, 0);
        } else{
          stroke(0);
        }
        line(
          gates[i].position[0] - gates[i].selectorRadius / 2,
          gates[i].position[1] + gates[i].scale,
          gates[i].input[1].position[0] +
            gates[i].input[1].scale +
            gates[i].input[1].selectorRadius / 2,
          gates[i].input[1].position[1] + gates[i].input[1].scale / 2
        );
      }
    } else {
      if (gates[i].input[0] instanceof Gate) {
        if((gates[i].input[0].evaluate())){
          stroke(255, 0, 0);
        }else if(gates[i].input[0] instanceof Input && gates[i].input[0].evaluate()==1){
          stroke(255, 0, 0);
        }else{
          stroke(0);
        }
        line(
          gates[i].position[0] - gates[i].selectorRadius / 2,
          gates[i].position[1] + gates[i].scale / 2,
          gates[i].input[0].position[0] +
            gates[i].input[0].scale +
            gates[i].input[0].selectorRadius / 2,
          gates[i].input[0].position[1] + gates[i].input[0].scale / 2
        );
      }
    }
    if (gates[i].drawing && !mouseIsPressed) {
      for (var j = 0; j < gates.length; j++) {
        if (j != i && !(gates[j] instanceof OneInputGate)) {
          if (
            gates[j].checkInCircle(
              [mouseX, mouseY],
              [
                gates[j].position[0] - gates[j].selectorRadius / 2,
                gates[j].position[1],
              ],
              Gate.prototype.selectorRadius
            )
          ) {
            if(gates[j].input[0] instanceof Gate){
              gates[j].input[0].output=0;
            }
            gates[j].input[0] = gates[i];
            gates[i].output = gates[j];
          } else if (
            gates[j].checkInCircle(
              [mouseX, mouseY],
              [
                gates[j].position[0] - gates[j].selectorRadius / 2,
                gates[j].position[1] + gates[j].scale,
              ],
              Gate.prototype.selectorRadius
            )
          ) {
            if(gates[j].input[1] instanceof Gate){
              gates[j].input[1].output=0;
            }
            gates[j].input[1] = gates[i];
            gates[i].output = gates[j];
          }
        } else if (
          j != i &&
          gates[j] instanceof OneInputGate &&
          !(gates[j] instanceof Input)
        ) {
          if (
            gates[j].checkInCircle(
              [mouseX, mouseY],
              [
                gates[j].position[0] - gates[j].selectorRadius / 2,
                gates[j].position[1] + gates[j].scale / 2,
              ],
              Gate.prototype.selectorRadius
            )
          ) {
            gates[j].input[0] = gates[i];
            gates[i].output = gates[j];
          }
        }
      }
    }
    //TODO: move to front of array when clicked.
    gates[i].createWire(0);
    gates[i].drawWire();
  }
  gateFactory.draw();
  zoomMenu.draw();
  clearMenu.draw();
  completeMenu.draw();
  fileMenu.draw();
}
function mousePressed() {
  zoomMenu.onClickEvents();
  clearMenu.onClickEvents();
  completeMenu.onClickEvents();
  fileMenu.onClickEvents();
  if (mouseButton == RIGHT) {
    for (var i = 0; i < gates.length; i++) {
      if (gates[i] instanceof Input) {
        gates[i].updateVal();
      }
      gates[i].deleteWire();
    }
  }
  if (mouseY > gateFactory.topcoord) {
    var inAnyGates = gateFactory.checkInGates(mouseX, mouseY);
    if (inAnyGates[0]) {
      inAnyGates.splice(0, 1);
      var tbc = inAnyGates.indexOf(true);
      var newGate = gateFactory.onClickCreate(tbc);
      gates.push(newGate);
    }
  }
  for (var i = 0; i < gates.length; i++) {
    gates[i].dragAndDrop(mouseX, mouseY, 1);
    if (!(gates[i] instanceof Output)) {
      gates[i].createWire(1);
    }
  }
}
