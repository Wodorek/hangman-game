import React, { useState } from 'react';

interface IProps {
  selectWord: Function;
}

const WordSelect: React.FC<IProps> = (props) => {
  const [value, setValue] = useState('');

  const wordSelectHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (/^[a-zA-Z]+$/.test(value)) {
      return props.selectWord(value);
    }
    console.log('do this later');
  };

  return (
    <div>
      <form onSubmit={wordSelectHandler}>
        <label htmlFor="word">Wybierz słowo</label>
        <input
          id="word"
          value={value}
          onChange={(event) => setValue((prev) => event.target.value)}
        />
        <button type="submit">Wybierz</button>
      </form>
    </div>
  );
};

export default WordSelect;
