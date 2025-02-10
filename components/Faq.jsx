import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <section className="max-w-4xl mx-auto px-6 py-12">
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 text-center">
        Frequently Asked Questions
      </h2>
      <p className="text-gray-600 text-center mt-2">
        Find answers to common questions about our store and ALC system.
      </p>

      <div className="mt-8 bg-white border rounded-2xl shadow-sm p-6">
        <Accordion type="single" collapsible className="w-full">
          {/* Question 1 */}
          <AccordionItem value="question-1">
            <AccordionTrigger className="text-gray-900 text-sm sm:text-base font-medium">
              How does your consignment store work?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 text-sm">
              We either **purchase** the product from sellers or **list it
              securely** on an **Asset Lock Contract (ALC)**, ensuring safe
              transactions for both buyers and sellers.
            </AccordionContent>
          </AccordionItem>

          {/* Question 2 */}
          <AccordionItem value="question-2">
            <AccordionTrigger className="text-gray-900 text-sm sm:text-base font-medium">
              What is an Asset Lock Contract (ALC)?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 text-sm">
              ALC ensures that the product remains secure until a transaction is
              completed, reducing risks and improving trust between buyers and
              sellers.
            </AccordionContent>
          </AccordionItem>

          {/* Question 3 */}
          <AccordionItem value="question-3">
            <AccordionTrigger className="text-gray-900 text-sm sm:text-base font-medium">
              How can I sell my products here?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 text-sm">
              You can either **sell directly** to us or **list your product
              under ALC** for a safer transaction. Contact our team for more
              details.
            </AccordionContent>
          </AccordionItem>

          {/* Question 4 */}
          <AccordionItem value="question-4">
            <AccordionTrigger className="text-gray-900 text-sm sm:text-base font-medium">
              Do you offer buyer protection?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 text-sm">
              Yes! Every transaction is secured through ALC, ensuring buyers
              receive their products as described.
            </AccordionContent>
          </AccordionItem>

          {/* Question 5 */}
          <AccordionItem value="question-5">
            <AccordionTrigger className="text-gray-900 text-sm sm:text-base font-medium">
              What payment methods do you accept?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 text-sm">
              We accept bank transfers, credit/debit cards, and secure digital
              payments. ALC-based transactions follow the same payment
              structure.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
