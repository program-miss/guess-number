import { users } from '../../data';
import Chat from './Chat';
import ImageLabel from './ImageLabel';
import RankingTable from './RankingTable';

const Footer: React.FC = () => {
  return (
    <footer className="flex justify-center items-center gap-1">
      <div>
        <ImageLabel image="ranking" text="Ranking" />
        <RankingTable users={users} />
      </div>
      <div>
        <ImageLabel image="chat" text="Chat" />
        <Chat />
      </div>
    </footer>
  );
};

export default Footer;
