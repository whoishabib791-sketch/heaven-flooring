import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  runSelector,
  selectorBudgets,
  selectorLooks,
  selectorMatters,
  selectorRooms,
} from "../../data/selector";
import { useFlip } from "../../hooks/useFlip";
import { Chip } from "../product/FilterDrawer";
import { ProductCard } from "../product/ProductCard";
import { Button } from "../ui/Button";

export function FloorSelector({ compact = false }: { compact?: boolean }) {
  const [room, setRoom] = useState<string>();
  const [matters, setMatters] = useState<string[]>([]);
  const [look, setLook] = useState<string>();
  const [budget, setBudget] = useState<string>();
  const [step, setStep] = useState(0);
  const ready = Boolean(room && matters.length && look && budget);
  const result = ready ? runSelector({ room, matters, look, budget }) : null;
  const grid = useRef<HTMLDivElement>(null);
  const capture = useFlip(grid, [result?.products.map((p) => p.slug).join("|")]);

  const toggleMatter = (item: string) => {
    capture();
    setMatters((prev) => (prev.includes(item) ? prev.filter((m) => m !== item) : [...prev, item]));
  };

  return (
    <div className={compact ? "" : "border border-stone bg-cream"}>
      <div className="grid gap-8 p-5 md:p-8 lg:grid-cols-12 lg:p-10">
        <div className="lg:col-span-5">
          <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-timber">Consultation</p>
          <ol className="mt-6 space-y-7">
            <Step n="1" title="Where is the floor going?" active={step === 0} onOpen={() => setStep(0)}>
              <div className="flex flex-wrap gap-2">
                {selectorRooms.map((item) => (
                  <Chip
                    key={item}
                    active={room === item}
                    onClick={() => {
                      capture();
                      setRoom(item);
                      setStep(1);
                    }}
                  >
                    {item}
                  </Chip>
                ))}
              </div>
            </Step>
            <Step n="2" title="What matters most?" active={step === 1} onOpen={() => setStep(1)}>
              <p className="mb-3 text-[13px] text-charcoal/65">Choose as many as you need.</p>
              <div className="flex flex-wrap gap-2">
                {selectorMatters.map((item) => (
                  <Chip key={item} active={matters.includes(item)} onClick={() => toggleMatter(item)}>
                    {item}
                  </Chip>
                ))}
              </div>
            </Step>
            <Step n="3" title="What look do you prefer?" active={step === 2} onOpen={() => setStep(2)}>
              <div className="flex flex-wrap gap-2">
                {selectorLooks.map((item) => (
                  <Chip
                    key={item}
                    active={look === item}
                    onClick={() => {
                      capture();
                      setLook(item);
                      setStep(3);
                    }}
                  >
                    {item}
                  </Chip>
                ))}
              </div>
            </Step>
            <Step n="4" title="Your budget" active={step === 3} onOpen={() => setStep(3)}>
              <div className="flex flex-wrap gap-2">
                {selectorBudgets.map((item) => (
                  <Chip
                    key={item}
                    active={budget === item}
                    onClick={() => {
                      capture();
                      setBudget(item);
                    }}
                  >
                    {item}
                  </Chip>
                ))}
              </div>
              <p className="mt-3 text-[12px] text-charcoal/55">
                These are range positions, not published prices. A measure produces the actual quote.
              </p>
            </Step>
          </ol>
        </div>

        <div className="lg:col-span-7">
          <div className="mb-4 h-px bg-stone" aria-hidden />
          {result ? (
            <>
              <p className="max-w-xl text-[15px] leading-relaxed text-charcoal">{result.reason}</p>
              {result.category ? (
                <p className="mt-2 font-mono text-[11px] tracking-[0.16em] uppercase text-timber">
                  Starting category · {result.category.label}
                </p>
              ) : null}
              <div ref={grid} className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {result.products.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button to={result.category ? `/flooring/${result.category.slug}` : "/flooring"}>
                  See matching floors
                </Button>
                <Button to="/quote" variant="line">
                  Request samples / quote
                </Button>
              </div>
            </>
          ) : (
            <div className="flex min-h-[280px] flex-col justify-between border border-dashed border-stone p-6">
              <p className="font-serif text-3xl leading-tight text-ink">
                Answer the four questions.
                <br />
                We’ll lay out real floors from the catalogue.
              </p>
              <p className="mt-8 text-[14px] text-charcoal/65">
                Nothing here is a generic placeholder range. Matches come from Heaven Flooring’s current
                hybrid, timber, laminate, carpet and parquetry products.
              </p>
              <Link to="/flooring" className="mt-6 text-[12px] tracking-[0.16em] uppercase text-ink">
                Or browse the full library →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Step({
  n,
  title,
  active,
  onOpen,
  children,
}: {
  n: string;
  title: string;
  active: boolean;
  onOpen: () => void;
  children: React.ReactNode;
}) {
  return (
    <li>
      <button type="button" onClick={onOpen} className="flex w-full items-baseline gap-3 text-left">
        <span className="font-mono text-[11px] text-taupe">{n}</span>
        <span className="font-serif text-2xl leading-none">{title}</span>
      </button>
      <div className={active ? "mt-4" : "mt-4 hidden md:block"}>{children}</div>
    </li>
  );
}
