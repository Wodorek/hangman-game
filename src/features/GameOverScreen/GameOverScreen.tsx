import React from 'react';
import socket from '../socket/socket';
import { RootStateOrAny, useSelector } from 'react-redux';
import Button from '../../common/UIElements/Button/Button';
import classes from './GameOverScreen.module.css';

interface IProps {}

const GameOverScreen: React.FC<IProps> = (props) => {
  const gameRoom = useSelector((state: RootStateOrAny) => state.game.roomId);

  const gameResetHandler = (swap: boolean) => {
    socket.emit('game reset', { roomId: gameRoom, swap: swap });
  };

  return (
    <div className={classes.container}>
      <h2 className={classes.heading}>
        Play again, or swap sides to become a guesser
      </h2>
      <div className={classes.buttons}>
        <Button onClick={() => gameResetHandler(false)}>
          Select another word
        </Button>
        <Button onClick={() => gameResetHandler(true)}>Swap sides</Button>
      </div>
    </div>
  );
};

export default GameOverScreen;
