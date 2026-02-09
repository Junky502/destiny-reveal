import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import { Download, FileText, Copy, ExternalLink, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import ParticleField from "@/components/ParticleField";
import CardFlip from "@/components/CardFlip";
import CardFace from "@/components/CardFace";

interface RoleData {
  card_name: string;
  title: string;
  description: string;
  missions: string[];
  card_suit: string;
  card_color: string;
}

const Reveal = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const [role, setRole] = useState<RoleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchRole = async () => {
      if (!code) {
        navigate("/", { state: { error: "No code provided" } });
        return;
      }

      const { data, error } = await supabase
        .from("guest_codes")
        .select("card_name, title, description, missions, card_suit, card_color")
        .eq("code", code)
        .maybeSingle();

      if (error || !data) {
        navigate("/", { state: { error: "Invalid code. Try again!" } });
        return;
      }

      setRole(data);
      setLoading(false);
    };

    fetchRole();
  }, [code, navigate]);

  const handleFlipComplete = useCallback(() => {
    setRevealed(true);
  }, []);

  const handleSaveImage = async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await toPng(cardRef.current, { backgroundColor: "#0a0515" });
      const link = document.createElement("a");
      link.download = `tarot-${code}.png`;
      link.href = dataUrl;
      link.click();
    } catch (e) {
      console.error("Failed to save image", e);
    }
  };

  const handleSavePdf = async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await toPng(cardRef.current, { backgroundColor: "#0a0515" });
      const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: [400, 600] });
      pdf.addImage(dataUrl, "PNG", 20, 20, 360, 540);
      pdf.save(`tarot-${code}.pdf`);
    } catch (e) {
      console.error("Failed to save PDF", e);
    }
  };

  const handleCopyMissions = () => {
    if (!role) return;
    const text = `🔮 ${role.card_name} — ${role.title}\n\n${role.description}\n\nMissions:\n${role.missions.map((m, i) => `${i + 1}. ${m}`).join("\n")}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          className="text-4xl text-gold"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          ✦
        </motion.div>
      </div>
    );
  }

  if (!role) return null;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-8 overflow-hidden bg-gradient-to-b from-background via-secondary/30 to-background">
      <ParticleField />

      <div className="relative z-10 flex flex-col items-center gap-6 max-w-md w-full">
        {/* Card flip / display */}
        <div ref={cardRef} className="flex flex-col items-center gap-4 p-4">
          {!revealed ? (
            <CardFlip
              cardName={role.card_name}
              title={role.title}
              suit={role.card_suit}
              color={role.card_color}
              onFlipComplete={handleFlipComplete}
            />
          ) : (
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <CardFace
                cardName={role.card_name}
                title={role.title}
                suit={role.card_suit}
                color={role.card_color}
              />
            </motion.div>
          )}
        </div>

        {/* Reveal content */}
        <AnimatePresence>
          {revealed && (
            <motion.div
              className="flex flex-col items-center gap-5 w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="text-2xl md:text-3xl font-display text-glow text-primary text-center">
                You are the {role.title}!
              </h1>

              <p className="text-foreground text-center text-lg leading-relaxed">
                {role.description}
              </p>

              {/* Missions */}
              <div className="w-full bg-card/80 border border-border rounded-xl p-5 space-y-3">
                <h2 className="font-display text-lg text-primary text-glow">Your Missions</h2>
                <ul className="space-y-2">
                  {role.missions.map((mission, i) => (
                    <li key={i} className="flex gap-3 text-foreground">
                      <span className="text-gold font-display shrink-0">{i + 1}.</span>
                      <span>{mission}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action buttons */}
              <div className="grid grid-cols-2 gap-3 w-full">
                <Button
                  onClick={handleSaveImage}
                  variant="outline"
                  className="gap-2 border-gold/30 text-foreground hover:bg-gold/10"
                >
                  <Download className="w-4 h-4" /> Save PNG
                </Button>
                <Button
                  onClick={handleSavePdf}
                  variant="outline"
                  className="gap-2 border-gold/30 text-foreground hover:bg-gold/10"
                >
                  <FileText className="w-4 h-4" /> Save PDF
                </Button>
                <Button
                  onClick={handleCopyMissions}
                  variant="outline"
                  className="gap-2 border-gold/30 text-foreground hover:bg-gold/10"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied!" : "Copy Missions"}
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="gap-2 border-gold/30 text-foreground hover:bg-gold/10"
                >
                  <a
                    href={`https://perchance.org/tarot-party-reveal`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4" /> Bonus Flair
                  </a>
                </Button>
              </div>

              <Button
                onClick={() => navigate("/")}
                variant="ghost"
                className="text-muted-foreground text-sm"
              >
                ← Enter another code
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Reveal;
