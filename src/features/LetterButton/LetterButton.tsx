import React, { useEffect, useState } from 'react';

import classes from './LetterButton.module.css';

interface IProps {
  letter: string;
  select: Function;
}

const LetterButton: React.FC<IProps> = (props) => {
  const [disabled, setDisabled] = useState(false);

  const letterSelectHandler = () => {
    props.select();
    setDisabled(true);
  };

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
