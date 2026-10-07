import { useEffect, useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import { ArrowRight, Heart } from 'lucide-react';
import { sound } from '../utils/audio';
import { TEMPLATE_CONFIG } from '../config';
import { CREATOR } from '../creator';

type Phase = 'idle' | 'bloom' | 'photos' | 'message';
const FINALE_PORTRAITS = [
  { id: 'left', url: TEMPLATE_CONFIG.galleryImages[0], caption: 'A favourite memory' },
  { id: 'center', url: TEMPLATE_CONFIG.galleryImages[2], caption: 'A chapter we grew through' },
  { id: 'right', url: TEMPLATE_CONFIG.galleryImages[1], caption: 'The cousin who became a friend' },
];

export default function RoseReveal({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<Phase>('idle');
  const roses = useMemo(() => [
    { count: 18, rx: 47, ry: 48, size: 192 }, { count: 16, rx: 38, ry: 39, size: 174 },
    { count: 14, rx: 29, ry: 30, size: 150 }, { count: 12, rx: 20, ry: 21, size: 132 },
    { count: 8, rx: 10, ry: 11, size: 120 }, { count: 1, rx: 0, ry: 0, size: 150 },
  ].flatMap((ring, ringIndex) => Array.from({ length: ring.count }, (_, index) => {
    const angle = (index / ring.count) * Math.PI * 2 - Math.PI / 2 + ringIndex * .08;
    return { x: 50 + Math.cos(angle) * ring.rx, y: 50 + Math.sin(angle) * ring.ry, size: ring.size + (index % 3) * 12, rotation: angle * 180 / Math.PI + 90, delay: ringIndex * .18 + index * .045 };
  })), []);

  useEffect(() => {
    if (phase !== 'bloom') return;
    const photos = window.setTimeout(() => setPhase('photos'), 2450);
    return () => window.clearTimeout(photos);
  }, [phase]);

  return <div className={`rose-reveal phase-${phase}`}>
    <div className="rose-stars" />
    <div className="rose-wreath" aria-hidden="true">{roses.map((r,i)=><img key={i} src="/red-rose-top.png" alt="" style={{'--x':`${r.x}%`,'--y':`${r.y}%`,'--size':`${r.size}px`,'--r':`${r.rotation}deg`,'--delay':`${r.delay}s`} as CSSProperties}/>)}</div>
    <button type="button" className="rose-trigger" onClick={()=>{sound.playOpening();sound.playArrowFlight();window.setTimeout(()=>sound.playSparkle(),420);setPhase('bloom');}} aria-label="Open the birthday rose"><img src="/red-rose-top.png" alt="A birthday rose"/><span>Touch the rose</span></button>
    <div className="rose-photo-title" aria-hidden="true"><p>Today, every rose blooms for you</p><strong><span>Happy Birthday</span><small>For my cousin sister, {TEMPLATE_CONFIG.recipientName}</small></strong></div>
    <div className="rose-photo-prints">{FINALE_PORTRAITS.map((photo,i)=><figure className={`rose-print print-${i+1}`} key={photo.id}><span className="rose-print-heart"><Heart fill="currentColor"/></span><img src={photo.url} alt={photo.caption}/><figcaption>{photo.caption}</figcaption></figure>)}<button className="rose-message-next" type="button" onClick={()=>{sound.playTransition();setPhase('message');}}>Read the final message</button></div>
    <div className="birthday-reveal"><p>For a cousin sister who has been part of my life since childhood</p><h1>Happy Birthday,<br/><strong>{TEMPLATE_CONFIG.recipientName}.</strong></h1><span>21 looks good on you</span><button type="button" onClick={onComplete}>Replay our story <ArrowRight aria-hidden="true"/></button></div>
    <footer className="rose-credit">Birthday surprise by <a href={CREATOR.repository} target="_blank" rel="noreferrer">{CREATOR.name}</a></footer>
  </div>;
}
