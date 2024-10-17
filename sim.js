var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ['red', 'blue', 'green', 'yellow'];
var level = 0;

$(document).keypress(function(){
    if(level === 0) {
        nextSequence();
    }
});

function nextSequence() {
    level++;
    $('h1').text("level " + level);
    var randomNumber = Math.floor(Math.random() * 4);  // Generate a random number
    var randomChosenColour = buttonColors[randomNumber];  // Choose a random color
    gamePattern.push(randomChosenColour);  // Add the chosen color to the game pattern

    // Create flash effect for the chosen color
    $('#' + randomChosenColour).fadeOut(100).fadeIn(100);
    playsound(randomChosenColour);
}

$('.btn').click(function() {
    var userChosenColour = $(this).attr('id');  // Get the id (color) of the clicked button
    userClickedPattern.push(userChosenColour);  // Add the user's chosen color to the pattern

    // Flash effect for the clicked button
    $('#' + userChosenColour).fadeOut(100).fadeIn(100);

    playsound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(level);
});

function playsound(name) {
    var sound = new Audio('sounds/' + name + '.mp3');
    sound.play();
}

function animatePress(currentColor) {
    $('#' + currentColor).addClass('pressed');
    setTimeout(function(){
        $('#' + currentColor).removeClass('pressed');
    }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[userClickedPattern.length - 1] === gamePattern[userClickedPattern.length - 1]) {
        console.log('success');
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
            userClickedPattern = [];
        }
    } else {
        var aud = new Audio('sounds/wrong.mp3');
        aud.play();  // Corrected play call
        $('body').addClass('game-over');  // Corrected body selector

        setTimeout(function(){
            $('body').removeClass('game-over');
        }, 200);

        $('h1').text('Game Over, Press Any Key to Restart');
        startOver();  // Reset the game
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}
