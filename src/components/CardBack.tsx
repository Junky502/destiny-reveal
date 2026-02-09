const CardBack = () => (
  <div className="w-48 h-72 mx-auto rounded-xl border-2 border-gold/40 bg-gradient-to-br from-secondary to-card animate-pulse-glow flex items-center justify-center relative overflow-hidden">
    {/* Ornamental pattern */}
    <div className="absolute inset-2 rounded-lg border border-gold/20 flex items-center justify-center">
      <div className="absolute inset-3 rounded-md border border-gold/10" />
      <div className="text-5xl text-gold/60">✦</div>
    </div>
    {/* Corner decorations */}
    <div className="absolute top-2 left-2 text-gold/30 text-xs">✧</div>
    <div className="absolute top-2 right-2 text-gold/30 text-xs">✧</div>
    <div className="absolute bottom-2 left-2 text-gold/30 text-xs">✧</div>
    <div className="absolute bottom-2 right-2 text-gold/30 text-xs">✧</div>
  </div>
);

export default CardBack;
