let btn;
let p;
let ready;

function startScreen() {
  btn = createButton('Disable Forced Moves');
  btn.style('padding', '20px');
  btn.style('margin', '10px');
  btn.mousePressed(changeB1);
  forcedCapturesEn = true;
  
  ready = createButton('READY');
  ready.style('padding', '20px');
  ready.style('margin', '10px');
  ready.mousePressed(changeB2);

  p = createP('Rules: <br> Forced moves means you must capture a piece if possible. <br> However this does not apply to double captures. <br> After you move your piece there is a brief <br> time that you can perform a double capture. <br> The color bar at the top indicates which player\'s turn it is. <br> Blue is team 1. Pink is team 2.');
  p.style('font-size', '22px');
  p.style('text-align', 'left');
  p.style('padding', '10px');
}

function changeB1() {
  if (forcedCapturesEn) {
    btn.html('Enable Forced Moves');
    forcedCapturesEn = false;
  } else {
    btn.html('Disable Forced Moves');
    forcedCapturesEn = true;
  }

}

function changeB2() {
   btn.remove();
   ready.remove();
   p.remove();
   
   startEn = false;
}
