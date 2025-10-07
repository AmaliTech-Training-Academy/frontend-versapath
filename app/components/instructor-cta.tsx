import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRightCircle } from "lucide-react";
import Image from "next/image";

export function InstructorCTA() {
  return (
    <section className="w-full py-16 ">
      <div className="container mx-auto px-4 flex justify-center">
        <Card className="overflow-hidden p-0">
          <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-0 ">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
                Be the Guide Every Learner Remembers
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Share your expertise, structures, insights, and tools that make
                mentoring easier.
              </p>
              <div>
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Book a Demo
                  <ArrowRightCircle className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="relative min-h-[300px] ">
              <Image
                src="/images/mentor.jpg"
                alt="Instructor mentoring students"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
