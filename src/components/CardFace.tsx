interface CardFaceProps {
  cardName: string;
  title: string;
  suit: string;
  color: string;
}

const suitSymbols: Record<string, string> = {
  hearts: "♥",
  diamonds: "♦",
  spades: "♠",
  clubs: "♣",
  major: "★",
};

const CardFace = ({ cardName, title, suit, color }: CardFaceProps) => {
  const symbol = suitSymbols[suit] || "★";

  return (
    <div
      className="w-64 h-96 rounded-xl border-2 border-gold/50 bg-gradient-to-br from-card to-secondary flex flex-col items-center justify-between p-4 relative overflow-hidden"
      style={{ boxShadow: `0 0 30px ${color}44, 0 0 60px ${color}22` }}
    >
      {/* Top corner */}
      <div className="self-start flex flex-col items-center">
        <span className="text-sm font-display text-foreground">{cardName.split(" ")[0]}</span>
        <span className="text-2xl" style={{ color }}>{symbol}</span>
      </div>

      {/* Center symbol */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-7xl" style={{ color, filter: `drop-shadow(0 0 15px ${color})` }}>
          {symbol}
        </span>
        <h3 className="font-display text-lg text-center text-foreground tracking-wide">
          {cardName}
        </h3>
      </div>

      {/* Bottom corner (inverted) */}
      <div className="self-end flex flex-col items-center rotate-180">
        <span className="text-sm font-display text-foreground">{cardName.split(" ")[0]}</span>
        <span className="text-2xl" style={{ color }}>{symbol}</span>
      </div>

      {/* Decorative border */}
      <div className="absolute inset-2 rounded-lg border border-gold/15 pointer-events-none" />
    </div>
  );
};

export default CardFace;
