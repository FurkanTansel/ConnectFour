import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
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
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/game" />} />
          <Route path="/game" element={renderGameBoard()} />
          <Route
            path="/history"
            element={
              <>
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
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
