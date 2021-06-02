import React, { useState } from "react";
import { Layout } from "components/common";
import { Button, Table } from "react-bootstrap";
import styles from "./Brokers.module.scss";
import { AddModal } from "components/brokers";
import { GetServerSideProps } from "next";
import { BrokerProp } from "utils/interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  data: BrokerProp[];
}

const Brokers: React.FC<Props> = (props) => {
  const { data } = props;
  const [showAddInvoice, setShowAddInvoice] = useState(false);

  return (
    <Layout>
      <div className={styles.controls}>
        <Button
          onClick={() => setShowAddInvoice(true)}
          variant="outline-success"
        >
          <FontAwesomeIcon icon="plus" /> Add
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Terms</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((broker) => (
            <tr key={broker.id}>
              <td>{broker.name}</td>
              <td>{broker.billingEmail}</td>
              <td>{broker.terms}</td>
              <td>
                <Button variant="warning">
                  <FontAwesomeIcon icon="pencil-alt" color="#fff" />
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
