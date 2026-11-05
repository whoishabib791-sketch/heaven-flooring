import { useState } from "react";
import { Link } from "react-router-dom";
import { categories } from "../data/categories";
import { educationRows } from "../data/education";
import { processSteps } from "../data/process";
import { featuredProducts } from "../data/products";
import { site } from "../data/site";
import { spaces } from "../data/spaces";
import { JsonLd, Seo, localBusinessJsonLd } from "../lib/seo";
import { FloorSelector } from "../components/selector/FloorSelector";
import { ProductCard } from "../components/product/ProductCard";
import { RoomPreview } from "../components/sections/RoomPreview";
import { Button } from "../components/ui/Button";
import { EditorialHeading } from "../components/ui/EditorialHeading";
import { Picture } from "../components/media/Picture";

export function HomePage() {
  const popular = featuredProducts(8);

  return (
    <>
      <Seo
        title="Find the floor that fits your life"
        description="Premium flooring, expert guidance and professional installation for Melbourne homes and businesses. Hybrid, engineered timber, laminate, carpet and parquetry."
        path="/"
      />
      <JsonLd data={localBusinessJsonLd()} />

      <section className="relative min-h-[100svh] bg-ink text-cream">
        <Picture
          src="/images/rooms/lounge.jpg"
          alt="Melbourne living room with wide-plank timber flooring in natural light"
          className="absolute inset-0 h-full w-full"
          imgClassName="object-[center_70%] scale-[1.04]"
          eager
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/15" />
        <div className="relative mx-auto flex min-h-[100svh] max-w-[1440px] flex-col justify-end px-4 pb-10 pt-28 md:px-6 md:pb-16 lg:px-8">
          <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-stone">
            South Yarra · Melbourne supply + installation
          </p>
          <h1 className="mt-4 max-w-4xl font-serif text-[clamp(3.1rem,10vw,8rem)] leading-[0.88] tracking-[-0.03em]">
            Find the floor
            <br />
            that fits your life.
          </h1>
          <p className="mt-6 max-w-xl text-[16px] text-cream/80 md:text-[18px]">
            Premium flooring, expert guidance and professional installation for Melbourne homes and
            businesses.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to="/find-your-floor" variant="cream">
              Find your floor
            </Button>
            <Button to="/quote" variant="ghost">
              Free measure & quote
            </Button>
          </div>
          <p className="mt-8 font-mono text-[11px] tracking-[0.16em] uppercase text-stone">
            Free measure & quote · Melbourne supply + installation
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-16 md:px-6 md:py-24 lg:px-8">
        <EditorialHeading eyebrow="The range">
          Start with what
          <br />
          feels right.
        </EditorialHeading>
        <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-2">
          {categories.map((c, i) => (
            <Link
              key={c.slug}
              to={`/flooring/${c.slug}`}
              className={`group relative min-h-[280px] overflow-hidden no-underline md:min-h-[360px] ${
                i === 0 ? "md:col-span-2 md:min-h-[460px]" : ""
              }`}
            >
              <Picture src={c.image} alt={c.imageAlt} className="absolute inset-0 media-zoom h-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-8">
                <p className="font-serif text-[clamp(2rem,4vw,3.4rem)] text-cream">{c.label}</p>
                <p className="mt-2 max-w-md text-sm text-cream/80">{c.short}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <EditorialHeading eyebrow="Find your floor">
            Not sure where
            <br />
            to start?
          </EditorialHeading>
          <p className="mt-5 max-w-xl text-charcoal/70">
            Answer a few questions and we’ll narrow down the flooring that suits your space — using the
            real Heaven Flooring catalogue.
          </p>
          <div className="mt-10">
            <FloorSelector />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-16 md:px-6 md:py-24 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <EditorialHeading eyebrow="From the catalogue">
            Floors Melbourne
            <br />
            is choosing.
          </EditorialHeading>
          <Button to="/flooring" variant="line">
            Browse all floors
          </Button>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {popular.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-charcoal py-16 text-cream md:py-24">
        <div className="mx-auto grid max-w-[1440px] min-w-0 gap-10 px-4 md:px-6 lg:grid-cols-12 lg:px-8">
          <div className="min-w-0 lg:col-span-5">
            <EditorialHeading tone="cream" eyebrow="See it in a room">
              Lay a sample
              <br />
              into the space.
            </EditorialHeading>
            <p className="mt-5 max-w-md text-stone">
              This is a simple visual aid, not a photorealistic visualiser. Use it to feel a colour family
              in a room type, then request a sample or measure.
            </p>
            <InspirationUpload />
          </div>
          <div className="min-w-0 lg:col-span-7">
            <RoomPreview />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-16 md:px-6 md:py-24 lg:px-8">
        <EditorialHeading eyebrow="How we work">
          From first sample
          <br />
          to final board.
        </EditorialHeading>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {[
            ["Expert guidance", "Compare materials, finishes and what the room actually needs — not a catalogue dump."],
            ["Supply + install", "Selection and installation stay connected, so the quote matches the floor that goes down."],
            ["Product depth", "Hybrid, engineered timber, laminate, carpet and parquetry — the current catalogue, with the technical documents attached."],
            ["Local Melbourne service", "Based in South Yarra, working across metropolitan Melbourne homes and businesses."],
          ].map(([title, body]) => (
            <div key={title} className="border-t border-stone pt-6">
              <h3 className="font-serif text-3xl">{title}</h3>
              <p className="mt-3 max-w-md text-charcoal/70">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <EditorialHeading eyebrow="Projects">
            Real floors.
            <br />
            Real Melbourne spaces.
          </EditorialHeading>
          <p className="mt-5 max-w-2xl text-charcoal/70">
            These photographs are room references — the kinds of Melbourne interiors this work is for.
            They are not claimed as Heaven Flooring installations. Completed jobs can replace them.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {spaces.map((space) => (
              <Link key={space.slug} to={`/projects/${space.slug}`} className="group no-underline">
                <Picture src={space.image} alt={space.imageAlt} className="media-zoom aspect-[4/3]" />
                <p className="mt-3 font-mono text-[11px] tracking-[0.16em] uppercase text-timber">
                  {space.floorType}
                </p>
                <h3 className="font-serif text-3xl">{space.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-16 md:px-6 md:py-24 lg:px-8">
        <EditorialHeading eyebrow="The path">
          From choosing
          <br />
          to walking on it.
        </EditorialHeading>
        <ol className="mt-12 grid gap-0 md:grid-cols-3">
          {processSteps.map((step) => (
            <li key={step.n} className="border-t border-stone py-6 md:border-r md:px-5 md:[&:nth-child(3n)]:border-r-0">
              <p className="font-mono text-[12px] text-taupe">{step.n}</p>
              <h3 className="mt-3 font-serif text-3xl">{step.title}</h3>
              <p className="mt-3 text-sm text-charcoal/70">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-canvas py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-timber">Reputation</p>
          <p className="mt-4 max-w-3xl font-serif text-[clamp(2.4rem,6vw,5.5rem)] leading-[0.92]">
            Ask for a recent Melbourne job.
            <br />
            Walk it. Then decide.
          </p>
          <p className="mt-6 max-w-xl text-charcoal/70">
            We have not published a review count or star rating here because it must be read live from
            Google before it goes on the site. The owners know the reputation — this page will carry it
            properly, not invent it.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={site.phoneHref}>Call {site.phoneDisplay}</Button>
            <Button to="/quote" variant="line">
              Book a measure
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <EditorialHeading eyebrow="Compare">
              What’s the
              <br />
              difference?
            </EditorialHeading>
            <Button to="/flooring" variant="line">
              Compare flooring
            </Button>
          </div>
          <div className="mt-10 overflow-x-auto">
            <table className="min-w-[860px] w-full text-left text-sm">
              <thead>
                <tr className="border-b border-stone">
                  <th className="py-3 pr-4 font-mono text-[11px] tracking-[0.14em] uppercase text-timber"> </th>
                  <th className="py-3 pr-4 font-serif text-2xl font-normal">Hybrid</th>
                  <th className="py-3 pr-4 font-serif text-2xl font-normal">Engineered timber</th>
                  <th className="py-3 pr-4 font-serif text-2xl font-normal">Laminate</th>
                  <th className="py-3 font-serif text-2xl font-normal">Carpet</th>
                </tr>
              </thead>
              <tbody>
                {educationRows.map((row) => (
                  <tr key={row.label} className="border-b border-stone align-top">
                    <th className="py-4 pr-4 font-mono text-[11px] font-normal tracking-[0.12em] uppercase text-timber">
                      {row.label}
                    </th>
                    <td className="py-4 pr-4 text-charcoal/80">{row.hybrid}</td>
                    <td className="py-4 pr-4 text-charcoal/80">{row.engineered}</td>
                    <td className="py-4 pr-4 text-charcoal/80">{row.laminate}</td>
                    <td className="py-4 text-charcoal/80">{row.carpet}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-ink py-20 text-cream md:py-28">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <h2 className="font-serif text-[clamp(2.8rem,7vw,6.2rem)] leading-[0.9]">
            Ready to find
            <br />
            your floor?
          </h2>
          <p className="mt-6 max-w-lg text-stone">
            Tell us about your space and we’ll help you narrow down the right option.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to="/quote" variant="cream">
              Free measure & quote
            </Button>
            <Button href={site.phoneHref} variant="ghost">
              Call {site.phoneDisplay}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

function InspirationUpload() {
  const [name, setName] = useState<string>();
  return (
    <div className="mt-8 min-w-0 border border-white/15 p-5">
      <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-taupe">Upload your inspiration</p>
      <p className="mt-2 text-sm text-stone">
        Attach a room or floor photo to your enquiry. No automated matching is claimed on this demo.
      </p>
      <label className="mt-4 block min-w-0">
        <span className="sr-only">Upload inspiration image</span>
        <input
          type="file"
          accept="image/*"
          className="block w-full min-w-0 text-sm text-stone"
          onChange={(e) => setName(e.target.files?.[0]?.name)}
        />
      </label>
      {name ? <p className="mt-2 text-sm text-cream">Ready to attach: {name}</p> : null}
      <Button to="/quote" variant="ghost" className="mt-4">
        Add it to a quote
      </Button>
    </div>
  );
}
