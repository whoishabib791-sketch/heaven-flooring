import { useState } from "react";
import { featuredProducts, productImage } from "../../data/products";
import { Picture } from "../media/Picture";

const rooms = [
  { id: "living", label: "Living", image: "/images/rooms/lounge.jpg" },
  { id: "kitchen", label: "Kitchen", image: "/images/rooms/modern.jpg" },
  { id: "bedroom", label: "Bedroom", image: "/images/rooms/bedroom-carpet.jpg" },
] as const;

export function RoomPreview() {
  const floors = featuredProducts(6);
  const [room, setRoom] = useState<(typeof rooms)[number]>(rooms[0]);
  const [floor, setFloor] = useState(floors[0]);

  return (
    <div className="min-w-0">
      <div className="flex flex-wrap gap-2">
        {rooms.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setRoom(item)}
            className={`min-h-12 px-4 text-[12px] tracking-[0.14em] uppercase border ${
              room.id === item.id
                ? "border-ink bg-ink text-cream"
                : "border-stone bg-cream text-ink"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="relative mt-5 overflow-hidden bg-stone">
        <Picture src={room.image} alt={`${room.label} reference interior`} className="aspect-[4/3] w-full sm:aspect-[16/10]" />
        <div className="absolute inset-x-0 bottom-0 h-[38%] overflow-hidden">
          <img
            src={productImage(floor)}
            alt=""
            className="h-full w-full object-cover opacity-90"
          />
        </div>
      </div>
      <p className="mt-3 font-mono text-[10px] leading-relaxed tracking-[0.14em] uppercase text-stone">
        Illustrative only — product image laid into the lower plane, not a photoreal render
      </p>
      <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
        {floors.map((item) => (
          <button
            key={item.slug}
            type="button"
            onClick={() => setFloor(item)}
            className={`w-28 shrink-0 border bg-cream p-2 text-left text-ink ${
              floor.slug === item.slug ? "border-ink" : "border-stone"
            }`}
          >
            <Picture src={productImage(item)} alt="" className="aspect-square" />
            <span className="mt-2 block text-[11px] leading-tight">{item.colour}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
