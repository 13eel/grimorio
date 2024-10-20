"use client";

import { PdfWrapper } from "~/react/components/pdf-wrapper";

// If decide to use PDF, then token SVGs will be need to be generated
// then used as images in the PDF
export default function Pdf() {
  return (
    <div>
      <PdfWrapper />
    </div>
  );
}
// Server-side rendering
// import ReactPDF from '@react-pdf/renderer';

// ReactPDF.render(<MyDocument />, `${__dirname}/example.pdf`);
