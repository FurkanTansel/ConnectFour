// GameList.js

import React from 'react';

const GameList = ({ gameHistory }) => {
  return (
    <div className="game-history">
      <h2>Game History</h2>
      <ul>
        {gameHistory.map((gamer, index) => (
          <li key={index}>{`${gamer.config.gamerName} - Winner: ${gamer.config.gamerName}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default GameList;
