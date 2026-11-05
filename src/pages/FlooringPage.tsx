import { useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FilterDrawer, FilterField, emptyFilters, type Filters } from "../components/product/FilterDrawer";
import { ProductGrid } from "../components/product/ProductGrid";
import { Button } from "../components/ui/Button";
import { EditorialHeading } from "../components/ui/EditorialHeading";
import { categories } from "../data/categories";
import { collections, floorProducts, thicknessOptions } from "../data/products";
import { roomMeta } from "../data/site";
import { useFlip } from "../hooks/useFlip";
import { applyFilters, colourOptions } from "../lib/filters";
import { Seo } from "../lib/seo";
import { useShop } from "../store/ShopContext";

export function FlooringPage() {
  const [params] = useSearchParams();
  const shop = useShop();
  const savedOnly = params.get("saved") === "1";
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [draft, setDraft] = useState<Filters>(emptyFilters);
  const [sheet, setSheet] = useState(false);
  const grid = useRef<HTMLDivElement>(null);
  const visible = useMemo(
    () => applyFilters(floorProducts, filters, savedOnly ? shop.favourites : undefined),
    [filters, savedOnly, shop.favourites],
  );
  const capture = useFlip(grid, [visible.map((p) => p.slug).join("|")]);

  const apply = (next: Filters) => {
    capture();
    setFilters(next);
    setDraft(next);
    setSheet(false);
  };

  return (
    <>
      <Seo
        title="Flooring Melbourne"
        description="Browse Heaven Flooring’s Melbourne range — hybrid, engineered timber, laminate, carpet and parquetry. Filter by colour, room, pattern and more."
        path="/flooring"
      />
      <div className="mx-auto max-w-[1440px] px-4 py-10 md:px-6 md:py-16 lg:px-8">
        <EditorialHeading eyebrow={savedOnly ? "Saved" : "The library"}>
          {savedOnly ? (
            <>
              Floors
              <br />
              you saved.
            </>
          ) : (
            <>
              Find the floor
              <br />
              in the range.
            </>
          )}
        </EditorialHeading>
        <p className="mt-5 max-w-2xl text-charcoal/70">
          {floorProducts.length} live products from the current Heaven Flooring catalogue. Filter first — don’t
          scroll a wall of boards.
        </p>

        <div className="mt-8 flex flex-col gap-3 lg:hidden">
          <input
            className="field min-h-12"
            placeholder="Search by name or colour"
            value={draft.query}
            onChange={(e) => setDraft((d) => ({ ...d, query: e.target.value }))}
            onBlur={() => apply({ ...draft, query: draft.query })}
          />
          <Button type="button" variant="line" onClick={() => setSheet(true)}>
            Filters
          </Button>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-24 space-y-4">
              <FilterFields value={draft} onChange={setDraft} />
              <Button type="button" className="w-full" onClick={() => apply(draft)}>
                Apply filters
              </Button>
              <button
                type="button"
                className="text-[12px] tracking-[0.14em] uppercase text-timber"
                onClick={() => apply(emptyFilters())}
              >
                Clear all
              </button>
            </div>
          </aside>
          <div className="lg:col-span-9">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-timber">
                {visible.length} floors
              </p>
              <label className="flex items-center gap-2 text-sm">
                <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-timber">Sort</span>
                <select
                  className="field min-h-11 py-2"
                  value={filters.sort}
                  onChange={(e) => apply({ ...filters, sort: e.target.value as Filters["sort"] })}
                >
                  <option value="recommended">Recommended</option>
                  <option value="light-dark">Light to dark</option>
                  <option value="name">Name</option>
                </select>
              </label>
            </div>
            <ProductGrid gridRef={grid} products={visible} />
          </div>
        </div>
      </div>
      <FilterDrawer
        open={sheet}
        onClose={() => setSheet(false)}
        count={applyFilters(floorProducts, draft, savedOnly ? shop.favourites : undefined).length}
        onApply={() => apply(draft)}
        onClear={() => setDraft(emptyFilters())}
      >
        <FilterFields value={draft} onChange={setDraft} />
      </FilterDrawer>
    </>
  );
}

function FilterFields({
  value,
  onChange,
}: {
  value: Filters;
  onChange: (next: Filters) => void;
}) {
  const set = (patch: Partial<Filters>) => onChange({ ...value, ...patch });
  return (
    <>
      <label className="hidden lg:block">
        <span className="mb-2 block font-mono text-[10px] tracking-[0.18em] uppercase text-timber">Search</span>
        <input
          className="field min-h-12"
          value={value.query}
          onChange={(e) => set({ query: e.target.value })}
          placeholder="Name or colour"
        />
      </label>
      <FilterField
        label="Flooring type"
        value={value.category}
        onChange={(category) => set({ category })}
        options={[{ value: "", label: "All types" }, ...categories.map((c) => ({ value: c.slug, label: c.label }))]}
      />
      <FilterField
        label="Colour"
        value={value.colour}
        onChange={(colour) => set({ colour })}
        options={[{ value: "", label: "All colours" }, ...colourOptions()]}
      />
      <FilterField
        label="Room"
        value={value.room}
        onChange={(room) => set({ room })}
        options={[{ value: "", label: "Any room" }, ...Object.entries(roomMeta).map(([v, m]) => ({ value: v, label: m.label }))]}
      />
      <FilterField
        label="Pattern"
        value={value.pattern}
        onChange={(pattern) => set({ pattern })}
        options={[
          { value: "", label: "Any pattern" },
          { value: "plank", label: "Plank" },
          { value: "herringbone", label: "Herringbone" },
        ]}
      />
      <FilterField
        label="Thickness"
        value={value.thickness}
        onChange={(thickness) => set({ thickness })}
        options={[{ value: "", label: "Any thickness" }, ...thicknessOptions().map((t) => ({ value: t, label: t }))]}
      />
      <FilterField
        label="Collection"
        value={value.collection}
        onChange={(collection) => set({ collection })}
        options={[{ value: "", label: "All collections" }, ...collections().map((c) => ({ value: c, label: c }))]}
      />
      <FilterField
        label="Water resistance"
        value={value.water}
        onChange={(water) => set({ water })}
        options={[
          { value: "", label: "Any" },
          { value: "waterproof", label: "Waterproof core" },
          { value: "water-resistant", label: "Water-resistant" },
        ]}
      />
    </>
  );
}
