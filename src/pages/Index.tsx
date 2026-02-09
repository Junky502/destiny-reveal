import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import ParticleField from "@/components/ParticleField";
import CardBack from "@/components/CardBack";

const Index = () => {
  const [code, setCode] = useState("");
  const [shaking, setShaking] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = useCallback(() => {
    if (code.length !== 4 || !/^\d{4}$/.test(code)) {
      setError("Enter a valid 4-digit code");
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
      return;
    }

    // Play chime
    try {
      const audio = new Audio("https://cdn.pixabay.com/audio/2022/10/30/audio_42c0c3cc05.mp3");
      audio.volume = 0.3;
      audio.play().catch(() => {});
    } catch {}

    setError("");
    navigate(`/reveal/${code}`);
  }, [code, navigate]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden bg-gradient-to-b from-background via-secondary/30 to-background">
      <ParticleField />

      <motion.div
        className="relative z-10 flex flex-col items-center gap-8 max-w-sm w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Card back imagery */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <CardBack />
        </motion.div>

        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl md:text-3xl font-display text-glow text-primary">
            Enter Your Destiny
          </h1>
          <p className="text-muted-foreground text-lg">
            Type your secret 4-digit code to reveal your fate
          </p>
        </div>

        {/* OTP Input */}
        <div className={`flex flex-col items-center gap-4 ${shaking ? "animate-shake" : ""}`}>
          <InputOTP
            maxLength={4}
            value={code}
            onChange={setCode}
            onComplete={handleSubmit}
          >
            <InputOTPGroup>
              <InputOTPSlot
                index={0}
                className="w-14 h-16 text-2xl bg-card border-gold/30 text-foreground font-display"
              />
              <InputOTPSlot
                index={1}
                className="w-14 h-16 text-2xl bg-card border-gold/30 text-foreground font-display"
              />
              <InputOTPSlot
                index={2}
                className="w-14 h-16 text-2xl bg-card border-gold/30 text-foreground font-display"
              />
              <InputOTPSlot
                index={3}
                className="w-14 h-16 text-2xl bg-card border-gold/30 text-foreground font-display"
              />
            </InputOTPGroup>
          </InputOTP>

          {error && (
            <motion.p
              className="text-destructive text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.p>
          )}
        </div>

        {/* Submit button */}
        <Button
          onClick={handleSubmit}
          size="lg"
          className="w-full max-w-xs text-lg font-display gold-glow bg-gradient-to-r from-gold-dim to-gold text-primary-foreground hover:from-gold hover:to-gold-dim transition-all duration-300"
        >
          Reveal Your Fate ✦
        </Button>

        <p className="text-muted-foreground text-xs text-center">
          Each code holds a unique destiny. Choose wisely.
        </p>
      </motion.div>
    </div>
  );
};

export default Index;
