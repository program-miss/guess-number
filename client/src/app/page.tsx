'use client';
import LeftSide from '@/components/LeftSide/LeftSide';
import RightSide from '@/components/RightSide/RightSide';
import { GameContextProvider } from '@/context/GameContext';
import Footer from '../components/Footer/Footer';

export default function Home() {
  return (
    <GameContextProvider>
      <div className="mainContainer">
        <div className="topContainer">
          <LeftSide />
          <RightSide />
        </div>
        <Footer />
      </div>
    </GameContextProvider>
  );
}
