import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Volume2, VolumeX } from 'lucide-react';
import ParticleBackground from './components/ParticleBackground';
import StageWelcome from './components/StageWelcome';
import StageBalloons from './components/StageBalloons';
import StageSevenDays from './components/StageSevenDays';
import StageMemories from './components/StageMemories';
import StagePhotoReel from './components/StagePhotoReel';
import StageLetter from './components/StageLetter';
import StageCake from './components/StageCake';
import StageGiftBox from './components/StageGiftBox';
import StageStarrySky from './components/StageStarrySky';
import FloralOpening from './components/FloralOpening';
import RoseReveal from './components/RoseReveal';
import { ExperienceStage, LongDistanceInfo } from './types';
import { INITIAL_LD_INFO } from './data/content';
import { sound } from './utils/audio';

export default function App() {
  const [currentStage, setCurrentStage] = useState<ExperienceStage>('welcome');
  const [isPlaying, setIsPlaying] = useState(false);
  const [showOpening, setShowOpening] = useState(true);
  const [showRoseReveal, setShowRoseReveal] = useState(false);
  const [ldInfo, setLdInfo] = useState<LongDistanceInfo>(() => {
    return INITIAL_LD_INFO;
  });

  const handleSelectStage = (stage: ExperienceStage) => {
    setCurrentStage(stage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleMusic = () => {
    const nextState = sound.toggleBGM();
    setIsPlaying(nextState);
  };

  return (
    <div className="h-screen bg-[#fff0f3] text-[#2f1a22] flex flex-col relative overflow-hidden selection:bg-rose-200 selection:text-rose-950">
      {showOpening && <FloralOpening onComplete={() => setShowOpening(false)} onMusicStart={() => setIsPlaying(true)} />}
      {!showOpening && showRoseReveal && <RoseReveal onComplete={() => { setShowRoseReveal(false); handleSelectStage('welcome'); }} />}
      {/* Interactive Floating Hearts & Petals with Ambient Luminous Orbs */}
      <ParticleBackground />

      {/* Floating Audio Controller */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={handleToggleMusic}
          aria-label="Toggle Romantic Music"
          className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 shadow-md ${
            isPlaying
              ? 'bg-[#e6396e] hover:bg-[#d82b60] text-white shadow-pink-200 ring-2 ring-pink-200'
              : 'bg-white/80 text-[#e6396e] hover:bg-white border border-white/60 shadow-sm'
          }`}
        >
          {isPlaying ? (
            <div className="flex items-center gap-0.5">
              <Volume2 className="w-4 h-4" />
              <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#e6396e]"></span>
              </span>
            </div>
          ) : (
            <VolumeX className="w-4 h-4 text-[#6b4c53]" />
          )}
        </button>
      </div>

      {/* Main Stage Presentation Area */}
      <main className="relative z-10 flex-1 min-h-0 flex items-center justify-center p-4 sm:p-6 lg:p-10 w-full max-w-[1440px] mx-auto">
        <AnimatePresence mode="wait">
          {!showOpening && currentStage === 'welcome' && (
            <div key="welcome-wrap" className="w-full flex justify-center">
              <StageWelcome
                onStart={() => {
                  handleSelectStage('sevenDays');
                  setIsPlaying(true);
                }}
                info={ldInfo}
              />
            </div>
          )}

          {currentStage === 'sevenDays' && (
            <div key="seven-days-wrap" className="w-full flex justify-center">
              <StageSevenDays onNext={() => handleSelectStage('balloons')} />
            </div>
          )}

          {currentStage === 'balloons' && (
            <div key="balloons-wrap" className="w-full flex justify-center">
              <StageBalloons
                onNext={() => handleSelectStage('memories')}
              />
            </div>
          )}

          {currentStage === 'memories' && (
            <div key="memories-wrap" className="w-full flex justify-center">
              <StageMemories
                onNext={() => handleSelectStage('photoReel')}
              />
            </div>
          )}

          {currentStage === 'photoReel' && (
            <div key="photo-reel-wrap" className="w-full flex justify-center">
              <StagePhotoReel onNext={() => handleSelectStage('letter')} />
            </div>
          )}

          {currentStage === 'letter' && (
            <div key="letter-wrap" className="w-full flex justify-center">
              <StageLetter
                onNext={() => handleSelectStage('cake')}
              />
            </div>
          )}

          {currentStage === 'cake' && (
            <div key="cake-wrap" className="w-full flex justify-center">
              <StageCake
                onNext={() => handleSelectStage('giftbox')}
                herName={ldInfo.herName}
              />
            </div>
          )}

          {currentStage === 'giftbox' && (
            <div key="giftbox-wrap" className="w-full flex justify-center">
              <StageGiftBox
                onNext={() => handleSelectStage('starry')}
              />
            </div>
          )}

          {currentStage === 'starry' && (
            <div key="starry-wrap" className="w-full flex justify-center">
              <StageStarrySky
                onRestart={() => setShowRoseReveal(true)}
                info={ldInfo}
              />
            </div>
          )}
        </AnimatePresence>
      </main>

    </div>
  );
}
