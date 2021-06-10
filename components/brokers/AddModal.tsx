import { Formik, FormikHelpers, getIn } from "formik";
import React, { useState } from "react";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import { BrokerProp, AddressProp } from "utils/interfaces";
import * as yup from "yup";

interface Props {
  show: boolean;
  handleClose: () => void;
  brokerData?: BrokerProp;
  handleSubmit: (values: any) => void;
}

const schema = yup.object().shape({
  name: yup.string().required("Required"),
  dba: yup.string().required("Required"),
  mc: yup.string(),
  usdot: yup.string(),
  address: yup.object().shape({
    address1: yup.string().required("Required"),
    address2: yup.string(),
    city: yup.string().required("Required"),
    state: yup.string().required("Required"),
    zipCode: yup.string().required("Required"),
  }),
  phone: yup.string().required("Required"),
  fax: yup.string().required("Required"),
  billingEmail: yup.string().required("Required"),
  accountingEmail: yup.string(),
  terms: yup.string().required("Required"),
});

const AddModal: React.FC<Props> = (props) => {
  const { show, handleClose, handleSubmit, brokerData } = props;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Broker Form</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Formik
          onSubmit={handleSubmit}
          validationSchema={schema}
          initialValues={
            brokerData || {
              name: "",
              dba: "",
              mc: "",
              usdot: "",
              address: {
                address1: "",
                address2: "",
                city: "",
                state: "",
                zipCode: "",
              },
              phone: "",
              fax: "",
              billingEmail: "",
              accountingEmail: "",
              terms: "",
            }
          }
        >
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <Form noValidate onSubmit={handleSubmit} id="brokerForm">
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>DBA</Form.Label>
                <Form.Control
                  type="text"
                  name="dba"
                  value={values.dba}
                  onChange={handleChange}
                  isInvalid={!!errors.dba}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.dba}
                </Form.Control.Feedback>
              </Form.Group>
              <Row>
                <Form.Group as={Col} md={6}>
                  <Form.Label>MC Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="mc"
                    value={values.mc}
                    onChange={handleChange}
                    isInvalid={!!errors.mc}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.mc}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md={6}>
                  <Form.Label>US Dot Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="usdot"
                    value={values.usdot}
                    onChange={handleChange}
                    isInvalid={!!errors.usdot}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.usdot}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Form.Group>
                <Form.Label>Address 1</Form.Label>
                <Form.Control
                  type="text"
                  name="address.address1"
                  value={values.address.address1}
                  onChange={handleChange}
                  isInvalid={!!getIn(errors, "address.address1")}
                />
                <Form.Control.Feedback type="invalid">
                  {getIn(errors, "address.address1")}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Address 2</Form.Label>
                <Form.Control
                  type="text"
                  name="address.address2"
                  value={values.address.address2}
                  onChange={handleChange}
                  isInvalid={!!getIn(errors, "address.address2")}
                />
                <Form.Control.Feedback type="invalid">
                  {getIn(errors, "address.address2")}
                </Form.Control.Feedback>
              </Form.Group>
              <Row>
                <Form.Group as={Col} md="6">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    name="address.city"
                    value={values.address.city}
                    onChange={handleChange}
                    isInvalid={!!getIn(errors, "address.city")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {getIn(errors, "address.city")}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    name="address.state"
                    value={values.address.state}
                    onChange={handleChange}
                    isInvalid={!!getIn(errors, "address.state")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {getIn(errors, "address.state")}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control
                    type="text"
                    name="address.zipCode"
                    value={values.address.zipCode}
                    onChange={handleChange}
                    isInvalid={!!getIn(errors, "address.zipCode")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {getIn(errors, "address.zipCode")}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} md={6}>
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    isInvalid={!!errors.phone}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phone}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md={6}>
                  <Form.Label>Fax</Form.Label>
                  <Form.Control
                    type="text"
                    name="fax"
                    value={values.fax}
                    onChange={handleChange}
                    isInvalid={!!errors.fax}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.fax}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} md={6}>
                  <Form.Label>Billing Email</Form.Label>
                  <Form.Control
                    type="text"
                    name="billingEmail"
                    value={values.billingEmail}
                    onChange={handleChange}
                    isInvalid={!!errors.billingEmail}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.billingEmail}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md={6}>
                  <Form.Label>Accounting Email</Form.Label>
                  <Form.Control
                    type="text"
                    name="accountingEmail"
                    value={values.accountingEmail}
                    onChange={handleChange}
                    isInvalid={!!errors.accountingEmail}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.accountingEmail}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Form.Group>
                <Form.Label>Terms</Form.Label>
                <Form.Control
                  type="text"
                  name="terms"
                  value={values.terms}
                  onChange={handleChange}
                  isInvalid={!!errors.terms}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.terms}
                </Form.Control.Feedback>
              </Form.Group>
            </Form>
          )}
        </Formik>
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

AddModal.defaultProps = {};
