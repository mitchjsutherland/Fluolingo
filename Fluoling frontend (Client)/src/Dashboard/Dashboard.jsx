import React, {useState} from 'react';

import "./Dashboard.css";

import ImageGuessMode from '../imageguessmode';


function Dashboard({ user }) {
    const [selectedGame, setSelectedGame] = useState(null);
    const [showMessage, setShowMessage] = useState(true);
  
    const handleGameSelection = (game) => {
      setSelectedGame(game);
      setShowMessage(false); // Hide the message after game selection
    };
  
    return (
      <div>
        {showMessage && <div><h1>Hello {user}. Welcome to Fluolingo!</h1>
        <p>Select a language game:</p>
        <div>
          <button onClick={() => handleGameSelection('Image Guess')}>Image Guess</button>
          <button onClick={() => handleGameSelection('Game2')}>Language Game 2</button>
          {/* Add more game selection buttons as needed */}
        </div></div>}
        <div>
          {selectedGame === 'Image Guess' && <ImageGuessMode />}
          {selectedGame === 'Game2' && <LanguageGame2 />}
          {/* Add more game components as needed */}
        </div>
      </div>
    );
  }
  
  export default Dashboard;