let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset");
let newBtn=document.querySelector("#new");
let msg=document.querySelector(".msg");
let winMsg=document.querySelector("#win-msg");
let main=document.querySelector("main");

let turnX=true;

const winArr=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turnX){
            box.innerText="X";
            turnX=false;
        }
        else{
            box.innerText="O";
            turnX=true;
        }
        box.disabled=true;
        checkWinner();
    });
});

const resetGame=()=>{
    turnX=true;
    enable();
    msg.classList.add("hide");
    main.classList.remove("hide");
};

const enable=()=>{
    for(let box of boxes){
        box.innerText="";
        box.disabled=false;
    }
};

const disableBox=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}

const showwinner=(winner)=>{
    winMsg.innerText=`Congratulations, Winner is ${winner}`;
    msg.classList.remove("hide");
    main.classList.add("hide");
    disableBox();
}

const checkWinner=()=>{
    for(let arr of winArr){
        let place1=boxes[arr[0]].innerText;
        let place2=boxes[arr[1]].innerText;
        let place3=boxes[arr[2]].innerText;
        if(place1!='' &&place2!='' &&place3!=''){
            if(place1===place2 && place2===place3){
                showwinner(place1);
            }
        }
    }
};

newBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);