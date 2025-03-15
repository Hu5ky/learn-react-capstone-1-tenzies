import { useState, useRef, useEffect } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import useConfetti from "./useConfetti";

function App() {

  const [dice, setDice] = useState(() => generateAllNewDice()); //Lazy loaded
  
  const rollButton = useRef(null);

  const gameWon = 
    dice.every(die => die.isHeld) && 
    dice.every(die => die.value === dice[0].value);

  
  useEffect(() => {
    if(gameWon) {
      rollButton.current.focus();
    }
  });

  const drawConfetti = useConfetti();

  function generateAllNewDice() {
    return new Array(10)
        .fill(0)
        .map((_, i) => ({
          id: nanoid(),
          value: Math.ceil(Math.random() * 6),
          isHeld: false,
        }));
  }

  function holdDie(id) {
    setDice(prevDice => prevDice.map(die => 
      die.id == id ? 
        {...die, isHeld: !die.isHeld} : 
        die
    ));
  }

  function rollDice() {
    if (!gameWon) {
      setDice(prevDice => prevDice
        .map( die =>
          die.isHeld ? 
            die :
            {...die, value: Math.ceil(Math.random() * 6)}
      ));
    } else {
      setDice(generateAllNewDice());
    }
  }

  const diceElements = dice.map(die => 
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDie={() => holdDie(die.id)} //Pass die ID inside the callback func
    />);

  return (
    <>
      {gameWon && drawConfetti}
      <main className="game-board">
        <h1 className="game-title">Tenzies</h1>
        <p className="game-instructions">Roll untill all dice are the same. Click each die to freeze it at its current calue between rolls.</p>
        <div className="dice-container">
          {diceElements}
        </div>
        <button 
          className="roll-btn" 
          ref={rollButton}
          onClick={rollDice}>
          {gameWon ? "New Game" : "Roll"}
          </button>
      </main>
    </>
  )
}

export default App