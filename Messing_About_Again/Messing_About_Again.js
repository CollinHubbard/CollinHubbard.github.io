let pieces = [];

let draggingObj = null;

let team1Color;
let team2Color;

let team1KingColor;
let team2KingColor;

let team1ColorA;
let team2ColorA;

let team1KingColorA;
let team2KingColorA;

let turn = 2;

let nextTurnReady = false;

let currTurn;

let timer = 0;
let timerStart = false;

let debug = true;

let forcedCapturesEn = true;

//let moveSound;
//let promoSound;

function preload() {
  //soundFormats('mp3', 'ogg');
  //moveSound = loadSound('assets/piece');
  //moveSound.setVolume(0.2);

  //promoSound = loadSound('assets/promote');
  //promoSound.setVolume(0.1);
}

function setup() {
  let cnv = createCanvas(800, 800);

  cnv.position((windowWidth - width) / 2, ((windowHeight - height) / 2) - 75);

  team1Color = color(69, 69, 217, 255);
  team2Color = color(214, 54, 158, 255);

  team1KingColor = color(69, 136, 217, 255);
  team2KingColor = color(214, 136, 158, 255);

  team1ColorA = color(69, 69, 217, 127);
  team2ColorA = color(214, 54, 158, 127);

  team1KingColorA = color(69, 136, 217, 127);
  team2KingColorA = color(214, 136, 158, 127);

  currTurn = createElement('div');
  currTurn.style('display', 'block');
  currTurn.style('height', '50px');
  currTurn.style('width', '800px');
  currTurn.style('margin-left', 'auto');
  currTurn.style('margin-right', 'auto');
  currTurn.style('background-color', team2Color);
  

  // setup pieces
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if ((i + j) % 2 != 0 && (j <= 2 || j >= 5)) {
        let p;
        if (j < 5) {
          p = new Piece(i * 100 + 50, j * 100 + 50, 80, 1);
        } else {
          p = new Piece(i * 100 + 50, j * 100 + 50, 80, 2);
        }

        p.text = p.x + "  " + p.y;

        pieces.push(p);
      }
    }
  }
}


function draw() {
  background(33);
  time();
  makeBoard();
  makePieces();
}

function time() {
  if (timerStart) {
    timer += 1;
  }

  if (nextTurnReady) {
    if (timerStart == false) {
      timerStart = true; 
      timer = 0;
    }
    if (timer >= 75) {
      timerStart = false;
      nextTurn();
    }
  }
}

function makeBoard() {

  for (let col = 0; col < 8; col++) {
    for (let row = 0; row < 8; row++) {
      if ((row + col) % 2 != 0) {
        fill(22);
        rect(row * 100, col * 100, 100, 100);
      } else {
        fill(111);
        rect(row * 100, col * 100, 100, 100);
      }
    }
  }
}

function makePieces() {
  for (let i = 0; i < pieces.length; i++) {
    pieces[i].display();
  }
}

//function keyPressed() {
//  if (keyCode == 32) {

//    if (nextTurnReady) {
//      turn = turn % 2 + 1;
//      if (turn == 1) {
//        currTurn.html("");
//        currTurn.style('background-color', team1Color);
//      } else {
//        currTurn.html("");
//        currTurn.style('background-color', team2Color);
//      }

//      nextTurnReady = false;

//      for (let i = 0; i < pieces.length; i++) {
//        pieces[i].doubleCapture = false;
//      }
//    }
//  }
//}

function mousePressed() {
  for (let i = 0; i < pieces.length; i++) {
    pieces[i].click();
  }
}

function mouseDragged() {
  if (draggingObj == null) {

    for (let i = 0; i < pieces.length; i++) {
      let d = dist(pieces[i].x, pieces[i].y, mouseX, mouseY);
      if (d <= pieces[i].d/2) {
        draggingObj = pieces[i];
        break;
      }
    }
  }

  if (draggingObj != null) {
    draggingObj.drag();
  }
}

function mouseReleased() {
  for (let i = 0; i < pieces.length; i++) {
    pieces[i].release();
  }

  if (draggingObj != null) {
    let roundX = round(draggingObj.x / 50) * 50;
    let roundY = round(draggingObj.y / 50) * 50;

    if (roundX % 100 === 0 && roundX < draggingObj.x) {
      roundX += 50;
    }

    if (roundX % 100 === 0 && roundX > draggingObj.x) {
      roundX -= 50;
    }

    if (roundY % 100 === 0 && roundY < draggingObj.y) {
      roundY += 50;
    }

    if (roundY % 100 === 0 && roundY > draggingObj.y) {
      roundY -= 50;
    }

    if (checkValid(roundX, roundY, draggingObj) == true) {

      nextTurnReady = true;

      draggingObj.x = roundX;
      draggingObj.y = roundY;
      draggingObj.text = roundX + " " + roundY;
      if (draggingObj.y == 50 || draggingObj.y == 750) {
        draggingObj.promote();
        //promoSound.play();
      }
      //moveSound.play();
    } else {
      draggingObj.x = draggingObj.startX;
      draggingObj.y = draggingObj.startY;
    }

    draggingObj = null;
  }
}

function nextTurn() {
  turn = turn % 2 + 1;
  if (turn == 1) {
    currTurn.html("");
    currTurn.style('background-color', team1Color);
  } else {
    currTurn.html("");
    currTurn.style('background-color', team2Color);
  }

  nextTurnReady = false;

  for (let i = 0; i < pieces.length; i++) {
    pieces[i].doubleCapture = false;
    
    if (pieces[i].team == 1) {
      if (pieces[i].king == true) {
        pieces[i].kc = team1KingColor;
      } else {
        pieces[i].c = team1Color;
      }
    } else {
      if (pieces[i].king == true) {
        pieces[i].kc = team2KingColor;
      } else {
        pieces[i].c = team2Color;
      }
    }
  }
}

function checkValid(x, y, dro) {

  if (nextTurnReady && dro.doubleCapture == false) {
    return false;
  }

  if (turn != dro.team) {
    return false;
  }

  let isOccupied = checkOccupied(x, y);
  if (isOccupied) {
    return false;
  }

  return checkNextSpace(x, y, dro);
}

function checkNextSpace(x, y, piece) {

  if (piece.king == true) {
    return (checkBackwards(x, y, piece) || checkForwards(x, y, piece));
  } else {
    if (piece.team == 2) {
      return checkBackwards(x, y, piece);
    } else {
      return checkForwards(x, y, piece);
    }
  }
}

function checkForCapture(team) {

  let found = false;

  for (let i = 0; i < pieces.length; i++) {
    if (pieces[i].team != team) {
      continue;
    }

    if (pieces[i].king == true) {
      if ((!checkOccupied(pieces[i].startX + 200, pieces[i].startY + 200) && checkOccupiedTeam(pieces[i].startX + 100, pieces[i].startY + 100, 2)) || ((!checkOccupied(pieces[i].startX - 200, pieces[i].startY + 200) && checkOccupiedTeam(pieces[i].startX - 100, pieces[i].startY + 100, pieces[i].team % 2 + 1)))) {
        if (pieces[i].team == 1) {
          pieces[i].kc = color(90, 0, 200);
        } else {
          pieces[i].kc = color(220, 0, 78);
        }
        found = true;
      }
      if ((!checkOccupied(pieces[i].startX + 200, pieces[i].startY - 200) && checkOccupiedTeam(pieces[i].startX + 100, pieces[i].startY - 100, 1)) || ((!checkOccupied(pieces[i].startX - 200, pieces[i].startY - 200) && checkOccupiedTeam(pieces[i].startX - 100, pieces[i].startY - 100, pieces[i].team % 2 + 1)))) {
        if (pieces[i].team == 1) {
          pieces[i].kc = color(90, 0, 200);
        } else {
          pieces[i].kc = color(220, 0, 78);
        }
        found = true;
      }
    } else {

      if (pieces[i].team == 1) {

        // Need to make sure captures and moves stay on the board

        if ((!checkOccupied(pieces[i].startX + 200, pieces[i].startY + 200) && checkOccupiedTeam(pieces[i].startX + 100, pieces[i].startY + 100, 2)) || ((!checkOccupied(pieces[i].startX - 200, pieces[i].startY + 200) && checkOccupiedTeam(pieces[i].startX - 100, pieces[i].startY + 100, 2)))) {
          pieces[i].c = color(108, 4, 212);
          found = true;
        }
      } else {
        if ((!checkOccupied(pieces[i].startX + 200, pieces[i].startY - 200) && checkOccupiedTeam(pieces[i].startX + 100, pieces[i].startY - 100, 1)) || ((!checkOccupied(pieces[i].startX - 200, pieces[i].startY - 200) && checkOccupiedTeam(pieces[i].startX - 100, pieces[i].startY - 100, 1)))) {
          pieces[i].c = color(188, 100, 11);
          found = true;
        }
      }
    }
  }
  return found;
}

function checkOccupiedTeam(x, y, team) {
  if (x > 750 || y > 750 || x < 50 || y < 50) {
    return true;
  }
  for (let i = 0; i < pieces.length; i++) {
    if (pieces[i].x == x && pieces[i].y == y && pieces[i].team == team) {
      return true;
    }
  }
  return false;
}

function checkForwards(x, y, piece) {

  if (piece.team != turn) {
    return false;
  }

  for (let j = 0; j < pieces.length; j++) {

    if (x == piece.startX + 200 && y == piece.startY + 200 && pieces[j].x == piece.startX + 100 && pieces[j].y == piece.startY + 100 && pieces[j].team != piece.team) {
      pieces.splice(j, 1);
      piece.doubleCapture = true;
      return true;
    }

    if (x == piece.startX - 200 && y == piece.startY + 200 && pieces[j].x == piece.startX - 100 && pieces[j].y == piece.startY + 100 && pieces[j].team != piece.team) {
      pieces.splice(j, 1);
      piece.doubleCapture = true;
      return true;
    }
  }

  if (forcedCapturesEn && checkForCapture(piece.team) == true) {
    return false;
  }

  if (piece.doubleCapture || ((x != (piece.startX + 100)) || (y != (piece.startY + 100))) && ((x != (piece.startX - 100)) || (y != (piece.startY + 100)))) {
    return false;
  }


  return true;
}

function checkBackwards(x, y, piece) {

  if (piece.team != turn) {
    return false;
  }

  for (let j = 0; j < pieces.length; j++) {

    if (x == piece.startX + 200 && y == piece.startY - 200 && pieces[j].x == piece.startX + 100 && pieces[j].y == piece.startY - 100 && pieces[j].team != piece.team) {
      pieces.splice(j, 1);
      piece.doubleCapture = true;
      return true;
    }

    if (x == piece.startX - 200 && y == piece.startY - 200 && pieces[j].x == piece.startX - 100 && pieces[j].y == piece.startY - 100 && pieces[j].team != piece.team) {
      pieces.splice(j, 1);
      piece.doubleCapture = true;
      return true;
    }
  }

  if (forcedCapturesEn && checkForCapture(piece.team) == true) {
    return false;
  }

  if (piece.doubleCapture || ((x != (piece.startX + 100)) || (y != (piece.startY - 100))) && ((x != (piece.startX - 100)) || (y != (piece.startY - 100)))) {
    return false;
  }

  return true;
}

function checkOccupied(x, y) {
  if (x > 750 || y > 750 || x < 50 || y < 50) {
    return true;
  }
  for (let i = 0; i < pieces.length; i++) {
    if (pieces[i].x == x && pieces[i].y == y) {
      return true;
    }
  }
  return false;
}


class Piece {
  constructor(x, y, diameter, team, text) {
    this.x = x;
    this.y = y;
    this.d = diameter;

    this.team = team;

    this.king = false;

    this.kc = null;
    if (team == 1) {
      this.c = color(team1Color);
      this.kc = color(team1KingColor);
    } else {
      this.c = color(team2Color);
      this.kc = color(team2KingColor);
    }

    this.startX = x;
    this.startY = y;

    this.doubleCapture = false;

    this.text = text;
  }

  display() {
    if (this.king) {
      fill(this.kc);
    } else {
      fill(this.c);
    }
    circle(this.x, this.y, this.d);
    if (debug) {
      textSize(14);
      fill(100, 255, 10);
      text(this.text, this.x - this.d/4, this.y);
    }
  }


  click() {
    this.startX = this.x;
    this.startY = this.y;
    let d = dist(this.x, this.y, mouseX, mouseY);
    if (d <= this.d/2) {

      if (this.team == 1) {
        if (this.king == true) {
          this.kc = team1KingColorA;
        } else {
          this.c = team1ColorA;
        }
      } else {
        if (this.king == true) {
          this.kc = team2KingColorA;
        } else {
          this.c = team2ColorA;
        }
      }
    }
  }

  drag() {
    this.x = mouseX;
    this.y = mouseY;
  }

  release() {
    let d = dist(this.x, this.y, mouseX, mouseY);
    if (d <= this.d/2) {
      if (this.team == 1) {
        if (this.king == true) {
          this.kc = color(team1KingColor);
        } else {
          this.c = color(team1Color);
        }
      } else {
        if (this.king == true) {
          this.kc = color(team2KingColor);
        } else {
          this.c = color(team2Color);
        }
      }
    }
  }

  promote() {
    this.king = true;
  }
}
