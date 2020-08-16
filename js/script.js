let canvas = document.getElementById('cvs');
let ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;
let keys = [];

let player = {
    X: 0,
    y: 0,
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
    drawSprite(playerSprite, 0,0, player.width, player.height, 0, 0, player.width, player.height);
    requestAnimationFrame(animate);
}
animate();

window.addEventListener('keydown', function(e){
    keys[e.keyCode] = true;
    console.log(keys);
});
window.addEventListener('keyup', function(e){
    delete keys[e.keyCode];
});