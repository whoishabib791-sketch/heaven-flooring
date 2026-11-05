export type Space = {
  slug: string;
  title: string;
  floorType: string;
  category: string;
  image: string;
  imageAlt: string;
  summary: string;
  suited: string[];
};

export const spaces: Space[] = [
  {
    slug: "open-plan-living",
    title: "Open-plan living",
    floorType: "Hybrid or engineered timber",
    category: "hybrid",
    image: "/images/rooms/lounge.jpg",
    imageAlt: "Open living room with wide-plank timber flooring",
    summary:
      "One continuous floor across living and dining is the usual Melbourne brief. Hybrid handles the traffic; engineered timber is the choice when the surface itself should be hardwood.",
    suited: ["hybrid", "engineered-timber"],
  },
  {
    slug: "kitchen",
    title: "Kitchen",
    floorType: "Hybrid",
    category: "hybrid",
    image: "/images/rooms/modern.jpg",
    imageAlt: "Open kitchen and living floor in a bright interior",
    summary:
      "Kitchens need a floor that can take spills. Heaven Flooring's hybrid ranges are specified for wet-adjacent rooms; laminate is water-resistant rather than waterproof.",
    suited: ["hybrid"],
  },
  {
    slug: "bedroom",
    title: "Bedroom",
    floorType: "Carpet, laminate or timber",
    category: "carpet",
    image: "/images/rooms/bedroom-carpet.jpg",
    imageAlt: "Bedroom with soft carpet",
    summary:
      "Bedrooms can take the quieter, softer option. Carpet is the comfort choice. Laminate and timber work when the whole home should read as one plane.",
    suited: ["carpet", "laminate", "engineered-timber"],
  },
  {
    slug: "apartment",
    title: "Apartment",
    floorType: "Hybrid or laminate",
    category: "laminate",
    image: "/images/rooms/apartment.jpg",
    imageAlt: "Apartment interior with light flooring",
    summary:
      "Apartments often need a floor that installs over an existing slab or tiles, with acoustic comfort in mind. Floating hybrid and laminate are the usual starting point.",
    suited: ["hybrid", "laminate"],
  },
  {
    slug: "workplace",
    title: "Workplace",
    floorType: "Hybrid, carpet or parquetry",
    category: "parquetry",
    image: "/images/rooms/office.jpg",
    imageAlt: "Office interior with hard flooring",
    summary:
      "Commercial rooms trade on durability, slip data and a finish that still looks considered. Hybrid, carpet tiles and patterned timber are all in the range.",
    suited: ["hybrid", "carpet", "parquetry"],
  },
];

export function getSpace(slug: string) {
  return spaces.find((s) => s.slug === slug);
}
