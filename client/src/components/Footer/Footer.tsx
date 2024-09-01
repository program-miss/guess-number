import Chat from '../Chat';
import ImageLabel from '../ImageLabel';
import RankingTable from '../RankingTable';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.container}>
      <div>
        <ImageLabel image="ranking" text="Ranking" />
        <RankingTable />
      </div>
      <div>
        <ImageLabel image="chat" text="Chat" />
        <Chat />
      </div>
    </footer>
  );
};

export default Footer;
