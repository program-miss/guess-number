import { useGameContext } from '@/context/GameContext';
import { RoundData, RoundStartedResponse } from '@/types';
import { useEffect } from 'react';
import io from 'socket.io-client';
import { serverUrl } from '../../data';
import Button from '../ui/Button';
import Chart from './Chart';
import ImageLabel from './ImageLabel';
import RoundTable from './RoundTable';
import Welcome from './Welcome';

const socket = io(serverUrl);

const Main: React.FC = () => {
  const { points, multiplier, myData, roundData, setRoundData, setTableData } =
    useGameContext();

  const handleStart = () => {
    socket.emit('place-bet', {
      points,
      multiplier,
      userId: myData?.id,
      roundId: roundData?.id,
    });
  };

  useEffect(() => {
    socket.on('round-started', (roundData: RoundStartedResponse) => {
      setRoundData((prev: RoundData) => ({
        ...prev,
        randomMultiplier: roundData.randomMultiplier,
        status: roundData.roundPlayers[0].round.status,
      }));

      setTableData(roundData.roundPlayers);
    });

    return () => {
      socket.off('round-started');
    };
  }, [setRoundData]);

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
      <Chart number={roundData?.randomMultiplier || 0} />
    </main>
  );
};

export default Main;
