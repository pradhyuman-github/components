"use strict";

const player0El = document.querySelector('.player-0');
const player1El = document.querySelector('.player-1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

const init = function(){
    scores = [0,0];  //holds score for both players
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    
    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
};

init();

const switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');    // toogle remove class if it exist & add class if no class applied.
    player1El.classList.toggle('player--active');
}

btnRoll.addEventListener('click', function(){
    if(playing) {
        // generate random dice number
        const diceNum = Math.trunc(Math.random() * 6) + 1; 

        // display dice on btn click
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-img/dice-${diceNum}.jpg`;  

        if(diceNum !== 1) {
            // add to current score
            currentScore += diceNum;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }
        else {
            // switch player
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function(){
    if(playing) {
        // add current score to active player
        scores[activePlayer] += currentScore;   // it means scores[1] = scores[1] + currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // check if >= 100, finish game
        if(scores[activePlayer] >= 100) {
            playing = false;
            diceEl.classList.add('hidden');

            document.querySelector(`.player-${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player-${activePlayer}`).classList.remove('player--active');
        }
        else {
            // switch player 
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', init);
