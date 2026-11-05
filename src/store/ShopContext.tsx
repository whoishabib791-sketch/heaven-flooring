import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

const FAV_KEY = "hf-favourites";
const COMPARE_KEY = "hf-compare";

type ShopContextValue = {
  favourites: string[];
  compare: string[];
  toggleFavourite: (slug: string) => void;
  toggleCompare: (slug: string) => void;
  clearCompare: () => void;
  isFavourite: (slug: string) => boolean;
  inCompare: (slug: string) => boolean;
};

const ShopContext = createContext<ShopContextValue | null>(null);

function readList(key: string) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [favourites, setFavourites] = useState<string[]>(() =>
    typeof window === "undefined" ? [] : readList(FAV_KEY),
  );
  const [compare, setCompare] = useState<string[]>(() =>
    typeof window === "undefined" ? [] : readList(COMPARE_KEY),
  );

  const value = useMemo<ShopContextValue>(
    () => ({
      favourites,
      compare,
      toggleFavourite: (slug) => {
        setFavourites((prev) => {
          const next = prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug];
          localStorage.setItem(FAV_KEY, JSON.stringify(next));
          return next;
        });
      },
      toggleCompare: (slug) => {
        setCompare((prev) => {
          const next = prev.includes(slug)
            ? prev.filter((s) => s !== slug)
            : prev.length >= 4
              ? prev
              : [...prev, slug];
          localStorage.setItem(COMPARE_KEY, JSON.stringify(next));
          return next;
        });
      },
      clearCompare: () => {
        setCompare([]);
        localStorage.setItem(COMPARE_KEY, "[]");
      },
      isFavourite: (slug) => favourites.includes(slug),
      inCompare: (slug) => compare.includes(slug),
    }),
    [compare, favourites],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside ShopProvider");
  return ctx;
}
