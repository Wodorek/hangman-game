import React, { useEffect, useState } from 'react';
import classes from './LetterButton.module.css';

interface IProps {
  letter: string;
  select: Function;
  word: string;
  alreadyGuessed: string[];
}

const LetterButton: React.FC<IProps> = (props) => {
  const [disabled, setDisabled] = useState(false);

  const letterSelectHandler = () => {
    if (!props.word) {
      return;
    }
    props.select();
  };

  useEffect(() => {
    if (props.alreadyGuessed.includes(props.letter)) {
      setDisabled(true);
    }
  }, [props.alreadyGuessed, props.letter]);

  return (
    <button
      disabled={disabled}
      className={`${classes.container} ${disabled ? classes.disabled : ''}`}
      onClick={() => letterSelectHandler()}
    >
      <p className={classes.letter}>{props.letter}</p>
    </button>
  );
};

export default LetterButton;
