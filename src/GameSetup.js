// GameSetup.js

import React, { useState, useEffect } from 'react';
import './GameSetup.css';
import { Card, Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';  // useNavigate eklenmiştir

const GameSetup = ({ onSetupComplete, onShowGameHistory }) => {
  const [showModal, setShowModal] = useState(true);
  const [gamerName, setGamerName] = useState('');
  const [gameName, setGameName] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('');
  const [playerColor, setPlayerColor] = useState('');

  const navigate = useNavigate();  // useNavigate hook'u eklenmiştir

  const handleCloseModal = () => setShowModal(false);

  const handleOpenModal = () => setShowModal(true);

  useEffect(() => {
    // Sayfa yüklendiğinde otomatik olarak modalı aç
    handleOpenModal();
  }, []); // useEffect sadece bir kere çalışsın diye boş bir dependency array eklenmiştir.

  const handleStartGame = () => {
    // Gamer Name kontrolü ekleniyor
    if (!gameName) {
      // Hata durumunda modalı aç
      handleOpenModal();
      return;
    }

    // Giriş ekranından alınan değerleri ana bileşene iletmek için callback fonksiyonunu kullanıyoruz
    onSetupComplete({ gamerName, gameName, backgroundColor, playerColor });

    // Kullanıcı renklerini locale kaydet
    localStorage.setItem('playerColor', playerColor);
    localStorage.setItem('backgroundColor', backgroundColor);
    localStorage.setItem('gameName', gameName);
    localStorage.setItem('gamerName', gamerName);
    

    // Modalı kapat, ancak diğer sayfaya atlamaz
    handleCloseModal();
  };

  const handleShowHistory = () => {
    // Game History sayfasına yönlendirme yapılıyor
    onShowGameHistory();  // Eğer state veya başka bir bilgiye ihtiyaç varsa buradan geçebilirsiniz
    navigate('/history');
  };

  return (
    <div className="game-setup">
      <Card>
        <Card.Body>
          <Card.Title>Gamer Setup</Card.Title>
          <Card.Text>
            <label>
              Game Name
              <input
                type="text"
                value={gamerName}
                onChange={(e) => setGamerName(e.target.value)}
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
          </Card.Text>
          <Button variant="primary" onClick={handleStartGame}>
            Start Game
          </Button>
          <Button variant="secondary" onClick={handleShowHistory}>
            Game History
          </Button>
        </Card.Body>
      </Card>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Game Name Setup</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>User Name </label>
          <input
            id="game-name-input"
            className="swal2-input"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseModal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default GameSetup;
