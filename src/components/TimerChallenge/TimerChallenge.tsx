import { useState, useRef, MutableRefObject } from 'react';
import ResultModal from '../ResultModal/ResultModal';

interface TimerChallengeProps {
  title: string,
  targetTime: number
}

export default function TimerChallenge({title, targetTime}: TimerChallengeProps) {
  const timer = useRef<number>();
  const dialog = useRef() as MutableRefObject<HTMLDialogElement>;

  const [timerStarted, setTimerStarted] = useState<boolean>(false);
  const [timerExpired, setTimerExpired] = useState<boolean>(false);

  function handleStart() {
    timer.current = setTimeout(() => {
      setTimerExpired(true);
      dialog.current.showModal();
    }, targetTime * 1000);

    setTimerStarted(true);
  }

  function handleStop() {
    clearTimeout(timer.current);
  }

  return (
    <>
      <ResultModal ref={dialog} targetTime={targetTime} result="lost"/>
      <section className="challenge">
        <h2>{title}</h2>
        {timerExpired && <p>You lost!</p>}
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? 's' : ''}
        </p>
        <p>
          <button onClick={!timerStarted ? handleStart : handleStop}>
            {timerStarted ? 'Stop' : 'Start'} Challenge
          </button>
        </p>
        <p className={timerStarted ? 'active' : undefined}>
          {timerStarted ? 'Time is running...' : 'Timer inactive'}
        </p>
      </section>
    </>
    
  );
}