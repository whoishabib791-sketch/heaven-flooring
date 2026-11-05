import { cn } from "../../lib/cn";

export type Filters = {
  category: string;
  colour: string;
  room: string;
  pattern: string;
  thickness: string;
  collection: string;
  water: string;
  query: string;
  sort: "recommended" | "name" | "light-dark";
};

export const emptyFilters = (): Filters => ({
  category: "",
  colour: "",
  room: "",
  pattern: "",
  thickness: "",
  collection: "",
  water: "",
  query: "",
  sort: "recommended",
});

export function FilterField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  const id = label.toLowerCase().replace(/\s+/g, "-");
  return (
    <label className="block min-w-0">
      <span className="mb-2 block font-mono text-[10px] tracking-[0.18em] uppercase text-timber">{label}</span>
      <select
        id={id}
        className="field min-h-12"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function FilterDrawer({
  open,
  onClose,
  children,
  onApply,
  onClear,
  count,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  onApply: () => void;
  onClear: () => void;
  count: number;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
      <button type="button" className="absolute inset-0 bg-ink/45" aria-label="Close filters" onClick={onClose} />
      <div className="absolute inset-x-0 bottom-0 max-h-[88dvh] overflow-auto border-t border-stone bg-cream px-4 pt-4 pb-[calc(5.5rem+env(safe-area-inset-bottom))]">
        <div className="mb-4 flex items-center justify-between">
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-timber">Filter floors</p>
          <button type="button" onClick={onClose} className="min-h-11 px-2 text-sm">
            Close
          </button>
        </div>
        <div className="grid gap-4">{children}</div>
        <div className="fixed inset-x-0 bottom-0 flex gap-2 border-t border-stone bg-cream px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
          <button type="button" onClick={onClear} className="min-h-12 flex-1 border border-ink/20 text-[12px] tracking-[0.14em] uppercase">
            Clear
          </button>
          <button type="button" onClick={onApply} className="min-h-12 flex-1 bg-ink text-[12px] tracking-[0.14em] uppercase text-cream">
            Show {count} floors
          </button>
        </div>
      </div>
    </div>
  );
}

export function Chip({
  active,
  children,
  onClick,
}: {
  active?: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "min-h-12 px-4 text-left text-[13px] tracking-wide border",
        active ? "border-ink bg-ink text-cream" : "border-stone bg-cream text-ink",
      )}
    >
      {children}
    </button>
  );
}
