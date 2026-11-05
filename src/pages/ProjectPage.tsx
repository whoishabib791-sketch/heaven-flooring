import { Link, Navigate, useParams } from "react-router-dom";
import { ProductGrid } from "../components/product/ProductGrid";
import { Button } from "../components/ui/Button";
import { Picture } from "../components/media/Picture";
import { floorProducts } from "../data/products";
import { getSpace } from "../data/spaces";
import { Seo } from "../lib/seo";

export function ProjectPage() {
  const { slug = "" } = useParams();
  const space = getSpace(slug);
  if (!space) return <Navigate to="/projects" replace />;
  const products = floorProducts.filter((p) => space.suited.includes(p.category)).slice(0, 6);

  return (
    <>
      <Seo
        title={space.title}
        description={space.summary}
        path={`/projects/${space.slug}`}
        image={space.image}
      />
      <section className="relative min-h-[50svh] bg-ink">
        <Picture src={space.image} alt={space.imageAlt} className="absolute inset-0 h-full" eager />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
        <div className="relative mx-auto flex min-h-[50svh] max-w-[1440px] flex-col justify-end px-4 pb-10 text-cream md:px-6 lg:px-8">
          <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-stone">{space.floorType}</p>
          <h1 className="mt-2 font-serif text-[clamp(2.8rem,7vw,5.5rem)] leading-[0.92]">{space.title}</h1>
        </div>
      </section>
      <article className="mx-auto max-w-[1440px] px-4 py-12 md:px-6 lg:px-8">
        <p className="max-w-2xl text-lg text-charcoal/80">{space.summary}</p>
        <p className="mt-6 max-w-2xl text-sm text-charcoal/60">
          Reference interior only. No suburb, client or install narrative has been invented.
        </p>
        <div className="mt-10">
          <h2 className="font-serif text-3xl">Planning something similar?</h2>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Button to="/quote">Request a measure & quote</Button>
            <Button to={`/flooring/${space.category}`} variant="line">
              See {space.floorType.toLowerCase()}
            </Button>
          </div>
        </div>
        {products.length ? (
          <div className="mt-14">
            <h2 className="font-serif text-3xl">Floors that suit this room type</h2>
            <div className="mt-6">
              <ProductGrid products={products} />
            </div>
          </div>
        ) : null}
        <p className="mt-10">
          <Link to="/projects">All room types</Link>
        </p>
      </article>
    </>
  );
}
