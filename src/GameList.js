import React from 'react';
import Board from "./lights/Board";
import Game from "./sudoku/screens/Game/Game"
import Twenty from "./2048/2048"
import GameFour from "./snake/GameFour"


import "./GameList.css"

function GameList() {
    return (
      <div className="GameList">
          <Board />
          <Game />
          <Twenty />
          <GameFour />
        </div>
    );
  }

export default GameList