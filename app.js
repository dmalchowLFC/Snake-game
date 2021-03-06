const canvas = document.getElementById("gameplayScreen");
const canvasContext = canvas.getContext("2d");
const scoreboard = document.getElementById("scoreboard");
const levelDisplay = document.getElementById("level");

let intervalId;
let frameRate = 75;
let score = 0;
let level = 1;
let appleX;
let appleY;
let snake = {
    body: [
        { x: (canvas.width / 2), y: canvas.height - 30 },
        { x: (canvas.width / 2), y: canvas.height - 20 },
        { x: (canvas.width / 2), y: canvas.height - 10 },
    ],
    speed: 10,
    direction: "Up",
    width: 10,
    height: 10,
}

document.addEventListener("keydown", handleSnakeMovement);

window.onload = () => {
    findAppleCoordinates();
    intervalId = setInterval(drawEverything, frameRate);
}


function drawEverything() {
    canvasContext.fillStyle = "black";
    canvasContext.fillRect(0, 0, canvas.width, canvas.height)
    scoreboard.textContent = `Score: ${score}`;
    levelDisplay.textContent = `Level: ${level}`;
    drawApple();
    drawSnake();
    for (let i = 1; i < snake.body.length; i++) {
        if (snake.body[0].x === snake.body[i].x && snake.body[0].y === snake.body[i].y) {
            gameOver();
        }
    };
    if (getDistance(appleX, appleY, snake.body[0].x, snake.body[0].y) < snake.width) {
        handleCollision();
    }
    if (snake.body[0].x < 0 || snake.body[0].x >= canvas.width) {
        gameOver();
    }
    if (snake.body[0].y < 0 || snake.body[0].y >= canvas.height) {
        gameOver();
    }

}

// Apple Stuff
function findAppleCoordinates() {
    findAppleX();
    findAppleY();
}
function findAppleX(min, max) {
    min = Math.ceil(05);
    max = Math.floor(canvas.width);
    appleX = Math.floor(Math.random() * (max - min) + min);
    return appleX;
}
function findAppleY(min, max) {
    min = Math.ceil(05);
    max = Math.floor(canvas.height);
    appleY = Math.floor(Math.random() * (max - min) + min);
    return appleY;
}


function drawApple() {
    canvasContext.drawImage(document.getElementById("appleImg"), appleX, appleY, 10, 10);
};



// Snake Stuff
function drawSnake() {
    const snakeCopy = snake.body.map(snakePart => Object.assign({}, snakePart));

    for (let i = 1; i < snake.body.length; i++) {
        snake.body[i] = snakeCopy[i - 1];
        canvasContext.fillStyle = "green";
        canvasContext.fillRect(snake.body[i].x, snake.body[i].y, snake.width, snake.height)
    };

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

}


function handleSnakeMovement(e) {
    if (e.keyCode === 32) {
        pauseGame();
    };

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

// Distance Stuff
function getDistance(x1, y1, x2, y2) {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}


function handleCollision() {
    updateScore();
    console.log(score)
    snake.body.push({ x: appleX, y: appleY });
    findAppleCoordinates();
}


// Game functions
function pauseGame() {
    alert("Game Paused")
}


function gameOver() {
    window.location.reload();
    alert("Oh no! Try again!");
}


//Number stuff
function updateScore() {
    score += 10;
    if (score % 50 === 0) {
        updateLevel();
    }
    return score
}


function updateLevel() {
    level += 1;
    frameRate -= 5;
    clearInterval(intervalId);
    intervalId = setInterval(drawEverything, frameRate)
    console.log(level);
    console.log(frameRate)
    return level, frameRate
};
