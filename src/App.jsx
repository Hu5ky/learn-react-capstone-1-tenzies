import { useState } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";

function App() {

  const [dice, setDice] = useState(generateAllNewDice());
  
  function generateAllNewDice() {
    return new Array(10)
        .fill(0)
        .map((_, i) => ({
          key: nanoid(),
          id: i,
          value: Math.ceil(Math.random() * 6),
          isHeld: false,
        }));
  }

  function holdDie(id, isHeld) {
    setDice(prevDice => prevDice.map(die => 
      die.id == id ? {...die, isHeld: !die.isHeld} : die
    ));
  }

  function rollDice() {
    setDice(generateAllNewDice());
  }

  const diceElements = dice.map(die => 
    <Die
      key={die.key}
      id={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdFunc={holdDie}
    />);

  return (
    <>
      <main className="game-board">
        <div className="dice-container">
          {diceElements}
        </div>
        <button className="roll-btn" onClick={rollDice}>Roll</button>
      </main>
    </>
  )
}

export default App

  // Alternative Ways To Generate Dice
  // function generateAllNewDice() {
  //     return new Array(10)
  //         .fill(0)
  //         .map(() => Math.ceil(Math.random() * 6));
  // }

  // function generateAllNewDice() {
  //     const newDice = [];
  //     for (let i = 0; i < 10; i++) {
  //         newDice.push(Math.ceil(Math.random() * 6));
  //     }
  //     return newDice;
  // }

    // function generateAllNewDice() {
  //   return new Array(10)
  //       .fill(0)
  //       .map((_, i) => ({
  //         key: nanoid(),
  //         id: i,
  //         value: Math.ceil(Math.random() * 6),
  //         isHeld: false,
  //       }));
  // }

  // function generateAllNewDice() {
  //   const diceNumbers = Array.from({ length: 10 }, () => Math.ceil(Math.random() * 6));
  //   const dice = diceNumbers.map(number => ({ value: number, isHeld: false  }));
  //   return dice;
  // }