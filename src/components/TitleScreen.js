import React from "react";

import "./TitleScreen.css";

function TitleScreen(props) {
    return (
        <div className="title">
            <h1 className="titleWords">{props.title}</h1>
            <h3 className="titleWords">{props.rules}</h3>
            <button className="titleButton" onClick={() => props.changeStart(true)}>Start</button>
        </div>
    );
}

export default TitleScreen