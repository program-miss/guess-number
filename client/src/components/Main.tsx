import { useGameContext } from '@/context/GameContext';
import { RoundData } from '@/types';
import { useEffect } from 'react';
import io from 'socket.io-client';
import { serverUrl } from '../../data';
import Button from '../ui/Button';
import ImageLabel from './ImageLabel';
import RoundTable from './RoundTable';
import Welcome from './Welcome';

const socket = io(serverUrl);

const Main: React.FC = () => {
  const { points, multiplier, myData, setRoundData } =
    useGameContext();

  const handleStart = () => {
    socket.emit('place-bet', { points, multiplier });
  };

  useEffect(() => {
    socket.on('round-started', (roundDataFromDB: RoundData) => {
      setRoundData(roundDataFromDB);
    });

    return () => {
      socket.off('round-started');
    };
  }, []);

  return (
    <main className="flex items-center justify-center gap-1">
      <div className="roundBox">
        {myData?.name ? (
          <div>
            <Button text="Start" onClick={handleStart} />
            <ImageLabel image="trophy" text="Current Round" />
            <RoundTable />
          </div>
        ) : (
          <Welcome />
        )}
      </div>
      {/* <Chart number={roundData?.crashValue || 0} /> */}
    </main>
  );
};

export default Main;
