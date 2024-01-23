const GameList = ({ gameHistory }) => {
    return (
      <div className="game-history">
        <h2>Game History</h2>
        <ul>
          {gameHistory.map((game, index) => (
            <li key={index}>
              {game.config && game.config.gamerName ? (
                <>
                  <strong>Game Name:</strong> <strong>{game.config.gameName}</strong><br />
                  {`${game.config.gamerName} - ${game.winner === 'ai' ? 'AI' : 'Player'}`} <br />
                  Winner: {game.winner === 'ai' ? 'AI' : game.config.gamerName}
                </>
              ) : (
                "Invalid game configuration"
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default GameList;
  