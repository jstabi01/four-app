import React, { useEffect, useState } from "react";
import { cloneDeep } from "lodash";
import "./2048.css"
import { getColors } from "./util";
import TimerWithRef from "../components/TimerWithRef";
import TimerTwo from "../components/TimerTwo";
import TitleScreen from "../components/TitleScreen"

function Twenty() {
    const [data, setData] = useState([
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ]);
    const [isStarted, setIsStarted] = useState(false);
    const [timeWon, setTimeWon] = useState(0);


    if(data.includes(0)){
        alert("you win")
        return <div>You Win in </div>;
    }
    // initialize
    const initialize = () => {
        let newGrid = cloneDeep(data);
        //setting a new set with the new grid

        addNumber(newGrid);
        addNumber(newGrid);
        setData(newGrid)
    }

    // addNumber
    const addNumber = (newGrid) => {
        let added = false;
        let gridFull = false;

        while(!added) {
            if (gridFull) {
                break;
            }
            let rand1 = Math.floor(Math.random() * 4);
            let rand2 = Math.floor(Math.random() * 4);
            if (newGrid[rand1][rand2] === 0) {
                newGrid[rand1][rand2] = Math.random() > 0.5 ? 2 : 4;
                added = true;
            }
        }
    }

    // swipe
    const swipeLeft = () => {
    let oldGrid = data;
    let newArray = cloneDeep(data);

    for (let i = 0; i < 4; i++) {
      let b = newArray[i];
      let slow = 0;
      let fast = 1;
      while (slow < 4) {
        if (fast === 4) {
          fast = slow + 1;
          slow++;
          continue;
        }
        if (b[slow] === 0 && b[fast] === 0) {
          fast++;
        } else if (b[slow] === 0 && b[fast] !== 0) {
          b[slow] = b[fast];
          b[fast] = 0;
          fast++;
        } else if (b[slow] !== 0 && b[fast] === 0) {
          fast++;
        } else if (b[slow] !== 0 && b[fast] !== 0) {
          if (b[slow] === b[fast]) {
            b[slow] = b[slow] + b[fast];
            b[fast] = 0;
            fast = slow + 1;
            slow++;
          } else {
            slow++;
            fast = slow + 1;
          }
        }
      }
    }
    if (JSON.stringify(oldGrid) !== JSON.stringify(newArray)) {
      addNumber(newArray);
    }
      setData(newArray);
    };

    const swipeRight = () => {
        let oldData = data;
        let newArray = cloneDeep(data);
    
        for (let i = 3; i >= 0; i--) {
          let b = newArray[i];
          let slow = b.length - 1;
          let fast = slow - 1;
          while (slow > 0) {
            if (fast === -1) {
              fast = slow - 1;
              slow--;
              continue;
            }
            if (b[slow] === 0 && b[fast] === 0) {
              fast--;
            } else if (b[slow] === 0 && b[fast] !== 0) {
              b[slow] = b[fast];
              b[fast] = 0;
              fast--;
            } else if (b[slow] !== 0 && b[fast] === 0) {
              fast--;
            } else if (b[slow] !== 0 && b[fast] !== 0) {
              if (b[slow] === b[fast]) {
                b[slow] = b[slow] + b[fast];
                b[fast] = 0;
                fast = slow - 1;
                slow--;
              } else {
                slow--;
                fast = slow - 1;
              }
            }
          }
        }
        if (JSON.stringify(newArray) !== JSON.stringify(oldData)) {
          addNumber(newArray);
        }
          setData(newArray);
      };
    
      const swipeDown = () => {
        let b = cloneDeep(data);
        let oldData = JSON.parse(JSON.stringify(data));
        for (let i = 3; i >= 0; i--) {
          let slow = b.length - 1;
          let fast = slow - 1;
          while (slow > 0) {
            if (fast === -1) {
              fast = slow - 1;
              slow--;
              continue;
            }
            if (b[slow][i] === 0 && b[fast][i] === 0) {
              fast--;
            } else if (b[slow][i] === 0 && b[fast][i] !== 0) {
              b[slow][i] = b[fast][i];
              b[fast][i] = 0;
              fast--;
            } else if (b[slow][i] !== 0 && b[fast][i] === 0) {
              fast--;
            } else if (b[slow][i] !== 0 && b[fast][i] !== 0) {
              if (b[slow][i] === b[fast][i]) {
                b[slow][i] = b[slow][i] + b[fast][i];
                b[fast][i] = 0;
                fast = slow - 1;
                slow--;
              } else {
                slow--;
                fast = slow - 1;
              }
            }
          }
        }
        if (JSON.stringify(b) !== JSON.stringify(oldData)) {
          addNumber(b);
        }
          setData(b);
      };
    
      const swipeUp = () => {
        let b = cloneDeep(data);
        let oldData = JSON.parse(JSON.stringify(data));
        for (let i = 0; i < 4; i++) {
          let slow = 0;
          let fast = 1;
          while (slow < 4) {
            if (fast === 4) {
              fast = slow + 1;
              slow++;
              continue;
            }
            if (b[slow][i] === 0 && b[fast][i] === 0) {
              fast++;
            } else if (b[slow][i] === 0 && b[fast][i] !== 0) {
              b[slow][i] = b[fast][i];
              b[fast][i] = 0;
              fast++;
            } else if (b[slow][i] !== 0 && b[fast][i] === 0) {
              fast++;
            } else if (b[slow][i] !== 0 && b[fast][i] !== 0) {
              if (b[slow][i] === b[fast][i]) {
                b[slow][i] = b[slow][i] + b[fast][i];
                b[fast][i] = 0;
                fast = slow + 1;
                slow++;
              } else {
                slow++;
                fast = slow + 1;
              }
            }
          }
        }
        if (JSON.stringify(oldData) !== JSON.stringify(b)) {
          addNumber(b);
        }
          setData(b);
      };


      const didWin = () => {
        if(JSON.stringify(data).includes(2048)){
            return true
        } 
    }

    // reset
    const resetGame = () => {
        const emptyGrid = [
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ];
    
        addNumber(emptyGrid);
        addNumber(emptyGrid);
        setData(emptyGrid);
      };

    useEffect(() => {
        initialize();
    }, []);

    // checkWin
    if(didWin()) {
      return <div className="forty">
                <h1 className="gameTitle">2048</h1>
                <div>You Win in {timeWon}s</div>
            </div>
    }

    if (isStarted === false) {
      return <div className="forty">
        <TitleScreen title="2048" rules="Combine like numbers by moving all cells in a direction. Create the number 2048 to win." 
        changeStart={isStarted => setIsStarted(true)}
        />
      </div>
    }
    else {
    return (
        <div className="forty">
            <div className="twentyBoard">
            {data.map((row, oneIndex) => {
                return (
                    <div className="gameRow" style={{ display: "flex", "justifyContent": "center" }} key={oneIndex}>
                        {row.map((digit, index) => (
                            <Block num={digit} key={index} />
                        ))}
                    </div>
                );
            })}
            </div>
            <button onClick={swipeUp}>↑</button>
            <br></br>
            <button onClick={swipeLeft} style={{float: "center"}}>←</button>
            <button onClick={swipeDown}>↓</button>
            <button onClick={swipeRight}>→</button>
            <TimerTwo />
            <TimerWithRef 
          changeTime={timeWon => setTimeWon(timeWon)}/>
            <br></br>
            <button onClick={resetGame} style={{float: "right"}}>Restart</button>
        </div>
    );
}   }

const Block = ({num}) => {
    return <div style={{background: getColors(num)}} className="blockstyle">{num !== 0 ? num : ""}</div>
}


export default Twenty;