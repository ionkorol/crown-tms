import React, { useState } from "react";
import { Layout } from "components/common";
import { Button, Table } from "react-bootstrap";
import styles from "./Invoices.module.scss";
import { AddModal } from "components/invoices";
import { GetServerSideProps } from "next";
import { InvoiceProp } from "utils/interfaces";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  data: InvoiceProp[];
}

const Invoices: React.FC<Props> = (props) => {
  const { data } = props;
  const [showAddInvoice, setShowAddInvoice] = useState(false);

  return (
    <Layout>
      <div className={styles.controls}>
        <Button
          onClick={() => setShowAddInvoice(true)}
          variant="outline-success"
        >
          + Add
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Broker Name</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.id}</td>
              <td>{invoice.broker.name}</td>
              <td>${invoice.rate.toFixed(2)}</td>
              <td>
                <Button href={`/invoices/${invoice.id}`} target="_blank">
                  <FontAwesomeIcon icon="file-invoice" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <AddModal
        show={showAddInvoice}
        handleClose={() => setShowAddInvoice(false)}
      />
    </Layout>
  );
};

export default Invoices;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const data = await (
      await fetch(`${process.env.SERVER}/api/invoices`)
    ).json();
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};
