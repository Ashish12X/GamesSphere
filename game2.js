let choices=document.querySelectorAll(".choice");
let msg=document.querySelector(".msg");
let userScr=document.querySelector("#user-score");
let compScr=document.querySelector("#comp-score");
let resetBtn=document.querySelector("#reset-btn");


let userScore=0;
let compScore=0;

const reset=()=>{
    userScore=0;
    compScore=0;
    userScr.innerText=userScore;
    compScr.innerText=compScore;
    msg.classList.remove("red","yellow","green");
    msg.innerText="Play Your Game";
};

const genCompChoice=()=>{
    const options=["Rock","Papper","Sissor"];
    const random=Math.floor(Math.random()*3);
    return options[random];
};

const drawGame=()=>{
    msg.innerText="Game was drawn. Play Again!";
    msg.classList.add("yellow");
    msg.classList.remove("red");
    msg.classList.remove("green");
};

const userWon=(userChoice,compChoice)=>{
    msg.innerText=`You Won. Your ${userChoice} Beats ${compChoice}`;
    userScore++;
    userScr.innerText=userScore;
    msg.classList.add("green");
    msg.classList.remove("red");
    msg.classList.remove("yellow");
};

const compWon=(userChoice,compChoice)=>{
    msg.innerText=`You Lost. ${compChoice} Beats Your ${userChoice}`;
    compScore++;
    compScr.innerText=compScore;
    msg.classList.add("red");
    msg.classList.remove("yellow");
    msg.classList.remove("green");
};

const playGame=(userChoice)=>{
    const compChoice=genCompChoice();
    if(userChoice===compChoice){
        drawGame();
    }
    else{
        let win=true;
        if(userChoice==="Rock"){
            compChoice==="Sissor"?win=true:win=false;
        }
        else if(userChoice==="Papper"){
            compChoice==="Rock"?win=true:win=false;
        }
        else{
            compChoice==="Papper"?win=true:win=false;
        }
        win===true?userWon(userChoice,compChoice):compWon(userChoice,compChoice);
    }
};

choices.forEach((choice)=>{
    choice.addEventListener("click",()=>{
        const userChoice=choice.getAttribute("id");
        playGame(userChoice);
    });
});

resetBtn.addEventListener("click",()=>{
    reset();
});