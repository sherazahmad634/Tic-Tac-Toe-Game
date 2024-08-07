import React from "react";

export default function GameBoard({ onSelectTurn, board }) {

  //   const [gameBoard, setGameBoard] = useState(initialGameBoard);

  //   function handleSelectTurn(rowIndex, colIndex) {
  //     setGameBoard((prevGameBoard) => {
  //       const updatedGameBoard = [
  //         ...prevGameBoard.map(innerGameBoard => [...innerGameBoard])
  //       ];
  //       updatedGameBoard[rowIndex][colIndex] = activePlayerSymbol;
  //       return updatedGameBoard;
  //     });
  //     onSelectTurn();
  //   }

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                {/* <button onClick={() => handleSelectTurn(rowIndex, colIndex)}> */}
                <button
                  onClick={() => onSelectTurn(rowIndex, colIndex)}
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol} 
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
