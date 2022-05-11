/**
 * @jest-environment jsdom
 */


const {game, newGame, showScore, addTurn, lightOn, showTurns, playerTurn} = require('../game');

jest.spyOn(window, 'alert').mockImplementation(()=>{})

beforeAll(()=> {
    let fs = require('fs');
    let fileContents= fs.readFileSync('index.html', 'utf-8');
    document.open();
    document.write(fileContents);
    document.close();
})


test('score key exists', () => {
    expect('score' in game).toBe(true);
});
test('score key exists', () => {
    expect('currentGame' in game).toBe(true);
});
test('playerMoves key exists', () => {
    expect('playerMoves' in game).toBe(true);
});
test('choices key exists', () => {
    expect('choices' in game).toBe(true);
});
test('turnNumber key exists', () => {
    expect('turnNumber' in game).toBe(true);
});
test('lastButton key exists', () => {
    expect('lastButton' in game).toBe(true);
});
test('turnInProgress key exists', () => {
    expect('turnInProgress' in game).toBe(true);
});
test('choices contain correct ids', () => {
    expect(game.choices).toEqual(['button1', 'button2', 'button3', 'button4']);
});


//newGame works correctly
beforeAll(()=>{
    game.score = 42;
    game.playerMoves =['button1', 'button2'];
    game.currentGame = ['button1', 'button2'];
    document.getElementById('score').innerText ='42'; 
    newGame();
});
test('should set game score to zero', ()=>{
    expect(game.score).toEqual(0);
})
test('should to set player Moves empty', ()=>{
    expect(game.playerMoves).toEqual([]);
})
test('should be one element in computers game array', ()=>{
    expect(game.currentGame.length).toEqual(1);
})
test('should display 0 for element with id of score', ()=>{
    expect(document.getElementById('score').innerText).toEqual(0);
})
test('data-listener has been set to true for each circle', ()=>{
    const circles = document.getElementsByClassName('circle');
    for (let circle of circles){
        expect(circle.getAttribute('data-listener')).toBe('true');
    }
})

//game play works corectly
beforeEach(() =>{
    game.score=0;
    game.currentGame = [];
    game.playerMoves = [];
    addTurn();
});
afterEach(()=>{
    game.score=0;
    game.currentGame = [];
    game.playerMoves = [];
    game.turnNumber = 0;
})
test('addTurn adds a new turn to the game', ()=>{
    addTurn();
    expect(game.currentGame.length).toBe(2);
})
test('should add correct class to button to light up', ()=>{
    let button = document.getElementById(game.currentGame[0]);
    lightOn(game.currentGame[0]);
    expect(button.classList).toContain('light');
})
test('showTurns should update game.turnNumber', () =>{
    game.turnNumber =42;
    showTurns();
    expect(game.turnNumber).toBe(0);
})
test('should increment the score if turn is correct', ()=>{
    game.playerMoves.push(game.currentGame[0]);
    playerTurn();
    expect(game.score).toBe(1);
})
test('should call an alert if the move is wrong', ()=>{
    game.playerMoves.push('wrong');
    playerTurn();
    expect(window.alert).toBeCalledWith('Wrong move!')
})
test('showTurns should set turnInProgress to true', ()=>{
    showTurns();
    expect(game.turnInProgress).toEqual(true);
})
test('clicking during the computer sequence should fail', ()=>{
    showTurns();
    game.lastButton='';
    document.getElementById('button2').click();
    expect(game.lastButton).toEqual('');
})