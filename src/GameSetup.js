import React, { useState, useEffect } from 'react';
import './GameSetup.css';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const GameSetup = ({ onSetupComplete, onShowGameHistory }) => {
  const [gamerName, setGamerName] = useState(localStorage.getItem("gamerName") ?? "");
  const [gameName, setGameName] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('');
  const [playerColor, setPlayerColor] = useState('');

  const navigate = useNavigate();

  

  const handleStartGame = () => {
    // Gamer Name ve Game Name kontrolü ekleniyor
    if (!gamerName || !gameName) {
      // Hata durumunda işlem yapabilirsiniz
      return;
    }

    // Giriş ekranından alınan değerleri ana bileşene iletmek için callback fonksiyonunu kullanıyoruz
    onSetupComplete({ gamerName, gameName, backgroundColor, playerColor });

    // Kullanıcı renklerini locale kaydet
    localStorage.setItem('playerColor', playerColor);
    localStorage.setItem('backgroundColor', backgroundColor);
    localStorage.setItem('gameName', gameName);
    localStorage.setItem('gamerName', gamerName);

    // game page'e yönlendirme yapılıyor
    navigate('/game');
  };

  const handleShowHistory = () => {
    // Game History sayfasına yönlendirme yapılıyor
    onShowGameHistory();
    navigate('/history');
  };

  return (
    <div className="game-setup">
      <label>
        Usur Name:
        <input
          type="text"
          value={gamerName}
          onChange={(e) => setGamerName(e.target.value)}
        />
      </label>
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
      <label>
        Player Color:
        <input
          type="color"
          value={playerColor}
          onChange={(e) => setPlayerColor(e.target.value)}
        />
      </label>
      <Button
  variant="primary"
  onClick={handleStartGame}
  disabled={!gamerName || !gameName || gamerName.trim() === '' || gameName.trim() === ''}
>
  Start Game
</Button>

      <Button 
      variant="secondary" onClick={handleShowHistory}
      disabled={!gamerName || !gameName || gamerName.trim() === '' || gameName.trim() === ''}
      >
        Game History
      </Button>
    </div>
  );
};

export default GameSetup;
