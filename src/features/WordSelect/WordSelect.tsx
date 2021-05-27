import React, { useEffect, useState } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import classes from './WordSelect.module.css';
import Button from '../../common/UIElements/Button/Button';
import socket from '../socket/socket';

interface IProps {
  gameOver: boolean;
  word: string;
  guessedLetters: string[];
}

const WordSelect: React.FC<IProps> = (props) => {
  const [value, setValue] = useState('');
  const gameRoom = useSelector((state: RootStateOrAny) => state.game.roomId);
  const [showError, setShowError] = useState(false);

  const wordSelectHandler = (event: React.FormEvent) => {
    event.preventDefault();
    //allow only english alphabet and spaces
    if (/^[a-zA-Z\s]+$/.test(value)) {
      socket.emit('word select', { word: value, roomId: gameRoom });
    } else {
      setShowError(true);
      return null;
    }
    setShowError(false);
  };

  return (
    <div className={classes.container}>
      {props.word.length === 0 ? (
        <form className={classes.form} onSubmit={wordSelectHandler}>
          <label htmlFor="word">Select a word</label>
          <input
            required
            id="word"
            value={value}
            onChange={(event) => setValue((prev) => event.target.value)}
          />
          {showError ? <p>Please use just letters</p> : null}
          <Button type="submit">Select</Button>
        </form>
      ) : (
        <div>
          <h2>Your opponent is guessing:</h2>
          <p className={classes.word}>{props.word}</p>
        </div>
      )}
      <h2>Letters guessed so far:</h2>
      <div className={classes.guessed}>
        {props.guessedLetters.map((el) => {
          return <p>{el},</p>;
        })}
      </div>
    </div>
  );
};

export default WordSelect;
