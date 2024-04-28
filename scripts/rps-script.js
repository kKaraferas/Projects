
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();


let isAutoPlaying = false;
let intervalId;

document.querySelector('.js-auto-play-button')
  .addEventListener('click', () => {
    autoPlay();
  });

function autoPlay(){
  if(!isAutoPlaying){
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    document.querySelector('.js-auto-play-button')
      .innerHTML = 'Stop Playing';
  }else{
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector('.js-auto-play-button')
      .innerHTML = 'Auto play';
  }
}

document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  });

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
  });

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
  });

document.querySelector('.js-reset-button')
  .addEventListener('click', () => {
    clearScore();
  });

document.body.addEventListener('keydown', (event) =>{
  if(event.key === 'r' || event.key === 'R'){
    playGame('rock');
  }else if(event.key === 'p' || event.key === 'P'){
    playGame('paper');
  }else if(event.key === 's' || event.key === 'S'){
    playGame('scissors');
  }else if(event.key === 'a' || event.key === 'A'){
    autoPlay();
  }else if(event.key === 'Escape'){
    clearScore();
  }
});

function playGame(playerMove){
  const computerMove = pickComputerMove();
  
  let result = '';

  if(playerMove === 'scissors'){
    if(computerMove === 'rock'){
      result = 'You Lose.'
    }else if(computerMove === 'paper'){
      result = 'You Win!'
    }else{
      result = 'Tie.'
    }
  
  }else if(playerMove === 'paper'){
    if (computerMove === 'rock'){
      result = 'You Win!';
    }else if(computerMove === 'paper'){
      result = 'Tie.';
    }else{
      result = 'You Lose.'
    }
 
  }else if(playerMove === 'rock'){
    if(computerMove === 'rock'){
      result = 'Tie.';
    }else if(computerMove === 'paper'){
      result = 'You Lose.';
    }else{
      result = 'You Win!';
    }
  }

  if(result==='You Win!'){
    score.wins++;
  }else if(result==='You Lose.'){
    score.losses++;
  }else{
    score.ties++;
  }

  localStorage.setItem('score', JSON.stringify(score));

  
  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;
  
  document.querySelector('.js-moves').innerHTML = `You
<img src="images/${playerMove}-emoji.png" class="move-icon">
<img src="images/${computerMove}-emoji.png" class="move-icon">
Computer`;

}

function updateScoreElement(){
  document.querySelector('.js-score')
  .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}


function pickComputerMove(){
  const randomNumber = Math.random();
  let computerMove = '';


  if(randomNumber >=0 && randomNumber < 1/3){
    computerMove = 'rock';
  }else if(randomNumber >= 1/3 && randomNumber <2/3){
      computerMove = 'paper';
  }else{
    computerMove = 'scissors';
  }

  return computerMove;

}

function clearScore(){
  let confirm = window.confirm('Are you sure you want to reset the score?');

  if(confirm){
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
  
    localStorage.removeItem('score');
    updateScoreElement();
  
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector('.js-auto-play-button')
      .innerHTML = 'Auto play';
    
    document.querySelector('.js-result').innerHTML = '';
    document.querySelector('.js-moves').innerHTML = '';
  }
} 