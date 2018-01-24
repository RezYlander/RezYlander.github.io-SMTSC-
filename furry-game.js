

function Furry () {
    this.x = 0;
    this.y = 0;
    this.direction = 'right';
}

function Coin () {
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
}

function Game () {
    this.board = document.querySelector('#board').children;
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;
    this.index = function (x,y) {
        return x + (y * 10);
    };
    this.showFurry = function(){
        this.board[this.index(this.furry.x,this.furry.y)].classList.add('furry');
    };
    this.showCoin = function(){
        this.board[this.index(this.coin.x,this.coin.y)].classList.add('coin');
    };
    var self = this;
    this.startGame = function() {
        this.idSetInterval = setInterval(function () {
            self.moveFurry();
        }, 250);
    };
    this.moveFurry = function () {
        this.hideVisibleFurry();
        if (this.furry.direction === "right") {
            this.furry.x = this.furry.x + 1;
        } else if (this.furry.direction === "left") {
            this.furry.x = this.furry.x - 1;
        } else if (this.furry.direction === "down") {
            this.furry.y = this.furry.y - 1;
        } else if (this.furry.direction === "up") {
            this.furry.y = this.furry.y + 1;
        }
        this.gameOver();
        this.showFurry();
        this.checkCoinCollision();
    };
    this.hideVisibleFurry = function () {
        var prevFurry = document.querySelector('.furry');
        prevFurry.classList.remove('furry');
    };
    document.addEventListener('keydown', function(){
        game.turnFurry(event);
    });
    this.turnFurry = function (event) {
        switch (event.which) {
            case 37:
                this.furry.direction = 'left';
                break;
            case 38:
                this.furry.direction = 'down';
                break;
            case 39:
                this.furry.direction = 'right';
                break;
            case 40:
                this.furry.direction = 'up';
                break;
        }
    };
    this.checkCoinCollision = function () {
        if (this.furry.x === this.coin.x && this.furry.y === this.coin.y){
            var coin = document.querySelector('.coin');
            coin.classList.remove('coin');
            game.score += 1;
            var scoreLabel = document.querySelector('strong');
            scoreLabel.innerHTML = game.score;
            this.coin = new Coin();
            this.showCoin();
        }
    };
    this.gameOver = function () {
        if(this.furry.x < 0 || this.furry.y > 9 || this.furry.x > 9 || this.furry.y < 0){
            clearInterval(this.idSetInterval);
            var coin = document.querySelector('.coin');
            coin.classList.remove('coin');
            var over = document.querySelector('#over');
            over.classList.remove('invisible');
            var playerScore = document.querySelector('#over');
            playerScore.innerHTML = 'GAME OVER pkt ' + game.score;
            this.hideVisibleFurry();

        }
    }
}

var game = new Game();
game.showFurry();
game.showCoin();
game.startGame();
