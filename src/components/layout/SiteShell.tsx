import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ShopProvider, useShop } from "../../store/ShopContext";
import { Footer } from "./Footer";
import { Navigation } from "./Navigation";
import { Link } from "react-router-dom";

export function SiteShell() {
  return (
    <ShopProvider>
      <ShellInner />
    </ShopProvider>
  );
}

function ShellInner() {
  const { pathname } = useLocation();
  const shop = useShop();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navigation />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      {shop.compare.length > 0 && !pathname.startsWith("/compare") ? (
        <Link
          to="/compare"
          className="fixed right-4 bottom-[5.5rem] z-40 min-h-12 bg-ink px-4 text-[11px] tracking-[0.14em] uppercase text-cream no-underline lg:bottom-6"
        >
          Compare {shop.compare.length} floors
        </Link>
      ) : null}
    </>
  );
}
