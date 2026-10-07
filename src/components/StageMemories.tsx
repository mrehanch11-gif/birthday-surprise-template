import { motion } from 'motion/react';
import { ArrowRight, Heart } from 'lucide-react';
import { sound } from '../utils/audio';
import { TEMPLATE_CONFIG } from '../config';
import CreatorCredit from './CreatorCredit';

interface StageMemoriesProps { onNext: () => void; }
const CHAPTERS = [
  { number: '01', title: 'Growing Up Together', copy: 'Childhood gave us the beginning of a friendship that became part of our family story.' },
  { number: '02', title: 'The Person You Became', copy: 'From a little girl at home to a brave, ambitious young woman building her own future.' },
  { number: '03', title: 'A Bond I Value', copy: 'Cousin by relation, friend by choice, and someone I know I can talk to.' },
];
const PHOTOS = [
  { src: TEMPLATE_CONFIG.memoryImages[0], eyebrow: 'Childhood', title: 'The years that started it all' },
  { src: TEMPLATE_CONFIG.memoryImages[1], eyebrow: 'Good memories', title: 'The random moments we still remember' },
  { src: TEMPLATE_CONFIG.memoryImages[2], eyebrow: 'Growing up', title: 'Watching you become who you are' },
  { src: TEMPLATE_CONFIG.memoryImages[3], eyebrow: 'Family', title: 'A bond that still matters to me' },
];

export default function StageMemories({ onNext }: StageMemoriesProps) {
  return <motion.section className="close-moments" initial={{ opacity: 0, scale: .985 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, y: -24 }} transition={{ duration: .65 }}>
    <div className="close-moments-bg" />
    <header className="close-moments-heading">
      <motion.p initial={{ opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .08, duration: .58 }}>Four photographs · one childhood journey</motion.p>
      <motion.h2 initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ delay: .2, duration: .78, ease: [0.16, 1, 0.3, 1] }}>Memories <span>We Grew With</span></motion.h2>
      <motion.small initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .38, duration: .55 }}>Some of the best memories are the ordinary ones that become funny years later.</motion.small>
    </header>
    <div className="close-moments-chapters">
      {CHAPTERS.map((chapter, index) => <motion.article key={chapter.number} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .16 + index * .1 }}>
        <b>{chapter.number}</b><div><h3>{chapter.title}</h3><p>{chapter.copy}</p></div>
      </motion.article>)}
    </div>
    <div className="close-moments-photos">
      {PHOTOS.map((photo, index) => <motion.figure key={photo.src} initial={{ opacity: 0, y: 52, rotate: index % 2 ? 4 : -4, scale: .9, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, rotate: index % 2 ? 1 : -1, scale: 1, filter: 'blur(0px)' }} transition={{ delay: .62 + index * .13, duration: .78, ease: [0.16, 1, 0.3, 1] }} whileHover={{ y: -9, rotate: 0, scale: 1.025 }}>
        <div><img src={photo.src} alt={photo.title} /></div>
        <figcaption><span>{photo.eyebrow}</span><strong>{photo.title}</strong></figcaption>
        <Heart className="close-moments-heart" fill="currentColor" aria-hidden="true" />
      </motion.figure>)}
    </div>
    <motion.div className="close-moments-bottom" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: .55 }}>
      <motion.button type="button" whileHover={{ x: 5 }} whileTap={{ scale: .97 }} onClick={() => { sound.playTransition(); onNext(); }}>
        See more memories <ArrowRight />
      </motion.button>
    </motion.div>
    <motion.footer initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.35, duration: .6 }}><CreatorCredit /></motion.footer>
  </motion.section>;
}
