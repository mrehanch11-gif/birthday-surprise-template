import { useLayoutEffect, useRef } from 'react';
import { ArrowRight, Heart, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';
import gsap from 'gsap';
import { sound } from '../utils/audio';
import { LongDistanceInfo } from '../types';
import { TEMPLATE_CONFIG } from '../config';
import CreatorCredit from './CreatorCredit';

interface StageWelcomeProps {
  onStart: () => void;
  info: LongDistanceInfo;
}

export default function StageWelcome({ onStart, info }: StageWelcomeProps) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
      timeline
        .from('.welcome-kicker', { x: -70, opacity: 0, duration: .72 })
        .from('.welcome-title-line', { x: -90, opacity: 0, duration: .9, stagger: .22 }, '-=.28')
        .from('.welcome-copy', { x: -70, opacity: 0, duration: .72 }, '-=.3')
        .from('.welcome-route', { x: -58, opacity: 0, duration: .68 }, '-=.28')
        .from('.welcome-actions', { x: -48, opacity: 0, duration: .68 }, '-=.25')
        .from('.welcome-signature', { y: 16, opacity: 0, duration: .55 }, '-=.2')
        .from('.welcome-feature-photo', { scale: .9, opacity: 0, x: 65, duration: 1.2 }, '-=1.55');
    }, root);
    return () => context.revert();
  }, []);

  const handleStart = () => {
    sound.toggleBGM(true);
    sound.playSparkle();
    confetti({ particleCount: 36, spread: 54, origin: { y: .72 }, colors: ['#7c1733', '#c94868', '#eed4cc'] });
    onStart();
  };

  return <div ref={root} className="welcome-editorial">
    <div className="welcome-hero-bg"><img src="/romantic-heart-background-v2.png" alt="" /></div>
    <div className="welcome-feature-photo"><img src="/demo/portrait-cutout.png" alt="A replaceable transparent demo portrait" /></div>
    <div className="welcome-ambient welcome-ambient-one" />
    <div className="welcome-ambient welcome-ambient-two" />

    <section className="welcome-copy-panel">
      <p className="welcome-kicker">A birthday journey for {info.herName}</p>
      <h1>
        <span className="welcome-title-line welcome-distance-title">{TEMPLATE_CONFIG.distanceLabel}.</span>
        <span className="welcome-title-line welcome-script">The girl I grew up with.</span>
      </h1>
      <p className="welcome-copy">From childhood memories to where life has taken us today, this little surprise is for my cousin sister and one of my closest friends.</p>

      <div className="welcome-route" aria-label={`${info.hisCity} to ${info.herCity}`}>
        <span><MapPin />{info.hisCity}</span>
        <i><Heart fill="currentColor" /></i>
        <span><MapPin />{info.herCity}</span>
      </div>

      <div className="welcome-actions">
        <button type="button" onClick={handleStart}>Begin our memories <ArrowRight /></button>
      </div>
    </section>
    <footer className="welcome-signature"><CreatorCredit /></footer>
  </div>;
}
