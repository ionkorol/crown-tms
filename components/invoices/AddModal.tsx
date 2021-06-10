import { Formik, getIn } from "formik";
import React, { useEffect, useState } from "react";
import { Modal, Button, Form, InputGroup, Row, Col } from "react-bootstrap";
import { AddressProp, BrokerProp, InvoiceProp } from "utils/interfaces";

import * as yup from "yup";

interface Props {
  show: boolean;
  handleClose: () => void;
  handleSubmit: (values: any) => void;
  invoiceData: InvoiceProp;
  brokersData: BrokerProp[];
}

const schema = yup.object().shape({
  broker: yup.string().required("Required"),
  load: yup.object().shape({
    id: yup.string().required("Required"),
    shipper: yup.object().shape({
      name: yup.string().required("Required"),
      address: yup.object().shape({
        address1: yup.string().required("Required"),
        address2: yup.string(),
        city: yup.string().required("Required"),
        state: yup.string().required("Required"),
        zipCode: yup.string().required("Required"),
      }),
      date: yup.string().required("Required"),
    }),
    cosigner: yup.object().shape({
      name: yup.string().required("Required"),
      address: yup.object().shape({
        address1: yup.string().required("Required"),
        address2: yup.string(),
        city: yup.string().required("Required"),
        state: yup.string().required("Required"),
        zipCode: yup.string().required("Required"),
      }),
      date: yup.string().required("Required"),
    }),
  }),
  rate: yup.number().required("Required").min(1, "Rate cannot be 0"),
  additionalItems: yup.array().of(
    yup.object().shape({
      name: yup.string().required("Required"),
      amount: yup.number().required("Required"),
    })
  ),
  isTonu: yup.boolean().required("Required"),
});

const AddModal: React.FC<Props> = (props) => {
  const { show, handleClose, invoiceData, handleSubmit, brokersData } = props;
  console.log(handleSubmit);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Formik
          onSubmit={handleSubmit}
          validationSchema={schema}
          initialValues={{
            id: invoiceData ? invoiceData.id : null,
            broker: invoiceData ? invoiceData.broker.id : "",
            load: invoiceData
              ? invoiceData.load
              : {
                  id: "",
                  shipper: {
                    name: "",
                    address: {
                      address1: "",
                      address2: "",
                      city: "",
                      state: "",
                      zipCode: "",
                    },
                    date: "",
                  },
                  cosigner: {
                    name: "",
                    address: {
                      address1: "",
                      address2: "",
                      city: "",
                      state: "",
                      zipCode: "",
                    },
                    date: "",
                  },
                },
            rate: invoiceData ? invoiceData.rate : 0,
            additionalItems: invoiceData ? invoiceData.additionalItems : [],
            isTonu: invoiceData ? invoiceData.isTonu : false,
          }}
        >
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <Form noValidate onSubmit={handleSubmit} id="InvoiceForm">
              <Form.Group>
                <Form.Label>Broker</Form.Label>
                <Form.Control
                  as="select"
                  name="broker"
                  value={values.broker}
                  onChange={handleChange}
                  isInvalid={!!errors.broker}
                >
                  {brokersData.map((broker) => (
                    <option value={broker.id} key={broker.id}>
                      {broker.name}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.broker}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Load #</Form.Label>
                <Form.Control
                  type="text"
                  name="load.id"
                  value={values.load.id}
                  onChange={handleChange}
                  isInvalid={!!getIn(errors, "load.id")}
                />
                <Form.Control.Feedback type="invalid">
                  {getIn(errors, "load.id")}
                </Form.Control.Feedback>
              </Form.Group>
              <h4>Shipper Info</h4>
              <hr />
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="load.shipper.name"
                  value={values.load.shipper.name}
                  onChange={handleChange}
                  isInvalid={!!getIn(errors, "load.shipper.name")}
                />
                <Form.Control.Feedback type="invalid">
                  {getIn(errors, "load.shipper.name")}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="load.shipper.address.address1"
                  value={values.load.shipper.address.address1}
                  onChange={handleChange}
                  isInvalid={!!getIn(errors, "load.shipper.address.address1")}
                />
                <Form.Control.Feedback type="invalid">
                  {getIn(errors, "load.shipper.address.address1")}
                </Form.Control.Feedback>
              </Form.Group>
              <Row>
                <Form.Group as={Col} md={6}>
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    name="load.shipper.address.city"
                    value={values.load.shipper.address.city}
                    onChange={handleChange}
                    isInvalid={!!getIn(errors, "load.shipper.address.city")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {getIn(errors, "load.shipper.address.city")}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md={3}>
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    name="load.shipper.address.state"
                    value={values.load.shipper.address.state}
                    onChange={handleChange}
                    isInvalid={!!getIn(errors, "load.shipper.address.state")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {getIn(errors, "load.shipper.address.state")}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md={3}>
                  <Form.Label>Zip Code</Form.Label>
                  <Form.Control
                    type="text"
                    name="load.shipper.address.zipCode"
                    value={values.load.shipper.address.zipCode}
                    onChange={handleChange}
                    isInvalid={!!getIn(errors, "load.shipper.address.zipCode")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {getIn(errors, "load.shipper.address.zipCode")}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Form.Group>
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="text"
                  name="load.shipper.date"
                  value={values.load.shipper.date}
                  onChange={handleChange}
                  isInvalid={!!getIn(errors, "load.shipper.date")}
                />
                <Form.Control.Feedback type="invalid">
                  {getIn(errors, "load.shipper.date")}
                </Form.Control.Feedback>
              </Form.Group>
              <h4>Cosigner Info</h4>
              <hr />
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="load.cosigner.name"
                  value={values.load.cosigner.name}
                  onChange={handleChange}
                  isInvalid={!!getIn(errors, "load.cosigner.name")}
                />
                <Form.Control.Feedback type="invalid">
                  {getIn(errors, "load.cosigner.name")}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="load.cosigner.address.address1"
                  value={values.load.cosigner.address.address1}
                  onChange={handleChange}
                  isInvalid={!!getIn(errors, "load.cosigner.address.address1")}
                />
                <Form.Control.Feedback type="invalid">
                  {getIn(errors, "load.cosigner.address.address1")}
                </Form.Control.Feedback>
              </Form.Group>
              <Row>
                <Form.Group as={Col} md={6}>
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    name="load.cosigner.address.city"
                    value={values.load.cosigner.address.city}
                    onChange={handleChange}
                    isInvalid={!!getIn(errors, "load.cosigner.address.city")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {getIn(errors, "load.cosigner.address.city")}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md={3}>
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    name="load.cosigner.address.state"
                    value={values.load.cosigner.address.state}
                    onChange={handleChange}
                    isInvalid={!!getIn(errors, "load.cosigner.address.state")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {getIn(errors, "load.cosigner.address.state")}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md={3}>
                  <Form.Label>Zip Code</Form.Label>
                  <Form.Control
                    type="text"
                    name="load.cosigner.address.zipCode"
                    value={values.load.cosigner.address.zipCode}
                    onChange={handleChange}
                    isInvalid={!!getIn(errors, "load.cosigner.address.zipCode")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {getIn(errors, "load.cosigner.address.zipCode")}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Form.Group>
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="text"
                  name="load.cosigner.date"
                  value={values.load.cosigner.date}
                  onChange={handleChange}
                  isInvalid={!!getIn(errors, "load.cosigner.date")}
                />
                <Form.Control.Feedback type="invalid">
                  {getIn(errors, "load.cosigner.date")}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label>Rate</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text>$</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="number"
                    name="rate"
                    value={values.rate}
                    onChange={handleChange}
                    isInvalid={!!errors.rate}
                  />
                </InputGroup>
                <Form.Control.Feedback type="invalid">
                  {errors.rate}
                </Form.Control.Feedback>
              </Form.Group>
            </Form>
          )}
        </Formik>
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
