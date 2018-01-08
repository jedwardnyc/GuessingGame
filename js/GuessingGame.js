function generateWinningNumber(){
    return Math.floor(Math.random()*100+1);
}

function shuffle(arr){
    var len = arr.length, 
        temp, index;
    while(len){
        index = Math.floor(Math.random() * len--);
        
        temp = arr[len];
        arr[len] = arr[index];
        arr[index] = temp;
    }
    return arr;
}

function Game(){
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
}

function newGame(){
    return new Game();
}

Game.prototype.difference = function(){
    return Math.abs(this.playersGuess - this.winningNumber);
}

Game.prototype.isLower = function(){
    return this.playersGuess < this.winningNumber;
}

Game.prototype.playersGuessSubmission = function(num){
    if(num < 1 || num > 100 || isNaN(num)){
        throw "That is an invalid guess.";
    }
    this.playersGuess = num;
    return this.checkGuess();
}

Game.prototype.checkGuess = function() {

    if(this.winningNumber === this.playersGuess){
        $('#submit, #hint').prop("disabled",true);
        $('#subtitle').text("Please hit the reset button to play again!")
        return 'You Win!';
    } else {
        if(this.pastGuesses.indexOf(this.playersGuess) > -1){
            return 'You have already guessed that number.';
        }
        else {
            this.pastGuesses.push(this.playersGuess);
            $('#guess-list li:nth-child('+ this.pastGuesses.length +')').text(this.playersGuess);

            if(this.pastGuesses.length === 5){
                $('#submit, #hint').prop("disabled",true);
                $('#subtitle').text("Please hit the reset button to play again!")
                return 'You Lose.';
            }
            else {
                if(this.difference() < 10){
                    return 'You\'re burning up!';
                }
                else if(this.difference() < 25){
                    return 'You\'re lukewarm.';
                }
                else if(this.difference() < 50){
                    return 'You\'re a bit chilly.';
                } else {
                    return 'You\'re ice cold!';
                }
            }
        }
    }
}

Game.prototype.provideHint = function() {
    var hints = [];
    hints.push(this.winningNumber,
                generateWinningNumber(),
                generateWinningNumber())
    return shuffle(hints);
}

function takeGuess(game){
    var val = +$('#player-input').val();
        $('#player-input').val('');
       result = game.playersGuessSubmission(val);
        $('#title').text(result)
}
$(document).ready(function(){
    game = newGame();
    $('#submit').on('click',function(){
        takeGuess(game);

    });
    $('#player-input').on('keypress', function(event){
        if(event.which == 13){
            takeGuess(game);
        }
    });
    $('#reset').on('click', function(){
        game = newGame();
        $('#title').text("Here's a little game for you!");
        $('#subtitle').text('Please guess a number between 1-100');
        $('#guess-list li').text('-');
        $('#hint, #submit').prop("disabled", false);
    });
    $('#hint').on('click',function(){
        var hints = game.provideHint();
        $('#title').text('Here are some hints: '+hints[0]+' - '+hints[1]+' - '+hints[2]+'.')
    });
    
});

