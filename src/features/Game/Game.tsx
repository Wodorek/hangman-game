import React, { useState } from 'react';
import Guessing from '../Guessing/Guessing';
import Hangman from '../Hangman/Hangman';
import WordSelect from '../WordSelect/WordSelect';

const Game = () => {
  const [isHost, setIsHost] = useState(true);
  const [word, setWord] = useState('');
  const [incorrectGuesses, setIncorrectGuesses] = useState(1);
  const [won, setWon] = useState(false);
  const [lost, setLost] = useState(false);

  const incorrectGuessHandler = () => {
    setIncorrectGuesses((prev) => prev + 1);
  };

  const resetGameState = () => {
    setWord('');
    setIncorrectGuesses(0);
    setWon(false);
    setLost(false);
  };

  console.log(word);

  return (
    <div>
      <Hangman incorrectGuesses={incorrectGuesses} />
      <WordSelect
        reset={() => resetGameState()}
        selectWord={(word: string) => setWord(word)}
      />
      <Guessing
        setWon={(to: boolean) => setWon(to)}
        setLost={(to: boolean) => setLost(to)}
        won={won}
        lost={lost}
        guessIncorrect={() => incorrectGuessHandler()}
        incorrectGuesses={incorrectGuesses}
        word={word}
      />
    </div>
  );

  // const [letters, setLetters] = useState<string[]>([]);
  // const [letter, setLetter] = useState('');
  // const roomId = useSelector((state: RootStateOrAny) => state.game.roomId);

  // useEffect(() => {
  //   socket.on('picked letter', (letter) => {
  //     setLetters((prev) => [...prev, letter]);
  //   });
  // }, []);

  // const pickLetterHandler = (event: React.FormEvent) => {
  //   event.preventDefault();
  //   socket.emit('pick letter', { roomId: roomId, letter: letter });
  // };

  // return (

  //   <div>
  //     {letters.map((el) => {
  //       return <p key={el}>{el}</p>;
  //     })}
  //     <form onSubmit={(event) => pickLetterHandler(event)}>
  //       <input
  //         maxLength={1}
  //         value={letter}
  //         onChange={(event) => setLetter(event.target.value)}
  //       />
  //       <button>select</button>
  //     </form>
  //   </div>
  // );
};

export default Game;
