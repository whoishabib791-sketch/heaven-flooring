import { colourFamilyMeta } from "../../data/site";
import { cn } from "../../lib/cn";

export function ColourSwatch({
  family,
  size = "md",
  label,
}: {
  family?: string;
  size?: "sm" | "md";
  label?: boolean;
}) {
  if (!family) return null;
  const meta = colourFamilyMeta[family];
  if (!meta) return null;
  return (
    <span className="inline-flex items-center gap-2">
      <span
        className={cn("inline-block border border-ink/15", size === "sm" ? "h-3 w-3" : "h-4 w-4")}
        style={{ background: meta.swatch }}
        aria-hidden
      />
      {label ? <span className="text-[12px] tracking-wide text-charcoal/70">{meta.label}</span> : null}
    </span>
  );
}
