"use client";

import { categories } from "@/lib/api/landing-page-data";
import Image from "next/image";

export default function CategorySection() {
  return (
    <section className="w-full">
      <div className="grid grid-cols-5">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="relative group overflow-hidden cursor-pointer"
          >
            <Image
              src={cat.image}
              alt={cat.title}
              width={400}
              height={200}
              className="object-cover w-full h-40 group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition duration-300 flex items-end">
              <h3 className="text-base-light-white text-lg font-semibold p-3">
                {cat.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
