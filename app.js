const frameRate = 75;

let canvas;
let canvasContext;
let score = 0;

let appleX;
let appleY;

let snake = {
    body: [
        { x: 500, y: 700 },
        { x: 500, y: 710 },
        { x: 500, y: 720 },
    ],
    speed: 10,
    direction: "Up",
    width: 10,
    height: 10,
}




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
    drawSnake();
    if (getDistance(appleX, appleY, snake.body[0].x, snake.body[0].y) < snake.width) {
        handleCollision();
    }
    if (snake.body[0].x <= 0 || snake.body[0].x >= 990) {
        gameOver();
    }
    if (snake.body[0].y <= 0 || snake.body[0].y >= 740) {
        gameOver();
    }

}
function findAppleCoordinates() {
    appleX = Math.floor(Math.random() * 990);
    appleY = Math.floor(Math.random() * 740);
    return appleX, appleY
}

function getDistance(x1, y1, x2, y2) {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

function drawApple() {
    canvasContext.fillStyle = "red";
    canvasContext.fillRect(appleX, appleY, 10, 10)
}

function drawSnake() {
    const snakeCopy = snake.body.map(snakePart => Object.assign({}, snakePart));


    canvasContext.fillStyle = "green";
    canvasContext.fillRect(snake.body[0].x, snake.body[0].y, snake.width, snake.height)
    canvasContext.fillStyle = "green";
    canvasContext.fillRect(snake.body[1].x, snake.body[1].y, snake.width, snake.height)
    canvasContext.fillStyle = "green";
    canvasContext.fillRect(snake.body[2].x, snake.body[2].y, snake.width, snake.height)

    if (snake.direction === "Up") {
        snake.body[0].y -= snake.speed;
    }
    if (snake.direction === "Down") {
        snake.body[0].y += snake.speed;
    }
    if (snake.direction === "Right") {
        snake.body[0].x += snake.speed;
    }
    if (snake.direction === "Left") {
        snake.body[0].x -= snake.speed;
    }

    for (let i = 1; i < snake.body.length; i++) {
        snake.body[i] = snakeCopy[i - 1];
    };

}

document.addEventListener("keydown", handleSnakeMovement)

function handleSnakeMovement(e) {
    if (snake.direction === "Up") {
        if (e.code === "ArrowLeft") {
            snake.direction = "Left"
        };
        if (e.code === "ArrowRight") {
            snake.direction = "Right"
        };
    }
    if (snake.direction === "Down") {
        if (e.code === "ArrowLeft") {
            snake.direction = "Left"
        };
        if (e.code === "ArrowRight") {
            snake.direction = "Right"
        };
    }
    if (snake.direction === "Right") {
        if (e.code === "ArrowUp") {
            snake.direction = "Up"
        };
        if (e.code === "ArrowDown") {
            snake.direction = "Down"
        };
    }
    if (snake.direction === "Left") {
        if (e.code === "ArrowUp") {
            snake.direction = "Up"
        };
        if (e.code === "ArrowDown") {
            snake.direction = "Down"
        };
    }
}

function handleCollision() {
    score += 100;
    snake.body.push({ x: appleX, y: appleY });
    findAppleCoordinates();
    console.log("collision detected");
    console.log(score);
    console.log(snake.body)
}


function gameOver() {
    alert("Game Over!");
}


