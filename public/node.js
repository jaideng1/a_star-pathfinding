
const baseSize = 10;

var displayNumbers = true;
var doStroke = true;

class NodePoint {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.g = 0;
    this.h = 0;
    this.score = 0;
    this.id = createId();

    this.s = {
      x: (500 / BOARD_WIDTH),
      y: (500 / BOARD_LENGTH)
    };
    this.doneCalcs = false;

    this.donePathfind = false;

    //Only for path blocks
    this.drawType = 0;

  }
  runCalcs() {
    //Run calcs
    if (!this.doneCalcs) {
      let start = NodePoint.getStart();
      let end = NodePoint.getEnd();
      let x = this.x * 10 + 5;
      let y = this.y * 10 + 5;
      let st = {
        x: start.x * 10 + 5,
        y: start.y * 10 + 5
      };
      let en = {
        x: end.x * 10 + 5,
        y: end.y * 10 + 5
      };


      this.g = Math.sqrt(Math.pow((x - st.x), 2) + Math.pow((y - st.y), 2));
      this.h = Math.sqrt(Math.pow((x - en.x), 2) + Math.pow((y - en.y), 2));
      this.score = this.g + this.h;
      this.doneCalcs = true;
    }

  }
  check() {
    if (this.donePathfind) {
      return;
    }
    if (this.type == 0) {
      this.doSurroundedChecks();
      this.drawType = 1;
    }
    console.log(this.id + " - Type: " + this.type)
    this.donePathfind = true;
    console.log(this.id + " - Done Pathfinding: " + this.donePathfind)
  }
  startPath() {
    if (this.type == 3) {
      this.doSurroundedChecks();
    }
  }
  doSurroundedChecks() {
    let y = this.y;
    let x = this.x;
    console.log(this.id + " - Cords: " + this.x + ", " + this.y)
    let b;

    let amountCalled = 0;

    if (calls > 50) {
      return;
    }
    calls++;
    if (y > 0) {
      b = board[y - 1][x];
      console.log(b.id + " - Checking: " + b.donePathfind)
      if (!b.donePathfind) {
        b.check();
        amountCalled++;
      }
    }
    if (y < board.length - 1) {
      b = board[y + 1][x];
      console.log(b.id + " - Checking: " + b.donePathfind);
      if (!b.donePathfind) {
        b.check();
        amountCalled++;
      }
    }
    if (x > 0) {
      b = board[y][x - 1];
      console.log(b.id + " - Checking: " + b.donePathfind)
      if (!b.donePathfind) {
        b.check();
        amountCalled++;
      }
    }
    if (x < board[y].length - 1) {
      let b = board[y][x + 1];
      console.log(b.id + " - Checking: " + b.donePathfind)

      if (!b.donePathfind) {
        b.check();
        amountCalled++;
      }
    }
    console.log(this.id + " - Amount Called: " + amountCalled)
  }
  getSurroundingNodes(a=-1) {
    let y = this.y;
    let x = this.x;
    let b;

    let nodes = [];

    if (y > 0) {
      b = board[y - 1][x];
      nodes.push(b);
    }
    if (y < board.length - 1) {
      b = board[y + 1][x];
      nodes.push(b);
    }
    if (x > 0) {
      b = board[y][x - 1];
      nodes.push(b);
    }
    if (x < board[y].length - 1) {
      let b = board[y][x + 1];
      nodes.push(b);
    }

    let finalNodes = []

    if (a >= 0 && a <= 3) {
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].type == a) {
          finalNodes.push(nodes[i])
        }
      }

    }
    return finalNodes;
  }
  draw() {
    let color = {
      r: 0,
      g: 0,
      b: 0
    };
    if (this.type == 0) {
      if (this.drawType == 0) {
        color = {
          r: 255,
          g: 255,
          b: 255
        }
      } else if (this.drawType == 1) {
        color.b = 170;
      } else if (this.drawType == 2) {
        color = {
          r: 255,
          g: 200,
          b: 0
        }
      }
    } else if (this.type == 2) {
      color.r = 255;
    } else if (this.type == 3) {
      color.g = 255;
    }

    // if (doStroke) {
    //   stroke();
    // } else {
    //   noStroke();
    // }
    fill(color.r, color.g, color.b)
    rect(this.x * (500 / BOARD_WIDTH), this.y * (500 / BOARD_LENGTH), this.s.x, this.s.y);

    if (displayNumbers) {
      fill(238, 44, 245)
      textSize(10)
      text(Math.floor(this.g) + " " + Math.floor(this.h), (this.x + 0.5) * (500 / BOARD_WIDTH), (this.y + 0.5) * (500 / BOARD_LENGTH));
      text(Math.floor(this.score), (this.x + 0.5) * (500 / BOARD_WIDTH), (this.y + 0.3) * (500 / BOARD_LENGTH));
    }
  }
  update() {
    this.draw();
  }

  static Update() {

    for (let y = 0; y < board.length; y++) {
      for (let x = 0; x < board[y].length; x++) {
        board[y][x].update();
      }
    }
  }

  static getStart() {
    for (let y = 0; y < board.length; y++) {
      for (let x = 0; x < board[y].length; x++) {
        if (board[y][x].type == 3) {
          return board[y][x];
        }
      }
    }
  }

  static getEnd() {
    for (let y = 0; y < board.length; y++) {
      for (let x = 0; x < board[y].length; x++) {
        if (board[y][x].type == 2) {
          return board[y][x];
        }
      }
    }
  }

  static runCalcsForAll() {
    for (let y = 0; y < board.length; y++) {
      for (let x = 0; x < board[y].length; x++) {
        board[y][x].runCalcs();

      }
    }
  }
}

let calls = 0;


let usedIds = 0;
function createId() {
  usedIds++;
  return usedIds;
}


class Path {
  constructor(start, previousPath=null) {
    this.previousPath = previousPath;

    this.nodeChildren = [start];
    this.pathChildren = [];

    if (previousPath == null) {
      foundEnd = false;
    }
  }
  startExpanding() {
    let r = this.expandPath();
    let max = 0;
    while (!r && max < 4) {
      r = this.expandPath();
      max++;
    }
    if (foundEnd) {
      console.log("Path terminated")
      return;
    }
    console.log("Path with starting point (" + this.getStart().x + ", " + this.getStart().y + "), id: " + this.getStart().id + " has finished.")
    console.log("New paths: " + this.pathChildren.length);
  }
  expandPath() {
    //Get surrounding path blocks
    let around = this.getCurrent().getSurroundingNodes(0);

    //Filter out path blocks that have been calculated
    for (let i = 0; i < around.length; i++) {
      if (around[i].drawType != 0) {
        around.splice(i, 1)
      }
    }

    around.sort((a,b) => {return a.score-b.score;})

    if (this.getCurrent().getSurroundingNodes(2).length > 0) {
      console.log(this.getCurrent().getSurroundingNodes(2))
      console.log("Found end!");
      console.log(this.getCurrent().drawType)
      foundEnd = true;
      let pp = this;
      try {
        do {
          for (let k = 0; k < pp.nodeChildren.length; k++) {
            pp.nodeChildren[k].drawType = 2;
          }
          pp = pp.previousPath;
        } while (pp.previousPath != null);
      } catch (ignored) {}

      return;
    }
    if (foundEnd) {
      console.log("Path Expand terminated")
      return;
    }

    if (around.length < 1) {
      return true;
    } else if (around.length == 1) {
      //If there is only one possible path block, then add it to the nodeChildren
      around[0].drawType = 1;
      this.nodeChildren.push(around[0])
      console.log(this.getStart().id + " Path - There was only one child, so I added it to my list.")
    } else if (around.length > 1) {
      //If there are multiple, start new paths.
      for (let j = 0; j < around.length; j++) {
        around[j].drawType = 1;
        this.pathChildren.push(new Path(around[j], this));
      }
      console.log(this.getStart().id + " Path Start - Was about to start child processes.")
      this.startChildProcesses();
      return true;
    }

    return false;
  }
  startChildProcesses() {
    for (let i = 0; i < this.pathChildren.length; i++) {
      this.pathChildren[i].startExpanding();

    }
  }
  getStart() {
    return this.nodeChildren[0];
  }
  getCurrent() {
    return this.nodeChildren[this.nodeChildren.length - 1];
  }
}


let foundEnd = false;
