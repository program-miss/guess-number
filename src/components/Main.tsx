import Button from '@/ui/Button';
import { users } from '../../data';
import Chart from './Chart';
import ImageLabel from './ImageLabel';
import RoundTable from './RoundTable';

const Main: React.FC = () => {
  return (
    <main className="flex items-center justify-center gap-1">
      <div>
        <Button text="Start" onClick={() => {}} />
        <ImageLabel image="trophy" text="Current Round" />
        <RoundTable users={users} />
      </div>
      <Chart number={9.64} />
    </main>
  );
};

export default Main;
