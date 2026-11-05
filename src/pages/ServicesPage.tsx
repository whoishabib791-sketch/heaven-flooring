import { Button } from "../components/ui/Button";
import { EditorialHeading } from "../components/ui/EditorialHeading";
import { Picture } from "../components/media/Picture";
import { faqs } from "../data/faqs";
import { JsonLd, Seo, faqJsonLd } from "../lib/seo";

const services = [
  {
    id: "supply",
    title: "Supply",
    image: "/images/site/model3.jpg",
    imageAlt: "Flooring sample boards in a range of timber tones",
    body: "Heaven Flooring supplies hybrid, engineered timber, laminate, carpet, carpet tiles and parquetry for residential and commercial Melbourne projects. The live catalogue is the range — we help you choose from it, not around it.",
  },
  {
    id: "installation",
    title: "Installation",
    image: "/images/rooms/modern.jpg",
    imageAlt: "Finished open-plan interior with timber flooring",
    body: "Installation covers the flooring types in the range: hybrid, laminate, engineered timber, carpet and parquetry, including floating floors. Subfloor preparation and levelling are assessed on the free measure. Floor repairs and restoration are offered where the existing floor allows.",
  },
  {
    id: "delivery",
    title: "Delivery",
    image: "/images/rooms/house-interior.jpg",
    imageAlt: "Melbourne home at dusk",
    body: "Delivery is coordinated across Melbourne so product arrives when the install is ready. Residential and commercial sites are both serviced.",
  },
];

export function ServicesPage() {
  const visibleFaqs = faqs.filter((f) => /install|measure|over tiles/i.test(f.q));
  return (
    <>
      <Seo
        title="Flooring supply, installation and delivery Melbourne"
        description="Heaven Flooring supplies and installs hybrid, timber, laminate, carpet and parquetry across Melbourne, with coordinated delivery and a free measure and quote."
        path="/services"
      />
      <JsonLd data={faqJsonLd(visibleFaqs)} />
      <div className="mx-auto max-w-[1440px] px-4 py-12 md:px-6 md:py-16 lg:px-8">
        <EditorialHeading eyebrow="Services">
          Supply.
          <br />
          Installation.
          <br />
          Delivery.
        </EditorialHeading>
        <p className="mt-5 max-w-xl text-charcoal/70">
          The three parts of the job stay connected so the floor you choose is the floor that arrives and
          goes down.
        </p>
      </div>
      {services.map((service) => (
        <section key={service.id} id={service.id} className="scroll-mt-24 border-t border-stone">
          <div className="mx-auto grid max-w-[1440px] gap-8 px-4 py-12 md:grid-cols-12 md:px-6 md:py-16 lg:px-8">
            <Picture src={service.image} alt={service.imageAlt} className="aspect-[4/3] md:col-span-6" />
            <div className="md:col-span-6 md:py-4">
              <h2 className="font-serif text-5xl">{service.title}</h2>
              <p className="mt-5 text-charcoal/75">{service.body}</p>
              <Button to="/quote" className="mt-8">
                Book a measure
              </Button>
            </div>
          </div>
        </section>
      ))}
      <section className="bg-cream py-14">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <h2 className="font-serif text-4xl">Installation notes</h2>
          <div className="mt-8 divide-y divide-stone border-y border-stone">
            {visibleFaqs.map((f) => (
              <details key={f.q} className="py-5">
                <summary className="cursor-pointer font-serif text-2xl">{f.q}</summary>
                <p className="mt-3 max-w-3xl text-charcoal/75">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
