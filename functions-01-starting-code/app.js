const startGameBtn = document.getElementById('start-game-btn');

const ROCK = 'rock';
const PAPER = 'paper';
const SCISSORS = 'scissors';
const DEFAULT_USER_CHOICE = 'rock';

let gameIsRunning = false;

const getPlayerChoice = () => {
  let selection = prompt(
    `Do you choose ${ROCK}, ${PAPER} or ${SCISSORS}?`
  ).toLocaleLowerCase();
  if (selection !== ROCK && selection !== PAPER && selection !== SCISSORS) {
    alert(`INVALID CHOICE ! We choose ${DEFAULT_USER_CHOICE} for you.`);
    return DEFAULT_USER_CHOICE;
  }
  return selection;
};
const getComputerChoice = () => {
  const randomNumber = Math.floor(Math.random() * 3);
  return ['rock', 'paper', 'scissors'][randomNumber];
};

/* const determineWinner = (playerChoice, computerChoice) => {
  if (playerChoice === computerChoice) {
    return 'TIE';
  }
  if (
    (computerChoice === ROCK && playerChoice === PAPER) ||
    (computerChoice === PAPER && playerChoice === SCISSORS) ||
    (computerChoice === SCISSORS && playerChoice === ROCK)
  ) {
    return 'PLAYER';
  } else {
    return 'COMPUTER';
  }
}; */

const determineWinner = (playerChoice, computerChoice) =>
  playerChoice === computerChoice
    ? 'TIE'
    : (computerChoice === ROCK && playerChoice === PAPER) ||
      (computerChoice === PAPER && playerChoice === SCISSORS) ||
      (computerChoice === SCISSORS && playerChoice === ROCK)
    ? 'PLAYER'
    : 'COMPUTER';

startGameBtn.addEventListener('click', () => {
  if (gameIsRunning) {
    return;
  }
  startGameBtn.setAttribute('disabled', true);
  startGameBtn.innerHTML = 'Game is running...';
  gameIsRunning = true;
  const playerSelection = getPlayerChoice();
  const computerSelection = getComputerChoice();
  const winner = determineWinner(playerSelection, computerSelection);
  setTimeout(() => {
    startGameBtn.innerHTML = 'Game is over...';
  }, 1000);
  setTimeout(() => {
    alert(`you picked ${playerSelection}, computer picked ${computerSelection} , the winner is ${winner}`);
    startGameBtn.removeAttribute('disabled');
    startGameBtn.innerHTML = 'Start Game';
    gameIsRunning = false;
  }, 1500);
});

