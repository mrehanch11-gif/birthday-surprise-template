import { useState } from 'react';
import { sound } from '../utils/audio';
import { TEMPLATE_CONFIG } from '../config';

export default function FloralOpening({ onComplete, onMusicStart }: { onComplete: () => void; onMusicStart?: () => void }) {
  const [opening, setOpening] = useState(false);
  const reveal = () => {
    if (opening) return;
    sound.toggleBGM(true);
    sound.playOpening();
    onMusicStart?.();
    setOpening(true);
    window.setTimeout(onComplete, 1650);
  };
  return (
    <div className={`floral-opening ${opening ? 'is-opening' : ''}`}>
      <div className="floral-half floral-left"><img src="/floral-curtain.png" alt="" /></div>
      <div className="floral-half floral-right"><img src="/floral-curtain.png" alt="" /></div>
      <div className="floral-vignette" />
      <button type="button" className="floral-seal" onClick={reveal}>
        <span>{TEMPLATE_CONFIG.openingLine}</span><strong>For {TEMPLATE_CONFIG.recipientName}</strong><i>Open with love</i>
      </button>
      <p className="floral-from">{TEMPLATE_CONFIG.openingNote}</p>
    </div>
  );
}
