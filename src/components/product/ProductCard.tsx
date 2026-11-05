import { Link } from "react-router-dom";
import { colourFamilyMeta } from "../../data/site";
import { productImage, waterLabel, type Product } from "../../data/products";
import { cn } from "../../lib/cn";
import { useShop } from "../../store/ShopContext";
import { ColourSwatch } from "../ui/ColourSwatch";
import { Picture } from "../media/Picture";

export function ProductCard({
  product,
  layout = "board",
}: {
  product: Product;
  layout?: "board" | "row";
}) {
  const shop = useShop();
  const attrs = [product.thickness, waterLabel(product.waterResistance), product.installationMethod].filter(
    Boolean,
  ) as string[];

  return (
    <article
      data-flip-id={product.slug}
      className={cn(
        "group relative flex min-w-0 flex-col border border-stone bg-cream",
        layout === "row" && "md:flex-row",
      )}
    >
      <Link to={`/products/${product.slug}`} className="contents no-underline">
        <Picture
          src={productImage(product)}
          alt={`${product.name} flooring sample`}
          className={cn(
            "media-zoom aspect-[4/3]",
            layout === "row" && "md:aspect-auto md:w-[42%] md:min-h-[220px]",
          )}
        />
        <div
          className="h-1.5 w-full"
          style={{ background: colourFamilyMeta[product.colourFamily ?? ""]?.swatch ?? "#a99c8c" }}
          aria-hidden
        />
        <div className="flex flex-1 flex-col gap-3 p-4 md:p-5">
          <div className="flex items-start justify-between gap-3">
            <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-timber">
              {product.categoryLabel}
              {product.collection ? ` · ${product.collection}` : ""}
            </p>
            <ColourSwatch family={product.colourFamily} size="sm" />
          </div>
          <h3 className="font-serif text-[1.45rem] leading-tight text-ink md:text-[1.65rem]">{product.name}</h3>
          <p className="text-[13px] text-charcoal/70">{product.colour}</p>
          {attrs.length ? (
            <p className="mt-auto font-mono text-[11px] leading-relaxed tracking-wide text-charcoal/65">
              {attrs.join(" · ")}
            </p>
          ) : null}
          <span className="text-[11px] font-medium tracking-[0.16em] uppercase text-ink">View floor →</span>
        </div>
      </Link>
      <div className="absolute top-3 right-3 flex gap-1">
        <IconButton
          pressed={shop.isFavourite(product.slug)}
          label={shop.isFavourite(product.slug) ? "Remove from saved" : "Save floor"}
          onClick={() => shop.toggleFavourite(product.slug)}
        >
          {shop.isFavourite(product.slug) ? "♥" : "♡"}
        </IconButton>
        <IconButton
          pressed={shop.inCompare(product.slug)}
          label={shop.inCompare(product.slug) ? "Remove from compare" : "Add to compare"}
          onClick={() => shop.toggleCompare(product.slug)}
        >
          {shop.inCompare(product.slug) ? "–" : "+"}
        </IconButton>
      </div>
    </article>
  );
}

function IconButton({
  children,
  label,
  onClick,
  pressed,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  pressed?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={pressed}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      className={cn(
        "grid h-10 w-10 place-items-center border text-sm",
        pressed ? "border-ink bg-ink text-cream" : "border-stone bg-cream/90 text-ink",
      )}
    >
      {children}
    </button>
  );
}
