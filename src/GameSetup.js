// GameSetup.js

import React, { useEffect, useState } from 'react';
import './GameSetup.css'; 

const GameSetup = ({ onSetupComplete }) => {
  const [gameName, setGameName] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('');
  const [playerColor, setPlayerColor] = useState('');

  useEffect(() => {
    console.log(gameName,backgroundColor,playerColor);

    localStorage.setItem("gameName", gameName)
    localStorage.setItem("backgroundColor",backgroundColor)
    localStorage.setItem("playerColor",playerColor)
    
  },[gameName,backgroundColor,playerColor])


  const handleStartGame = () => {
    // Giriş ekranından alınan değerleri ana bileşene iletmek için callback fonksiyonunu kullanıyoruz
    onSetupComplete({ gameName, backgroundColor, playerColor });

    // Kullanıcı renklerini locale kaydet
    localStorage.setItem('playerColor', playerColor);
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
          onChange={(e) => setBackgroundColor(e.target.value) }
        />
      </label>
      <label>
        Player Color:
        <input
          type="color"
          value={playerColor}
          onChange={(e) => setPlayerColor(e.target.value)}
        />
      </label>
      <button onClick={handleStartGame}>Start Game</button>
    </div>
  );
};

export default GameSetup;
