import type { Filters } from "../components/product/FilterDrawer";
import { colourFamilyMeta } from "../data/site";
import type { Product } from "../data/products";

export function applyFilters(products: Product[], filters: Filters, saved?: string[]) {
  let list = products.filter((p) => {
    if (filters.category && p.category !== filters.category) return false;
    if (filters.colour && p.colourFamily !== filters.colour) return false;
    if (filters.room && !p.rooms?.includes(filters.room)) return false;
    if (filters.pattern && p.pattern !== filters.pattern) return false;
    if (filters.thickness && p.thickness !== filters.thickness) return false;
    if (filters.collection && p.collection !== filters.collection) return false;
    if (filters.water && p.waterResistance !== filters.water) return false;
    if (filters.query) {
      const q = filters.query.toLowerCase();
      const blob = `${p.name} ${p.colour} ${p.collection ?? ""} ${p.categoryLabel}`.toLowerCase();
      if (!blob.includes(q)) return false;
    }
    return true;
  });

  if (saved) list = list.filter((p) => saved.includes(p.slug));

  if (filters.sort === "name") {
    list = [...list].sort((a, b) => a.name.localeCompare(b.name));
  } else if (filters.sort === "light-dark") {
    const order = ["light-oak", "natural-oak", "warm-timber", "australian-timber", "grey", "dark"];
    list = [...list].sort(
      (a, b) => order.indexOf(a.colourFamily ?? "") - order.indexOf(b.colourFamily ?? ""),
    );
  } else {
    list = [...list].sort((a, b) => Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name));
  }
  return list;
}

export function colourOptions() {
  return Object.entries(colourFamilyMeta).map(([value, meta]) => ({ value, label: meta.label }));
}
