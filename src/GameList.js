// GameList.js

import React from 'react';

const GameList = ({ gameHistory }) => {
  return (
    <div className="game-history">
      <h2>Game History</h2>
      <ul>
        {gameHistory.map((game, index) => (
          <li key={index}>{`${game.config.gameName} - Winner: ${game.winner}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default GameList;
