let canvas = document.getElementById('cvs');//canvas api
let ctx = canvas.getContext('2d');//context as the img are 2d so 2d
canvas.width = 800;
canvas.height = 500;
let keys = [];//key logger
let score = 0;//score counter

//score update function
function updateScore(){
    let scoreCard = document.getElementById('scoreCard');
    scoreCard.innerText = "The score is : "+ score;
}

//player sprite one frame
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

//entire sprite image
let playerSprite = new Image();
playerSprite.src = './images/bahamut.png';

//the given pokeball image
let pokeball = new Image();
pokeball.src = './images/pokeball.png';
pokeball.height = 96;
pokeball.width = 96;

//a slolid black bg
let background = new Image();
background.src = './images/background.png';

//draw function for the sprite of player the part to cutout from sprite
function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH){
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);

}
//for random x axis value 
function getRndInteger(minWidth, maxWidth){
    return Math.floor(Math.random()*(maxWidth-minWidth) ) + minWidth;
}
//for random x axis value 
function getRndInteger(minHeight, maxHeight){
    return Math.floor(Math.random()*(maxHeight-minHeight) ) + minHeight;
}
//for pokemon rendering
function drawPokeball(img, x,y,w,h){
    ctx.drawImage(img, x,y,w,h);
}
//position of rand pokeballs
let pokeball1PosX = getRndInteger(0,800-pokeball.width);
let pokeball1PosY = getRndInteger(0,500-pokeball.height);
let pokeball2PosX = getRndInteger(0,800-pokeball.width);
let pokeball2PosY = getRndInteger(0,500-pokeball.height);


//event listener for key down and keyup
window.addEventListener('keydown', function(e){
    keys[e.keyCode] = true;
    player.moving = true;//to show movement in the handle movement and key presses
});
window.addEventListener('keyup', function(e){
    delete keys[e.keyCode];
    player.moving = false; //when movement stops or key is released make the player stable
});
//end event listeners


//for movement to key binding
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


 //now we will use custom animator to have a consistent fps across multilpe devices

let fps, intervalOfFps, initTime, currentTime, afterTime, goneTime, spawnRate = 3000, lastSpawn = -1;

function startAnimation(fps){
    intervalOfFps = 1000/fps; //how long we will wait before we serve the next frame
    //we need time check for howmuch time has passed 
    afterTime = Date.now();
    initTime = afterTime; //after some time this will be our start time so change accordingly
    animate();

}
//animation loop
function animate(){
    requestAnimationFrame(animate);
    currentTime = Date.now();
    goneTime = currentTime - afterTime; 
    
    if(goneTime > intervalOfFps){
        
        afterTime = currentTime - (goneTime % intervalOfFps);
        ctx.clearRect(0,0, canvas.width, canvas.height);
        ctx.drawImage(background,0,0, canvas.width, canvas.height);
        drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.X, player.Y, player.width, player.height);
        //I am using 2 pokeballs at random place and using them for scoring
        
        
        // for ball 1
        drawPokeball(pokeball, pokeball1PosX, pokeball1PosY, pokeball.width, pokeball.height);
        if(Math.abs(pokeball1PosX-player.X) <=40  && Math.abs(pokeball1PosY - player.Y) <=40){
            score ++;
            updateScore();
            pokeball1PosX = getRndInteger(0,800-pokeball.width);
            pokeball1PosY = getRndInteger(0,500-pokeball.height)
            if(Math.abs(pokeball1PosX - pokeball2PosX >=96) && Math.abs(pokeball1PosY - pokeball2PosY >=96) ){
                pokeball1PosX = getRndInteger(0,800-pokeball.width);
                pokeball1PosY = getRndInteger(0,500-pokeball.height);
                drawPokeball(pokeball, pokeball1PosX, pokeball1PosY, pokeball.width, pokeball.height);
                
            }else{
                drawPokeball(pokeball, pokeball1PosX, pokeball1PosY, pokeball.width, pokeball.height);
            }
            
        }
        //for ball 2
        drawPokeball(pokeball, pokeball2PosX, pokeball2PosY, pokeball.width, pokeball.height);
        if(Math.abs(pokeball2PosX-player.X) <=40  && Math.abs(pokeball2PosY - player.Y) <=40){
            score++;
            updateScore();
            pokeball2PosX = getRndInteger(0,800-pokeball.width);
            pokeball2PosY = getRndInteger(0,500-pokeball.height)
            if(Math.abs(pokeball1PosX - pokeball2PosX >=96) && Math.abs(pokeball1PosY - pokeball2PosY >=96) ){
                pokeball2PosX = getRndInteger(0,800-pokeball.width);
                pokeball2PosY = getRndInteger(0,500-pokeball.height);
                drawPokeball(pokeball, pokeball2PosX, pokeball2PosY, pokeball.width, pokeball.height);
                
            }else{
                drawPokeball(pokeball, pokeball2PosX, pokeball2PosY, pokeball.width, pokeball.height);
            }
            drawPokeball(pokeball, pokeball2PosX, pokeball2PosY, pokeball.width, pokeball.height);
        }
        
        moveThePlayer();
        handlePlayerMotion();
    }
}

startAnimation(30);//tell us the number of frames you want

