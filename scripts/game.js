const game = {
    score: 0,
    turnNumber: 0,
    currentGame: [],
    playerMoves: [],
    lastButton : '',
    choices: ['button1', 'button2', 'button3', 'button4'],
    turnInProgress : false,
}

function newGame() {
    game.score = 0;
    game.currentGame = [];
    game.playerMoves = [];
    for ( let circle of document.getElementsByClassName('circle')){
        if (circle.getAttribute('data-listener') !== 'true'){
            circle.addEventListener('click', (e) =>{
                if (game.currentGame.length > 0 && !game.turnInProgress){
                    let move =e.target.getAttribute('id');
                    game.lastButton = move;
                    lightOn(move);
                    game.playerMoves.push(move);
                    playerTurn();
                }
            } );
            circle.setAttribute('data-listener', 'true')
        }
    }
    showScore();
    addTurn();
}

function addTurn(){
    game.playerMoves =[];
    game.currentGame.push(game.choices[(Math.floor(Math.random()*4))]);
    showTurns()
}

function lightOn(circ){
    document.getElementById(circ).classList.add('light');
    setTimeout(()=>{
        document.getElementById(circ).classList.remove('light');
    }, 400);
}

function showTurns(){
    game.turnNumber =0;
    game.turnInProgress = true;
    let turns = setInterval(()=>{        
        lightOn(game.currentGame[game.turnNumber]);
        game.turnNumber++;
        if (game.turnNumber >= game.currentGame.length){
            clearInterval(turns);
            game.turnInProgress = false;
        }
    },800);
}

function showScore() {
    score = document.getElementById('score');
    score.innerText = game.score;
}

function playerTurn(){
    let i = game.playerMoves.length -1;
    if (game.currentGame[i] === game.playerMoves[i]){
        if (game.currentGame.length == game.playerMoves.length){
            game.score++;
            showScore();
            addTurn();
        }
    } else{
        alert('Wrong move!')
    }
}

module.exports = {
    game,
    newGame,
    showScore,
    addTurn,
    lightOn,
    showTurns,
    playerTurn,
};