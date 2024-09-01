'use client';
import { GameContextProvider } from '@/context/GameContext';
import Footer from '../components/Footer/Footer';
import Main from '../components/Main';
import Header from '../components/header/Header/Header';

export default function Home() {
  return (
    <GameContextProvider>
      <Header />
      <Main />
      <Footer />
    </GameContextProvider>
  );
}
