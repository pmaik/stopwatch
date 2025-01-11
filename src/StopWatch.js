import React, { useState, useEffect, useRef } from "react";
import "./index.css";

const StopWatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    }

    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [isRunning]);

  const onStartClick = () => {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  };

  const onStopClick = () => {
    setIsRunning(false);
  };

  const onResetClick = () => {
    setElapsedTime(0);
    setIsRunning(false);
  };

  const formatTime = () => {
    // let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let miliseconds = Math.floor((elapsedTime % 1000) / 10);

    // hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    miliseconds = String(miliseconds).padStart(2, "0");
    return `${minutes}:${seconds}:${miliseconds}`;
  };

  return (
    <div className="stopwatch">
      <h1 className="heading">Stop Watch</h1>
      <div className="display-wrapper">
        <div className="display">
            <p className="time">{formatTime()}</p>
            <div className="action-buttons">
            <button className="start-button" onClick={onStartClick}>
                Start
            </button>
            <button className="stop-button" onClick={onStopClick}>
                Stop
            </button>
            <button className="reset-button" onClick={onResetClick}>
                Reset
            </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default StopWatch;
