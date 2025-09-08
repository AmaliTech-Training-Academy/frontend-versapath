import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import Image from "next/image";
import React from "react";

export const MainSkillContents = () => {
  return (
    <section className="w-full p-4 pt-0 space-y-6 overflow-y-auto tabs_scrollbar border-s-2 border-gray-stroke-weak/70">
      <h2 className="justify-start text-lg font-semibold leading-relaxed text-start text-gray-text-strong/90">
        What is JavaScript?
      </h2>
      <div className="w-full aspect-video max-h-[500px] relative top-0 left-0">
        <Image
          src={"/images/javascript.png"}
          alt="Player image"
          fill
          priority={false}
          className=" blur-[3px]"
        />
        <div className="absolute top-0 left-0 z-10 w-full h-full bg-base-dark-overlay/30 " />
        <div className="absolute z-20 inline-flex items-center justify-center p-3 -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 bg-base-light-white/40">
          <Play size={30} className="text-base-light-white" />
        </div>
      </div>
      <article className=" text-start text-gray-text-weak">
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
        illo inventore veritatis et quasi architecto beatae vitae dicta sunt
        explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
        odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
        voluptatem sequi nesciunt.lorem100 Lorem ipsum dolor sit amet
      </article>
      <div className="flex justify-end gap-4">
        <Button variant={"ghost"} className="px-4">
          Previous
        </Button>
        <Button variant={"default"} className="px-4">
          Next
        </Button>
      </div>
    </section>
  );
};
