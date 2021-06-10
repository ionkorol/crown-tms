import React, { useState } from "react";
import { Layout } from "components/common";
import { Button, Table } from "react-bootstrap";
import { AddModal } from "components/invoices";
import { GetServerSideProps } from "next";
import { BrokerProp, InvoiceProp } from "utils/interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Invoices.module.scss";
import { DataTable } from "components/invoices";

interface Props {
  data: InvoiceProp[];
  brokersData: BrokerProp[];
}

const Invoices: React.FC<Props> = (props) => {
  const { data, brokersData } = props;
  const [currentData, setCurrentData] = useState(data);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editInvoice, setEditInvoice] = useState(null);

  console.log(editInvoice, showEdit);

  const handleRefresh = async () => {
    const res = await fetch("/api/invoices");
    const data = await res.json();
    setCurrentData(data);
    console.log("Refresh");
  };

  const handleDelete = async (invoiceId: string) => {
    try {
      await fetch(`/api/invoices/${invoiceId}`, {
        method: "DELETE",
      });
      console.log("Deleted", invoiceId);
      await handleRefresh();
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = async (values: any) => {
    try {
      const res = await fetch("/api/invoices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values }),
      });
      const data = await res.json();
      console.log("Added", data.id);
      await handleRefresh();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (values: any) => {
    try {
      const res = await fetch(`/api/invoices/${values.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values }),
      });
      const data = await res.json();
      console.log("Updated", data.id);
      await handleRefresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className={styles.controls}>
        <Button onClick={() => setShowAdd(true)} variant="outline-success">
          + Add
        </Button>
      </div>

      <DataTable
        data={currentData}
        handleDelete={handleDelete}
        handleEdit={(invoiceData: InvoiceProp) => {
          setEditInvoice(invoiceData);
          setShowEdit(true);
        }}
      />

      <AddModal
        show={showAdd || showEdit}
        handleClose={() => {
          setShowAdd(false);
          setShowEdit(false);
          setEditInvoice(null);
        }}
        brokersData={brokersData}
        handleSubmit={showEdit ? handleUpdate : handleAdd}
        invoiceData={editInvoice}
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

    const brokersData = await (
      await fetch(`${process.env.SERVER}/api/brokers/`)
    ).json();
    return {
      props: {
        data,
        brokersData,
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
