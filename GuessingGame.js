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
        return 'You Win!';
    } else {
        if(this.pastGuesses.indexOf(this.playersGuess) > -1){
            return 'You have already guessed that number.';
        }
        else {
            this.pastGuesses.push(this.playersGuess);
            if(this.pastGuesses.length === 5){
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


