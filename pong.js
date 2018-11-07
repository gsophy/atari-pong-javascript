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
function resetBall() {
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.velocityX = -ball.velocityX;
    ball.speed = 7;
}

//draw the net
function drawNet() {
    for (let i = 0; i <= canvas.height; i +=15) {
        drawRect(net.x, net.y + i, net.width, net.height, net.color);
    }
}

//draw text
function drawText (text, x, y) {
    ctx.fillStyle = "#FFF";
    ctx.font = "75px fantasy";
    ctx.fillText(text, x, y);
}

//collision detection
function collison (b,p){
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    return p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top;
}

//update function, the function that does all calculations
function update () {
    
//change the score of the players, if the ball goes to the left "ball.x < 0" computer wins, else if "ball.x > canvas.width", the user wins
    if (ball.x - ball.radius < 0) {
        com.score ++;
        comScore.play ();
        resetBall ();
    } else if (ball.x + ball.radius > canvas.width) {
        user.score++;
        userScore.play();
        resetBall();
    }

//the ball has a velocity
ball.x += ball.velocityX;
ball.y += ball.velocityY;

//computer plays for itself, and we must be able to beat it
//Simple AI
com.y += ((ball.y - (com.y + com.height/2)))*0.1;

//when the ball collides with the bottom and the top walls we inverse the y velocity
if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
    ball.velocityY = -ball.velocityY;
    wall.play();
}

//we check if the paddle hit the user or the com paddle
let player = (ball.x + ball.radius < canvas.width/2) ? user : com;

//if the ball hits a paddle
if (collision(ball,player)) {
    //play sound
    hit.play();
//we check where the ball hits the paddle
let collidePoint = (ball.y - (player.y + player.height/2));
//normalize the value of collidePoint, we need to get the numbers between -1 and 1.
// -player.height/2 < collide Point < player.height/2
collidePoint = collidePoint / (player.height/2);

//when the ball hits the top of a paddle, we want the ball to take a -45 degree angle
//when the ball hits the center of the paddle, we want the ball to take a 0 degree angle
//when the ball hits the bottom of the paddle, we want the ball to take a 45 degree angle
//Math.PI/4 = 45 degree angle
let angleRad = (Math.PI/4) * collidePoint

        }
}

