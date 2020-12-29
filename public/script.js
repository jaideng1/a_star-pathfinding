
//3 = start
//2 = end
//1 = wall
//0 = nothing

var boardShape = [
  [3, 0, 0, 0, 1, 0],
  [0, 1, 1, 0, 0, 1],
  [0, 0, 0, 0, 1, 0],
  [0, 0, 1, 1, 0, 1],
  [1, 0, 1, 0, 2, 1],
  [0, 0, 0, 0, 0, 1]
];

var board = [];

var BOARD_LENGTH = boardShape.length;
var BOARD_WIDTH = boardShape[0].length;

function formalizeBoard() {
  console.log(boardShape)
  board = [];
  for (let y = 0; y < boardShape.length; y++) {
    board.push([])
    for (let x = 0; x < boardShape[y].length; x++) {
      let newNode = new NodePoint(x, y, boardShape[y][x]);
      board[y].push(newNode);
    }
  }

  BOARD_LENGTH = boardShape.length;
  BOARD_WIDTH = boardShape[0].length;
}

var tempPath;

function setup() {
  formalizeBoard();
  createCanvas(500,500);
  console.log(NodePoint.getStart());
  console.log(NodePoint.getEnd());
  NodePoint.runCalcsForAll();
  //NodePoint.getStart().startPath();
  tempPath = new Path(board[0][0]);
  //tempPath.startExpanding();
}

function draw() {
  NodePoint.Update();

}

let typech = document.getElementById("typefnew");
let stypech = document.getElementById("subtypefnew");

let clicker = {
  type: null,
  subtype: 0
}

function changeClicker() {
  if (typech.value.length == 0) {
    alert("You must set it to a valid value (0 to 3)");
    return;
  }
  let t = parseInt(typech.value);
  let st = parseInt(stypech.value);
  if (typech.value.length == 0 || t > 3 || t < 0) {
    alert("You must set the main type to a valid value (0 to 3)");
    return;
  }
  if (stypech.value.length == 0 || st > 3 || st < 0) {
    st = 0;
  }
  if (t > 0) {
    st = 0;
  }
  clicker.type = t;
  clicker.subtype = st;
}


function mouseClicked() {
  let admx = mouseX / (500 / BOARD_WIDTH);
  let admy = mouseY / (500 / BOARD_LENGTH);

  let bc = {
    x: Math.floor(admx),
    y: Math.floor(admy),
  }

  if (bc.x < 0 || bc.y < 0 || bc.x > BOARD_WIDTH - 1|| bc.y > BOARD_LENGTH - 1) {
    return;
  }

  if (clicker.type == null) {
    alert("You need to set the clicker type before changing a square.");
    return;
  }


  board[bc.y][bc.x].type = clicker.type;
  board[bc.y][bc.x].drawType = (clicker.subtype == null) ? 0 : clicker.subtype;

}
