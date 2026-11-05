import { cn } from "../../lib/cn";

export function EditorialHeading({
  eyebrow,
  children,
  align = "left",
  tone = "ink",
  as: Tag = "h2",
}: {
  eyebrow?: string;
  children: React.ReactNode;
  align?: "left" | "center";
  tone?: "ink" | "cream";
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <div className={cn(align === "center" && "text-center")}>
      {eyebrow ? (
        <p
          className={cn(
            "mb-3 font-mono text-[11px] tracking-[0.22em] uppercase",
            tone === "cream" ? "text-stone" : "text-timber",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <Tag
        className={cn(
          "font-serif font-normal leading-[0.95] tracking-[-0.02em]",
          "text-[clamp(2.1rem,6vw,5.2rem)]",
          tone === "cream" ? "text-cream" : "text-ink",
        )}
      >
        {children}
      </Tag>
    </div>
  );
}
