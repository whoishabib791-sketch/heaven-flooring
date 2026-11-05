import { useState } from "react";
import { cn } from "../../lib/cn";

export function Picture({
  src,
  alt,
  className,
  imgClassName,
  width,
  height,
  eager,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  width?: number;
  height?: number;
  eager?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const show = failed ? "/images/rooms/living-oak.jpg" : src;

  return (
    <div className={cn("overflow-hidden bg-stone", className)}>
      <img
        src={show}
        alt={alt}
        width={width}
        height={height}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className={cn("h-full w-full object-cover", imgClassName)}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
