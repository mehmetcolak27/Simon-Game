var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;
var gameOver = false;

$(document).on("keypress click", function(event) {
  if (!started) {
    $("#level-title").text("Level " + level);
     nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
  if (started && !gameOver) {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
  }
});


$("#replay-button").click(function() {
  startOver();
  $("body").removeClass("game-over");
  $("#game-over-screen").addClass("hidden");

});


function startGame() {
  $("#level-title").text("Level " + level);
  nextSequence();
  started = true;
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#score").text(level);
    $("#level-title").text("Game Over, Press Any Key or click to Restart");
    $("#game-over-screen").removeClass("hidden");
    gameOver = true;

    
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}



function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
  gameOver = false;
}

