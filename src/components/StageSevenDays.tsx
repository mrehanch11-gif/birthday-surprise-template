import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { sound } from '../utils/audio';
import { TEMPLATE_CONFIG } from '../config';
import CreatorCredit from './CreatorCredit';

interface StageSevenDaysProps { onNext: () => void; }

const LINES = [
  <>Do you know what makes this surprise <strong>so special?</strong></>,
  <>It is not about one perfect day. It is about <strong>years of growing up as family and friends.</strong></>,
  <>From childhood jokes to serious conversations, we have collected <strong>more memories than we can count.</strong></>,
  <>And somehow, through all these years, you became <strong>one of the people I can always talk to.</strong></>,
  <>So, Faiza... <strong>this little journey is just for you.</strong></>,
];

export default function StageSevenDays({ onNext }: StageSevenDaysProps) {
  return <motion.section className="seven-days" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.025 }} transition={{ duration: .7 }}>
    <div className="seven-days-glow seven-days-glow-one" />
    <div className="seven-days-glow seven-days-glow-two" />
    <div className="seven-days-lines">
      {LINES.map((line, index) => <motion.p
        key={index}
        className={index === LINES.length - 1 ? 'seven-days-question' : ''}
        initial={{ opacity: 0, x: index < 3 ? (index % 2 === 0 ? -110 : 110) : 0, y: index >= 3 ? 44 : 14, scale: index === LINES.length - 1 ? .78 : .94, filter: 'blur(15px)' }}
        animate={{ opacity: [0, 1, 1], x: 0, y: 0, scale: [index === LINES.length - 1 ? .78 : .94, 1.035, 1], filter: ['blur(15px)', 'blur(0px)', 'blur(0px)'] }}
        transition={{ delay: .45 + index * 1.02, duration: 1.05, times: [0, .72, 1], ease: [0.16, 1, 0.3, 1] }}
      >{line}</motion.p>)}
    </div>
    <motion.button
      className="seven-days-next"
      type="button"
      initial={{ opacity: 0, y: 22, scale: .92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 6.05, duration: .85, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, scale: 1.025 }}
      whileTap={{ scale: .97 }}
      onClick={() => { sound.playSparkle(); onNext(); }}
    >See the fun part <ArrowRight /></motion.button>
    <motion.footer initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 6.35, duration: .7 }}>
      <CreatorCredit />
    </motion.footer>
  </motion.section>;
}
