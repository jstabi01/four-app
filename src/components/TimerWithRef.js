import React, { useState, useEffect, useRef } from "react";
import "./TimerWithRef.css";

function TimerWithRef(props) {
  const timerId = useRef();
  let [count, setCount] = useState(0);

  useEffect(() => {
    timerId.current = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);


    return function cleanUpClearTimer() {
      clearInterval(timerId.current);
    };
  }, [timerId]);

  return (
    <div className="Timer-wrapper">
      <div className="timerContainer">{props.changeTime(count)}</div>
    </div>
  );
}

export default TimerWithRef