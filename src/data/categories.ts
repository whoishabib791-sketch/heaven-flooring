export type CategorySlug =
  | "hybrid"
  | "engineered-timber"
  | "laminate"
  | "carpet"
  | "parquetry";

export type Category = {
  slug: CategorySlug;
  label: string;
  navLabel: string;
  short: string;
  who: string;
  consider: string;
  rooms: string;
  install: string;
  image: string;
  imageAlt: string;
};

export const categories: Category[] = [
  {
    slug: "hybrid",
    label: "Hybrid",
    navLabel: "Hybrid",
    short: "Water-resistant, durable and practical for busy Melbourne homes.",
    who: "A strong fit for kitchens, laundries, hallways and open-plan living where spills and daily wear are part of the brief.",
    consider: "Hybrid is a timber-look floor with a rigid waterproof core. It will not have the same feel or refinishing path as real hardwood.",
    rooms: "Kitchens, living areas, apartments and light-commercial spaces.",
    install: "Typically floated as a click-lock floor over a sound, dry, level subfloor — including many existing tiles or concrete slabs.",
    image: "/images/rooms/modern.jpg",
    imageAlt: "Open-plan Melbourne living space with wide-plank timber-look flooring",
  },
  {
    slug: "engineered-timber",
    label: "Engineered Timber",
    navLabel: "Engineered Timber",
    short: "Real timber character with greater structural stability.",
    who: "Living rooms, bedrooms and homes where the warmth of a genuine hardwood surface is the priority.",
    consider: "Engineered timber has a real hardwood wear layer. It is not the same as a waterproof hybrid and needs more care around wet areas.",
    rooms: "Living rooms, bedrooms and whole-home schemes away from constantly wet rooms.",
    install: "Click or tongue-and-groove systems, depending on the range. Subfloor condition and acclimatisation matter.",
    image: "/images/rooms/lounge.jpg",
    imageAlt: "Living room with warm wide-plank timber flooring in natural light",
  },
  {
    slug: "laminate",
    label: "Laminate",
    navLabel: "Laminate",
    short: "Durable timber-look flooring with strong everyday value.",
    who: "Homes that want a timber appearance and straightforward maintenance at a more accessible product tier.",
    consider: "Laminate is water-resistant rather than waterproof. Standing water and wet rooms need more caution than hybrid.",
    rooms: "Bedrooms, living rooms and apartments with moderate moisture risk.",
    install: "Usually a floating click-lock installation over a prepared subfloor.",
    image: "/images/rooms/living-oak.jpg",
    imageAlt: "Sunlit living room with light oak-look plank flooring",
  },
  {
    slug: "carpet",
    label: "Carpet",
    navLabel: "Carpet",
    short: "Warmth, softness and comfort.",
    who: "Bedrooms, quieter living rooms and offices where acoustic comfort and underfoot softness matter.",
    consider: "Carpet is not a wet-area floor. Fibre, pile and colourway should be matched to traffic and cleaning habits.",
    rooms: "Bedrooms, studies and selected living spaces.",
    install: "Professionally laid over suitable underlay, with attention to joins, stairs and door clearances.",
    image: "/images/rooms/bedroom-carpet.jpg",
    imageAlt: "Bedroom interior with soft carpet underfoot",
  },
  {
    slug: "parquetry",
    label: "Parquetry",
    navLabel: "Parquetry",
    short: "Architectural patterns including herringbone and other verified configurations.",
    who: "Entryways, living rooms and interiors that want a patterned floor as a designed surface, not a background.",
    consider: "Patterned floors need more setting-out and a flatter substrate. They read as a feature, so sample the scale in the room.",
    rooms: "Living rooms, entries and selected commercial interiors.",
    install: "Pattern layout is confirmed on site. Installation is more involved than a straight-lay floating plank.",
    image: "/images/rooms/herringbone.jpg",
    imageAlt: "Interior with herringbone patterned timber flooring",
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
