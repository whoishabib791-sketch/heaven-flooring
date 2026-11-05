import { Link } from "react-router-dom";
import { cn } from "../../lib/cn";

type Variant = "ink" | "ghost" | "line" | "cream";

const styles: Record<Variant, string> = {
  ink: "bg-ink text-cream hover:bg-charcoal",
  ghost: "bg-transparent text-cream border border-cream/35 hover:border-cream",
  line: "bg-transparent text-ink border border-ink/25 hover:border-ink",
  cream: "bg-cream text-ink hover:bg-canvas",
};

type Props = {
  to?: string;
  href?: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
};

export function Button({
  to,
  href,
  children,
  variant = "ink",
  className,
  type = "button",
  onClick,
}: Props) {
  const cls = cn(
    "inline-flex min-h-12 items-center justify-center px-5 text-[12px] font-medium tracking-[0.14em] uppercase no-underline transition-colors md:min-h-[3.1rem] md:px-6 md:text-[13px]",
    styles[variant],
    className,
  );

  if (to) {
    return (
      <Link to={to} className={cls} onClick={onClick}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cls} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} className={cls} onClick={onClick}>
      {children}
    </button>
  );
}

export function TextLink({
  to,
  href,
  children,
  className,
}: {
  to?: string;
  href?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const cls = cn(
    "inline-flex items-center gap-2 text-[12px] font-medium tracking-[0.16em] uppercase no-underline underline-offset-4 hover:underline",
    className,
  );
  if (to) {
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={cls}>
      {children}
    </a>
  );
}
