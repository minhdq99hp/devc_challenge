let randomNumber = Math.floor(Math.random() * 101); // get random number from 0 to 100
let button = document.getElementById('guessButton');
let replayButton = document.getElementById('replayButton');
let message = document.getElementById('message');
let pastGuesses = document.getElementById('pastGuesses');
let number = document.getElementById('number');
let timerMessage = document.getElementById('timerMessage');
console.log(randomNumber);

let maxNGuess = 5;
let nGuess = maxNGuess;

replayButton.style.visibility = 'hidden';

let replayTimer = null;

let maxCountTimeout = 10;
let countTimeout = maxCountTimeout; // wait for 5s
function checkReplayTimer(){
    if(countTimeout == 0){
        replay();
    } 
    else{
        timerMessage.innerHTML = `Auto replay in ${countTimeout}s...`
        countTimeout -= 1;
    }
}


function checkGuess(){
    // if(nGuess == 0){
    //     message.innerHTML = `Sorry, you don't have any guess left. The correct answer is ${randomNumber}`;
    //     button.disabled = true;
    //     replayButton.style.visibility = 'visible';
    //     number.value = '';
    //     number.disabled = true;

    //     timerMessage.style.visibility = 'visible';
    //     replayTimer = setInterval(checkReplayTimer, 1000);
    //     return;
    // }

    let inputValue = number.value;
    
    number.value = '';
    let userGuess = Number(inputValue);
    
    if(!Number.isInteger(userGuess) || inputValue === ''){
        message.innerHTML = 'Please guess an integer number.';
        message.style.backgroundColor = null;
        return;
    }
    nGuess -= 1;

    let item = document.createElement('li');
    item.innerHTML = userGuess;
    pastGuesses.prepend(item);

    if(userGuess > randomNumber){
        message.innerHTML = `Sorry your guess is too high. You have ${nGuess} guess${nGuess > 1 ? 'es' : ''} left`;
        message.style.backgroundColor = 'red';
    }
    else if(userGuess < randomNumber){
        message.innerHTML = `Sorry you guess is too low. You have ${nGuess} guess${nGuess > 1 ? 'es' : ''} left`;
        message.style.backgroundColor = 'red';
    }
    else{
        message.innerHTML = 'Congratulations!! You guessed correctly.';
        message.style.backgroundColor = 'green';

        replayButton.style.visibility = 'visible';
        replayButton.disabled = false;
        button.disabled = true;
        number.disabled = true;

        timerMessage.innerHTML = '';
        timerMessage.style.visibility = 'visible';
        countTimeout = maxCountTimeout;
        replayTimer = setInterval(checkReplayTimer, 1000);
        return
    }

    if(nGuess == 0){
        message.innerHTML = `Sorry, you don't have any guess left. The correct answer is ${randomNumber}`;
        button.disabled = true;
        replayButton.style.visibility = 'visible';
        number.value = '';
        number.disabled = true;

        timerMessage.innerHTML = '';
        timerMessage.style.visibility = 'visible';
        countTimeout = maxCountTimeout;
        replayTimer = setInterval(checkReplayTimer, 1000);
    }
}

button.addEventListener('click', checkGuess);
number.addEventListener('keydown', function(event){
    if(event.key === 'Enter'){
        event.preventDefault();
        checkGuess();
    }
})

function replay(){
    nGuess = maxNGuess;
    button.disabled = false;
    pastGuesses.innerHTML = '';
    number.value = '';
    number.disabled= false;
    message.innerHTML = '';
    randomNumber = Math.floor(Math.random() * 101);

    replayButton.style.visibility = 'hidden';
    timerMessage.style.visibility = 'hidden';
    console.log(randomNumber);

    clearInterval(replayTimer);
}

replayButton.addEventListener('click', replay);

