'use strict';

// Selecting buttons
const btnOption = document.querySelectorAll('.button-option');
const btnNew = document.getElementById('new-game');
const btnRestart = document.getElementById('restart');

// Selecting element
const modalEl = document.querySelector('.popup');
const messageEl = document.getElementById('message');

// Declaring main variables
let activePlayer = 'X';
let activeButtons = [];
let winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];

const checkWinner = function () {
  for (let i = 0; i < winningPattern.length; i++) {
    let elements = [];
    for (let j = 0; j < 3; j++) {
      elements.push(btnOption[winningPattern[i][j]].textContent);
    }

    if (elements[0] === elements[1] && elements[0] === elements[2]) {
      if (elements[0] !== '' && elements[1] !== '' && elements[2] !== '') {
        modalEl.classList.remove('hide');
        messageEl.textContent = `👏 '${elements[0]}' wins`;
        return;
      }
    }
  }
  if (activeButtons.length === 9) {
    modalEl.classList.remove('hide');
    messageEl.textContent = `🥲\n Draw`;
  }
};

for (let i = 0; i < btnOption.length; i++) {
  btnOption[i].addEventListener('click', function () {
    if (!activeButtons.includes(i)) {
      activeButtons.push(i);

      btnOption[i].textContent = activePlayer;
      activePlayer = activePlayer == 'X' ? 'O' : 'X';

      if (activeButtons.length >= 5) {
        checkWinner();
      }
    }
  });
}

const resetGame = function () {
  modalEl.classList.add('hide');
  activePlayer = 'X';
  activeButtons = [];
  for (let i = 0; i < btnOption.length; i++) {
    btnOption[i].textContent = '';
  }
};

btnNew.addEventListener('click', resetGame);
btnRestart.addEventListener('click', resetGame);
