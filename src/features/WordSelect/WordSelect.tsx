import React, { useEffect, useState } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import GameOverScreen from '../GameOverScreen/GameOverScreen';
import socket from '../socket/socket';

interface IProps {
  selectWord: Function;
}

const WordSelect: React.FC<IProps> = (props) => {
  const [value, setValue] = useState('');
  const gameRoom = useSelector((state: RootStateOrAny) => state.game.roomId);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  const wordSelectHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (/^[a-zA-Z\s]+$/.test(value)) {
      props.selectWord(value);
      socket.emit('word select', { word: value, roomId: gameRoom });
    } else {
      return null;
    }
  };

  useEffect(() => {
    socket.on('game over', (won: boolean) => {
      setGameOver(true);
      setWon(true);
    });

    socket.on('game reset', () => {
      console.log('wordselect.tsx');
      setValue('');
      setGameOver(false);
      setWon(false);
    });

    return () => {
      socket.off('game over');
    };
  });

  return (
    <div>
      {gameOver ? (
        <GameOverScreen won={won} />
      ) : (
        <form onSubmit={wordSelectHandler}>
          <label htmlFor="word">Wybierz słowo</label>
          <input
            required
            id="word"
            value={value}
            onChange={(event) => setValue((prev) => event.target.value)}
          />
          <button type="submit">Wybierz</button>
        </form>
      )}
    </div>
  );
};

export default WordSelect;
