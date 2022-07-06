import React, { useState, useEffect } from 'react';
import Snake from './Snake';
import Food from './Food';
import TimerWithRef from "../components/TimerWithRef";
import TimerTwo from "../components/TimerTwo";
import TitleScreen from "../components/TitleScreen"


const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  let y =  Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  return [x,y]
}


function GameFour() {
  let [food, setFood] = useState(getRandomCoordinates());
  let [snakeDots, setSnakeDots] = useState([[0,0],[2,0]])
  let [direction, setDirection] = useState("right")
  let [gameRunning, setGameRunning] = useState(true)
  const [isStarted, setIsStarted] = useState(false)
  const [timeWon, setTimeWon] = useState(0)



useEffect(() => {
  const id = setInterval(()=> {
    if(gameRunning === true) {
      moveSnake();
    checkIfOutOfBorders();
    checkIfEat();
    }
    
    
  }, 250)

  return function cleanUp(){
    clearInterval(id)
  }
}, [snakeDots])

const moveSnake = () => {
    let dots = [...snakeDots];
    let head = dots[dots.length - 1];

    switch (direction) {
      case 'right':
        head = [head[0] + 2, head[1]];
        break;
      case 'left':
        head = [head[0] - 2, head[1]];
        break;
      case 'down':
        head = [head[0], head[1] + 2];
        break;
      case 'up':
        head = [head[0], head[1] - 2];
        break;
    }

    dots.push(head);
    dots.shift();
    setSnakeDots(dots)
  }

  const checkIfWin = () => {
    if (snakeDots.length > 9){
      return true
    }
  }

  let checkIfOutOfBorders = () => {
    let head = snakeDots[snakeDots.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      onGameOver();
    }
  }

  const checkIfEat = () => {
    let head = snakeDots[snakeDots.length - 1];
    if (head[0] === food[0] && head[1] === food[1]) {
      setFood(getRandomCoordinates())        
      enlargeSnake();
      }

  }

  const enlargeSnake = () => {
    let newSnake = [...snakeDots];
    newSnake.unshift([])
    setSnakeDots(newSnake)
  }

  const onGameOver = () => {
    setGameRunning(false)
  }

  if (checkIfWin()){
    return <div className="fourth">
              <h1 className="gameTitle">Snake</h1>
              <div>You Win in {timeWon}s</div>
            </div>
  }

  if (isStarted === false) {
    return <div className="fourth">
      <TitleScreen title="Snake" rules="Use the arrows to direct the snake to food. Eat 10 meals to win." 
        changeStart={isStarted => setIsStarted(true)}
        />
    </div>
  } 
  else {
    return (
      <div className="fourth">
        <div className="game-area">
          <Snake snakeDots={snakeDots}/>
          <Food dot={food}/>
        </div>
        <div>Current Length: {snakeDots.length}</div>
          <div className="buttons">
              <button onClick={() => {setDirection("up")}}>↑</button>
              <br></br>
              <button onClick={() => {setDirection("left")}}>←</button>
              <button onClick={() => {setDirection("down")}}>↓</button>
              <button onClick={() => {setDirection("right")}}>→</button>
              <br></br>
              <TimerWithRef 
          changeTime={timeWon => setTimeWon(timeWon)}/>
              <TimerTwo />
              <button style={{float: "right"}}>Restart</button>
          </div>
      </div>
  )
}}

export default GameFour;