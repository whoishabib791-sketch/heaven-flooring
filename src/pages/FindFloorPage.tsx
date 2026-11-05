import { FloorSelector } from "../components/selector/FloorSelector";
import { EditorialHeading } from "../components/ui/EditorialHeading";
import { Seo } from "../lib/seo";

export function FindFloorPage() {
  return (
    <>
      <Seo
        title="Find your floor"
        description="Answer a few questions and we’ll narrow Heaven Flooring’s Melbourne range to the hybrid, timber, laminate, carpet or parquetry that suits your space."
        path="/find-your-floor"
      />
      <div className="mx-auto max-w-[1440px] px-4 py-12 md:px-6 md:py-16 lg:px-8">
        <EditorialHeading eyebrow="Find your floor">
          Not sure where
          <br />
          to start?
        </EditorialHeading>
        <p className="mt-5 max-w-xl text-charcoal/70">
          Answer a few questions and we’ll narrow down the flooring that suits your space.
        </p>
        <div className="mt-10">
          <FloorSelector />
        </div>
      </div>
    </>
  );
}
