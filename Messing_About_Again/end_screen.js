let over;

function endScreen(losingTeam) {
  p = createP('GAME OVER <br> Team ' + (losingTeam % 2 + 1) + ' Wins');
  p.style('font-size', '100px');
  p.style('text-align', 'left');   
  
  over = createButton('New Game');
  over.mousePressed(changeB3);
}

function changeB3() {
  
  setupPieces();
  
  turn = 2;

  nextTurnReady = false;
  
  timer = 0;
  timerStart = false;
  
  debug = true;
  
  startEn = false;
  
  endGame = false;
  
  over.remove();
  p.remove();
  
  currTurn.style('background-color', team2Color);
  
}
