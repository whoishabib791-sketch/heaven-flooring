import { categories } from "./categories";
import { floorProducts, type Product } from "./products";

export type SelectorAnswers = {
  room?: string;
  matters: string[];
  look?: string;
  budget?: string;
};

export type SelectorResult = {
  reason: string;
  category?: (typeof categories)[number];
  products: Product[];
};

const ROOM_TO_KEY: Record<string, string> = {
  "Living Room": "living-room",
  Kitchen: "kitchen",
  Bedroom: "bedroom",
  Apartment: "apartment",
  Office: "office",
  "Whole Home": "whole-home",
  Other: "other",
};

const MATTER_TO_KEY: Record<string, string> = {
  "Water Resistance": "water-resistance",
  "Natural Timber": "natural-timber",
  "Easy Maintenance": "easy-maintenance",
  "Pet Friendly": "pet-friendly",
  "Family Friendly": "family-friendly",
  Budget: "budget",
  "Premium Finish": "premium-finish",
  "Quiet Underfoot": "quiet-underfoot",
};

const LOOK_TO_KEY: Record<string, string> = {
  "Light Oak": "light-oak",
  "Natural Oak": "natural-oak",
  "Warm Timber": "warm-timber",
  "Australian Timber": "australian-timber",
  Dark: "dark",
  Grey: "grey",
  Herringbone: "herringbone",
};

const BUDGET_TO_KEY: Record<string, string> = {
  Value: "value",
  "Mid-range": "mid-range",
  Premium: "premium",
};

export const selectorRooms = Object.keys(ROOM_TO_KEY);
export const selectorMatters = Object.keys(MATTER_TO_KEY);
export const selectorLooks = [...Object.keys(LOOK_TO_KEY), "Not Sure"];
export const selectorBudgets = [...Object.keys(BUDGET_TO_KEY), "Not sure"];

export function normaliseAnswers(input: {
  room?: string;
  matters: string[];
  look?: string;
  budget?: string;
}): SelectorAnswers {
  return {
    room: input.room ? ROOM_TO_KEY[input.room] ?? input.room : undefined,
    matters: input.matters.map((m) => MATTER_TO_KEY[m] ?? m),
    look: input.look && input.look !== "Not Sure" ? LOOK_TO_KEY[input.look] ?? input.look : undefined,
    budget:
      input.budget && input.budget !== "Not sure"
        ? BUDGET_TO_KEY[input.budget] ?? input.budget
        : undefined,
  };
}

export function runSelector(raw: {
  room?: string;
  matters: string[];
  look?: string;
  budget?: string;
}): SelectorResult {
  const answers = normaliseAnswers(raw);
  const scored = floorProducts
    .map((product) => ({ product, score: scoreProduct(product, answers) }))
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score);

  const top = scored.slice(0, 6).map((row) => row.product);
  const fallback = top.length
    ? top
    : floorProducts.filter((p) => p.featured).slice(0, 6);

  const categorySlug = pickCategory(answers, fallback);
  const category = categories.find((c) => c.slug === categorySlug);
  return {
    reason: explain(answers, categorySlug),
    category,
    products: fallback,
  };
}

function scoreProduct(product: Product, answers: SelectorAnswers) {
  let score = 0;
  if (answers.room && answers.room !== "other" && product.rooms?.includes(answers.room)) {
    score += 4;
  }
  for (const matter of answers.matters) {
    if (product.matters?.includes(matter)) score += 3;
  }
  if (answers.look) {
    if (product.looks?.includes(answers.look) || product.colourFamily === answers.look) score += 3;
    if (answers.look === "herringbone" && product.pattern === "herringbone") score += 4;
  }
  if (answers.budget && product.budget === answers.budget) score += 2;
  if (product.featured) score += 0.5;
  return score;
}

function pickCategory(answers: SelectorAnswers, products: Product[]) {
  if (answers.matters.includes("quiet-underfoot") && answers.room === "bedroom") return "carpet";
  if (answers.look === "herringbone") {
    return products.some((p) => p.category === "parquetry") ? "parquetry" : "hybrid";
  }
  if (answers.matters.includes("natural-timber") && !answers.matters.includes("water-resistance")) {
    return "engineered-timber";
  }
  if (answers.matters.includes("water-resistance") || answers.room === "kitchen") return "hybrid";
  if (answers.matters.includes("budget") || answers.budget === "value") return "laminate";
  if (answers.matters.includes("premium-finish") && answers.matters.includes("natural-timber")) {
    return "engineered-timber";
  }
  const counts = new Map<string, number>();
  for (const p of products) {
    counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
}

function explain(answers: SelectorAnswers, category?: string) {
  const bits: string[] = [];
  if (category === "hybrid") {
    bits.push("Hybrid may be a strong fit");
    if (answers.matters.includes("water-resistance") || answers.room === "kitchen") {
      bits.push("because you prioritised water resistance and rooms that see spills");
    } else if (answers.matters.includes("easy-maintenance")) {
      bits.push("because you asked for easy maintenance in a hard-wearing timber look");
    } else {
      bits.push("for a waterproof-core timber look that works across busy Melbourne homes");
    }
  } else if (category === "engineered-timber") {
    bits.push("Engineered timber may be a strong fit because you want a real hardwood surface");
    if (answers.matters.includes("premium-finish")) bits.push("and a more premium finish");
  } else if (category === "laminate") {
    bits.push("Laminate may be a strong fit where everyday timber-look value matters most");
  } else if (category === "carpet") {
    bits.push("Carpet may be a strong fit because you asked for comfort and a quieter floor");
  } else if (category === "parquetry") {
    bits.push("A patterned floor — parquetry or herringbone hybrid — matches the look you selected");
  } else {
    bits.push("Here are floors from the current Heaven Flooring range that sit closest to your answers");
  }
  return `${bits.join(" ")}. These are genuine products from the catalogue — not a generic shortlist.`;
}
