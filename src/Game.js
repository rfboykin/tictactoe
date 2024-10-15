import React from 'react';
import {useState} from 'react';
import './static/style/main.css';

const STATES = {
  x: "Next player: X",
  o: "Next player: O",
  winX: "Winner: X",
  winO: "Winner: O",
  tie: "Tie",
}
const INITIAL_STATE = STATES.x;
const WINNING_COMBINATIONS = [
  [1,4,7],[2,5,8],[3,6,9], [1,2,3], [4,5,6], [7,8,9], [1,5,9]
];

const checkForWin = playerSquares => {
  if (playerSquares.length < 3) { return false}
  const possibleWins = WINNING_COMBINATIONS.filter(win => win.includes(playerSquares[0]));
  // check in the list of possible wins
  for(let winCondition of possibleWins){
    const isWin = winCondition.map(winSquare => playerSquares.includes(winSquare)).reduce((acc, curr) => acc && curr , true);
    if(isWin) {
      return true;
      }
  }
};

const GameSquare = ({onClick, buttonID, value}) =>
 {
   const buttonClickFn = onClick(buttonID);
   return (<div onClick={!value ? buttonClickFn : () => {}} className="square">{value}</div>)
 }

const Game = props => {

  const [gameState, setGameState] = useState(INITIAL_STATE);
  const [xSquares, setXSquares] = useState([]);
  const [oSquares, setOSquares] = useState([]);

  const onSquareClick = (buttonID) => () => {
    if (![STATES.x, STATES.o].includes(gameState)) return;
    let updatedSquares = [];
    if (gameState === STATES.x){
      updatedSquares = [...xSquares, buttonID];
      setXSquares(updatedSquares);
      if (checkForWin(updatedSquares)) {
        setGameState(STATES.winX);
        return
      }
    } else {
      updatedSquares = [...oSquares, buttonID];
      setOSquares(updatedSquares);
      if (checkForWin(updatedSquares)) {
        setGameState(STATES.winO);
        return
      }
    }
    // check for tie, remember state variables wont include latest addition
    if(oSquares.length + xSquares.length === 8 ){
      setGameState(STATES.tie)
      return;
    }
    // change game state to next player
    gameState === STATES.x ? setGameState(STATES.o) : setGameState(STATES.x);
    };

  const findSquareValue = buttonID => {
    if (xSquares.includes(buttonID)){
      return 'X'; 
    } else if (oSquares.includes(buttonID)){
      return 'O';
    }
    return ''
}
  
  const resetFn = () => {
    setXSquares([]);
    setOSquares([]);
    setGameState(INITIAL_STATE);
  }

  return (
      <>
      <button className="reset" onClick={resetFn}>Reset</button>
      <div className="status">{gameState}</div>
      <div className="gameBoard">
        {Array(9).fill(true).map(
          (i, idx) => <GameSquare key={"Button" + (idx+1)} buttonID={idx+1} onClick={onSquareClick} value={findSquareValue(idx+1)}/>
          )}
      </div>
      </>
  )
}
export default Game;