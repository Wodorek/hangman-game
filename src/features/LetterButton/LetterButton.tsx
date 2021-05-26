import React, { useEffect, useState } from 'react';

import classes from './LetterButton.module.css';

interface IProps {
  letter: string;
  select: Function;
  word: string;
  gameOver: boolean;
}

const LetterButton: React.FC<IProps> = (props) => {
  const [disabled, setDisabled] = useState(false);

  const letterSelectHandler = () => {
    props.select();
    setDisabled(true);
  };

  console.log(props.word);

  useEffect(() => {
    setDisabled(false);
  }, [props.word]);

  return (
    <button
      disabled={props.word.length === 0 || disabled || props.gameOver}
      className={`${classes.container} ${
        disabled || props.word.length === 0 || props.gameOver
          ? classes.disabled
          : ''
      }`}
      onClick={() => letterSelectHandler()}
    >
      <div className={classes.letter}>{props.letter}</div>
    </button>
  );
};

export default LetterButton;
