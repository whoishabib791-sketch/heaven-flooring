import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { categories } from "../../data/categories";
import { site } from "../../data/site";
import { cn } from "../../lib/cn";
import { useShop } from "../../store/ShopContext";
import { Button } from "../ui/Button";

const links = [
  { to: "/flooring", label: "Flooring", children: categories.map((c) => ({ to: `/flooring/${c.slug}`, label: c.navLabel })) },
  { to: "/find-your-floor", label: "Find your floor" },
  { to: "/projects", label: "Projects" },
  {
    to: "/services",
    label: "Services",
    children: [
      { to: "/services#supply", label: "Supply" },
      { to: "/services#installation", label: "Installation" },
      { to: "/services#delivery", label: "Delivery" },
    ],
  },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [flooringOpen, setFlooringOpen] = useState(false);
  const shop = useShop();

  return (
    <header className="sticky top-0 z-40 border-b border-stone/80 bg-canvas/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-3 md:px-6 lg:px-8">
        <Link to="/" className="shrink-0 no-underline" onClick={() => setOpen(false)}>
          <span className="block font-serif text-[1.45rem] leading-none text-ink">Heaven</span>
          <span className="block font-mono text-[9px] tracking-[0.28em] uppercase text-timber">Flooring Melbourne</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {links.map((link) =>
            link.children ? (
              <div key={link.to} className="relative group">
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    cn(
                      "text-[12px] tracking-[0.14em] uppercase no-underline",
                      isActive ? "text-ink" : "text-charcoal/70 hover:text-ink",
                    )
                  }
                >
                  {link.label}
                </NavLink>
                <div className="invisible absolute top-full left-0 z-20 min-w-52 border border-stone bg-cream py-2 opacity-0 shadow-none group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  {link.children.map((child) => (
                    <Link
                      key={child.to}
                      to={child.to}
                      className="block px-4 py-2.5 text-[12px] tracking-[0.12em] uppercase no-underline hover:bg-canvas"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    "text-[12px] tracking-[0.14em] uppercase no-underline",
                    isActive ? "text-ink" : "text-charcoal/70 hover:text-ink",
                  )
                }
              >
                {link.label}
              </NavLink>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link to="/compare" className="text-[11px] tracking-[0.14em] uppercase no-underline text-charcoal/70">
            Compare{shop.compare.length ? ` (${shop.compare.length})` : ""}
          </Link>
          <Link to="/flooring?saved=1" className="text-[11px] tracking-[0.14em] uppercase no-underline text-charcoal/70">
            Saved{shop.favourites.length ? ` (${shop.favourites.length})` : ""}
          </Link>
          <Button to="/quote">Free measure & quote</Button>
        </div>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center border border-stone lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden className="flex w-5 flex-col gap-1.5">
            <span className="block h-px bg-ink" />
            <span className="block h-px bg-ink" />
            <span className="block h-px bg-ink" />
          </span>
        </button>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-t border-stone bg-canvas px-4 py-4 lg:hidden">
          <nav className="flex flex-col" aria-label="Mobile">
            <Link to="/flooring" className="min-h-12 py-3 text-[13px] tracking-[0.14em] uppercase no-underline" onClick={() => setOpen(false)}>
              Flooring
            </Link>
            <button
              type="button"
              className="min-h-10 text-left text-[12px] tracking-[0.12em] uppercase text-timber"
              onClick={() => setFlooringOpen((v) => !v)}
            >
              {flooringOpen ? "Hide types" : "Show types"}
            </button>
            {flooringOpen
              ? categories.map((c) => (
                  <Link
                    key={c.slug}
                    to={`/flooring/${c.slug}`}
                    className="min-h-11 py-2 pl-3 text-[13px] no-underline"
                    onClick={() => setOpen(false)}
                  >
                    {c.navLabel}
                  </Link>
                ))
              : null}
            {[
              ["/find-your-floor", "Find your floor"],
              ["/projects", "Projects"],
              ["/services", "Services"],
              ["/about", "About"],
              ["/contact", "Contact"],
              ["/compare", `Compare${shop.compare.length ? ` (${shop.compare.length})` : ""}`],
            ].map(([to, label]) => (
              <Link key={to} to={to} className="min-h-12 py-3 text-[13px] tracking-[0.14em] uppercase no-underline" onClick={() => setOpen(false)}>
                {label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-2">
            <Button to="/quote" className="w-full" onClick={() => setOpen(false)}>
              Free measure & quote
            </Button>
            <Button href={site.phoneHref} variant="line" className="w-full">
              Call {site.phoneDisplay}
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
