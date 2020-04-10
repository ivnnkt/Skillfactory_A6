const numDivs = 36;
const maxHits = 11;

let hits = 1;
let firstHitTime = 0;
let fails = 0;

function round() {
  $(".target").text("");
  $(".target").removeClass("target");
  $(".miss").removeClass("miss");

  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  $(divSelector).text(hits);

  if (hits === 1) {
    firstHitTime = getTimestamp();
  }
  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  
  $("#game_wrapper").hide();
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  let score = 10 + fails;
  $("#total-score").text(score);
  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    round();
  }
  else {
    $(event.target).addClass("miss");
    fails = fails - 1;
  }
}

function startGame () {
  round();
  $("#game_wrapper").removeClass("d-none");
  $("#game-rules").hide();
  $("#button-start-game").hide();  
  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();
  });
}

function init() {
  $("#button-start-game").click(startGame);
}

$(document).ready(init);
