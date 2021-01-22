    var canvas = document.getElementById("the-canvas");
    var context = canvas.getContext("2d");

    var canvasWidth = window.innerWidth - 48;
    var canvasHeight = window.innerHeight - 48;

    canvas.setAttribute('width', canvasWidth);
    canvas.setAttribute('height', canvasHeight);

    document.addEventListener("keydown", altDownHandler, false);
    document.addEventListener("keyup", altUpHandler, false);
    document.addEventListener("keypress", spaceHandler);

    var velocity = 50;

    var maxBounceHeight = canvas.height - 750;

    var radius = 76;
    var smRadius = radius - 4;

    var rectWidth = 156;
    var rectHeight = 25;

    var borderWidth = 24;

    var y = radius;
    var x = radius + borderWidth / 2;

    var border = document.getElementById("the-canvas");

    border.style.border = borderWidth + "px double #8458B3";

    var strafeSpeed;

    var interval = setInterval(draw, 17);

    var rightPressed = false;
    var leftPressed = false;


    function downHandler(e) {
        if (e.key == "d" || e.key == "D") {
            rightPressed = true;
        }

        if (e.key == "a" || e.key == "A") {
            leftPressed = true;
        }
    }

    var canBounce = true;


    function spaceHandler(e) {
        if (e.keyCode == '32' && canBounce) {
            bounce();
            canBounce = false;
            setTimeout(function() {
                canBounce = true;
            }, 3000);
        }
    }


    function upHandler(e) {
        if (e.key == "d" || e.key == "D") {
            rightPressed = false;
        }

        if (e.key == "a" || e.key == "A") {
            leftPressed = false;
        }
    }


    var rightDown = false;
    var leftDown = false;

    function altDownHandler(e) {
        if (e.repeat) {
            return;
        }

        if (e.key == "d" || e.key == "D" && !rightDown) {
            rightDown = true;

            if (x + radius + strafeSpeed < canvas.width) {
                x += strafeSpeed;
            }
        }

        if (e.key == "a" || e.key == "A" && !leftDown) {
            leftDown = true;

            if (x - radius - strafeSpeed > 0) {
                x -= strafeSpeed;
            }
        }
    }

    function altUpHandler(e) {
        if (e.key == "d" || e.key == "D") {
            rightDown = false;
        }

        if (e.key == "a" || e.key == "A") {
            leftDown = false;
        }
    }



    var scoreCounter = 0;


    var velCounter = 0;
    var rectYOffset;
    var rectXOffset = canvas.width/2 - 250;


    var arr = [];



    mkObjBlock(5);
//    -------------------------------------------------


    function draw() {
        if (velCounter > 0) {
            velCounter--;
        } else {

        context.clearRect(0, 0, canvas.width, canvas.height);



        if (!canBounce) {
            strafeSpeed = 192;
        } else {
            strafeSpeed = 192;
        }

//            if (rightPressed) {
//                if (x + radius + strafeSpeed < canvas.width) {
//                    x += strafeSpeed;
//                }
//            } else if (leftPressed) {
//                if (x - radius - strafeSpeed > 0) {
//                    x -= strafeSpeed;
//                }
//            }

//            Alt Keypressing



        if (y + velocity >= canvas.height - radius && velocity > 0) {
            velocity -= 2;
            velocity *= -1;
            maxBounceHeight = maxBounceHeight + 50;

            var bounceSound = new Audio("bounce.wav");
            bounceSound.play();
            bounceSound.volume = 0.1;

        } else if (y + velocity < maxBounceHeight && velocity < 0) {

            velCounter = 2;
            velocity *= -1;

        }

        if (maxBounceHeight > canvas.height - 50) {
            velocity = 0;
        }

        y += velocity;

        drawHelperBlock();

        mkLines();

            drawBall();
        }


    }

    var circArr = [];

    var circClr = "rgb(229, 234, 245)";

    function drawBall() {
        if (canBounce) {
            var red = 229 + (15 * circArr.length);
            var green = 234 - (9 * circArr.length);
            circClr = "rgb(" + red + ", " + green + ", 245)";
        } else {
            var red = 160 + (4 * circArr.length);
            var green = 210 - (8 * circArr.length);
            circClr = "rgb(" + red + ", " + green + ", 235)";
        }

        context.fillStyle = circClr;

        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI*2, false);
        context.fill();
        context.closePath();

//        -------------------------------------------------------------------------------

        for (var i = 0; i < circArr.length; i++) {
            context.fillStyle = "#3a3a3a";
            context.beginPath();
            context.arc(x, y, circArr[i].radius, 0, 2 * Math.PI, false);
            context.stroke();
            context.closePath();
        }


        mkInnerCirc(smRadius);


        if (scoreCounter != 0 && scoreCounter % 20 === 0) {
            var obj = {
                radius: smRadius
            };
            circArr.push(obj);
            smRadius -= 5;
        }

        if (scoreCounter >= 20) {
            scoreCounter = 0;
        }


    }

    function mkInnerCirc(radius) {
        context.fillStyle = "#3a3a3a";
        context.beginPath();
        context.arc(x, y, radius, 0, (scoreCounter / 20) * 2 * Math.PI, false);
        context.stroke();
        context.closePath();
    }


    function drawRect(rectWidth, rectHeight, obj) {
        if (obj.yOffset < canvas.height) {
            obj.yOffset += 10;
        } else {
            obj.yOffset = -100;

            obj.xOffset = grouping() * 192;

            obj.newColor = false;
        }

        if (!obj.newColor) {
            if ((x + radius > obj.xOffset) && (x - radius < obj.xOffset + rectWidth) && (y + radius > obj.yOffset) && (y - radius < obj.yOffset + rectHeight)) {
                context.fillStyle = "#D78089";
                obj.newColor = true;


                var tempX = obj.xOffset / 192;

                switch (tempX) {
                    case 1:
                        var hitSound = new Audio("Piano/Piano.pp.E1.mp3");
                        hitSound.play();
                        hitSound.volume = 1;
                        break;
                    case 2:
                        var hitSound = new Audio("Piano/Piano.pp.E2.mp3");
                        hitSound.play();
                        hitSound.volume = 1;
                        break;
                    case 3:
                        var hitSound = new Audio("Piano/Piano.pp.B2.wav");
                        hitSound.play();
                        hitSound.volume = 1;
                        break;
                    case 4:
                        var hitSound = new Audio("Piano/Piano.pp.B3.wav");
                        hitSound.play();
                        hitSound.volume = 1;
                        break;
                    case 5:
                        var hitSound = new Audio("Piano/Piano.pp.B4.wav");
                        hitSound.play();
                        hitSound.volume = 1;
                        break;
                    case 6:
                        var hitSound = new Audio("Piano/Piano.pp.B5.wav");
                        hitSound.play();
                        hitSound.volume = 1;
                        break;
                    case 7:
                        var hitSound = new Audio("Piano/Piano.pp.B6.wav");
                        hitSound.play();
                        hitSound.volume = 1;
                        break;
                    case 8:
                        var hitSound = new Audio("Piano/Piano.pp.B7.wav");
                        hitSound.play();
                        hitSound.volume = 1;
                        break;
                    default:
                        break;
                }







                scoreCounter++;
            } else {
                context.fillStyle = "#555EE5";
            }
        } else {
            context.fillStyle = "#D78089";
        }

        context.beginPath();
        context.rect(obj.xOffset, obj.yOffset, rectWidth, rectHeight);

        context.fill();
        context.closePath();
    }


    function bounce() {
        if (canBounce) {
            maxBounceHeight -= maxBounceHeight / 2;
            if (velocity === 0) {
                velocity = -50;
            } else {
                velocity = Math.abs(velocity);
                velocity += 9;
            }

        }
    }



    function mkLines() {
        for (var i = 0; i < 10; i++) {
            context.fillStyle = "#a9a9a9";

            context.beginPath();
            context.rect(192 * (i + 1) - 18, 0, 5, canvas.height);
            context.fill();
            context.closePath();
        }
    }









//    ----------------------------->Random Generation<-----------------------------
function mkObjRandPos(num) {
    for (var i = 0; i < num; i++) {
        arr[i] = {
            xOffset: Math.floor(Math.random() * ((canvas.width - (rectWidth + borderWidth) - borderWidth + 1))) + borderWidth,
            yOffset: Math.floor(Math.random() * canvas.height),
            newColor: false
        };
    }
}


function drawHelperRand() {
    for (var i = 0; i < arr.length; i++) {
        var xVal = Math.floor(Math.random() * ((canvas.width - (rectWidth + borderWidth) - borderWidth + 1))) + borderWidth;
        drawRect(rectWidth, rectHeight, arr[i], xVal);
    }
}




//    ----------------------------->Block Generation<-----------------------------
function mkObjBlock(num) {
    for (var i = 0; i < num; i++) {
        var temp = grouping() * 192;
        arr[i] = {
            xOffset: temp,
            yOffset: rectHeight * 9 * i,
            newColor: false
        };
    }
}

var prevVal = 5;
function drawHelperBlock() {
    for (var i = 0; i < arr.length; i++) {
        drawRect(rectWidth, rectHeight, arr[i]);
    }
}

function grouping() {
    var xOffset;
    var num = Math.random();
    if (prevVal > 1 && num < .4) {
        xOffset = prevVal - 1;
    } else if (prevVal <= 1 || prevVal < 8 && num < .8) {
        xOffset = prevVal + 1;
    } else if (num < .9) {
        xOffset = prevVal;
    } else {
        if (prevVal > 4) {
            xOffset = prevVal - 3;
        } else if (prevVal < 6) {
            xOffset = prevVal + 3;
        } else {
            xOffset = prevVal;
        }
    }

    prevVal = xOffset;
    return xOffset;
}
