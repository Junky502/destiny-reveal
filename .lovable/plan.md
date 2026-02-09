

# 🔮 Tarot Party Reveal Game

## Overview
A mystical, mobile-first party game where guests scan a QR code, enter a secret 4-digit code, and receive a dramatic tarot/playing card role reveal with party missions.

---

## Page 1: Landing Page (/)
- **Dark mystical theme** — deep purple/black gradient background with floating particle effects (sparkles/stars)
- **Glowing card back imagery** at the top with subtle pulse animation
- **"Enter Your Destiny Code"** — large 4-digit input (validated: exactly 4 digits, no letters)
- **Submit button** with enchanting glow effect → redirects to `/reveal/[code]` on valid code, error shake animation on invalid
- **Ambient particle effects** on page load for atmosphere
- **Sound effect** on button press (mystical chime)

## Page 2: Reveal Page (/reveal/:code)
- **Dramatic card flip animation** — CSS 3D card spin (2-3 seconds), card starts face-down then flips to reveal
- **Card display** with placeholder card art (styled playing card / tarot design)
- **Bold reveal header**: "You are the [Role Title]!"
- **Description** with archetype meaning + 2-3 party missions
- **Sound effect** on card flip (dramatic reveal sound)
- **Save options**: Download as PNG image + Export as PDF buttons
- **Copy missions** button for easy text sharing
- **Optional "Get Bonus Flair" button** linking to a Perchance.org generator URL
- Invalid code → redirect back to landing with error message

## Backend (Lovable Cloud / Supabase)
- **`guest_codes` table** — stores 20 pre-generated codes mapped to roles (code, card name, title, description, image, missions)
- Lookup code on reveal page, return role data
- Easy to add/edit guests via the database without touching code

## Sample Data
- 20 pre-loaded role entries (Queen of Hearts, The Fool, King of Spades, The Magician, etc.) each with unique missions and personality archetypes

## Design & Polish
- **Mobile-first** responsive design
- **Particle effects** (floating sparkles/stars on both pages)
- **Sound effects** — ambient mystical chime on landing, dramatic reveal on card flip
- **Animations** — card glow pulse, 3D card flip, fade-ins, error shake
- **Dark mystical color palette** — deep purples, blacks, golds, with glowing accents

