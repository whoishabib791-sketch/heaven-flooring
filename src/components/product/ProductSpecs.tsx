import { populatedSpecs, type Product } from "../../data/products";

export function ProductSpecs({ product }: { product: Product }) {
  const rows = populatedSpecs(product);
  if (!rows.length) return null;
  return (
    <dl className="divide-y divide-stone border-y border-stone">
      {rows.map((row) => (
        <div key={row.label} className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-12 sm:gap-4">
          <dt className="font-mono text-[11px] tracking-[0.14em] uppercase text-timber sm:col-span-4">{row.label}</dt>
          <dd className="text-[15px] text-ink sm:col-span-8">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
