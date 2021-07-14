import jsPDF from "jspdf";
import { formatAddress, formatCurrency } from "lib";
import { InvoiceProp } from "utils/interfaces";

const generatePDF = async (data: InvoiceProp) => {
  const { broker, load } = data;

  const picks = load.jobs.filter((job) => job.type === "Pick");
  const drops = load.jobs.filter((job) => job.type === "Drop");

  const doc = new jsPDF({
    orientation: "p",
    unit: "mm",
    format: "letter",
  });
  doc.setProperties({
    title: `Invoice# ${data.id}`,
  });

  doc.setFontSize(15);
  doc.setFont("impact", "bold");

  doc.text("J EXPRESS LLC", 15, 15);
  doc.setFont("courier");
  doc.text(`TERMS`, 95, 15);
  doc.text(data.broker.terms, 130, 15);
  doc.text(`INVOICE#`, 95, 30);
  doc.text(String(data.id), 130, 30);
  doc.text("DATE", 95, 45);
  doc.text(new Date(data.createdAt).toLocaleDateString(), 130, 45);

  doc.text("References", 95, 60);
  doc.setFont("verdana", "", "bold");
  doc.setFontSize(10);

  load.references.forEach((ref, index) => {
    doc.text(ref.name, 95, 65 + 5 * index);
    doc.text(ref.value, 130, 65 + 5 * index);
  });

  doc.setFont("verdana", "normal");
  doc.setFontSize(10);
  doc.text(
    [
      "4607 PINECREST DR",
      "BUFORD, GA 30518",
      "",
      "678-482-0071 phone",
      "877-828-2599 fax",
      "",
      "JXbilling@gmail.com",
    ],
    15,
    20
  );

  doc.setFont("verdana", "bold");
  doc.text(broker.dba, 15, 55);

  doc.setFont("verdana", "normal");
  let brokerInfo = [broker.address.address1];

  if (broker.address.address2) {
    brokerInfo = brokerInfo.concat(broker.address.address2);
  }

  brokerInfo = brokerInfo.concat([
    `${broker.address.city}, ${broker.address.state}, ${broker.address.zipCode}`,
    "",
    `${broker.phone} phone`,
    "",
    broker.billingEmail,
    broker.accountingEmail,
  ]);

  doc.text(brokerInfo, 15, 60);

  doc.setFont("verdana", "italic");
  doc.setFontSize(10);
  doc.text(`Pick up: ${load.jobs[0].date} @`, 15, 100);
  doc.setFont("verdana", "", "normal");
  doc.text([picks[0].name, formatAddress(picks[0].address)], 15, 105);

  doc.setFont("verdana", "italic");
  doc.text(`Delivery: ${load.jobs[1].date} @`, 15, 125);
  doc.setFont("verdana", "normal");
  doc.text([drops[0].name, formatAddress(drops[0].address)], 15, 130);

  doc.setFontSize(15);
  doc.setFont("courier");
  doc.text("Confirmed Rate:", 15, 220);
  doc.text("Balance to Pay:", 15, 235);

  doc.setFontSize(12);
  doc.setFont("verdana");
  doc.text("rate", 95, 220);
  doc.setFont("verdana", "bold");
  doc.text("total", 95, 235);

  doc.setFontSize(10);
  doc.setFont("verdana", "italic");
  doc.text(
    [
      "**Please, make a deposit to J EXPRESS LLC bank account on file within 30 days as agreed.",
      "**Thank you for your business. We look forward to continuing working with you.",
    ],
    15,
    265
  );

  doc.output("pdfobjectnewwindow");
};

export default generatePDF;

const handleTotal = (
  rate: number,
  additionalItems: { title: string; amount: number }[]
) => {
  let total = 0;
  total += rate;
  for (const fee of additionalItems) {
    total += fee.amount;
  }
  return total;
};
