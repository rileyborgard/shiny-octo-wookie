var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var x = 190;
var y = 190;

var leftPressed = false;
var rightPressed = false;
var upPressed = false;
var downPressed = false;
var bulletX = [];
var bulletY = [];
var enemyX = [];
var enemyY = [];
var counter = 0;

function draw() {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, 400, 400);
    ctx.fillStyle = "#00ff00";
    for(var i = 0; i < bulletX.length; i++) {
        ctx.fillRect(bulletX[i], bulletY[i], 20, 20);
    }
    ctx.fillStyle = "#880088";
    for(var i = 0; i < enemyX.length; i++) {
        ctx.fillRect(enemyX[i], enemyY[i], 20, 20);
    }
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(x, y, 20, 20);
}

function update() {
    draw();
    
    if(leftPressed && x > 0) x -= 4;
    if(rightPressed && x < 380) x += 4;
    if(upPressed && y > 0) y -= 4;
    if(downPressed && y < 380) y += 4;
    
    for(var i = 0; i < bulletY.length; i++) {
        if(bulletY[i] < -400) {
            bulletX.splice(i, 1);
            bulletY.splice(i, 1);
            i--;
	}
	bulletY[i] -= 8;
    }

    for(var i = 0; i < enemyY.length; i++) {
        if(bulletY[i] > 420) {
            enemyX.splice(i, 1);
            enemyY.splice(i, 1);
            i--;
	}
	enemyY[i] += 8;
    }

    if(counter > 20) {
        enemyX.push(Math.floor(Math.random()*380));
	enemyY.push(-20);
	counter = 0;
    }
    counter++;

    setTimeout(update, 20);
}
function keyDown(event) {
    if(event.keyCode == 37) {
        leftPressed = true;
    }else if(event.keyCode == 39) {
        rightPressed = true;
    }else if(event.keyCode == 38) {
        upPressed = true;
    }else if(event.keyCode == 40) {
        downPressed = true;
    }else if(event.keyCode == 32) {
	bulletX.push(x);
	bulletY.push(y);
    }
}
function keyUp(event) {
    if(event.keyCode == 37) {
        leftPressed = false;
    }else if(event.keyCode == 39) {
        rightPressed = false;
    }else if(event.keyCode == 38) {
        upPressed = false;
    }else if(event.keyCode == 40) {
        downPressed = false;
    }
}

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);
update();
