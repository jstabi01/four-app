import React from "react";
import "./ChoiceBoard.css";

const CHOICES1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const ChoiceBoard = ({ setClickValue, selected }) => {
  return (
    <div className="ChoiceBoard">
      <div className="choice-container">
        {CHOICES1.map((choice) => {
          let selectedClass = choice === selected ? "selected" : "";
          return (
            <div
              className={`choice ${selectedClass} noSelect `}
              key={`key-1-${choice}`}
              onClick={() => setClickValue(choice)}
            >
              <p className="choice-text">{choice}</p>
            </div>
          );
        })}
         <div
          className={`choice 
                    ${selected === 0 ? "selected-eraser" : ""} 
                    noSelect`}
          key={`key-2-${0}`}
          onClick={() => setClickValue(0)}
        >
          <p className="choice-text">⌫</p>
        </div>
      </div>
    </div>
  );
};

export default ChoiceBoard;
