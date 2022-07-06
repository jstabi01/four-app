import React, { useState, useEffect } from "react";

function TimerTwo() {
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setisRunning] = useState(true);

  
    useEffect(() => {
      if(isRunning) {
      const id = window.setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
      // next time the useffect runs, clear the interval
      // it sees that isRunning is false, but as a consequence it returns the function
      return () => window.clearInterval(id)
    } else {
    }
  },[isRunning])
  
    return <div>
      {seconds}s
          </div>;
  }


export default TimerTwo