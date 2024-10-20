"use client";

import { PDFViewer } from "@react-pdf/renderer";

import TestDocument from "~/react/components/test-document";

const PdfWrapper = () => {
  return (
    <PDFViewer className="h-screen w-screen">
      <TestDocument />
    </PDFViewer>
  );
};
export { PdfWrapper };
