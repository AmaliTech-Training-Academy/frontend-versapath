import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/api/landing-page-data";

export function FAQSection() {
  return (
    <section
      
      className="py-10 bg-base-dark-black text-base-light-white"
    >
      <div className="container max-w-5xl mx-auto sm:px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg ">
            Find answers to common questions about our platform
          </p>
        </div>

        <Accordion
          type="single"
          collapsible
          className="w-full text-base-light-white  px-4"
        >
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="text-base-light-white"
            >
              <AccordionTrigger className=" text-md">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className=" leading-relaxed">
                {faq.answer}
              </AccordionContent>{" "}
              <hr />
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
