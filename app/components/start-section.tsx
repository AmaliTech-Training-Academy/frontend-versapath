import { Card } from "@/components/ui/card";
import { stats ,features} from "@/lib/api/landing-page-data";
import { CheckCircle2 } from "lucide-react";
import { InstructorCTA } from "./instructor-cta";

export const StatsSection = () => {
  return (
    <section className="py-20 lg:px-16 md:px-8 px-4 bg-[#1A1015] ">
      <div className="container mx-auto flex justify-center">
        <div className="w-full lg:max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-12 mb-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-base-light-white text-balance leading-tight">
                Level Up Your Skills. Unlock Your Future.
              </h2>
            </div>

            <div className="space-y-4 grid lg:grid-cols-1 md:grid-cols-2">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-3">
                  <CheckCircle2 className="h-8 w-8 bg-brand-primary-stroke-strong rounded-full p-1.5 text-amber-text shrink-0 mt-2" />
                  <div>
                    <div className="font-semibold text-lg text-base-light-white">
                      {feature.title}
                    </div>
                    <div className="text-sm text-base-light-white font-extralight">
                      {feature.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {stats.map((stat) => (
              <Card
                key={stat.label}
                className="py-4 text-center bg-brand-primary-stroke-strong  border-0"
              >
                <div className="text-4xl font-bold mb-1 text-amber-text">
                  {stat.value}
                </div>
                <div className="text-base-light-white">{stat.label}</div>
              </Card>
            ))}
          </div>
          <InstructorCTA />
        </div>
      </div>
    </section>
  );
};
