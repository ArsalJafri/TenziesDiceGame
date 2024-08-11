//App.js

import React from "react";
import Die from "./Die";
import { nanoid } from "nanoid";

// Main App component
export default function App() {
    // State to manage the array of dice and whether the game is won (tenzies)
    const [dice, setDice] = React.useState(allNewDice());
    const [tenzies, setTenzies] = React.useState(false);

    // Effect to check if all dice are held and have the same value
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld); // Check if all dice are held
        const firstValue = dice[0].value; // Get the value of the first die
        const allSameValue = dice.every(die => die.value === firstValue); // Check if all dice have the same value

        // If all dice are held and have the same value, set the game as won
        if (allHeld && allSameValue) {
            setTenzies(true);
        }
    }, [dice]); // Run this effect whenever the dice state changes

    // Function to generate a new die with a random value and unique ID
    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        };
    }

    // Function to generate an array of 10 new dice
    function allNewDice() {
        const newDice = [];
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie());
        }
        return newDice;
    }

    // Function to roll dice or reset the game
    function rollDice() {
        if (!tenzies) {
            // Roll dice that are not held
            setDice(oldDice => oldDice.map(die => die.isHeld ? die : generateNewDie()));
        } else {
            // Reset the game if it's won
            setTenzies(false);
            setDice(allNewDice());
        }
    }

    // Function to toggle the "held" state of a die
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die =>
            die.id === id ? { ...die, isHeld: !die.isHeld } : die
        ));
    }

    // Create dice elements to render
    const diceElements = dice.map(die => (
        <Die
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            holdDice={() => holdDice(die.id)}
        />
    ));

    // Render the main UI
    return (
        <main>
            {tenzies && <div className="confetti-placeholder">🎉 You won! 🎉</div>}
            <h1 className="title">Tenzies Dice Game</h1>
            <p className="instructions">
                Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
            </p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button
                className="roll-dice"
                onClick={rollDice}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>
        </main>
    );
}


