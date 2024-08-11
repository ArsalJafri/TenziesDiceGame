//Die.js

import React from "react";
import PropTypes from "prop-types";

export default function Die({ value, isHeld, holdDice }) {
    // Apply the appropriate class name based on the value of the die
    const dieFaceClass = `die-face ${['one', 'two', 'three', 'four', 'five', 'six'][value - 1]}`;

    return (
        <div
            className={dieFaceClass}
            onClick={holdDice}
            role="button"
            aria-pressed={isHeld}
            style={{
                backgroundColor: isHeld ? "#59E391" : "white",
            }}
        >
            {/* Create nine dots, they will be visible based on the die value */}
            {[...Array(9)].map((_, i) => (
                <div key={i} className="dot" />
            ))}
        </div>
    );
}

Die.propTypes = {
    value: PropTypes.number.isRequired,
    isHeld: PropTypes.bool.isRequired,
    holdDice: PropTypes.func.isRequired,
};
