import { users } from '../../data';
import RoundTable from './RoundTable';

const Main: React.FC = () => {
  return (
    <main>
      <button>Start</button>
      <RoundTable users={users} />
    </main>
  );
};

export default Main;
