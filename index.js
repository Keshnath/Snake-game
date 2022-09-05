// const and variable
let inputDir = {x :0 , y : 0};
let speed = 4 ;
let lastPaintTime = 0;
let snakeArr= [{x:13 , y :15}];
const foodsound = new Audio('food.mp3');
const moveSound = new Audio('move.mp3');
const gameOversSound = new Audio('gameover.mp3');
const musicSound = new Audio('music.mp3');
food = {x:7 , y :9}
let score = 0 ;

// main function start 
function main(ctime){
    window.requestAnimationFrame(main);    
    if((ctime - lastPaintTime) / 1000 < 1 /speed){
        return ;
    }
    lastPaintTime = ctime;
    gameEngine();    
}
function isCollide(snake){
    // if snake collide with self
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        } }    
    // if snake collide with borders of board
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
        return true;    
    }
    else{
        return false;
    }
}
function gameEngine(){
    
    
    if (isCollide(snakeArr)){
        gameOversSound.play();
        musicSound.pause();
        inputDir = {x:0 , y :0};
        alert("Game over ! press any key to continue");
        snakeArr = [{x:13 , y :15}];
        score = 0;
        scoreBox.innerHTML = "Score :"+ score;
    }
     //eating food and increment the body and generate new food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodsound.play()
        score += 1;
        scoreBox.innerHTML = "Score :"+ score;
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x , y:snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
     }
    // moving the snake
    for (let i = snakeArr.length -2; i >= 0; i--) {
        snakeArr[i+1]  = {...snakeArr[i]};        
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    //display the snake a
    board.innerHTML = "";
    snakeArr.forEach((e ,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index == 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        
        board.appendChild(snakeElement);
    });
    // dsplay food
    foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
}
window.requestAnimationFrame(main);
window.addEventListener('keydown' ,e =>{
    inputDir = {x :0 ,y:1}
    moveSound.play();
    musicSound.play();
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0
            inputDir.y = -1
            break;
        case "ArrowDown":
            inputDir.x = 0
            inputDir.y = 1
            break;
        case "ArrowLeft":
            inputDir.x = -1
            inputDir.y = 0
            break;
        case "ArrowRight":
            inputDir.x = 1
            inputDir.y = 0
            break;
        default:
            break;
    }
})

