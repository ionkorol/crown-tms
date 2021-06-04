import jsPDF from "jspdf";
import React, { useRef } from "react";
import { Button } from "react-bootstrap";
import { InvoiceProp } from "utils/interfaces";
import styles from "./InvoicePdf.module.scss";
import "assets/verdana-normal";
import "assets/verdana-bold";
import "assets/verdana-italic";
import "assets/impact-bold";

interface Props {
  data: InvoiceProp;
}

const InvoicePdf: React.FC<Props> = (props) => {
  const { data } = props;
  const { broker, load } = data;

  const invoiceRef = useRef(null);

  const generatePDF = async () => {
    const doc = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4",
    });
    doc.setProperties({
      title: `Invoice# ${data.id}`,
    });

    doc.setFontSize(15);
    doc.setFont("impact", "bold");

    doc.text("J EXPRESS LLC", 15, 15);
    doc.setFont("courier");
    doc.text(`TERMS: ${broker.terms}`, 95, 15);
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
    doc.text(
      [
        broker.dba,
        broker.address.address1,
        broker.address.address2,
        `${broker.address.city}, ${broker.address.state}, ${broker.address.zipCode}`,
        `${broker.phone} phone`,
        "",
        broker.billingEmail,
        broker.acountingEmail,
      ],
      15,
      55
    );
    doc.setFont("courier", "bold");
    doc.setFontSize(15);
    doc.text(data.date, 15, 100);

    doc.text(`INVOICE# ${data.id}`, 95, 100);

    doc.setFont("verdana", "", "bold");
    doc.setFontSize(15);
    doc.text(`Order#: ${load.id}`, 15, 120);

    doc.setFont("verdana", "italic");
    doc.setFontSize(10);
    doc.text(`Pick up: ${load.shipper.date} @`, 15, 140);
    doc.setFont("verdana", "", "normal");
    doc.text(
      [
        load.shipper.name,
        load.shipper.address.address1,
        `${load.shipper.address.city}, ${load.shipper.address.state}, ${load.shipper.address.zipCode}`,
      ],
      15,
      145
    );

    doc.setFont("verdana", "italic");
    doc.text(`Delivery: ${load.cosigner.date} @`, 15, 165);
    doc.setFont("verdana", "normal");
    doc.text(
      [
        load.cosigner.name,
        load.cosigner.address.address1,
        `${load.cosigner.address.city}, ${load.cosigner.address.state}, ${load.cosigner.address.zipCode}`,
      ],
      15,
      170
    );

    doc.setFontSize(15);
    doc.setFont("courier");
    doc.text("Confirmed Rate:", 15, 220);
    doc.text("Balance to Pay:", 15, 235);

    doc.setFontSize(12);
    doc.setFont("verdana");
    doc.text(
      data.rate.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      }),
      95,
      220
    );
    doc.setFont("verdana", "bold");
    doc.text(
      handleTotal().toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      }),
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
      275
    );

    console.log(doc.output("blob"));
    doc.output("pdfobjectnewwindow");
  };

  const handleTotal = () => {
    let total = 0;
    total += data.rate;
    for (const fee of data.additionalItems) {
      total += fee.amount;
    }
    return total;
  };

  return (
    <>
      <div className={styles.document} ref={invoiceRef}>
        <div className={styles.page}>
          <div className={styles.section}>
            <div className={styles.block}>
              <h2>J EXPRESS LLC</h2>
              <p>4607 PINECREST DR</p>
              <p>BUFORD, GA 30518</p>
              <p>678-482-0071 phone</p>
              <p>877-828-2599 fax</p>
              <p>
                <a href="#">JXbilling@gmail.com</a>
              </p>
            </div>
            <div className={styles.block}>
              <h5>TERMS: NET 30</h5>
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.block}>
              <p>
                <b>{broker.dba}</b>
              </p>
              <p>{broker.address.address1}</p>
              {broker.address.address2 && <p>{broker.address.address2}</p>}
              <p>
                {broker.address.city}, {broker.address.state}{" "}
                {broker.address.zipCode}
              </p>
              <p>{broker.phone} phone</p>
              {broker.fax && <p>{broker.fax} fax</p>}
              <p>
                <a href="#">{broker.billingEmail}</a>
              </p>
              <p>
                <a href="#">{broker.acountingEmail}</a>
              </p>
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.block}>
              <h5>{new Date().toLocaleDateString()}</h5>
            </div>
            <div className={styles.block}>
              <h5>INVOICE #{data.id}</h5>
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.block}>
              <h5>Order#: {load.id}</h5>
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.block}>
              <p>Pick up: {load.shipper.date} @</p>
              <p>{load.shipper.name}</p>
              <p>{load.shipper.address.address1}</p>
              <p>
                {load.shipper.address.city}, {load.shipper.address.state}{" "}
                {load.shipper.address.zipCode} {load.shipper.address.country}
              </p>
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.block}>
              <p>Delivery: {load.cosigner.date} @</p>
              <p>{load.cosigner.name}</p>
              <p>{load.cosigner.address.address1}</p>
              <p>
                {load.cosigner.address.city}, {load.cosigner.address.state}{" "}
                {load.cosigner.address.zipCode} {load.cosigner.address.country}
              </p>
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.block}>
              <p>Confirmed Rate:</p>
              <p>Lumper Fees</p>
              <p>
                <b>Balance to pay:</b>
              </p>
            </div>
            <div className={styles.block}>
              <p>${data.rate.toFixed(2)}</p>
              <p>$0.00</p>
              <p>
                <b>${handleTotal().toFixed(2)}</b>
              </p>
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.block}>
              <p>
                ** Please, mail check out to the address above within 30 days as
                agreed.
              </p>
              <p>
                ** Thank you for your business. We look forward to continue
                working with you.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Button onClick={generatePDF}>Download PDF</Button>
    </>
  );
};

export default InvoicePdf;
