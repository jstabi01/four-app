import React, { useEffect, useState } from "react";
import Grid from "../../Grid/Grid.js"
import ChoiceBoard from "../../ChoiceBoard/ChoiceBoard.js"
import TimerTwo from "../../../components/TimerTwo";
import TitleScreen from "../../../components/TitleScreen"

import "./Game.css";

import {
  arrayDeepCopy,
  checkBoard,
  checkPlayerWon,
  createSudokuGrid,
} from "../../utility";

import { render } from "@testing-library/react";


const Game = () => {
  const [grid, setGrid] = useState(null);
  const [startingGrid, setStartingGrid] = useState(null);
  const [clickValue, setClickValue] = useState(1);
  const [isStarted, setIsStarted] = useState(false)


  useEffect(() => {
    if (grid == null && startingGrid == null) {
      let newSudokuGrid = createSudokuGrid();
      setStartingGrid(arrayDeepCopy(newSudokuGrid));
      setGrid(arrayDeepCopy(newSudokuGrid));
    }
  }, [grid, startingGrid, setStartingGrid, setGrid]);


  const handleNewGame = () => {
    // Making new grid
    let newSudokuGrid = createSudokuGrid();
    setStartingGrid(arrayDeepCopy(newSudokuGrid));
    setGrid(arrayDeepCopy(newSudokuGrid));

  };

  const handleClearBoard = () => {
    setGrid(arrayDeepCopy(startingGrid));
  }

  const handleCellClick = (row, column) => {


    let newGrid = arrayDeepCopy(grid);
    newGrid[row][column].value = clickValue;

    // Marking the node valid or invalid depending on the grid
    checkBoard(newGrid);

    // Checking if the player has won
    let playerWon = checkPlayerWon(newGrid);
    if (playerWon) {
      console.log(" you win ")
      render(<div>You Win in: s</div>)
    }

    // setting the value to the grid and also to the local storage
    setGrid(newGrid);
  };

  if (isStarted === false) {
    return <div className="Game">
        <TitleScreen title="Sudoku" rules="Enter numbers so each row, column, and 9x9 section contains 1 of each number." 
        changeStart={isStarted => setIsStarted(true)}
        />
        
        </div>
        }
        else {
  return (
    <div className="Game">
      <Grid handleCellClick={handleCellClick} grid={grid} />
      <ChoiceBoard setClickValue={setClickValue} selected={clickValue} />
      <div className="action-container">
        <button
          onClick={handleClearBoard}
          text="Clear"
        >Clear</button>
        <TimerTwo />
        <button
          onClick={handleNewGame}
          text="New Game"
        >New Game</button>
      </div>
    </div>
  ); }
};

export default Game;
