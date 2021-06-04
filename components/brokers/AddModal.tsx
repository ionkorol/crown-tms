import React, { useState } from "react";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import { BrokerProp, AddressProp } from "utils/interfaces";

interface Props {
  show: boolean;
  handleClose: () => void;
}

const AddModal: React.FC<Props> = (props) => {
  const { show, handleClose } = props;

  const [name, setName] = useState("");
  const [dba, setDba] = useState("");
  const [mc, setMC] = useState("");
  const [usdot, setUSDot] = useState("");
  const [address, setAddress] = useState({
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
  } as AddressProp);
  const [phone, setPhone] = useState("");
  const [fax, setFax] = useState("");
  const [billingEmail, setBillingEmail] = useState("");
  const [accountingEmail, setAccountingEmail] = useState("");
  const [terms, setTerms] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/brokers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          dba,
          mc,
          usdot,
          address,
          phone,
          fax,
          billingEmail,
          accountingEmail,
          terms,
        }),
      });
      const data = await res.json();
      console.log("Added", data.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Broker</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit} id="brokerForm">
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>DBA</Form.Label>
            <Form.Control
              type="text"
              value={dba}
              onChange={(e) => setDba(e.target.value)}
            />
          </Form.Group>
          <Row>
            <Form.Group as={Col} md={6}>
              <Form.Label>MC Number</Form.Label>
              <Form.Control
                type="text"
                value={mc}
                onChange={(e) => setMC(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} md={6}>
              <Form.Label>US Dot Number</Form.Label>
              <Form.Control
                type="text"
                value={usdot}
                onChange={(e) => setUSDot(e.target.value)}
              />
            </Form.Group>
          </Row>
          <Form.Group>
            <Form.Label>Address 1</Form.Label>
            <Form.Control
              type="text"
              value={address.address1}
              onChange={(e) =>
                setAddress((prevState) => ({
                  ...prevState,
                  address1: e.target.value,
                }))
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Address 2</Form.Label>
            <Form.Control
              type="text"
              value={address.address2}
              onChange={(e) =>
                setAddress((prevState) => ({
                  ...prevState,
                  address2: e.target.value,
                }))
              }
            />
          </Form.Group>
          <Row>
            <Form.Group as={Col} md="6">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                value={address.city}
                onChange={(e) =>
                  setAddress((prevState) => ({
                    ...prevState,
                    city: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                value={address.state}
                onChange={(e) =>
                  setAddress((prevState) => ({
                    ...prevState,
                    state: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Label>Zip</Form.Label>
              <Form.Control
                type="text"
                value={address.zipCode}
                onChange={(e) =>
                  setAddress((prevState) => ({
                    ...prevState,
                    zipCode: e.target.value,
                  }))
                }
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md={6}>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} md={6}>
              <Form.Label>Fax</Form.Label>
              <Form.Control
                type="text"
                value={fax}
                onChange={(e) => setFax(e.target.value)}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md={6}>
              <Form.Label>Billing Email</Form.Label>
              <Form.Control
                type="text"
                value={billingEmail}
                onChange={(e) => setBillingEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} md={6}>
              <Form.Label>Accounting Email</Form.Label>
              <Form.Control
                type="text"
                value={accountingEmail}
                onChange={(e) => setAccountingEmail(e.target.value)}
              />
            </Form.Group>
          </Row>
          <Form.Group>
            <Form.Label>Terms</Form.Label>
            <Form.Control
              type="text"
              value={terms}
              onChange={(e) => setTerms(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button form="brokerForm" type="submit" variant="primary">
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddModal;
