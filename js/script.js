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
        player.moving = true;
    }
    //left movement
    if(keys[37] && player.X>10){
        player.X -= player.speed;
        player.frameY = 1;//left sprite frame
        player.moving = true;
    }
    //down movement
    if(keys[40] && player.Y< canvas.height - player.height){
        player.Y += player.speed;
        player.frameY = 0; //down sprite frame
        player.moving = true;
    }
    //right movement
    if(keys[39] && player.X < canvas.width - player.width){
        player.X += player.speed;
        player.frameY = 2; //right sprite frame
        player.moving = true;
    }
}

//handling the walking motions in sprite frame
function handlePlayerMotion(){
    if(player.frameX < 3 && player.moving) player.frameX++
    else player.frameX = 0;
    //call it in the animate function
}

/* //animation loop
function animate() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.drawImage(background,0,0, canvas.width, canvas.height);
    drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.X, player.Y, player.width, player.height);
    moveThePlayer();
    handlePlayerMotion();
    requestAnimationFrame(animate);
}
animate();//speed is too fast for this so we need a consistent animator for every screen irrespective of the render or fps capability of the user's computer
 */

 //now we will use custom animator to have a consistent fps across multilpe devices

let fps, intervalOfFps, initTime, currentTime, afterTime, goneTime;

function startAnimation(fps){
    intervalOfFps = 1000/fps; //how long we will wait before we serve the next frame
    //we need time check for howmuch time has passed 
    afterTime = Date.now();
    initTime = afterTime; //after some time this will be our start time so change accordingly
    animate();

}

function animate(){
    requestAnimationFrame(animate);
    currentTime = Date.now();
    goneTime = currentTime - afterTime; 
    if(goneTime > intervalOfFps){
        afterTime = currentTime - (goneTime % intervalOfFps);
        ctx.clearRect(0,0, canvas.width, canvas.height);
        ctx.drawImage(background,0,0, canvas.width, canvas.height);
        drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.X, player.Y, player.width, player.height);
        moveThePlayer();
        handlePlayerMotion();
    }
}

startAnimation(30);