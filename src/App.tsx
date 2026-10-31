import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { AnimatedBackground } from './components/AnimatedBackground';
import { LiveWinsTicker } from './components/LiveWinsTicker';
import { PlatformSelectScreen } from './components/PlatformSelectScreen';
import { ActivationFlow } from './components/ActivationFlow';
import { GamesHub } from './components/GamesHub';
import { ApplePredictor } from './components/games/ApplePredictor';
import { CrashPredictor } from './components/games/CrashPredictor';
import { MinesPredictor } from './components/games/MinesPredictor';
import { PromoModal } from './components/modals/PromoModal';
import { InfoModal } from './components/modals/InfoModal';
import { TopUpModal } from './components/modals/TopUpModal';
import { PLATFORMS } from './data/platforms';
import { PlatformConfig, ScreenState, GameId, Language } from './types';
import { sound } from './utils/sound';

export default function App() {
  const [lang] = useState<Language>('ar');
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformConfig>(PLATFORMS[0]);
  const [userId, setUserId] = useState<string>(() => {
    return localStorage.getItem('smart_ai_user_id') || '';
  });
  const [onlineCount, setOnlineCount] = useState(4120);

  // Screen state
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('platform_select');

  // Modals state
  const [isPromoOpen, setIsPromoOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);

  // Natural fluctuation in online users count
  useEffect(() => {
    const timer = setInterval(() => {
      setOnlineCount((prev) => {
        const delta = Math.floor(Math.random() * 9) - 4;
        return Math.max(3800, Math.min(4600, prev + delta));
      });
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const handleProceedFromPlatform = () => {
    if (userId) {
      setCurrentScreen('games_hub');
    } else {
      setCurrentScreen('activation_flow');
    }
  };

  const handleCompleteActivation = (newUserId: string) => {
    setUserId(newUserId);
    localStorage.setItem('smart_ai_user_id', newUserId);
    setCurrentScreen('games_hub');
  };

  const handleSelectGame = (gameId: GameId) => {
    if (gameId === 'apple') setCurrentScreen('game_apple');
    else if (gameId === 'crash') setCurrentScreen('game_crash');
    else if (gameId === 'mines') setCurrentScreen('game_mines');
  };

  return (
    <div
      className="min-h-screen bg-[#06070a] text-white flex flex-col relative selection:bg-blue-500/40 font-sans"
      dir="rtl"
    >
      {/* Animated Background: Constellation Canvas + Glowing Blue Blobs + Cyber Grid */}
      <AnimatedBackground />

      {/* Header: Khloud VIP */}
      <Header
        onlineCount={onlineCount}
        latency={selectedPlatform.latency}
      />

      {/* Live Wins Ticker */}
      <LiveWinsTicker lang={lang} />

      {/* Main Content Viewport */}
      <main className="relative z-10 flex-1 flex flex-col justify-start pb-12">
        {currentScreen === 'platform_select' && (
          <PlatformSelectScreen
            selectedPlatform={selectedPlatform}
            onSelectPlatform={(p) => setSelectedPlatform(p)}
            onProceed={handleProceedFromPlatform}
            lang={lang}
          />
        )}

        {currentScreen === 'activation_flow' && (
          <ActivationFlow
            platform={selectedPlatform}
            onBack={() => setCurrentScreen('platform_select')}
            onComplete={handleCompleteActivation}
            lang={lang}
          />
        )}

        {currentScreen === 'games_hub' && (
          <GamesHub
            platform={selectedPlatform}
            userId={userId}
            onSelectGame={handleSelectGame}
            onBack={() => setCurrentScreen('platform_select')}
            lang={lang}
          />
        )}

        {currentScreen === 'game_apple' && (
          <ApplePredictor
            platform={selectedPlatform}
            userId={userId}
            onBack={() => setCurrentScreen('games_hub')}
            lang={lang}
          />
        )}

        {currentScreen === 'game_crash' && (
          <CrashPredictor
            platform={selectedPlatform}
            userId={userId}
            onBack={() => setCurrentScreen('games_hub')}
            lang={lang}
          />
        )}

        {currentScreen === 'game_mines' && (
          <MinesPredictor
            platform={selectedPlatform}
            userId={userId}
            onBack={() => setCurrentScreen('games_hub')}
            lang={lang}
          />
        )}
      </main>

      {/* Modals */}
      <PromoModal
        platform={selectedPlatform}
        isOpen={isPromoOpen}
        onClose={() => setIsPromoOpen(false)}
        lang={lang}
      />

      <InfoModal
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
        lang={lang}
      />

      <TopUpModal
        isOpen={isTopUpOpen}
        onClose={() => setIsTopUpOpen(false)}
        lang={lang}
      />
    </div>
  );
}
