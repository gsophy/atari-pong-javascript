//select canvas element
const canvas =document.getElementById("pong");

//getContext of canvas = methods and properties to draw and do a lot of things to the canvas.  
const ctx = canvas.getContext('2d');

// load sounds
let hit = new Audio();
let wall = new Audio();
let userScore = new Audio();
let comScore = new Audio();

hit.src = "sounds/hit.mp3";
wall.src = "sounds/wall.mp3";
comScore.src = "sounds/comScore.mp3";
userScore.src = "sounds/userScore.mp3";

//Ball Object
const ball = {
    x: canvas.width/2,
    y: canvas.height/2,
    radius: 10,
    velocityX: 5,
    velocityY: 5,
    speed: 7,
    color: "WHITE"
}

//User Paddle
const user = {
    x: 0, //left side of the canvas
    y: (canvas.height - 100)/2, //-100 is the height of the paddle
    width: 10,
    height: 100,
    score: 0,
    color: "WHITE"
}

//Computer Paddle
const com = {
    x: canvas.width - 10, //-10 is the width of the paddle
    y: (canvas.height - 100)/2, //-100 is the height of the paddle
    width: 10,
    height: 100,
    score: 0,
    color: "WHITE"
}

//NET
const net  = {
    x: (canvas.width -2)/2,
    y: 0,
    height: 10,
    width: 2,
    color: "WHITE"
}

// draw a rectangle, will be used to draw paddles
function drawRect (x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h)
}

//draw circle, will be used to draw the ball
function drawArc (x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
}

//listening to the mouse
canvas.addEventListener("mousemove", getMousePos);

function getMousePos(evt) {
    let rect = canvas.getBoundingClientRect();

    user.y = evt.clientY - rect.top - user.height/2;
}

//when COM or User Scores, we will reset the ball