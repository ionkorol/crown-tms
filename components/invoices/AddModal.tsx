import React, { useEffect, useState } from "react";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import { BrokerProp } from "utils/interfaces";

interface Props {
  show: boolean;
  handleClose: () => void;
}

const AddModal: React.FC<Props> = (props) => {
  const { show, handleClose } = props;
  const [availableBrokers, setAvailableBrokers] = useState<BrokerProp[]>([]);
  const [broker, setBroker] = useState(null);
  const [rate, setRate] = useState("");

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
    handleClose()
  }

  return (
    <Modal show={show} onHide={handleHide} >
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Broker</Form.Label>
            <Form.Control
              as="select"
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
        <Button variant="secondary">Close</Button>
        <Button variant="primary">Save changes</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddModal;
