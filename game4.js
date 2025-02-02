const eatingSound=new Audio('eating-sound.mp3');
const overSound=new Audio('game-over.mp3');
const board=document.querySelector(".box");
const score=document.querySelector(".score");
const resetBtn=document.querySelector("#reset");
const replayBtn=document.querySelector("#replay");
const startBtn=document.querySelector("#start");
const game=document.querySelector(".game");
const over=document.querySelector(".over");

let direction={x:1,y:0};
let lastPaintTime=0;
let snake=[
    {x:0,y:10},
]
let food={x:6,y:5};
let scoreVal=0;
let gameOver=false;

function main(cTime){
    window.requestAnimationFrame(main);
    if(gameOver) return;
    if((cTime-lastPaintTime)/100 <2){
        return;
    }
    lastPaintTime=cTime;
    gameFunc();
}

function isCollide(s){
    for(let i=1;i<snake.length;i++){
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
            return true;
        }
    }
    if(snake[0].x>20 || snake[0].x<0 || snake[0].y>20 || snake[0].y<0){
        return true;
    }
    else return false;
}

function reset(){
    direction={x:1,y:0};
    lastPaintTime=0;
    snake=[{x:0,y:10},]
    food={x:6,y:5};
    scoreVal=0;
    gameOver=false;
    score.innerText = scoreVal;
    game.classList.remove("hide");
    over.classList.add("hide");
    startBtn.classList.remove("hide");
}

function overFunc(){
    game.classList.add("hide");
    over.classList.remove("hide");
}

function gameFunc(){
    if(isCollide(snake)){
        overSound.play();
        overFunc();
        gameOver=true;
    }

    //food genrate
    if(snake[0].x===food.x &&snake[0].y===food.y){
        eatingSound.play();
        scoreVal++;
        score.innerText=scoreVal;
        snake.unshift({x: snake[0].x+direction.x, y: snake[0].y+direction.y});
        food={x:Math.round(2+18*Math.random()),y:Math.round(2+16*Math.random())};
    }

    //move snake
    for(let i=snake.length-2;i>=0;i--){
        snake[i+1]={...snake[i]};
    }
    
    snake[0].x+=direction.x;
    snake[0].y+=direction.y;

    board.innerHTML='';
    snake.forEach((e,index)=>{
        let snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index===0){
            snakeElement.classList.add('head');
        }else{
            snakeElement.classList.add('div');
        }
        board.append(snakeElement);
    })

        let foodElement=document.createElement('div');
        foodElement.style.gridRowStart=food.y;
        foodElement.style.gridColumnStart=food.x;
        foodElement.classList.add('food');
        board.append(foodElement);
}

startBtn.addEventListener("click",()=>{
    window.requestAnimationFrame(main);
    startBtn.classList.add("hide");
})

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case "ArrowUp":
            if (direction.y === 0) {
                direction = { x: 0, y: -1 };
            }
            break;
        case "ArrowDown":
            if (direction.y === 0) {
                direction = { x: 0, y: 1 };
            }
            break;
        case "ArrowLeft":
            if (direction.x === 0) {
                direction = { x: -1, y: 0 };
            }
            break;
        case "ArrowRight":
            if (direction.x === 0) {
                direction = { x: 1, y: 0 };
            }
            break;
    }
});

resetBtn.addEventListener("click",()=>{
    reset();
});

replayBtn.addEventListener("click",()=>{
    reset();
});