import React, { useState } from 'react';

interface IProps {
  selectWord: Function;
  reset: Function;
}

const WordSelect: React.FC<IProps> = (props) => {
  const [value, setValue] = useState('');

  const wordSelectHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (/^[a-zA-Z]+$/.test(value)) {
      return props.selectWord(value);
    }
    return null;
  };

  const resetHandler = (event: React.FormEvent) => {
    event.preventDefault();
    setValue('');
    props.reset();
  };

  return (
    <div>
      <form onSubmit={wordSelectHandler}>
        <label htmlFor="word">Wybierz słowo</label>
        <input
          required
          id="word"
          value={value}
          onChange={(event) => setValue((prev) => event.target.value)}
        />
        <button type="submit">Wybierz</button>
        <button onClick={(event) => resetHandler(event)}>Reset</button>
      </form>
    </div>
  );
};

export default WordSelect;
