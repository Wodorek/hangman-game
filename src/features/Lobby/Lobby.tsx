import classes from './Lobby.module.css';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import socket from '../socket/socket';
import Modal from '../Modal/Modal';

const Lobby = () => {
  const [roomId, setRoomId] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [joiningUser, setJoiningUser] = useState({ username: '', id: '' });

  const history = useHistory();

  const knockToRoom = (roomId: String) => {
    socket.emit('knock to room', { roomId: roomId });
  };

  const createRoomHandler = () => {
    if (socket.id === undefined) {
      alert('seems like you got disconnected, please reconnect');
      history.replace('/');
    }
    setRoomCode(socket.id);
  };

  useEffect(() => {
    socket.on('user knocking', (socket) => {
      setShowModal(true);
      setJoiningUser(socket);
    });

    socket.on('entrance allowed', ({ roomId }) => {
      socket.emit('join room', { roomId: roomId });
    });

    return () => {
      socket.off('user knocking');
      socket.off('entrance allowed');
    };
  }, []);

  return (
    <div className={classes.container}>
      {showModal ? <Modal joiningUser={joiningUser} /> : null}
      <div>
        <button onClick={() => knockToRoom(roomId)}>Join room</button>
        <input onChange={(event) => setRoomId((prev) => event.target.value)} />
      </div>
      <div className={classes.roomCodeContainer}>
        <button onClick={createRoomHandler}>Create</button>
        {roomCode ? <p className={classes.roomCode}>{roomCode}</p> : null}
      </div>
    </div>
  );
};

export default Lobby;
