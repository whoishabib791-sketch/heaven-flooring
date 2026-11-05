import { Button } from "../components/ui/Button";
import { Picture } from "../components/media/Picture";
import { site } from "../data/site";
import { Seo } from "../lib/seo";

export function AboutPage() {
  return (
    <>
      <Seo
        title="About Heaven Flooring"
        description="Heaven Flooring helps Melbourne homes and businesses choose, supply and install the right floor — hybrid, engineered timber, laminate, carpet and parquetry."
        path="/about"
      />
      <div className="mx-auto max-w-[1440px] px-4 py-12 md:px-6 md:py-16 lg:px-8">
        <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-timber">About</p>
        <h1 className="mt-4 max-w-4xl font-serif text-[clamp(2.6rem,7vw,6rem)] leading-[0.92]">
          The job is not to show you every board.
          <br />
          It’s to get the right one underfoot.
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-charcoal/75">
          Heaven Flooring works across Melbourne on flooring supply, delivery and installation. The
          current range covers hybrid, engineered timber, laminate, carpet and parquetry — with the
          technical documents that sit behind each product, not just a pretty thumbnail.
        </p>
      </div>
      <Picture
        src="/images/rooms/house-interior.jpg"
        alt="Melbourne house at dusk — the kind of residential work this team services"
        className="aspect-[21/9] w-full"
      />
      <div className="mx-auto grid max-w-[1440px] gap-12 px-4 py-14 md:grid-cols-12 md:px-6 lg:px-8">
        <div className="md:col-span-7 space-y-6 text-[16px] leading-relaxed text-charcoal/80">
          <p>
            Most people arrive with too many options. A kitchen that needs a waterproof-core floor. A
            living room that wants real oak. A bedroom that should be quieter. We start there — room,
            use, look, budget — then open the catalogue.
          </p>
          <p>
            Selection and installation stay on the same job. The free measure is where the subfloor,
            area and preparation are confirmed, so the quote is for the space you actually have.
          </p>
          <p>
            The team is based in South Yarra and services metropolitan Melbourne, including the inner
            south-east, CBD and surrounding suburbs. 14 Tivoli Road is the business address. Measures
            happen on site.
          </p>
        </div>
        <div className="md:col-span-5">
          <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-timber">Visit / call</p>
          <p className="mt-3">{site.address.line}</p>
          <a href={site.phoneHref} className="mt-2 block text-xl">
            {site.phoneDisplay}
          </a>
          <Button to="/quote" className="mt-6">
            Free measure & quote
          </Button>
        </div>
      </div>
    </>
  );
}
