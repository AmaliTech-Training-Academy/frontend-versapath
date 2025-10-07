import { Button } from "@/components/ui/button";
import { ArrowRightCircle } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="pt-6 lg:px-16 md:pt-8 px-4 w-full">
      <div className="container">
        <div className="grid lg:grid-cols-2 md:grid-cols-2  md:px-4 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl  lg:text-6xl font-bold leading-tight text-brand-primary-text">
              Take Charge of Your Growth
            </h1>
            <p className="text-lg md:text-xl text-gray-text-weak leading-relaxed">
              Build the skills that matter with AI-guided roadmaps designed for
              your career goals.
            </p>
            <div className="flex flex-col md:my-4 sm:flex-row gap-4">
              <Button size="lg" className="text-base">
                Start Your Learning Path
                <ArrowRightCircle className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden ">
            <Image
              src="/images/study-group-african-people 1.png"
              alt="People learning together"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
      
    </section>
  );
}
