import { Link } from "react-router-dom";
import { categories } from "../../data/categories";
import { site } from "../../data/site";

export function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-14 md:grid-cols-12 md:px-6 lg:px-8 lg:py-20">
        <div className="md:col-span-5">
          <p className="font-serif text-4xl">Heaven Flooring</p>
          <p className="mt-4 max-w-md text-[15px] text-stone">
            Flooring selection, supply and installation for Melbourne homes and businesses. Based in South
            Yarra — we come to you for the measure.
          </p>
          <p className="mt-6 font-mono text-[12px] tracking-[0.16em] uppercase text-taupe">
            {site.address.line}
          </p>
          <a href={site.phoneHref} className="mt-2 block text-lg text-cream no-underline">
            {site.phoneDisplay}
          </a>
        </div>
        <div className="md:col-span-3">
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-taupe">Flooring</p>
          <ul className="mt-4 space-y-2">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link to={`/flooring/${c.slug}`} className="text-cream/85 no-underline hover:text-cream">
                  {c.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/flooring" className="text-cream/85 no-underline hover:text-cream">
                All floors
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-taupe">Visit</p>
          <ul className="mt-4 space-y-2">
            {[
              ["/find-your-floor", "Find your floor"],
              ["/compare", "Compare"],
              ["/projects", "Projects"],
              ["/services", "Services"],
              ["/quote", "Measure & quote"],
              ["/about", "About"],
              ["/contact", "Contact"],
              ["/faq", "Questions"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="text-cream/85 no-underline hover:text-cream">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-taupe">Next step</p>
          <Link
            to="/quote"
            className="mt-4 inline-flex min-h-12 items-center bg-cream px-4 text-[11px] tracking-[0.16em] uppercase text-ink no-underline"
          >
            Free measure
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-4 py-5 text-[12px] text-taupe md:flex-row md:justify-between md:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Heaven Flooring. Melbourne, Australia.</p>
          <p>Existing product URLs preserved at /products/…</p>
        </div>
      </div>
    </footer>
  );
}
