export const site = {
  name: "Heaven Flooring",
  origin: "https://heavenflooring.com.au",
  phone: "+61 452 026 969",
  phoneHref: "tel:+61452026969",
  phoneDisplay: "0452 026 969",
  address: {
    street: "14 Tivoli Rd",
    suburb: "South Yarra",
    state: "VIC",
    postcode: "3141",
    country: "Australia",
    line: "14 Tivoli Rd, South Yarra VIC 3141",
  },
  mapsQuery: "14+Tivoli+Rd,+South+Yarra+VIC+3141",
  areaServed: ["Melbourne", "South Yarra", "Toorak", "Brighton", "Kew"],
} as const;

export const colourFamilyMeta: Record<
  string,
  { label: string; swatch: string }
> = {
  "light-oak": { label: "Light oak", swatch: "#d7c4a6" },
  "natural-oak": { label: "Natural oak", swatch: "#c4a574" },
  "warm-timber": { label: "Warm timber", swatch: "#8b6b4a" },
  "australian-timber": { label: "Australian timber", swatch: "#7c6553" },
  dark: { label: "Dark", swatch: "#3a2e28" },
  grey: { label: "Grey", swatch: "#8a8680" },
};

export const roomMeta: Record<string, { label: string }> = {
  "living-room": { label: "Living room" },
  kitchen: { label: "Kitchen" },
  bedroom: { label: "Bedroom" },
  apartment: { label: "Apartment" },
  office: { label: "Office" },
  "whole-home": { label: "Whole home" },
  other: { label: "Other" },
};

export const matterMeta: Record<string, { label: string }> = {
  "water-resistance": { label: "Water resistance" },
  "natural-timber": { label: "Natural timber" },
  "easy-maintenance": { label: "Easy maintenance" },
  "pet-friendly": { label: "Pet friendly" },
  "family-friendly": { label: "Family friendly" },
  budget: { label: "Budget" },
  "premium-finish": { label: "Premium finish" },
  "quiet-underfoot": { label: "Quiet underfoot" },
};

export const lookMeta: Record<string, { label: string }> = {
  "light-oak": { label: "Light oak" },
  "natural-oak": { label: "Natural oak" },
  "warm-timber": { label: "Warm timber" },
  "australian-timber": { label: "Australian timber" },
  dark: { label: "Dark" },
  grey: { label: "Grey" },
  herringbone: { label: "Herringbone" },
};

export const budgetMeta: Record<string, { label: string }> = {
  value: { label: "Value" },
  "mid-range": { label: "Mid-range" },
  premium: { label: "Premium" },
};
