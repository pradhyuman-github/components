"use strict";

// document.querySelector('p').textContent = 'Start guessing...';    // overwrites <p> content of html
// document.querySelector('.sc').textContent = '10';

// document.querySelector('.num').value = '';
// console.log(document.querySelector('.num').value);

let secretNumber = Math.trunc(Math.random()*50)+1;   
let score = 10;
let highscore = 0;

const displayMessage  = function(parameterMessage) {                
    document.querySelector('.mssg').textContent = parameterMessage;
}

document.querySelector('.btn').addEventListener('click', function(){
    const val = Number(document.querySelector('.num').value);
    // console.log(val, typeof val);
    
    if(! val) {
        // document.querySelector('.mssg').textContent = "No number 🤨";  
        displayMessage("No number 🤨");
    }
    else if(val === secretNumber) {
        // document.querySelector('.mssg').textContent = "🎉 Correct answer 🎉";
        displayMessage("🎉 Correct answer 🎉");
        document.querySelector('.secretnum').textContent = secretNumber;
        document.querySelector('body').style.backgroundColor = '#60b347';
        if(score > highscore) {
            highscore = score;
            document.querySelector('.high').textContent = highscore;
        }
    }
    else if(val !== secretNumber) {
        if(score > 1) {
            // document.querySelector('.mssg').textContent = val > secretNumber ? "Too high" : "Too low";
            displayMessage(val > secretNumber ? "Too high" : "Too low");
            score --;
            document.querySelector('.sc').textContent = score;
        }
        else {
            // document.querySelector('.mssg').textContent = "You lost 😑😂";
            displayMessage("You lost 😑😂");
            document.querySelector('.sc').textContent = 0;
        }
    }
});

document.querySelector('.again').addEventListener('click', function() {
    score = 10;
    secretNumber = Math.trunc(Math.random()*50)+1;
    document.querySelector('.sc').textContent = score;
    document.querySelector('.num').value = '';  
    // document.querySelector('.mssg').textContent = '';
    displayMessage(''); 
    document.querySelector('.secretnum').textContent = '?';  
    document.querySelector('body').style.backgroundColor = 'goldenrod';
});



