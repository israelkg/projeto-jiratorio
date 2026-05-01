import { Spade, Heart, Diamond, Club } from "lucide-react";

export const SUIT_CONFIG = {
  spade:   { Icon: Spade,   color: "#f5f5f0", char: "♠" },
  heart:   { Icon: Heart,   color: "#fe5f55", char: "♥" },
  diamond: { Icon: Diamond, color: "#f0c040", char: "♦" },
  club:    { Icon: Club,    color: "#50c878", char: "♣" },
};

export const SUIT_KEYS = Object.keys(SUIT_CONFIG);
