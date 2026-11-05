import { Link } from "react-router-dom";
import { ComparisonTable } from "../components/product/ComparisonTable";
import { Button } from "../components/ui/Button";
import { EditorialHeading } from "../components/ui/EditorialHeading";
import { getProduct } from "../data/products";
import { Seo } from "../lib/seo";
import { useShop } from "../store/ShopContext";

export function ComparePage() {
  const shop = useShop();
  const products = shop.compare.map(getProduct).filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      <Seo
        title="Compare floors"
        description="Compare Heaven Flooring products side by side — construction, installation, warranty and water performance."
        path="/compare"
      />
      <div className="mx-auto max-w-[1440px] px-4 py-12 md:px-6 md:py-16 lg:px-8">
        <EditorialHeading eyebrow="Side by side">
          Compare
          <br />
          the shortlist.
        </EditorialHeading>
        <p className="mt-5 max-w-xl text-charcoal/70">
          Two to four floors. Only fields that exist on the product records are shown.
        </p>
        {products.length < 2 ? (
          <div className="mt-10 border border-stone bg-cream px-6 py-10">
            <p>Add at least two floors from the library to compare them.</p>
            <Button to="/flooring" className="mt-6">
              Browse floors
            </Button>
          </div>
        ) : (
          <div className="mt-10">
            <ComparisonTable
              products={products}
              onRemove={(slug) => shop.toggleCompare(slug)}
            />
            <button type="button" className="mt-6 text-[12px] tracking-[0.14em] uppercase text-timber" onClick={shop.clearCompare}>
              Clear compare
            </button>
          </div>
        )}
        <p className="mt-8 text-sm">
          Still deciding? <Link to="/find-your-floor">Use the floor finder</Link>.
        </p>
      </div>
    </>
  );
}
