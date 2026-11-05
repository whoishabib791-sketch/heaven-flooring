import { QuoteWizard } from "../components/quote/QuoteWizard";
import { site } from "../data/site";
import { Seo } from "../lib/seo";

export function QuotePage() {
  return (
    <>
      <Seo
        title="Free measure and quote"
        description="Book a free flooring measure and quote with Heaven Flooring. Melbourne homes and businesses — supply, installation, or both."
        path="/quote"
      />
      <div className="mx-auto grid max-w-[1440px] gap-12 px-4 py-12 md:grid-cols-12 md:px-6 md:py-16 lg:px-8">
        <div className="md:col-span-5">
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-timber">Free measure & quote</p>
          <h1 className="mt-4 font-serif text-[clamp(2.6rem,6vw,5rem)] leading-[0.92]">
            Tell us about
            <br />
            the space.
          </h1>
          <p className="mt-5 text-charcoal/70">
            Eight short steps. We’ll use this to prepare the site visit — rooms, product direction, timing
            and how to reach you.
          </p>
          <a href={site.phoneHref} className="mt-6 block text-lg">
            Or call {site.phoneDisplay}
          </a>
        </div>
        <div className="md:col-span-7">
          <QuoteWizard />
        </div>
      </div>
    </>
  );
}
