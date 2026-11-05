import { Link, Navigate, useParams } from "react-router-dom";
import { ProductGallery } from "../components/product/ProductGallery";
import { ProductGrid } from "../components/product/ProductGrid";
import { ProductSpecs } from "../components/product/ProductSpecs";
import { Button } from "../components/ui/Button";
import { ColourSwatch } from "../components/ui/ColourSwatch";
import { getCategory } from "../data/categories";
import { getProduct, productImage, relatedProducts, waterLabel } from "../data/products";
import { roomMeta, site } from "../data/site";
import { JsonLd, Seo, breadcrumbJsonLd } from "../lib/seo";
import { useShop } from "../store/ShopContext";

export function ProductPage() {
  const { slug = "" } = useParams();
  const product = getProduct(slug);
  const shop = useShop();
  if (!product) return <Navigate to="/flooring" replace />;
  const category = getCategory(product.category);
  const related = relatedProducts(product);
  const rooms = (product.rooms ?? []).map((r) => roomMeta[r]?.label).filter(Boolean);

  return (
    <>
      <Seo
        title={product.name}
        description={
          product.metaDescription ||
          product.description ||
          `${product.name} ${product.categoryLabel} flooring. Supply and installation in Melbourne.`
        }
        path={`/products/${product.slug}`}
        image={productImage(product)}
        type="product"
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Flooring", path: "/flooring" },
          ...(category ? [{ name: category.label, path: `/flooring/${category.slug}` }] : []),
          { name: product.name, path: `/products/${product.slug}` },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          description: product.description || product.metaDescription,
          image: product.images,
          brand: product.brand || product.collection || "Heaven Flooring",
          category: product.categoryLabel,
          url: `${site.origin}/products/${product.slug}`,
        }}
      />

      <article className="mx-auto max-w-[1440px] px-4 py-8 md:px-6 md:py-12 lg:px-8">
        <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-timber">
          <Link to="/flooring" className="no-underline">
            Flooring
          </Link>
          {category ? (
            <>
              {" / "}
              <Link to={`/flooring/${category.slug}`} className="no-underline">
                {category.label}
              </Link>
            </>
          ) : null}
        </p>

        <div className="mt-6 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ProductGallery product={product} />
          </div>
          <div className="lg:col-span-5">
            <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-timber">
              {product.categoryLabel}
              {product.collection ? ` · ${product.collection}` : ""}
            </p>
            <h1 className="mt-3 font-serif text-[clamp(2.2rem,5vw,4rem)] leading-[0.95]">{product.name}</h1>
            <div className="mt-4 flex items-center gap-3 text-sm text-charcoal/70">
              <ColourSwatch family={product.colourFamily} label />
              <span>{product.colour}</span>
            </div>
            {product.description ? (
              <p className="mt-6 text-[16px] leading-relaxed text-charcoal/80">{product.description}</p>
            ) : null}
            <ul className="mt-6 space-y-1 font-mono text-[12px] text-charcoal/70">
              {product.thickness ? <li>Thickness · {product.thickness}</li> : null}
              {waterLabel(product.waterResistance) ? <li>{waterLabel(product.waterResistance)}</li> : null}
              {product.installationMethod ? <li>Install · {product.installationMethod}</li> : null}
            </ul>
            <div className="mt-8 flex flex-col gap-3">
              <Button to={`/quote?product=${product.slug}`}>Request quote</Button>
              <div className="flex gap-3">
                <Button type="button" variant="line" className="flex-1" onClick={() => shop.toggleCompare(product.slug)}>
                  {shop.inCompare(product.slug) ? "In compare" : "Add to compare"}
                </Button>
                <Button type="button" variant="line" className="flex-1" onClick={() => shop.toggleFavourite(product.slug)}>
                  {shop.isFavourite(product.slug) ? "Saved" : "Save floor"}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-16">
          <h2 className="font-serif text-4xl">Key details</h2>
          <div className="mt-6">
            <ProductSpecs product={product} />
          </div>
        </section>

        {product.documents?.length ? (
          <section className="mt-16">
            <h2 className="font-serif text-4xl">Technical documents</h2>
            <ul className="mt-6 divide-y divide-stone border-y border-stone">
              {product.documents.map((doc) => (
                <li key={doc.href} className="flex flex-wrap items-center justify-between gap-3 py-4">
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-timber">{doc.kind}</p>
                    <p>{doc.label}</p>
                  </div>
                  <a
                    href={doc.href}
                    target="_blank"
                    rel="noreferrer"
                    className="min-h-11 px-3 text-[12px] tracking-[0.14em] uppercase"
                  >
                    Download
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {rooms.length ? (
          <section className="mt-16">
            <h2 className="font-serif text-4xl">Suits</h2>
            <p className="mt-4 text-charcoal/75">{rooms.join(" · ")}</p>
          </section>
        ) : null}

        {related.length ? (
          <section className="mt-16 pb-10">
            <h2 className="font-serif text-4xl">Similar floors</h2>
            <div className="mt-6">
              <ProductGrid products={related} />
            </div>
          </section>
        ) : null}
      </article>

      <div className="sticky-mobile-cta flex gap-2">
        <Button to={`/quote?product=${product.slug}`} className="flex-1">
          Request quote
        </Button>
        <Button href={site.phoneHref} variant="line" className="flex-1">
          Call
        </Button>
      </div>
    </>
  );
}
