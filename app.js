// Game buttons
const playBtn = document.querySelector("#play_btn");
const resetBtn = document.querySelector("#reset_btn");
const quitBtn = document.querySelector("#quit_btn");

// Game displays
let current_player = "X";
const scoreX = document.querySelector("#score_x");
const scoreO = document.querySelector("#score_o");
const current_player_display = document.querySelector("#current_player");
current_player_display.innerHTML = current_player;
const endgame_message = document.querySelector("#endgame_message");

// Grab all cell from the game board
let cells = document.querySelectorAll(".cell");

//
let plays = [];
// Winning combinations
const combinations = [
  [0, 1, 2],
  [0, 4, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
];

// Current player
let winner = "";
let scoreboard = { x: 0, o: 0 };
let moves = 0;

function reset() {
  moves = 0;
  plays = [];
  winner = "";
  current_player = "X";
  current_player_display.innerHTML = current_player;
  cells.forEach((cell) => {
    cell.innerHTML = "";
    cell.style.backgroundColor = "";
  });
  updateCellStyle("white", "#ff3faf");
  updatePlayerHover();
}

function quit() {
  scoreboard = { x: 0, o: 0 };
  scoreX.innerHTML = scoreboard.x;
  scoreO.innerHTML = scoreboard.o;
  endgame_message.style.visibility = "visible";
  endgame_message.innerHTML = "Click the Play button to start";

  document.querySelector(".btn__play").style.display = "block";
  document.querySelector(".btn__reset").style.display = "none";
  document.querySelector(".btn__quit").style.display = "none";

  reset();
}

function stopGame() {
  setDataAttribute("-");
  endgame_message.style.visibility = "visible";
  endgame_message.innerHTML = `PLAYER <span id='winner_banner'>${winner}</span> WON THE ROUND`;
}

function updateScoreboard() {
  scoreboard =
    winner === "X"
      ? { ...scoreboard, x: scoreboard.x + 1 }
      : { ...scoreboard, o: scoreboard.o + 1 };

  scoreX.innerHTML = scoreboard.x;
  scoreO.innerHTML = scoreboard.o;
}

function updateCellStyle(bg, color, cursor) {
  if (cursor !== "none") cursor = "pointer";
  cells.forEach((cell) => {
    cell.style.setProperty("--board-cell-hover-bg-color", bg);
    cell.style.setProperty("--board-cell-font-color", color);
    cell.style.setProperty("--board-cursor", cursor);
  });
}

function setDataAttribute(value) {
  cells.forEach((cell) => {
    cell.setAttribute("data-value", value);
  });

  if (value === "-") {
    updateCellStyle("transparent", "#383737", "none");
  }
}

function winnerChecker() {
  if (moves === 9) {
    endgame_message.style.visibility = "visible";
    endgame_message.innerHTML = "GAME DRAW";
    return;
  }
  for (let i = 0; i < 8; i++) {
    if (
      plays[combinations[i][0]] === current_player &&
      plays[combinations[i][1]] === current_player &&
      plays[combinations[i][2]] === current_player
    ) {
      winner = current_player;
      document.getElementById(`${combinations[i][0]}`).style.backgroundColor =
        "#ff3faf";
      document.getElementById(`${combinations[i][1]}`).style.backgroundColor =
        "#ff3faf";
      document.getElementById(`${combinations[i][2]}`).style.backgroundColor =
        "#ff3faf";

      updateScoreboard();
      stopGame();
      setDataAttribute("-");
      return;
    }
  }
}

function updatePlayerHover() {
  setDataAttribute(current_player);
}

function verifyPlay(cell, cellIndex) {
  if (plays[cellIndex] === undefined && winner === "") {
    moves++;
    cell.innerHTML = current_player;
    plays[cellIndex] = current_player;
    winnerChecker();

    // switchPlayer(cell);
    current_player = current_player === "X" ? "O" : "X";
    current_player_display.innerHTML = current_player;
    cell.setAttribute("data-value", current_player);

    updatePlayerHover();
  }
  if (winner) {
    setDataAttribute("-");
    updateCellStyle("transparent", "#383737", "none");
    return;
  }
}

function play() {
  reset();

  document.querySelector(".btn__play").style.display = "none";
  document.querySelector(".btn__reset").style.display = "block";
  document.querySelector(".btn__quit").style.display = "block";
  endgame_message.style.visibility = "visible";
  endgame_message.innerHTML = "Click the Reset button to play another round";

  setDataAttribute(current_player);
  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => verifyPlay(cell, index));
  });
}

// Game button - button clicks
resetBtn.addEventListener("click", reset);
playBtn.addEventListener("click", play);
quitBtn.addEventListener("click", quit);
