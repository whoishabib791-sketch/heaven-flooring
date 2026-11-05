import raw from "./products.json";
import type { CategorySlug } from "./categories";

export type ProductDocument = {
  label: string;
  href: string;
  kind?: string;
};

export type Product = {
  id: number;
  quoteId?: number;
  slug: string;
  name: string;
  brand?: string;
  supplier?: string;
  collection?: string;
  category: CategorySlug | "accessory";
  categoryLabel: string;
  colour: string;
  colourFamily?: string;
  pattern?: string;
  images: string[];
  description?: string;
  metaDescription?: string;
  dimensions?: string;
  thickness?: string;
  structure?: string;
  backing?: string;
  surface?: string;
  edge?: string;
  packSize?: string;
  installationMethod?: string;
  warrantyResidential?: string;
  warrantyCommercial?: string;
  fireRating?: string;
  slipRating?: string;
  acoustic?: string;
  waterResistance?: "waterproof" | "water-resistant";
  documents?: ProductDocument[];
  specs?: Record<string, string>;
  rooms?: string[];
  budget?: "value" | "mid-range" | "premium";
  looks?: string[];
  matters?: string[];
  featured?: boolean;
  relatedProducts?: string[];
  sourceUrl: string;
};

export const products = raw as unknown as Product[];

export const floorProducts = products.filter((p) => p.category !== "accessory");

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string) {
  return floorProducts.filter((p) => p.category === category);
}

export function featuredProducts(limit = 8) {
  const featured = floorProducts.filter((p) => p.featured);
  return (featured.length ? featured : floorProducts).slice(0, limit);
}

export function relatedProducts(product: Product, limit = 4) {
  const slugs = product.relatedProducts ?? [];
  const found = slugs.map(getProduct).filter((p): p is Product => Boolean(p));
  return found.slice(0, limit);
}

export function populatedSpecs(product: Product) {
  const rows: { label: string; value: string }[] = [];
  const pairs: [string, string | undefined][] = [
    ["Colour", product.colour],
    ["Collection", product.collection],
    ["Dimensions", product.dimensions],
    ["Thickness", product.thickness],
    ["Structure", product.structure],
    ["Backing", product.backing],
    ["Surface", product.surface],
    ["Edge", product.edge],
    ["Pack size", product.packSize],
    ["Installation", product.installationMethod],
    ["Water resistance", waterLabel(product.waterResistance)],
    ["Slip rating", product.slipRating],
    ["Fire rating", product.fireRating],
    ["Acoustic", product.acoustic],
    ["Residential warranty", product.warrantyResidential],
    ["Commercial warranty", product.warrantyCommercial],
  ];
  for (const [label, value] of pairs) {
    if (value && !isEmpty(value)) rows.push({ label, value });
  }
  if (product.specs) {
    const already = new Set(rows.map((r) => r.label.toLowerCase()));
    for (const [label, value] of Object.entries(product.specs)) {
      if (isEmpty(value)) continue;
      if (already.has(label.toLowerCase())) continue;
      if (/code & name|maintenance|swell testing/i.test(label)) continue;
      rows.push({ label, value });
      already.add(label.toLowerCase());
    }
  }
  return rows;
}

export function waterLabel(value?: Product["waterResistance"]) {
  if (value === "waterproof") return "Waterproof core";
  if (value === "water-resistant") return "Water-resistant";
  return undefined;
}

function isEmpty(value: string) {
  const v = value.trim().toLowerCase();
  return !v || v === "n/a" || v === "null" || v === "undefined" || v === "-";
}

export function collections() {
  return [...new Set(floorProducts.map((p) => p.collection).filter(Boolean))] as string[];
}

export function brands() {
  return [...new Set(floorProducts.map((p) => p.brand).filter(Boolean))] as string[];
}

export function thicknessOptions() {
  const set = new Set<string>();
  for (const p of floorProducts) {
    if (p.thickness) set.add(p.thickness);
  }
  return [...set].sort((a, b) => parseFloat(a) - parseFloat(b));
}

export function productImage(product: Product) {
  return product.images[0] ?? "/images/rooms/living-oak.jpg";
}
