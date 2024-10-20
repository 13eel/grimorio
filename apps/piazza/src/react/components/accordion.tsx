import {
  AccordionContent,
  AccordionItem,
  Accordion as AccordionRoot,
  AccordionTrigger,
} from "@pkg/ui/components/ui/accordion";

export function Accordion() {
  return (
    <AccordionRoot type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
    </AccordionRoot>
  );
}
