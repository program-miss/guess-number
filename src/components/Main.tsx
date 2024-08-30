import { Button } from '@nextui-org/react';
import Image from 'next/image';
import { users } from '../../data';
import Chart from './Chart';
import RoundTable from './RoundTable';

const Main: React.FC = () => {
  return (
    <main className="flex items-center justify-center gap-1">
      <div>
        <Button color="danger" size="lg" radius="sm" variant="shadow">
          Start
        </Button>
        <div className="flex items-center gap-1">
          <Image src="/trophy.png" alt="trophy" width={20} height={20} />
          <label>Current Round</label>
        </div>
        <RoundTable users={users} />
      </div>
      <Chart number={9.64} />
    </main>
  );
};

export default Main;
