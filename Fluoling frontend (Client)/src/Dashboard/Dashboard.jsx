import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Form, Button } from 'react-bootstrap'; // Import the necessary Bootstrap components
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './Dashboard.css'; // Import the custom CSS file

function Dashboard({ user }) {
  const [selectedGame, setSelectedGame] = useState(null);
  const [showMessage, setShowMessage] = useState(true);

  const handleGameSelection = (game) => {
    setSelectedGame(game);
    setShowMessage(false); // Hide the message after game selection
  };

  return (
    <div>
      {showMessage && (
        <div>
          <h1>Hello {user}.</h1>
          <h1>Welcome to Fluolingo!</h1>
          <p>Select a language game:</p>
          <div className="game-buttons"> {/* Apply the custom class for spacing */}
            <button onClick={() => handleGameSelection('Image Guess')}>Image Guess</button>
            <button onClick={() => handleGameSelection('Game2')}>Language Game 2</button>
            {/* Add more game selection buttons as needed */}
          </div>
        </div>
      )}
      <div>
        {selectedGame === 'Image Guess' && <ImageGuess />}
        {selectedGame === 'Game2' && <LanguageGame2 />}
        {/* Add more game components as needed */}
      </div>
    </div>
  );
}

export default Dashboard;
