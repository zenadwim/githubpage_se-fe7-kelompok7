const CELL_SIZE = 20;
const CANVAS_SIZE = 600;
const REDRAW_INTERVAL = 50;
const WIDTH = CANVAS_SIZE / CELL_SIZE;
const HEIGHT = CANVAS_SIZE / CELL_SIZE;
const DIRECTION = {
    LEFT: 0,
    RIGHT: 1,
    UP: 2,
    DOWN: 3,
}

var MOVE_INTERVAL = 120;
var RESET_INTERVAL = 100;

var wallX = [];
var wallY = [];

var wall2 = [
    {
        x1: 4,
        x2: 25,
        y: 7,
    }
];
var wall3 = [
    {
        x1: 4,
        x2: 25,
        y: 14,
    }
];
var wall4 = [
    {
        x1: 4,
        x2: 25,
        y: 21,
    }
];
var wall5 = [
    {
        x: 6,
        y1: 4,
        y2: 18,
    },
    {
        x: 23,
        y1: 11,
        y2: 25,
    }
];


function initPosition() {
    return {
        x: Math.floor(Math.random() * WIDTH),
        y: Math.floor(Math.random() * HEIGHT),
    }
}

function initHeadAndBody() {
    let head = initPosition();
    let body = [{x: head.x, y: head.y}];
    return {
        head: head,
        body: body,
    }
}

function initDirection() {
    return Math.floor(Math.random() * 4);
}

function initSnake(color) {
    return {
        color: color,
        ...initHeadAndBody(),
        direction: initDirection(),
        score: 0,
        scoreReset: 0,
        level: 1,
        life: 3,
        total_lifes: 3,
    }
}

let snake = initSnake("green");

let apple1 = {
    position: initPosition(),
}

let apple2 = {
    position: initPosition(),
}

let lifes = {
    position: initPosition(),
    visible: true,
    visibleCount: 0, 
}

function drawCell(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawLifes(ctx, x, y){
    let img = document.getElementById('lifes');
    ctx.drawImage(img, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);

    if (lifes.visible) {
        ctx.drawImage(img, lifes.position.x * CELL_SIZE, lifes.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        lifes.visibleCount++;
        if (lifes.visibleCount == 10) {
            lifes.visible = false;
        }
    } else {
        drawCell(ctx, lifes.position.x, lifes.position.y, "white")
        lifes.visibleCount--;
        if (lifes.visibleCount == 0) {
            lifes.visible = true;
        }
    }
}

function drawCornerLifes(ctx, x, y) {
	let img = document.getElementById('lifes');
	ctx.drawImage(img, x * CELL_SIZE, y, CELL_SIZE, CELL_SIZE);
}


function drawScore(snake) {
    let scoreCanvas;
    if (snake.color == snake.color) {
        scoreCanvas = document.getElementById("scoreBoard");
    }
    let scoreCtx = scoreCanvas.getContext("2d");

    scoreCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    scoreCtx.font = "25px Arial";
    scoreCtx.fillStyle = snake.color
    scoreCtx.fillText(snake.score, 10, scoreCanvas.scrollHeight / 1.5);
}

function drawTotalLifes(snake) {
    let scoreCanvas = document.getElementById("total_lifes1");
    let scoreCtx = scoreCanvas.getContext("2d");

    scoreCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    scoreCtx.font = "25px Arial";
    scoreCtx.fillStyle = snake.color
    scoreCtx.fillText(snake.total_lifes, 10, scoreCanvas.scrollHeight / 1.5);
}

// function to init wall at level
function initWall2() {
    for (let i = 0; i < wall2.length; i++){
        for (let j = wall2[i].x1; j <= wall2[i].x2; j++) {
            wallX.push(j);
            wallY.push(wall2[i].y);
        }
    }
}

function initWall3() {
    for (let i = 0; i < wall3.length; i++){
        for (let j = wall3[i].x1; j <= wall3[i].x2; j++) {
            wallX.push(j);
            wallY.push(wall3[i].y);
        }
    }
}

function initWall4() {
    for (let i = 0; i < wall4.length; i++){
        for (let j = wall4[i].x1; j <= wall4[i].x2; j++) {
            wallX.push(j);
            wallY.push(wall4[i].y);
        }
    }
}

function initWall5() {
    for (let i = 0; i < wall5.length; i++){
        for (let j = wall5[i].y1; j <= wall5[i].y2; j++) {
            wallY.push(j);
            wallX.push(wall5[i].x);
        }
    }
}

// function to create wall on canvas
function createWall() {
    let wallCanvas = document.getElementById("snakeBoard");
    let ctx = wallCanvas.getContext("2d");
    for (let i = 0; i < wallX.length; i++) {
        let imgTrap = document.getElementById("trap");
        ctx.drawImage(imgTrap, wallX[i] * CELL_SIZE, wallY[i] * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }
}

//cek bilangan prima
function prima(){
    let isPrima = true;
    if (snake.score > 1){
        for (let i = 2; i < snake.score; i++){
            if(snake.score % i == 0){
                isPrima = false;
                break;
            }
        }
        return isPrima;
    }
}

function draw() {
    setInterval(function() {
        let snakeCanvas = document.getElementById("snakeBoard");
        let ctx = snakeCanvas.getContext("2d");

        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        
        // draw snake head 
        if (snake.direction == 0) {
            let imgSnakeHead = document.getElementById("snake-head-left");
            ctx.drawImage(imgSnakeHead, snake.head.x * CELL_SIZE, snake.head.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
        else if (snake.direction == 1) {
            let imgSnakeHead = document.getElementById("snake-head-right");
            ctx.drawImage(imgSnakeHead, snake.head.x * CELL_SIZE, snake.head.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
        else if (snake.direction == 2) {
            let imgSnakeHead = document.getElementById("snake-head-up");
            ctx.drawImage(imgSnakeHead, snake.head.x * CELL_SIZE, snake.head.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
        else if (snake.direction == 3) {
            let imgSnakeHead = document.getElementById("snake-head-down");
            ctx.drawImage(imgSnakeHead, snake.head.x * CELL_SIZE, snake.head.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }

        let imgSnakeBody = document.getElementById("snake-body");
        for (let i = 1; i < snake.body.length; i++) {
            ctx.drawImage(imgSnakeBody, snake.body[i].x * CELL_SIZE, snake.body[i].y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
        }

        // draw apple
        let imgApple = document.getElementById("apple");
        ctx.drawImage(imgApple, apple1.position.x * CELL_SIZE, apple1.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        ctx.drawImage(imgApple,apple2.position.x * CELL_SIZE,apple2.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        
        createWall();
        drawTotalLifes(snake);
        

        // draw level, score, speed and life
        document.getElementById("level").innerHTML = "Snake Game - Level: " + snake.level;
        drawScore(snake);
        document.getElementById("speed").innerHTML = "Speed " + MOVE_INTERVAL + " ms";

        // lifes (corner)
        for (let i = 0; i < snake.total_lifes; i++) {
            x=i;
            y=0;
            drawCornerLifes(ctx, x, y);
        }

        //Lifes
        if(prima()){
            drawLifes(ctx, lifes.position.x, lifes.position.y);   
        }
        
    }, REDRAW_INTERVAL);
}

// function teleport
function teleport(snake) {
    if (snake.head.x < 0) {
        snake.head.x = CANVAS_SIZE / CELL_SIZE - 1;
    }
    if (snake.head.x >= WIDTH) {
        snake.head.x = 0;
    }
    if (snake.head.y < 0) {
        snake.head.y = CANVAS_SIZE / CELL_SIZE - 1;
    }
    if (snake.head.y >= HEIGHT) {
        snake.head.y = 0;
    }
}

//level up sound effect
function soundlvl(){
    var audio = new Audio('assets/levelup.wav');
    audio.play();
}

// function eat
function eat(snake, apple1, apple2) {
    var audio = new Audio('assets/eat.wav');

    if (snake.head.x == apple1.position.x && snake.head.y == apple1.position.y) {
        audio.play();
        apple1.position = initPosition();
        snake.score++;
        snake.scoreReset++;
        snake.body.push({ x: snake.head.x, y: snake.head.y });
    }
    if (snake.head.x == apple2.position.x && snake.head.y == apple2.position.y) {
        audio.play();
        apple2.position = initPosition();
        snake.score++;
        snake.scoreReset++;
        snake.body.push({ x: snake.head.x, y: snake.head.y });
    }

    for (let i = 0; i< snake.score; i++) {
            if (snake.score == 5) {
                snake.level = 2;
                MOVE_INTERVAL = 80;
                initWall2();
                soundlvl();
            }
            else if (snake.score == 10) {
                snake.level = 3;
                MOVE_INTERVAL = 65;
                initWall3();
                soundlvl();
            }
            else if (snake.score == 15) {
                snake.level = 4;
                MOVE_INTERVAL = 60;
                initWall4();
                soundlvl();
            }
            else if (snake.score == 20) {
                snake.level = 5;
                MOVE_INTERVAL = 55;
                wallX = [];
                wallY = [];
                initWall5();
                soundlvl();
            }
    }
    eatlifes();
}

function eatlifes(){
    if (snake.head.x == lifes.position.x && snake.head.y == lifes.position.y) {
        //get lifes sound effect
        var audio = new Audio('assets/lifes.mp3');
        audio.play();
        lifes.position = initPosition();
        snake.score++;
        snake.total_lifes++;
        snake.body.push({x: snake.head.x, y: snake.head.y});
    }
}

function moveLeft(snake) {
    snake.head.x--;
    teleport(snake);
    eat(snake, apple1, apple2);
}

function moveRight(snake) {
    snake.head.x++;
    teleport(snake);
    eat(snake, apple1, apple2);
}

function moveDown(snake) {
    snake.head.y++;
    teleport(snake);
    eat(snake, apple1, apple2);
}

function moveUp(snake) {
    snake.head.y--;
    teleport(snake);
    eat(snake, apple1, apple2);
}

function moveStop(snake) {
    snake.direction = DIRECTION.STOP;
}

// function check collision
function checkCollision(snakes) {
    let isCollide = false;
    
    // check if snake hit body       
    for (let i = 0; i < snakes.length; i++) {
        for (let j = 0; j < snakes.length; j++) {
            for (let k = 1; k < snakes[j].body.length; k++) {
                if (snakes[i].head.x == snakes[j].body[k].x && snakes[i].head.y == snakes[j].body[k].y) {
                    isCollide = true;
                }
            }
        }
    }

    // check if snake hit the wall
    for (let i = 0; i < wallX.length; i++) {
        if (snake.head.x === wallX[i] && (snake.direction == 2 || snake.direction == 3)) {
            if (snake.head.y === wallY[i] || snake.head.y === wallY[i]) {
                isCollide = true;
            }
        }
        if (snake.head.y === wallY[i] && (snake.direction == 0 || snake.direction == 1)) {
            if (snake.head.x === wallX[i] || snake.head.x === wallX[i]) {
                    isCollide = true;
            }
        }
    } 

    // check if apple not in wall position
    for (let i = 0; i < wallX.length; i++) {
        if (apple1.position.x === wallX[i]) {
            if (apple1.position.y === wallY[i] || apple1.position.y === wallY[i]) {
                apple1.position = initPosition();
            }
        }
        if (apple2.position.y === wallY[i]) {
            if (apple2.position.x === wallX[i] || apple2.position.x === wallX[i]) {
                apple2.position = initPosition();
            }
        }
    }  

    var audio = new Audio('assets/game-over.mp3');

    if (isCollide) {
        audio.play();
        snake.total_lifes--;
        if(snake.total_lifes<=0){
            alert("Game over - You get score " + snake.score);
            MOVE_INTERVAL = 120;
            wallX = [];
            wallY= [];
            snake = initSnake("green");
        }
    }
    return isCollide;
}

function move(snake) {
    switch (snake.direction) {
        case DIRECTION.LEFT:
            moveLeft(snake);
            break;
        case DIRECTION.RIGHT:
            moveRight(snake);
            break;
        case DIRECTION.DOWN:
            moveDown(snake);
            break;
        case DIRECTION.UP:
            moveUp(snake);
            break;
    }
    moveBody(snake);
    if (!checkCollision([snake])) {
        setTimeout(function() {
            move(snake);
        }, MOVE_INTERVAL);
    } else {
        initGame();
    }
}

function moveBody(snake) {
    snake.body.unshift({ x: snake.head.x, y: snake.head.y });
    snake.body.pop();
}

function turn(snake, direction) {
    const oppositeDirections = {
        [DIRECTION.LEFT]: DIRECTION.RIGHT,
        [DIRECTION.RIGHT]: DIRECTION.LEFT,
        [DIRECTION.DOWN]: DIRECTION.UP,
        [DIRECTION.UP]: DIRECTION.DOWN,
    }

    if (direction !== oppositeDirections[snake.direction]) {
        snake.direction = direction;
    }
}

document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
        turn(snake, DIRECTION.LEFT);
    } else if (event.key === "ArrowRight") {
        turn(snake, DIRECTION.RIGHT);
    } else if (event.key === "ArrowUp") {
        turn(snake, DIRECTION.UP);
    } else if (event.key === "ArrowDown") {
        turn(snake, DIRECTION.DOWN);
    }
})

function initGame() {
    move(snake);
}

initGame();