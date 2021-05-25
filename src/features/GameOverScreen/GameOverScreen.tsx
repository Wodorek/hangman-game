import React from 'react';
import socket from '../socket/socket';
import { RootStateOrAny, useSelector } from 'react-redux';

interface IProps {}

const GameOverScreen: React.FC<IProps> = (props) => {
  const gameRoom = useSelector((state: RootStateOrAny) => state.game.roomId);

  const gameResetHandler = (swap: boolean) => {
    socket.emit('game reset', { roomId: gameRoom, swap: swap });
  };

  return (
    <div>
      <button onClick={() => gameResetHandler(false)}>Graj jeszcze raz</button>
      <button onClick={() => gameResetHandler(true)}>Zmiana stron</button>
    </div>
  );
};

export default GameOverScreen;
