// App.js

import React, { useState } from 'react';
import './styles.css';
import GameSetup from './GameSetup';
import Board from './Board';

const App = () => {
  const [gameConfig, setGameConfig] = useState(null);
  const [gameHistory, setGameHistory] = useState([]);

  const handleGameSetupComplete = (config) => {
    setGameConfig(config);
  };

  const handleGameEnd = (winner) => {
    setGameHistory((prevHistory) => [...prevHistory, { config: gameConfig, winner }]);
    setGameConfig(null);
  };

  const handleShowGameHistory = () => {
    // GameSetup bileşenine geçmişi gösterme isteği gönder
    setGameConfig({ showGameHistory: true });
  };

  const renderGameBoard = () => {
    if (gameConfig && !gameConfig.showGameHistory) {
      return <Board gameName={gameConfig.gameName} onGameEnd={handleGameEnd} />;
    } else {
      return (
        <GameSetup
          onSetupComplete={handleGameSetupComplete}
          onShowGameHistory={handleShowGameHistory}
        />
      );
    }
  };

  return (
    <div className="App">
      {renderGameBoard()}
      {gameConfig && gameConfig.showGameHistory && (
        <div className="game-history">
          <h2>Game History</h2>
          <ul>
            {gameHistory.map((game, index) => (
              <li key={index}>{`${game.config.gameName} - Winner: ${game.winner}`}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
