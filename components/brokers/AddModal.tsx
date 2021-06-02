import React from "react";
import { Modal, Button } from "react-bootstrap";

interface Props {
  show: boolean;
  handleClose: () => void;
}

const AddModal: React.FC<Props> = (props) => {
  const { show, handleClose } = props;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Modal body text goes here.</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary">Close</Button>
        <Button variant="primary">Save changes</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddModal;
