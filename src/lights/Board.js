import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";
import TimerWithRef from "../components/TimerWithRef";
import TimerTwo from "../components/TimerTwo";
import TitleScreen from "../components/TitleScreen"

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 3, ncols = 3, chanceLightStartsOn =.45 }) {
  const [board, setBoard] = useState(createBoard());
  const [timeWon, setTimeWon] = useState(0)
  const [isStarted, setIsStarted] = useState(false)

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    for (let y = 0; y < nrows; y++) {
      let row = [];
      for (let x = 0; x < ncols; x++) {
        row.push(Math.random() < chanceLightStartsOn);
      }
      initialBoard.push(row);
    }
    return initialBoard;
  }

/**    
 * Checks if board has a win. For every row, is ever cell false
**/
  function hasWon() {
    return board.every(row => row.every(cell => !cell));
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      const boardCopy = oldBoard.map(row => [...row]);

      flipCell(y, x, boardCopy);
      flipCell(y, x - 1, boardCopy);
      flipCell(y, x + 1, boardCopy);
      flipCell(y - 1, x, boardCopy);
      flipCell(y + 1, x, boardCopy);

      return boardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon()) {
    return <div className="lights">
              <h1 className="gameTitle">Lights Out</h1>
              <div>You Win in {timeWon}s</div>
            </div>
  }

  // make table board

  let tableBoard = [];

  for (let y = 0; y < nrows; y++) {
    let row = [];
    for (let x = 0; x < ncols; x++) {
      let coord = `${y}-${x}`;
      row.push(
        <Cell
          key={coord}
          isLit={board[y][x]}
          flipCellsAroundMe={() => flipCellsAround(coord)}
        />
      );
    }
    tableBoard.push(<tr key={y}>{row}</tr>);
  }

  if (isStarted === false) {
    return <div className="lights">
      <TitleScreen title="Lights Out" rules="Click the boxes to switch the lights around the clicked box. Turn off all lights to win." 
        changeStart={isStarted => setIsStarted(true)}
        />
    </div>
  }
  else {
  return (
    <div className="lights">
        <table className="lightsBoard">
          <tbody>{tableBoard}</tbody>
        </table>
      <TimerWithRef 
          changeTime={timeWon => setTimeWon(timeWon)}
      />
      <TimerTwo />
    </div>
  );
}}

export default Board;
