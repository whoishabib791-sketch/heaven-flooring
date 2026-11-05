import { Link } from "react-router-dom";
import { colourFamilyMeta } from "../../data/site";
import { productImage, waterLabel, type Product } from "../../data/products";
import { Picture } from "../media/Picture";
import { Button } from "../ui/Button";

const fields: { label: string; get: (p: Product) => string | undefined }[] = [
  { label: "Category", get: (p) => p.categoryLabel },
  { label: "Collection", get: (p) => p.collection },
  { label: "Colour", get: (p) => p.colour },
  { label: "Colour family", get: (p) => colourFamilyMeta[p.colourFamily ?? ""]?.label },
  { label: "Pattern", get: (p) => (p.pattern === "herringbone" ? "Herringbone" : "Plank") },
  { label: "Dimensions", get: (p) => p.dimensions },
  { label: "Thickness", get: (p) => p.thickness },
  { label: "Structure", get: (p) => p.structure },
  { label: "Backing", get: (p) => p.backing },
  { label: "Surface", get: (p) => p.surface },
  { label: "Installation", get: (p) => p.installationMethod },
  { label: "Water", get: (p) => waterLabel(p.waterResistance) },
  { label: "Slip rating", get: (p) => p.slipRating },
  { label: "Residential warranty", get: (p) => p.warrantyResidential },
  { label: "Commercial warranty", get: (p) => p.warrantyCommercial },
];

export function ComparisonTable({
  products,
  onRemove,
}: {
  products: Product[];
  onRemove: (slug: string) => void;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-[720px] w-full border-collapse text-left">
        <thead>
          <tr>
            <th className="sticky left-0 z-10 w-40 bg-canvas p-3 font-mono text-[11px] tracking-[0.16em] uppercase text-timber">
              Detail
            </th>
            {products.map((p) => (
              <th key={p.slug} className="w-56 bg-cream p-3 align-top">
                <Picture src={productImage(p)} alt="" className="mb-3 aspect-[4/3]" />
                <Link to={`/products/${p.slug}`} className="font-serif text-xl leading-tight text-ink no-underline">
                  {p.name}
                </Link>
                <button
                  type="button"
                  className="mt-2 block text-[11px] tracking-[0.14em] uppercase text-timber"
                  onClick={() => onRemove(p.slug)}
                >
                  Remove
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {fields.map((field) => {
            const values = products.map((p) => field.get(p)).filter(Boolean);
            if (!values.length) return null;
            return (
              <tr key={field.label} className="border-t border-stone">
                <th className="sticky left-0 bg-canvas p-3 font-mono text-[11px] font-normal tracking-[0.12em] uppercase text-timber">
                  {field.label}
                </th>
                {products.map((p) => (
                  <td key={p.slug} className="bg-cream p-3 text-[14px]">
                    {field.get(p) ?? "—"}
                  </td>
                ))}
              </tr>
            );
          })}
          <tr className="border-t border-stone">
            <th className="sticky left-0 bg-canvas p-3" />
            {products.map((p) => (
              <td key={p.slug} className="bg-cream p-3">
                <Button to={`/quote?product=${p.slug}`} className="w-full">
                  Quote this floor
                </Button>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
