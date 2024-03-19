import { useState, useRef } from 'react';
import ResultModal from '../ResultModal/ResultModal';

interface TimerChallengeProps {
  title: string,
  targetTime: number
}

export default function TimerChallenge({title, targetTime}: TimerChallengeProps) {
  const timer = useRef<number>();
  let startTime: number;
  const dialog: HTMLInputElement | any = useRef<HTMLInputElement>(null);

  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  if (timeRemaining <= 0) {
    handleStop();
  }

  function handleStart() {
    startTime = new Date().getTime();
    timer.current = setInterval(() => {
      let timePassed = new Date().getTime() - startTime;
      setTimeRemaining((targetTime * 1000) - timePassed)
    }, 10);
  }

  function handleStop() {
    clearInterval(timer.current);
    dialog.current.open();
  }

  function handleReset() {
    setTimeRemaining(targetTime * 1000);
  }

  return (
    <>
      <ResultModal ref={dialog} targetTime={targetTime} remainingTime={timeRemaining} onReset={handleReset}/>
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? 's' : ''}
        </p>
        <p>
          <button onClick={!timerIsActive ? handleStart : handleStop}>
            {timerIsActive ? 'Stop' : 'Start'} Challenge
          </button>
        </p>
        <p className={timerIsActive ? 'active' : undefined}>
          {timerIsActive ? 'Time is running...' : 'Timer inactive'}
        </p>
      </section>
    </>
  );
}