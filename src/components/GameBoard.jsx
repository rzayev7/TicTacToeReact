import { useEffect } from "react";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "../winningCombintaions";

import GameIsOver from "./GameIsOver";
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export const GameBoard = ({handleSelectSquare , turns }) => {

  const [gameBoard, setGameBoard] = useState(initialGameBoard);
  const [winner,setWinner]=useState(false);
  const isWinningHandle = () => {
    for (const combination of WINNING_COMBINATIONS) {
      let firstSquare = gameBoard[combination[0].row][combination[0].column];
      let secondSquare = gameBoard[combination[1].row][combination[1].column];
      let thirdSquare = gameBoard[combination[2].row][combination[2].column];
      if (firstSquare && firstSquare === secondSquare && firstSquare === thirdSquare) {
        setWinner(true);
        return;
      }
    }
  };

  const noWinner = turns.length===9 && !winner;

  const handleRestart = () => {
  console.log("Restarting game...");
  setGameBoard(initialGameBoard); // Reset gameBoard to initial state
  setWinner(false); // Reset winner to false
};

  

  useEffect(() => {
    const updatedBoard = [...initialGameBoard.map((array)=>[...array])];

    for (const turn of turns) {
      const { square, player } = turn;
      const { row, col } = square;
      updatedBoard[row][col] = player;
    }

    // Update the game board state
    setGameBoard(updatedBoard);

    if (turns.length > 0) {
      isWinningHandle();
    }
  }, [turns]);


  return (
    <ol id="game-board">
      {(winner||noWinner) && <GameIsOver handleRestart={handleRestart} winner={winner}/>}
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playedSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => {handleSelectSquare(rowIndex, colIndex)}} disabled={playedSymbol!==null}>
                  {playedSymbol}
                </button>  
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
