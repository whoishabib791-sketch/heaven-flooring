import { useState } from "react";
import { productImage, type Product } from "../../data/products";
import { Picture } from "../media/Picture";

export function ProductGallery({ product }: { product: Product }) {
  const images = product.images.length ? product.images : [productImage(product)];
  const [index, setIndex] = useState(0);
  const current = images[index] ?? images[0];

  return (
    <div>
      <Picture
        src={current}
        alt={`${product.name} — image ${index + 1} of ${images.length}`}
        className="aspect-[4/3] w-full bg-stone"
        eager
      />
      {images.length > 1 ? (
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              aria-label={`Show image ${i + 1}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className={`h-16 w-16 shrink-0 border ${i === index ? "border-ink" : "border-stone"}`}
            >
              <Picture src={src} alt="" className="h-full w-full" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
