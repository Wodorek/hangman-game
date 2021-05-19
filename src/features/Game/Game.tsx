import React, { useState } from 'react';
import Guessing from '../Guessing/Guessing';
import Hangman from '../Hangman/Hangman';
import WordSelect from '../WordSelect/WordSelect';

const Game = () => {
  const [isHost, setIsHost] = useState(true);
  const [word, setWord] = useState('');

  console.log(word);

  return (
    <div>
      <Hangman />
      <WordSelect selectWord={(word: string) => setWord(word)} />
      <Guessing word={word} />
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
