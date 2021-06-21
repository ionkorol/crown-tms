import jsPDF from "jspdf";
import { formatAddress, formatCurrency } from "lib";
import { InvoiceProp } from "utils/interfaces";
import "assets/verdana-normal";
import "assets/verdana-bold";
import "assets/verdana-italic";
import "assets/impact-bold";

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

  // Broker Info
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

  // Invoice # and Date
  doc.setFont("courier", "bold");
  doc.setFontSize(15);
  doc.text(new Date(data.createdAt).toLocaleDateString(), 15, 100);

  doc.text(`INVOICE# ${data.id}`, 95, 100);

  load.references.forEach((ref, index) => {
    doc.text(ref.name, 15, 115 + 5 * index);
    doc.text(ref.value, 65, 115 + 5 * index);
  });

  // Picks Info
  doc.setFont("verdana", "italic");
  doc.setFontSize(10);
  if (picks.length > 1) {
    doc.text(`${picks.length} Pickups: ${picks[0].date}`, 15, 140);
    doc.setFont("verdana", "", "normal");
    for (const [index, pick] of picks.entries()) {
      const { address, name } = pick;
      doc.text(
        `${index + 1}. ${name} - ${formatAddress(address)}`,
        15,
        145 + 5 * index
      );
    }
  } else {
    const { address, name, date } = picks[0];
    doc.text(`Pickup: ${date} @`, 15, 140);
    doc.setFont("verdana", "", "normal");
    doc.text(
      [
        name,
        address.address1,
        `${(address.city, address.state, address.zipCode)}`,
      ],
      15,
      145
    );
  }

  // Drops Info

  doc.setFont("verdana", "italic");
  if (drops.length > 1) {
    const dropsNumberLocation = 160 + 5 * picks.length;
    doc.text(
      `${drops.length} Deliveries: ${drops[0].date}`,
      15,
      dropsNumberLocation
    );
    doc.setFont("verdana", "normal");
    for (const [index, drop] of drops.entries()) {
      const { address, name } = drop;
      doc.text(
        `${index + 1}. ${name} - ${formatAddress(address)}`,
        15,
        dropsNumberLocation + 5 + 5 * index
      );
    }
  } else {
    const { date, address, name } = drops[0];
    doc.text(`Delivery: ${date} @`, 15, 160 + 5 * picks.length);
    doc.setFont("verdana", "normal");
    doc.text(
      [
        name,
        address.address1,
        `${address.city}, ${address.state} ${address.zipCode}`,
      ],
      15,
      165 + 5 * picks.length
    );
  }

  doc.setFontSize(15);
  doc.setFont("courier");
  doc.text("Confirmed Rate:", 15, 220);
  doc.text("Balance to Pay:", 15, 235);

  doc.setFontSize(12);
  doc.setFont("verdana");
  doc.text(formatCurrency(data.load.rate), 95, 220);
  doc.setFont("verdana", "bold");
  doc.text(
    formatCurrency(handleTotal(load.rate, data.additionalItems)),
    95,
    235
  );

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
