'use client';
import { GameContextProvider } from '@/context/GameContext';
import Footer from '../components/Footer';
import Main from '../components/Main';
import Header from '../components/header/Header';

export default function Home() {
  return (
    <GameContextProvider>
      <Header />
      <Main />
      <Footer />
    </GameContextProvider>
  );
}
