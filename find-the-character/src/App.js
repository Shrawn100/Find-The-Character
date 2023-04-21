import "./App.css";
import ps1 from "./imgs/crop2.jpg";
import { useState, useEffect } from "react";
import { spyroLocation, ashLocation, crashLocation } from "./firebase-config";
import CheckIcon from "@material-ui/icons/Check";

function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [characters, setCharacters] = useState(["spyro", "ash", "crash"]);
  const [mode, setMode] = useState(true);
  const [currentXPos, setCurrentXPos] = useState();
  const [currentYPos, setCurrentYPos] = useState();

  const [spyroFound, setSpyroFound] = useState(false);
  const [ashFound, setAshFound] = useState(false);
  const [crashFound, setCrashFound] = useState(false);

  const [timer, setTimer] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    let intervalId;
    if (!gameOver) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [gameOver, timer]);

  function handleMouseMove(event) {
    const totalHeight = document.body.scrollHeight;
    const totalWidth = document.body.scrollWidth;
    const x = (event.pageX / totalWidth) * 100;
    const y = (event.pageY / totalHeight) * 100;
    setPosition({ x, y });
  }
  function handleSpyro() {
    spyroLocation().then((results) => {
      if (
        results[0] >= currentXPos - 3 &&
        results[0] <= currentXPos + 3 &&
        results[1] >= currentYPos - 6 &&
        results[1] <= currentYPos + 6
      ) {
        setSpyroFound(true);
        const newCharacters = characters.filter(
          (character) => character !== "spyro"
        );
        setCharacters(newCharacters);
      }
    });
  }
  function handleAsh() {
    ashLocation().then((results) => {
      if (
        results[0] >= currentXPos - 3 &&
        results[0] <= currentXPos + 3 &&
        results[1] >= currentYPos - 6 &&
        results[1] <= currentYPos + 6
      ) {
        setAshFound(true);
        const newCharacters = characters.filter(
          (character) => character !== "ash"
        );
        setCharacters(newCharacters);
      }
    });
  }
  function handleCrash() {
    crashLocation().then((results) => {
      if (
        results[0] >= currentXPos - 3 &&
        results[0] <= currentXPos + 3 &&
        results[1] >= currentYPos - 6 &&
        results[1] <= currentYPos + 6
      ) {
        setCrashFound(true);
        const newCharacters = characters.filter(
          (character) => character !== "crash"
        );
        setCharacters(newCharacters);
      }
    });
  }
  function handleClick(event) {
    if (event.target.id === "spyro") {
      handleSpyro();
    } else if (event.target.id === "ash") {
      handleAsh();
    } else if (event.target.id === "crash") {
      handleCrash();
    }

    setCurrentXPos(position.x);
    setCurrentYPos(position.y);
    setMode(!mode);
  }
  useEffect(() => {
    if (characters.length === 0) {
      setGameOver(true);
    }
  }, [characters]);
  let characterList = characters.map((item) => (
    <li id={item} key={item}>
      {item}
    </li>
  ));

  return (
    <div
      className="container"
      onMouseMove={handleMouseMove}
      onMouseDown={handleClick}
    >
      <div
        style={{
          position: "absolute",
          left: `${position.x - (25 / document.body.scrollWidth) * 100}%`,
          top: `${position.y - (25 / document.body.scrollHeight) * 100}%`,
          zIndex: 2,
          width: "50px",
          height: "50px",
          border: "2px solid red",
        }}
      ></div>
      <ul
        className="ul"
        style={{
          position: "absolute",
          left: `${currentXPos}%`,
          top: `${currentYPos}%`,
          zIndex: 3,
          color: "white",
          display: mode ? "none" : "",
        }}
      >
        {characterList}
      </ul>

      <div className="navBar">
        <div className="title">Find Us</div>
        <div className="character">
          <div className="icons">
            <div className="char-icon">
              <div className="img1"></div>
              <div>{spyroFound ? <CheckIcon /> : "X"}</div>
            </div>
            <div className="char-icon">
              <div className="img2"></div>
              <div>{ashFound ? <CheckIcon /> : "X"}</div>
            </div>
            <div className="char-icon">
              <div className="img3"></div>
              <div>{crashFound ? <CheckIcon /> : "X"}</div>
            </div>
          </div>
        </div>
        <div className="time">Timer:{timer}</div>
      </div>
      <div className="big-img-container">
        <img className="bigImg" src={ps1} alt="ps1" />
      </div>
    </div>
  );
}

export default App;