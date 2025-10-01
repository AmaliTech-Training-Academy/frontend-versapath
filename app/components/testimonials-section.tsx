import { testimonials } from "@/lib/api/landing-page-data";
import { TestimonialCard } from "./testimonial-card";

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-10 bg-background lg:px-16 px-4">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            What are our Learners Saying?
          </h2>
        </div>

        <div className="flex justify-center">
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-12 w-full max-w-4xl">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} {...testimonial} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
