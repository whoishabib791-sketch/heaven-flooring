import type { Product } from "../../data/products";
import { ProductCard } from "./ProductCard";

export function ProductGrid({
  products,
  empty,
  gridRef,
}: {
  products: Product[];
  empty?: string;
  gridRef?: React.Ref<HTMLDivElement>;
}) {
  if (!products.length) {
    return (
      <p className="border border-stone bg-cream px-5 py-10 text-charcoal/70">
        {empty ?? "No floors match those filters. Clear a filter or try another colour family."}
      </p>
    );
  }

  return (
    <div ref={gridRef} className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}
