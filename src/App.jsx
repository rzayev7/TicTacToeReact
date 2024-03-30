import { Player } from "./components/Player";
import { GameBoard } from "./components/GameBoard";
import { useState } from "react";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winningCombintaions";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
function App() {
  const [gameTurns, setGameTurns] = useState([]);

 


  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      let currentPlayer = "X";
      if (prevTurns.length > 0 && prevTurns[prevTurns.length-1].player === "X") {
        currentPlayer = "O";
      }
      const updatedTurns = [
        ...prevTurns,
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer }
      ];
      
      return updatedTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={"Player 1"}
            symbol={"X"}
            isActive={gameTurns.length > 0 && gameTurns[gameTurns.length-1].player === "X"}
          />
          <Player
            name={"Player 2"}
            symbol={"O"}
            isActive={gameTurns.length > 0 && gameTurns[gameTurns.length-1].player === "O"}
          />
        </ol>
        <GameBoard
          handleSelectSquare={handleSelectSquare}
          turns={gameTurns}
        />
      </div>
      <Log 
        turns={gameTurns}
      />
    </main>
  );
}

export default App;
