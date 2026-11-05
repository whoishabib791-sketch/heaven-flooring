import { Link } from "react-router-dom";
import { EditorialHeading } from "../components/ui/EditorialHeading";
import { Picture } from "../components/media/Picture";
import { spaces } from "../data/spaces";
import { Seo } from "../lib/seo";

export function ProjectsPage() {
  return (
    <>
      <Seo
        title="Projects"
        description="Room types Heaven Flooring specifies for — living, kitchen, bedroom, apartment and workplace. Reference photography, not claimed installations."
        path="/projects"
      />
      <div className="mx-auto max-w-[1440px] px-4 py-12 md:px-6 md:py-16 lg:px-8">
        <EditorialHeading eyebrow="Projects">
          Rooms this
          <br />
          work is for.
        </EditorialHeading>
        <p className="mt-5 max-w-2xl text-charcoal/70">
          Heaven Flooring’s current site does not publish a project gallery. These are curated room
          references with honest product guidance — not invented clients, suburbs or case-study copy.
        </p>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {spaces.map((space) => (
            <Link key={space.slug} to={`/projects/${space.slug}`} className="group no-underline">
              <Picture src={space.image} alt={space.imageAlt} className="media-zoom aspect-[16/11]" />
              <p className="mt-4 font-mono text-[11px] tracking-[0.16em] uppercase text-timber">
                {space.floorType}
              </p>
              <h2 className="font-serif text-4xl">{space.title}</h2>
              <p className="mt-2 text-charcoal/70">{space.summary}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
