import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';


const GameHeader = ({ currentPlayer, gameName }) => {
    return (
      <div className="game-header">
        <h1>{currentPlayer === 'player' ? `Player: ${gameName}` : 'AI'}</h1>
      </div>
    );
  };

const WinnerModal = ({ show, winner, onHide }) => {
    
    return (
        

        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Game Over</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {winner === 'draw' ? (
                    <p>It's a draw!</p>
                ) : (
                    <p>{winner === 'player' ? "Player:" : 'AI'} wins!</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onHide}>
                    New Game
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

const Board = ({ gameName, onGameEnd }) => {
    const [cells, setCells] = useState(Array(7 * 6).fill('empty'));
    const [currentPlayer, setCurrentPlayer] = useState('player');
    const [winner, setWinner] = useState(null);
    const [showWinnerModal, setShowWinnerModal] = useState(false);

    // Kullanıcının seçtiği renk
    const [userColor, setUserColor] = useState(localStorage.getItem('playerColor') || 'blue');
    const [aiColor, setAiColor] = useState('green');
    const [defaultCellColor, setDefaultCellColor] = useState('white'); // Varsayılan hücre rengi
    const [backgroundColor, setBackgroundColor] = useState(localStorage.getItem("backgroundColor")|| "black")
 
    useEffect(() => {
        checkWinner();
    }, [cells]);
    const checkWinner = () => {
        for (let row = 0; row < 6; row++) {
            for (let col = 0; col < 7; col++) {
                const cellIndex = row * 7 + col;
                const cellColor = cells[cellIndex];

                if (cellColor !== 'empty') {
                    // Yatay kontrol
                    if (
                        col + 3 < 7 &&
                        cells[cellIndex + 1] === cellColor &&
                        cells[cellIndex + 2] === cellColor &&
                        cells[cellIndex + 3] === cellColor
                    ) {
                        setWinner(cellColor);
                        setShowWinnerModal(true);
                        return;
                    }

                    // Dikey kontrol
                    if (
                        row + 3 < 6 &&
                        cells[cellIndex + 7] === cellColor &&
                        cells[cellIndex + 14] === cellColor &&
                        cells[cellIndex + 21] === cellColor
                    ) {
                        setWinner(cellColor);
                        setShowWinnerModal(true);
                        return;
                    }

                    // Çapraz kontrol (sağ üstten sola alta)
                    if (
                        col + 3 < 7 &&
                        row + 3 < 6 &&
                        cells[cellIndex + 8] === cellColor &&
                        cells[cellIndex + 16] === cellColor &&
                        cells[cellIndex + 24] === cellColor
                    ) {
                        setWinner(cellColor);
                        setShowWinnerModal(true);
                        return;
                    }

                    // Çapraz kontrol (sol üstten sağ alta)
                    if (
                        col - 3 >= 0 &&
                        row + 3 < 6 &&
                        cells[cellIndex + 6] === cellColor &&
                        cells[cellIndex + 12] === cellColor &&
                        cells[cellIndex + 18] === cellColor
                    ) {
                        setWinner(cellColor);
                        setShowWinnerModal(true);
                        return;
                    }
                }
            }
        }

        // Berabere durumu kontrolü
        if (!cells.includes('empty')) {
            setWinner('draw');
            setShowWinnerModal(true);
        }
    };

    const handleCellClick = (index) => {
        if (winner || cells[index] !== 'empty') {
            return;
        }

        const newCells = [...cells];

        for (let i = 5; i >= 0; i--) {
            const cellIndex = i * 7 + index;
            if (newCells[cellIndex] === 'empty') {
                newCells[cellIndex] = currentPlayer;
                break;
            }
        }

        setCells(newCells);
        setCurrentPlayer((prevPlayer) => (prevPlayer === 'player' ? 'ai' : 'player'));
    };

    const renderCells = () => {
        return cells.map((cell, index) => (
            <div
                key={index}
                className={`cell ${cell} ${cell === 'empty' ? 'falling' : ''} ${cell === 'player' ? 'dropping' : ''}`}
                style={{
                    backgroundColor:
                        cell === 'player' ? userColor : cell === 'ai' ? aiColor : defaultCellColor,
                }}
                onClick={() => handleCellClick(index)}
            ></div>
        ));
    };

    const handleModalClose = () => {
        setShowWinnerModal(false);
        onGameEnd(winner);
    };

    return (
        <div className="App">
            <GameHeader currentPlayer={currentPlayer} gameName={gameName} userColor={userColor} aiColor={aiColor} />
            <div style={{backgroundColor:backgroundColor}} className="board">{renderCells()}</div>
            <WinnerModal show={showWinnerModal} winner={winner} onHide={handleModalClose} />
        </div>
    );
};

export default Board;