import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { categories } from "../../data/categories";
import { getProduct } from "../../data/products";
import { site } from "../../data/site";
import { Button } from "../ui/Button";
import { Chip } from "../product/FilterDrawer";

const needs = ["Supply only", "Supply + installation", "Installation only", "Not sure"];
const floors = [...categories.map((c) => c.label), "Not sure"];
const spaces = ["Home", "Apartment", "Office", "Retail", "Other"];
const areas = ["I know the m²", "Small room", "Multiple rooms", "Whole home", "Commercial area", "Not sure"];
const timing = ["ASAP", "1–3 months", "3–6 months", "Just researching"];
const contactMethods = ["Phone", "Email", "Either"];

type Draft = {
  need?: string;
  flooring?: string;
  space?: string;
  area?: string;
  sqm?: string;
  suburb?: string;
  postcode?: string;
  timing?: string;
  files: string[];
  name?: string;
  phone?: string;
  email?: string;
  contact?: string;
};

export function QuoteWizard() {
  const [params] = useSearchParams();
  const preset = getProduct(params.get("product") ?? "");
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [draft, setDraft] = useState<Draft>({
    files: [],
    flooring: preset?.categoryLabel,
  });

  const steps = useMemo(
    () => [
      {
        title: "What do you need?",
        body: (
          <Choices
            options={needs}
            value={draft.need}
            onChange={(need) => setDraft((d) => ({ ...d, need }))}
          />
        ),
        valid: Boolean(draft.need),
      },
      {
        title: "What flooring are you considering?",
        body: (
          <div>
            {preset ? (
              <p className="mb-4 border border-stone bg-canvas px-4 py-3 text-sm">
                Starting from <strong>{preset.name}</strong>. You can still change the category.
              </p>
            ) : null}
            <Choices
              options={floors}
              value={draft.flooring}
              onChange={(flooring) => setDraft((d) => ({ ...d, flooring }))}
            />
          </div>
        ),
        valid: Boolean(draft.flooring),
      },
      {
        title: "What space?",
        body: (
          <Choices
            options={spaces}
            value={draft.space}
            onChange={(space) => setDraft((d) => ({ ...d, space }))}
          />
        ),
        valid: Boolean(draft.space),
      },
      {
        title: "Approximate area",
        body: (
          <div className="space-y-4">
            <Choices options={areas} value={draft.area} onChange={(area) => setDraft((d) => ({ ...d, area }))} />
            {draft.area === "I know the m²" ? (
              <label className="block">
                <span className="mb-2 block font-mono text-[10px] tracking-[0.16em] uppercase text-timber">
                  Area (m²)
                </span>
                <input
                  className="field"
                  inputMode="decimal"
                  value={draft.sqm ?? ""}
                  onChange={(e) => setDraft((d) => ({ ...d, sqm: e.target.value }))}
                />
              </label>
            ) : null}
          </div>
        ),
        valid: Boolean(draft.area),
      },
      {
        title: "Location",
        body: (
          <div className="grid gap-4 sm:grid-cols-2">
            <label>
              <span className="mb-2 block font-mono text-[10px] tracking-[0.16em] uppercase text-timber">Suburb</span>
              <input
                className="field"
                value={draft.suburb ?? ""}
                onChange={(e) => setDraft((d) => ({ ...d, suburb: e.target.value }))}
              />
            </label>
            <label>
              <span className="mb-2 block font-mono text-[10px] tracking-[0.16em] uppercase text-timber">Postcode</span>
              <input
                className="field"
                inputMode="numeric"
                value={draft.postcode ?? ""}
                onChange={(e) => setDraft((d) => ({ ...d, postcode: e.target.value }))}
              />
            </label>
          </div>
        ),
        valid: Boolean(draft.suburb && draft.postcode),
      },
      {
        title: "Project timing",
        body: (
          <Choices
            options={timing}
            value={draft.timing}
            onChange={(timing) => setDraft((d) => ({ ...d, timing }))}
          />
        ),
        valid: Boolean(draft.timing),
      },
      {
        title: "Upload",
        body: (
          <div>
            <p className="mb-4 text-sm text-charcoal/70">
              Floorplan, room photos or inspiration — optional. Files stay on this device for the demo; they
              are not uploaded to a server.
            </p>
            <input
              type="file"
              multiple
              accept="image/*,.pdf"
              className="block w-full text-sm"
              onChange={(e) => {
                const names = [...(e.target.files ?? [])].map((f) => f.name);
                setDraft((d) => ({ ...d, files: names }));
              }}
            />
            {draft.files.length ? (
              <ul className="mt-3 text-sm text-charcoal/70">
                {draft.files.map((name) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            ) : null}
          </div>
        ),
        valid: true,
      },
      {
        title: "How should we reach you?",
        body: (
          <div className="grid gap-4">
            <label>
              <span className="mb-2 block font-mono text-[10px] tracking-[0.16em] uppercase text-timber">Name</span>
              <input
                className="field"
                autoComplete="name"
                value={draft.name ?? ""}
                onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
              />
            </label>
            <label>
              <span className="mb-2 block font-mono text-[10px] tracking-[0.16em] uppercase text-timber">Phone</span>
              <input
                className="field"
                autoComplete="tel"
                value={draft.phone ?? ""}
                onChange={(e) => setDraft((d) => ({ ...d, phone: e.target.value }))}
              />
            </label>
            <label>
              <span className="mb-2 block font-mono text-[10px] tracking-[0.16em] uppercase text-timber">Email</span>
              <input
                className="field"
                type="email"
                autoComplete="email"
                value={draft.email ?? ""}
                onChange={(e) => setDraft((d) => ({ ...d, email: e.target.value }))}
              />
            </label>
            <div>
              <p className="mb-2 font-mono text-[10px] tracking-[0.16em] uppercase text-timber">
                Preferred contact
              </p>
              <Choices
                options={contactMethods}
                value={draft.contact}
                onChange={(contact) => setDraft((d) => ({ ...d, contact }))}
              />
            </div>
          </div>
        ),
        valid: Boolean(draft.name && draft.phone && draft.email && draft.contact),
      },
    ],
    [draft, preset],
  );

  const current = steps[step];

  if (done) {
    return (
      <div className="border border-stone bg-cream px-6 py-12">
        <p className="font-serif text-4xl">Request received on this demo.</p>
        <p className="mt-4 max-w-lg text-charcoal/75">
          In production this would email the Heaven Flooring team. For now, call {site.phoneDisplay} to
          book the free measure.
        </p>
        <Button href={site.phoneHref} className="mt-6">
          Call {site.phoneDisplay}
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!current.valid) return;
        if (step < steps.length - 1) setStep((s) => s + 1);
        else setDone(true);
      }}
    >
      <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-timber">
        Step {step + 1} of {steps.length}
      </p>
      <div className="mt-3 h-1 bg-stone">
        <div className="h-full bg-timber" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
      </div>
      <h2 className="mt-8 font-serif text-[clamp(2rem,4vw,3.4rem)] leading-none">{current.title}</h2>
      <div className="mt-8">{current.body}</div>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        {step > 0 ? (
          <Button type="button" variant="line" onClick={() => setStep((s) => s - 1)}>
            Back
          </Button>
        ) : null}
        <Button type="submit" className={!current.valid ? "pointer-events-none opacity-40" : undefined}>
          {step === steps.length - 1 ? "Request my free measure & quote" : "Continue"}
        </Button>
      </div>
    </form>
  );
}

function Choices({
  options,
  value,
  onChange,
}: {
  options: string[];
  value?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <Chip key={opt} active={value === opt} onClick={() => onChange(opt)}>
          {opt}
        </Chip>
      ))}
    </div>
  );
}
