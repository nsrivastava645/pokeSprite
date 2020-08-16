let canvas = document.getElementById('cvs');
let ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;
let keys = [];

let player = {
    X: 0,
    Y: 0,
    width: 96,
    height:96,
    frameX: 0,
    frameY: 0,
    speed: 9,
    moving: false
}

let playerSprite = new Image();
playerSprite.src = './images/bahamut.png';


let background = new Image();
background.src = './images/background.png';

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH){
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);

}
//animation loop
function animate() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.drawImage(background,0,0, canvas.width, canvas.height);
    drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.X, player.Y, player.width, player.height);
    moveThePlayer();
    handlePlayerMotion();
    requestAnimationFrame(animate);
}
animate();


//event listener for key down and keyup
window.addEventListener('keydown', function(e){
    keys[e.keyCode] = true;
    player.moving = true;//to show movement in the handle movement and key presses
});
window.addEventListener('keyup', function(e){
    delete keys[e.keyCode];
    player.moving = false; //when movement stops or key is released make the player stable
});


function moveThePlayer(){
    //up movement
    if(keys[38] && player.Y>10){
        player.Y-= player.speed;
        player.frameY = 3;//up sprite frame
    }
    //left movement
    if(keys[37] && player.X>10){
        player.X -= player.speed;
        player.frameY = 1;//left sprite frame
    }
    //down movement
    if(keys[40] && player.Y< canvas.height - player.height){
        player.Y += player.speed;
        player.frameY = 0; //down sprite frame
    }
    //right movement
    if(keys[39] && player.X < canvas.width - player.width){
        player.X += player.speed;
        player.frameY = 2; //right sprite frame
    }
}

//handling the walking motions in sprite frame
function handlePlayerMotion(){
    if(player.frameX < 3 && player.moving) player.frameX++
    else player.frameX = 0;
    //call it in the animate function
}