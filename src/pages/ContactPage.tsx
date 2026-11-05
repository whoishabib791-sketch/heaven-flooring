import { useState } from "react";
import { Button } from "../components/ui/Button";
import { site } from "../data/site";
import { Seo } from "../lib/seo";

export function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <Seo
        title="Contact Heaven Flooring"
        description="Contact Heaven Flooring in South Yarra. Call 0452 026 969 or request a free measure and quote for Melbourne flooring supply and installation."
        path="/contact"
      />
      <div className="mx-auto grid max-w-[1440px] gap-12 px-4 py-12 md:grid-cols-12 md:px-6 md:py-16 lg:px-8">
        <div className="md:col-span-5">
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-timber">Contact</p>
          <h1 className="mt-4 font-serif text-[clamp(2.6rem,6vw,5rem)] leading-[0.92]">
            Talk to the
            <br />
            Melbourne team.
          </h1>
          <dl className="mt-8 space-y-5">
            <div>
              <dt className="font-mono text-[11px] tracking-[0.16em] uppercase text-timber">Phone</dt>
              <dd className="mt-1 text-xl">
                <a href={site.phoneHref}>{site.phoneDisplay}</a>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] tracking-[0.16em] uppercase text-timber">Address</dt>
              <dd className="mt-1">
                {site.address.street}
                <br />
                {site.address.suburb} {site.address.state} {site.address.postcode}
                <br />
                <span className="text-sm text-charcoal/60">Business address — measures are on site.</span>
              </dd>
            </div>
          </dl>
          <Button to="/quote" className="mt-8">
            Free measure & quote
          </Button>
        </div>
        <div className="md:col-span-7">
          {sent ? (
            <p className="border border-stone bg-cream px-6 py-10">
              Message captured on this demo. Call {site.phoneDisplay} to speak with the team now.
            </p>
          ) : (
            <form
              className="grid gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <label>
                <span className="mb-2 block font-mono text-[10px] tracking-[0.16em] uppercase text-timber">
                  Name
                </span>
                <input className="field" required autoComplete="name" />
              </label>
              <label>
                <span className="mb-2 block font-mono text-[10px] tracking-[0.16em] uppercase text-timber">
                  Phone
                </span>
                <input className="field" required autoComplete="tel" />
              </label>
              <label>
                <span className="mb-2 block font-mono text-[10px] tracking-[0.16em] uppercase text-timber">
                  Email
                </span>
                <input className="field" type="email" required autoComplete="email" />
              </label>
              <label>
                <span className="mb-2 block font-mono text-[10px] tracking-[0.16em] uppercase text-timber">
                  Message
                </span>
                <textarea className="field min-h-32" required />
              </label>
              <Button type="submit">Send message</Button>
            </form>
          )}
          <div className="mt-8 overflow-hidden border border-stone">
            <iframe
              title="Map of 14 Tivoli Road, South Yarra"
              className="aspect-[16/10] w-full grayscale"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://maps.google.com/maps?q=${site.mapsQuery}&z=15&output=embed`}
            />
          </div>
        </div>
      </div>
    </>
  );
}
