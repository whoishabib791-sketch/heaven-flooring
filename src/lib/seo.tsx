import { useEffect } from "react";
import { site } from "../data/site";

type SeoProps = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article" | "product";
};

export function Seo({
  title,
  description,
  path,
  image = "/images/rooms/lounge.jpg",
  type = "website",
}: SeoProps) {
  const url = `${site.origin}${path}`;
  const fullTitle = title.includes("Heaven Flooring") ? title : `${title} | Heaven Flooring`;

  useEffect(() => {
    document.title = fullTitle;
    setMeta("description", description);
    setMeta("og:title", fullTitle, "property");
    setMeta("og:description", description, "property");
    setMeta("og:url", url, "property");
    setMeta("og:type", type === "product" ? "website" : type, "property");
    setMeta("og:image", image.startsWith("http") ? image : `${site.origin}${image}`, "property");
    setLink("canonical", url);
  }, [description, fullTitle, image, type, url]);

  return null;
}

function setMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let el = document.head.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.append(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.append(el);
  }
  el.setAttribute("href", href);
}

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: site.name,
    telephone: site.phone,
    url: site.origin,
    image: `${site.origin}/images/rooms/lounge.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.suburb,
      addressRegion: site.address.state,
      postalCode: site.address.postcode,
      addressCountry: "AU",
    },
    areaServed: "Melbourne",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Flooring",
      itemListElement: [
        "Hybrid flooring",
        "Engineered timber",
        "Laminate",
        "Carpet",
        "Parquetry",
        "Flooring installation",
      ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.origin}${item.path}`,
    })),
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
