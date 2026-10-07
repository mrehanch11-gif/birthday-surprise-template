import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';
import { TEMPLATE_CONFIG } from '../config';
import CreatorCredit from './CreatorCredit';

interface StageLetterProps { onNext: () => void; }

export default function StageLetter({ onNext }: StageLetterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const shortLetter = TEMPLATE_CONFIG.letter;

  const openLetter = () => {
    if (isOpen) return;
    sound.playLetterOpen();
    setIsOpen(true);
    window.setTimeout(() => confetti({ particleCount: 54, spread: 74, startVelocity: 27, gravity: .64, scalar: .72, origin: { x: .5, y: .58 }, colors: ['#fff8ed', '#f4c8b5', '#e74d70', '#a40d34'] }), 520);
  };

  return <motion.section className={`paper-letter ${isOpen ? 'is-open' : ''}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.025 }} transition={{ duration: .65 }}>
    <div className="paper-letter-light" />
    <div className="letter-rose-field" aria-hidden="true">{Array.from({ length: 7 }, (_, index) => <i key={index} />)}</div>

    <motion.div className="paper-envelope-scene" initial={{ opacity: 0, y: 55, rotate: -2 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ duration: .9, ease: [0.16, 1, 0.3, 1] }}>
      <button className="paper-envelope" type="button" onClick={openLetter} aria-label="Open the birthday letter">
        <span className="paper-envelope-back" />
        <motion.span className="paper-envelope-flap" animate={{ rotateX: isOpen ? 178 : 0, zIndex: isOpen ? 1 : 6 }} transition={{ duration: .9, ease: [0.65, 0, 0.35, 1] }} />
        <span className="paper-heart heart-one"><Heart fill="currentColor" /></span>
        <span className="paper-heart heart-two"><Heart fill="currentColor" /></span>
        <span className="paper-heart heart-three"><Heart fill="currentColor" /></span>
        <span className="paper-heart heart-four"><Heart fill="currentColor" /></span>
        <span className="paper-heart heart-five"><Heart fill="currentColor" /></span>
        <span className="paper-envelope-left" /><span className="paper-envelope-right" /><span className="paper-envelope-front" />
        <motion.span className="paper-wax" animate={isOpen ? { opacity: 0, scale: 1.7, y: 22 } : { opacity: 1, scale: [1, 1.08, 1] }} transition={isOpen ? { duration: .4 } : { repeat: Infinity, duration: 1.8 }}><Heart fill="currentColor" /></motion.span>
      </button>

      <AnimatePresence>{!isOpen && <motion.p className="paper-letter-hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: .65 }}>Tap to open your birthday letter</motion.p>}</AnimatePresence>
    </motion.div>

    <AnimatePresence>
      {isOpen && <motion.article
        className="diary-letter"
        initial={{ opacity: 0, x: -78, y: 118, scale: .54, rotate: -12 }}
        animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
        exit={{ opacity: 0 }}
        transition={{ delay: .48, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="letter-copy">
          {shortLetter.map((line, index) => (
            <motion.p
              key={`${line}-${index}`}
              initial={{ opacity: 0, y: 7 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.05 + index * .08, duration: .42 }}
            >
              {line}
            </motion.p>
          ))}
        </div>
      </motion.article>}
    </AnimatePresence>

    <AnimatePresence>{isOpen && <motion.button className="paper-letter-next" type="button" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.2, duration: .6 }} whileHover={{ x: 5 }} whileTap={{ scale: .97 }} onClick={() => { sound.playSparkle(); onNext(); }}>Make a Birthday Wish <ArrowRight /></motion.button>}</AnimatePresence>
    <footer><CreatorCredit /></footer>
  </motion.section>;
}
