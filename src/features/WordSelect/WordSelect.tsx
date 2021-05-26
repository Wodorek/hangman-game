import React, { useEffect, useState } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import socket from '../socket/socket';

interface IProps {
  gameOver: boolean;
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
    <div>
      <form onSubmit={wordSelectHandler}>
        <label htmlFor="word">Select a word</label>
        <input
          required
          id="word"
          value={value}
          onChange={(event) => setValue((prev) => event.target.value)}
        />
        {showError ? <p>Please use just letters</p> : null}
        <button type="submit">Select</button>
      </form>
    </div>
  );
};

export default WordSelect;
