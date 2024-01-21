// GameSetup.js

import React, { useState } from 'react';
import './GameSetup.css';

const GameSetup = ({ onSetupComplete, onShowGameHistory }) => {
  const [gameName, setGameName] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#8d8282');

  const handleStartGame = () => {
    onSetupComplete({ gameName, backgroundColor });
  };

  return (
    <div className="game-setup">
      <h1>Game Setup</h1>
      <label>
        Game Name:
        <input
          type="text"
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
        />
      </label>
      <label>
        Background Color:
        <input
          type="color"
          value={backgroundColor}
          onChange={(e) => setBackgroundColor(e.target.value)}
        />
      </label>
      <button onClick={handleStartGame}>Start Game</button>
      
    </div>
  );
};

export default GameSetup;
