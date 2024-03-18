import { useState, useRef, MutableRefObject } from 'react';

export default function Player() {
  const playerName = useRef() as MutableRefObject<HTMLInputElement>;

  const [enteredPlayerName, setEnteredPlayerName] = useState<string>('');

  function handleClick() {
    setEnteredPlayerName(playerName.current.value);
    playerName.current.value = '';
  }

  return (
    <section id="player">
      <h2>Welcome {enteredPlayerName ? enteredPlayerName : 'unknown entity'}</h2>
      <p>
        <input ref={playerName} type="text"/>
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
