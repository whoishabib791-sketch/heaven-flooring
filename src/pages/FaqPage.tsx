import { Button } from "../components/ui/Button";
import { faqs, hybridCostNote } from "../data/faqs";
import { JsonLd, Seo, faqJsonLd } from "../lib/seo";

export function FaqPage() {
  return (
    <>
      <Seo
        title="Flooring questions"
        description="Answers about Heaven Flooring’s Melbourne supply and installation — hybrid, laminate, engineered timber, carpet, parquetry, and free measure and quote."
        path="/faq"
      />
      <JsonLd data={faqJsonLd(faqs)} />
      <div className="mx-auto max-w-[900px] px-4 py-12 md:px-6 md:py-16">
        <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-timber">Questions</p>
        <h1 className="mt-3 font-serif text-[clamp(2.6rem,6vw,4.8rem)] leading-[0.92]">
          Before you pick
          <br />
          a floor.
        </h1>
        <div className="mt-10 divide-y divide-stone border-y border-stone">
          {faqs.map((f) => (
            <details key={f.q} className="py-5">
              <summary className="cursor-pointer font-serif text-2xl">{f.q}</summary>
              <p className="mt-3 text-charcoal/75">{f.a}</p>
            </details>
          ))}
        </div>
        <p className="mt-8 text-sm text-charcoal/60">{hybridCostNote}</p>
        <Button to="/quote" className="mt-8">
          Free measure & quote
        </Button>
      </div>
    </>
  );
}
