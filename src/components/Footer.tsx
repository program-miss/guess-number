import Image from 'next/image';
import { users } from '../../data';
import RankingTable from './RankingTable';

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="flex items-center gap-1">
        <Image src="/ranking.png" alt="ranking" width={20} height={20} />
        <label>Ranking</label>
      </div>
      <RankingTable users={users} />
    </footer>
  );
};

export default Footer;
