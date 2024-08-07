import GameBoard from "./assets/components/GameBoard";
import Player from "./assets/components/Player";
import { useState } from "react";
import Log from "./assets/components/log";
import { WINNING_COMBINATIONS } from "./winning-situation";
import GameOver from "./assets/components/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentplayerTurn = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentplayerTurn = "O";
  }
  return currentplayerTurn;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  //const [activePlayer, setActivePlayer] = useState("X");

  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map(array=>[...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

      if (firstSquareSymbol && firstSquareSymbol===secondSquareSymbol&& firstSquareSymbol===thirdSquareSymbol){
          winner=firstSquareSymbol;
      } 
    
  }
  const hasDraw= gameTurns.length===9 && !winner;

    function handleSelectTurn(rowIndex, colIndex) {
    //setActivePlayer((currentPlayer) => (currentPlayer === "X" ? "O" : "X"));

    setGameTurns((prevTurns) => {
      const currentplayerTurn = deriveActivePlayer(prevTurns);
      // let currentplayerTurn = "X";

      // if (prevTurns.length > 0 && prevTurns[0].player === "X") {
      //   currentplayerTurn = "O";
      // }
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentplayerTurn },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  function handleRestart(){
    setGameTurns([]); 
  }


  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={activePlayer === "X"} />
          <Player name="Player 2" symbol="O" isActive={activePlayer === "O"} />
        </ol>
        
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard
          onSelectTurn={handleSelectTurn}
          activePlayerSymbol={activePlayer}
          board={gameBoard}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
