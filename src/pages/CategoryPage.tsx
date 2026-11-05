import { Navigate, useParams } from "react-router-dom";
import { ProductGrid } from "../components/product/ProductGrid";
import { Button } from "../components/ui/Button";
import { EditorialHeading } from "../components/ui/EditorialHeading";
import { Picture } from "../components/media/Picture";
import { getCategory } from "../data/categories";
import { faqs } from "../data/faqs";
import { getProductsByCategory } from "../data/products";
import { JsonLd, Seo, breadcrumbJsonLd, faqJsonLd } from "../lib/seo";

export function CategoryPage() {
  const { category = "" } = useParams();
  const cat = getCategory(category);
  if (!cat) return <Navigate to="/flooring" replace />;
  const products = getProductsByCategory(cat.slug);
  const relatedFaqs = faqs.filter((f) => f.a.toLowerCase().includes(cat.label.toLowerCase())).slice(0, 3);

  return (
    <>
      <Seo
        title={`${cat.label} Flooring Melbourne`}
        description={`${cat.short} Supply and installation across Melbourne from Heaven Flooring.`}
        path={`/flooring/${cat.slug}`}
        image={cat.image}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Flooring", path: "/flooring" },
          { name: cat.label, path: `/flooring/${cat.slug}` },
        ])}
      />
      {relatedFaqs.length ? <JsonLd data={faqJsonLd(relatedFaqs)} /> : null}

      <section className="relative min-h-[54svh] bg-ink text-cream">
        <Picture src={cat.image} alt={cat.imageAlt} className="absolute inset-0 h-full" eager />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        <div className="relative mx-auto flex min-h-[54svh] max-w-[1440px] flex-col justify-end px-4 pb-10 md:px-6 lg:px-8">
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-stone">Flooring Melbourne</p>
          <h1 className="mt-3 font-serif text-[clamp(3rem,8vw,6.5rem)] leading-[0.9]">{cat.label}</h1>
          <p className="mt-4 max-w-xl text-cream/80">{cat.short}</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1440px] gap-10 px-4 py-14 md:grid-cols-12 md:px-6 lg:px-8">
        <div className="md:col-span-7 space-y-8">
          <div>
            <h2 className="font-serif text-3xl">What it is</h2>
            <p className="mt-3 text-charcoal/75">{cat.short} {cat.who}</p>
          </div>
          <div>
            <h2 className="font-serif text-3xl">Who it suits</h2>
            <p className="mt-3 text-charcoal/75">{cat.who}</p>
          </div>
          <div>
            <h2 className="font-serif text-3xl">Things to consider</h2>
            <p className="mt-3 text-charcoal/75">{cat.consider}</p>
          </div>
        </div>
        <div className="md:col-span-5 space-y-8 border-t border-stone pt-8 md:border-t-0 md:pt-0">
          <div>
            <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-timber">Rooms</p>
            <p className="mt-2">{cat.rooms}</p>
          </div>
          <div>
            <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-timber">Installation</p>
            <p className="mt-2">{cat.install}</p>
          </div>
          <Button to="/quote">Free measure & quote</Button>
        </div>
      </section>

      <section className="bg-cream py-14">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <EditorialHeading>
            {products.length} {cat.label.toLowerCase()} floors
          </EditorialHeading>
          <div className="mt-8">
            <ProductGrid products={products} />
          </div>
        </div>
      </section>

      {relatedFaqs.length ? (
        <section className="mx-auto max-w-[1440px] px-4 py-14 md:px-6 lg:px-8">
          <h2 className="font-serif text-4xl">Questions we hear</h2>
          <div className="mt-8 divide-y divide-stone border-y border-stone">
            {relatedFaqs.map((f) => (
              <details key={f.q} className="py-5">
                <summary className="cursor-pointer font-serif text-2xl">{f.q}</summary>
                <p className="mt-3 max-w-3xl text-charcoal/75">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
