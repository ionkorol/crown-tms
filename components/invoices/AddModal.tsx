import React, { useEffect, useState } from "react";
import { Modal, Button, Form, InputGroup, Row, Col } from "react-bootstrap";
import { AddressProp, BrokerProp } from "utils/interfaces";

interface Props {
  show: boolean;
  handleClose: () => void;
}

const AddModal: React.FC<Props> = (props) => {
  const { show, handleClose } = props;
  const [availableBrokers, setAvailableBrokers] = useState<BrokerProp[]>([]);
  const [broker, setBroker] = useState(null);
  // Load Info
  const [loadNumber, setLoadNumber] = useState("");
  const [shipperName, setShipperName] = useState("");
  const [shipperAddress, setShipperAddress] = useState({
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  } as AddressProp);
  const [shipperDate, setShipperDate] = useState("");

  const [cosignerName, setCosignerName] = useState("");
  const [cosignerAddress, setCosignerAddress] = useState({
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  } as AddressProp);
  const [cosignerDate, setCosignerDate] = useState("");

  const [rate, setRate] = useState("");
  const [additionalItems, setAdditionalItems] = useState([]);

  useEffect(() => {
    (async () => {
      setAvailableBrokers([]);
      const brokersData = await (await fetch("/api/brokers")).json();
      setAvailableBrokers(brokersData);
      setBroker(brokersData[0].id);
    })();
  }, []);

  const handleHide = () => {
    setRate("");
    setBroker(null);
    handleClose();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/invoices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: new Date().toLocaleDateString(),
          broker,
          load: {
            id: loadNumber,
            shipper: {
              name: shipperName,
              address: shipperAddress,
              date: shipperDate,
            },
            cosigner: {
              name: cosignerName,
              address: cosignerAddress,
              date: cosignerDate,
            },
          },
          rate: Number(rate),
          additionalItems,
        }),
      });
      const data = await res.json();
      console.log(data.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal show={show} onHide={handleHide}>
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit} id="InvoiceForm">
          <Form.Group>
            <Form.Label>Broker</Form.Label>
            <Form.Control
              as="select"
              value={broker}
              onChange={(e) => setBroker(e.target.value)}
            >
              {availableBrokers.map((broker) => (
                <option value={broker.id} key={broker.id}>
                  {broker.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Load #</Form.Label>
            <Form.Control
              type="text"
              value={loadNumber}
              onChange={(e) => setLoadNumber(e.target.value)}
            />
          </Form.Group>
          <h4>Shipper Info</h4>
          <hr />
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={shipperName}
              onChange={(e) => setShipperName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              value={shipperAddress.address1}
              onChange={(e) =>
                setShipperAddress((prevState) => ({
                  ...prevState,
                  address1: e.target.value,
                }))
              }
            />
          </Form.Group>
          <Row>
            <Form.Group as={Col} md={6}>
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                value={shipperAddress.city}
                onChange={(e) =>
                  setShipperAddress((prevState) => ({
                    ...prevState,
                    city: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group as={Col} md={3}>
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                value={shipperAddress.state}
                onChange={(e) =>
                  setShipperAddress((prevState) => ({
                    ...prevState,
                    state: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group as={Col} md={3}>
              <Form.Label>Zip Code</Form.Label>
              <Form.Control
                type="text"
                value={shipperAddress.zipCode}
                onChange={(e) =>
                  setShipperAddress((prevState) => ({
                    ...prevState,
                    zipCode: e.target.value,
                  }))
                }
              />
            </Form.Group>
          </Row>
          <Form.Group>
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="text"
              value={shipperDate}
              onChange={(e) => setShipperDate(e.target.value)}
            />
          </Form.Group>
          <h4>Cosigner Info</h4>
          <hr />
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={cosignerName}
              onChange={(e) => setCosignerName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              value={cosignerAddress.address1}
              onChange={(e) =>
                setCosignerAddress((prevState) => ({
                  ...prevState,
                  address1: e.target.value,
                }))
              }
            />
          </Form.Group>
          <Row>
            <Form.Group as={Col} md={6}>
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                value={cosignerAddress.city}
                onChange={(e) =>
                  setCosignerAddress((prevState) => ({
                    ...prevState,
                    city: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group as={Col} md={3}>
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                value={cosignerAddress.state}
                onChange={(e) =>
                  setCosignerAddress((prevState) => ({
                    ...prevState,
                    state: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group as={Col} md={3}>
              <Form.Label>Zip Code</Form.Label>
              <Form.Control
                type="text"
                value={cosignerAddress.zipCode}
                onChange={(e) =>
                  setCosignerAddress((prevState) => ({
                    ...prevState,
                    zipCode: e.target.value,
                  }))
                }
              />
            </Form.Group>
          </Row>
          <Form.Group>
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="text"
              value={cosignerDate}
              onChange={(e) => setCosignerDate(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Rate</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text>$</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                value={rate}
                onChange={(e) => {
                  if (Number(e.target.value)) {
                    setRate(e.target.value);
                  }
                }}
                required
              />
              <InputGroup.Append>
                <InputGroup.Text>.00</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button type="submit" form="InvoiceForm" variant="primary">
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddModal;
