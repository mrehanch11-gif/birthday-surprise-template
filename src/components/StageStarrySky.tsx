import { motion } from 'motion/react';
import { ArrowRight, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { LongDistanceInfo } from '../types';
import { TEMPLATE_CONFIG } from '../config';

interface StageStarrySkyProps {
  onRestart: () => void;
  info: LongDistanceInfo;
}

const reveal = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  visible: (delay: number) => ({ opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.82, delay, ease: [0.22, 1, 0.36, 1] as const } }),
};

export default function StageStarrySky({ onRestart, info }: StageStarrySkyProps) {
  const celebrate = () => {
    sound.playCelebrationFanfare();
    const end = Date.now() + 2600;
    const colors = ['#fff1e6', '#f7b7c7', '#e6396e', '#f7c76f'];
    const burst = () => {
      confetti({ particleCount: 7, angle: 58, spread: 70, startVelocity: 42, origin: { x: 0, y: 0.72 }, colors });
      confetti({ particleCount: 7, angle: 122, spread: 70, startVelocity: 42, origin: { x: 1, y: 0.72 }, colors });
      if (Date.now() < end) requestAnimationFrame(burst);
    };
    burst();
  };

  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.03 }} transition={{ duration: 0.7 }} className="fixed inset-0 z-20 flex h-screen w-screen items-center justify-center overflow-hidden bg-[#250813] px-5 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,rgba(190,39,77,0.5),transparent_43%),radial-gradient(circle_at_14%_12%,rgba(242,119,140,0.16),transparent_26%),linear-gradient(145deg,#19060e_0%,#520d23_50%,#1c060f_100%)]" />
      <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle,#fff_0_0.8px,transparent_1.2px)] bg-[length:31px_31px]" />
      {[0, 1, 2, 3].map((item) => (
        <motion.div key={item} animate={{ x: [0, item % 2 ? 42 : -36, 0], y: [0, -45 - item * 7, 0], scale: [0.85, 1.18, 0.85], opacity: [0.1, 0.24, 0.1] }}
          transition={{ duration: 7 + item, delay: item * 0.7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute rounded-full border border-[#f7a9ba]/30 bg-[#dc315c]/10 blur-[1px]"
          style={{ width: 110 + item * 42, height: 110 + item * 42, left: `${8 + item * 25}%`, top: `${16 + (item % 2) * 52}%` }} />
      ))}

      <div className="relative z-10 mx-auto w-full max-w-5xl text-center">
        <motion.p custom={0.12} variants={reveal} initial="hidden" animate="visible" className="mb-6 text-sm font-semibold uppercase tracking-[0.34em] text-[#f1b9c5] sm:text-base">One last thing, Faiza</motion.p>
        <motion.h2 custom={0.5} variants={reveal} initial="hidden" animate="visible" className="mx-auto max-w-5xl font-serif-luxury text-[clamp(2rem,4vw,4.6rem)] font-bold leading-tight tracking-[-0.045em] text-white">
          Keep chasing the life <span className="text-[#ffd7df]">you dream about.</span>
        </motion.h2>
        <motion.p custom={0.95} variants={reveal} initial="hidden" animate="visible" className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-white/72 sm:text-xl">
          You have already spent so many years being brave, hardworking and away from home. I hope the next chapter brings you the engineering success, independence and happiness you are working so hard for.
        </motion.p>
        <motion.p custom={1.35} variants={reveal} initial="hidden" animate="visible" className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-[#ffd7df] sm:text-lg">
          Keep making your family proud. And whenever life gets difficult, remember that your cousin Rehan is always somewhere cheering for you.
        </motion.p>

        <motion.div custom={1.7} variants={reveal} initial="hidden" animate="visible" className="mt-9">
          <motion.button whileHover={{ scale: 1.045 }} whileTap={{ scale: 0.97 }} onClick={celebrate} className="inline-flex items-center gap-3 rounded-full bg-[#fff0e8] px-8 py-4 text-sm font-bold text-[#671027] shadow-[0_18px_55px_rgba(0,0,0,0.3)] transition hover:bg-white sm:text-base">
            Celebrate Faiza <Heart className="h-4 w-4 fill-current" />
          </motion.button>
        </motion.div>

        <motion.button initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.3, duration: .65 }} whileHover={{ scale: 1.035 }} whileTap={{ scale: .97 }} onClick={onRestart} className="mt-5 inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/10 px-7 py-3 text-sm font-semibold text-white backdrop-blur-md">
          Replay the birthday surprise <ArrowRight className="h-4 w-4" />
        </motion.button>
      </div>

      <p className="absolute bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.25em] text-white/30">Always cheering for you, {TEMPLATE_CONFIG.senderName}</p>
    </motion.section>
  );
}
