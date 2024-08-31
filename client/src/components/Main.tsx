import { useState } from 'react';
import { users } from '../../data';
import Button from '../ui/Button';
import { generateRandomNumber } from '../utils/generateRandomNumber';
import Chart from './Chart';
import ImageLabel from './ImageLabel';
import RoundTable from './RoundTable';
import Welcome from './Welcome';

const Main: React.FC = () => {
  const [randomValue, setRandomValue] = useState<number>(0);
  const getRandomValue = () => {
    setRandomValue(generateRandomNumber());
  };

  return (
    <main className="flex items-center justify-center gap-1">
      <Welcome />
      <div>
        <Button text="Start" onClick={getRandomValue} />
        <ImageLabel image="trophy" text="Current Round" />
        <RoundTable users={users} />
      </div>
      <Chart number={randomValue} />
    </main>
  );
};

export default Main;
