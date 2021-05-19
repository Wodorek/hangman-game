import React from 'react';
import classes from './LetterButton.module.css';

interface IProps {
  letter: string;
  select: Function;
}

const LetterButton: React.FC<IProps> = (props) => {
  return (
    <div className={classes.container} onClick={() => props.select()}>
      <p className={classes.letter}>{props.letter}</p>
    </div>
  );
};

export default LetterButton;
