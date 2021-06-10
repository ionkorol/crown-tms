import React, { useEffect, useState } from "react";
import { Layout } from "components/common";
import { Button, Table } from "react-bootstrap";
import styles from "./Brokers.module.scss";
import { AddModal, DataTable } from "components/brokers";
import { GetServerSideProps } from "next";
import { BrokerProp } from "utils/interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  data: BrokerProp[];
}

const Brokers: React.FC<Props> = (props) => {
  const { data } = props;
  const [currentData, setCurrentData] = useState(data);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editBroker, setEditBroker] = useState(null);

  const handleDelete = async (brokerId: string) => {
    try {
      await fetch(`/api/brokers/${brokerId}`, {
        method: "DELETE",
      });
      console.log("Deleted", brokerId);
      await handleRefresh();
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = async (values: any) => {
    try {
      const res = await fetch("/api/brokers", {
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
      const res = await fetch(`/api/brokers/${values.id}`, {
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

  const handleRefresh = async () => {
    const res = await fetch("/api/brokers");
    const data = await res.json();
    setCurrentData(data);
    console.log("Refresh");
  };

  return (
    <Layout>
      <div className={styles.controls}>
        <Button onClick={() => setShowAdd(true)} variant="outline-success">
          <FontAwesomeIcon icon="plus" /> Add
        </Button>
      </div>
      {/* <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Terms</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((broker) => (
            <tr key={broker.id}>
              <td>{broker.name}</td>
              <td>{broker.billingEmail}</td>
              <td>{broker.terms}</td>
              <td>
                <Button
                  onClick={() => {
                    setEditBroker(broker);
                    setShowEdit(true);
                  }}
                  variant="warning"
                  className="mr-1"
                >
                  <FontAwesomeIcon icon="pencil-alt" color="#fff" />
                </Button>
                <Button
                  onClick={() => handleDelete(broker.id)}
                  variant="danger"
                >
                  <FontAwesomeIcon icon="trash-alt" color="#fff" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody> */}
      {/* </Table> */}

      <DataTable
        data={currentData}
        handleDelete={handleDelete}
        handleEdit={(brokerData: BrokerProp) => {
          setEditBroker(brokerData);
          setShowEdit(true);
        }}
      />

      <AddModal
        show={showAdd || showEdit}
        handleClose={() => {
          setShowAdd(false);
          setShowEdit(false);
          setEditBroker(null);
        }}
        brokerData={editBroker}
        handleSubmit={showEdit ? handleUpdate : handleAdd}
      />
    </Layout>
  );
};

export default Brokers;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const data = await (
      await fetch(`${process.env.SERVER}/api/brokers`)
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
