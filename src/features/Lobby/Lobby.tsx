import classes from './Lobby.module.css';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import socket from '../socket/socket';
import Popup from '../Popup/Popup';
import { useDispatch } from 'react-redux';
import { saveRoomId } from '../Game/gameSlice';
import useSound from 'use-sound';
import popSound from '../../sounds/popSound.mp3';
import Button from '../../common/UIElements/Button/Button';
import useConnectionState from '../../common/hooks/useConnectionState';

const Lobby = () => {
  const checkConnection = useConnectionState();
  const [roomId, setRoomId] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [joiningUser, setJoiningUser] = useState({ username: '', id: '' });
  const [copied, setCopied] = useState(false);
  const [play] = useSound(popSound);

  const history = useHistory();
  const dispatch = useDispatch();

  const knockToRoom = (roomId: string) => {
    checkConnection();
    socket.emit('knock to room', { roomId: roomId });
    dispatch(saveRoomId(roomId));
  };

  const createRoomHandler = () => {
    checkConnection();
    setCopied(false);
    setRoomCode(socket.id);
  };

  const textSelectHandler = (target: HTMLInputElement) => {
    target.select();
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
  };

  const declineEntranceHandler = () => {
    setShowModal(false);
    // reject the connection some way?
  };

  useEffect(() => {
    socket.on('allow entrance', ({ roomId }) => {
      history.push('/game', { isHost: false });
      socket.emit('join room', { roomId: roomId });
    });

    socket.on('user knocking', (socket) => {
      setShowModal(true);
      play();
      setJoiningUser(socket);
    });

    return () => {
      socket.off('user knocking');
      socket.off('allow entrance');
    };
  }, [checkConnection, history, play]);

  //I should split that into components
  return (
    <>
      <div className={classes.outer}>
        {showModal ? (
          <Popup
            declineEntrance={declineEntranceHandler}
            joiningUser={joiningUser}
          />
        ) : null}
        <h1 className={classes.heading}>
          Now create a new room, or join one of your friends:
        </h1>
        <div className={classes.inner}>
          <div className={classes.box}>
            <h2>Create a room</h2>
            <div className={classes.code}>
              <label htmlFor="generated room code" className={classes.label}>
                {copied ? 'Code copied!' : 'Copy and send code:'}
              </label>
              <input
                readOnly
                id="generated room code"
                onClick={(event) =>
                  textSelectHandler(event.target as HTMLInputElement)
                }
                value={roomCode}
                className={classes.input}
              ></input>
            </div>
            <Button onClick={createRoomHandler}>Create room</Button>
          </div>
          <div className={classes.box}>
            <h2>Join A room</h2>
            <div className={classes.code}>
              <label htmlFor="paste room code" className={classes.label}>
                Paste a room code:
              </label>
              <input
                id="paste room code"
                className={classes.input}
                onChange={(event) => setRoomId((prev) => event.target.value)}
              />
            </div>
            <Button onClick={() => knockToRoom(roomId)}>Join room</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lobby;
