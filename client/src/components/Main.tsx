import { useGameContext } from '@/context/GameContext';
import { useEffect } from 'react';
import io from 'socket.io-client';
import { serverUrl, users } from '../../data';
import Button from '../ui/Button';
import Chart from './Chart';
import ImageLabel from './ImageLabel';
import RoundTable from './RoundTable';
import Welcome from './Welcome';

const socket = io(serverUrl);

const Main: React.FC = () => {
  const { points, multiplier, myData, crashValue, setCrashValue } =
    useGameContext();

  const handleStart = () => {
    socket.emit('place-bet', { points, multiplier });
  };

  useEffect(() => {
    socket.on('round-started', (value: number) => {
      setCrashValue(value);
    });

    return () => {
      socket.off('round-started');
    };
  }, []);

  return (
    <main className="flex items-center justify-center gap-1">
      <div className="roundBox">
        {myData ? (
          <div>
            <Button text="Start" onClick={handleStart} />
            <ImageLabel image="trophy" text="Current Round" />
            <RoundTable users={users} />
          </div>
        ) : (
          <Welcome />
        )}
      </div>
      <Chart number={crashValue || 0} />
    </main>
  );
};

export default Main;
