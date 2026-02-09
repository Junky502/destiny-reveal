import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CardFace from "./CardFace";

interface CardFlipProps {
  cardName: string;
  title: string;
  suit: string;
  color: string;
  onFlipComplete: () => void;
}

const CardFlip = ({ cardName, title, suit, color, onFlipComplete }: CardFlipProps) => {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFlipped(true);
      // Play reveal sound
      try {
        const audio = new Audio("https://cdn.pixabay.com/audio/2022/03/10/audio_ea76eb6a8c.mp3");
        audio.volume = 0.4;
        audio.play().catch(() => {});
      } catch {}
      setTimeout(onFlipComplete, 800);
    }, 1200);
    return () => clearTimeout(timer);
  }, [onFlipComplete]);

  return (
    <div className="perspective-1000 w-64 h-96 mx-auto">
      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Back face */}
        <div className="absolute inset-0 backface-hidden">
          <div className="w-full h-full rounded-xl border-2 border-gold/40 bg-gradient-to-br from-secondary to-card animate-pulse-glow flex items-center justify-center">
            <div className="absolute inset-2 rounded-lg border border-gold/20 flex items-center justify-center">
              <div className="absolute inset-3 rounded-md border border-gold/10" />
              <div className="text-5xl text-gold/60">✦</div>
            </div>
          </div>
        </div>

        {/* Front face */}
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <CardFace cardName={cardName} title={title} suit={suit} color={color} />
        </div>
      </motion.div>
    </div>
  );
};

export default CardFlip;
