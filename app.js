const frameRate = 1000 / 30;
const snakeHead = document.getElementById("snakeHead");

let canvas;
let canvasContext;

let appleX;
let appleY;

let snakeHeadX = 500;
let snakeHeadY = 700;
let snakeBody = 0;
let snakeHeadWidth = 20;
let snakeHeadHeight = 20;
let snakeBodyWidth = 10;
let snakeBodyHeight = 10;
let snakeSpeed = 2;
let snakeDirection = "Up";
let snakeBodyDirection;
let length;
let bodyParts = 0;

let moves = [];
let body = [];
let score = 0;

window.onload = () => {
    canvas = document.getElementById("gameplayScreen");
    canvasContext = canvas.getContext("2d");
    findAppleCoordinates();
    setInterval(drawEverything, frameRate);
}



function drawEverything() {
    canvasContext.fillStyle = "black";
    canvasContext.fillRect(0, 0, canvas.width, canvas.height)
    drawApple();
    drawSnakeHead();
    if (getDistance(appleX, appleY, snakeHeadX, snakeHeadY) < snakeHeadWidth) {
        handleCollision();
    }
    if (snakeHeadX <= 0 || snakeHeadX >= 980) {
        gameOver();
    }
    if (snakeHeadY <= 0 || snakeHeadY >= 730) {
        gameOver();
    }
    if (snakeBody) {
        drawSnakeBodySegment();
    }
}
function findAppleCoordinates() {
    appleX = Math.floor(Math.random() * 980);
    appleY = Math.floor(Math.random() * 730);
    return appleX, appleY
}

function getDistance(x1, y1, x2, y2) {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

function drawApple() {
    canvasContext.fillStyle = "red";
    canvasContext.fillRect(appleX, appleY, 20, 20)
}

function drawSnakeHead() {
    canvasContext.fillStyle = "green";
    canvasContext.fillRect(snakeHeadX, snakeHeadY, snakeHeadWidth, snakeHeadHeight)


    if (snakeDirection === "Up") {
        snakeHeadY -= snakeSpeed;
    }
    if (snakeDirection === "Down") {
        snakeHeadY += snakeSpeed;
    }
    if (snakeDirection === "Right") {
        snakeHeadX += snakeSpeed;
    }
    if (snakeDirection === "Left") {
        snakeHeadX -= snakeSpeed;
    }
}

document.addEventListener("keydown", handleSnakeHeadMovement)

function handleSnakeHeadMovement(e) {
    // if (snakeBody) {
    //     moves.push(`(${e.code}, ${snakeHeadX}, ${snakeHeadY})`);
    //     console.log(moves);
    // }


    if (snakeDirection === "Up") {
        if (e.code === "ArrowLeft") {
            snakeDirection = "Left"
        };
        if (e.code === "ArrowRight") {
            snakeDirection = "Right"
        };
    }
    if (snakeDirection === "Down") {
        if (e.code === "ArrowLeft") {
            snakeDirection = "Left"
        };
        if (e.code === "ArrowRight") {
            snakeDirection = "Right"
        };
    }
    if (snakeDirection === "Right") {
        if (e.code === "ArrowUp") {
            snakeDirection = "Up"
        };
        if (e.code === "ArrowDown") {
            snakeDirection = "Down"
        };
    }
    if (snakeDirection === "Left") {
        if (e.code === "ArrowUp") {
            snakeDirection = "Up"
        };
        if (e.code === "ArrowDown") {
            snakeDirection = "Down"
        };
    }

}

function handleCollision() {
    score += 100;
    drawSnakeBodySegment();
    findAppleCoordinates();
    console.log("collision detected");
    console.log(score);
}

function drawSnakeBodySegment() {
    snakeBody += 1;
    bodyParts += 1;
    body.push(bodyParts)
    canvasContext.fillStyle = "green";
    canvasContext.fillRect(snakeHeadX, snakeHeadY + (bodyParts.length * 20), 20, 20);

}

function gameOver() {
    alert("Game Over!");
}


