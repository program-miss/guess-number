import { useGameContext } from '@/context/GameContext';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { serverUrl, users } from '../../data';
import Button from '../ui/Button';
import Chart from './Chart';
import ImageLabel from './ImageLabel';
import RoundTable from './RoundTable';
import Welcome from './Welcome';

const socket = io(serverUrl);

const Main: React.FC = () => {
  const { points, multiplier, name } = useGameContext();
  const [crashValue, setCrashValue] = useState<number | null>(null);

  const handleStart = () => {
    socket.emit('start', { points, multiplier });
  };

  useEffect(() => {
    socket.on('crashValue', (value: number) => {
      setCrashValue(value);
    });

    return () => {
      socket.off('crashValue');
    };
  }, []);

  return (
    <main className="flex items-center justify-center gap-1">
      {!name && <Welcome />}
      <div>
        <Button text="Start" onClick={handleStart} />
        <ImageLabel image="trophy" text="Current Round" />
        <RoundTable users={users} />
      </div>
      <Chart number={crashValue || 0} />
    </main>
  );
};

export default Main;
