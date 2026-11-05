import { Button } from "../components/ui/Button";
import { Seo } from "../lib/seo";

export function NotFoundPage() {
  return (
    <>
      <Seo title="Page not found" description="That page is not in the Heaven Flooring library." path="/404" />
      <div className="mx-auto max-w-[720px] px-4 py-24 text-center">
        <h1 className="font-serif text-5xl">This floor isn’t here.</h1>
        <p className="mt-4 text-charcoal/70">The page may have moved. The product library has not.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Button to="/flooring">Browse floors</Button>
          <Button to="/" variant="line">
            Home
          </Button>
        </div>
      </div>
    </>
  );
}
