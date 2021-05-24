import React from 'react';
import socket from '../socket/socket';
import { RootStateOrAny, useSelector } from 'react-redux';

interface IProps {
  won: boolean;
}

const GameOverScreen: React.FC<IProps> = (props) => {
  const gameRoom = useSelector((state: RootStateOrAny) => state.game.roomId);

  const gameResetHandler = () => {
    socket.emit('game reset', { roomId: gameRoom, swap: true });
  };

  return (
    <div>
      <p>{props.won ? 'Wygranko' : 'Przegranko'}</p>
      <button onClick={gameResetHandler}>Reset</button>
      <button>Swap</button>
    </div>
  );
};

export default GameOverScreen;
