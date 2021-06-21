import { Formik } from "formik";
import { useAuth } from "lib";
import React from "react";
import { Button, Form } from "react-bootstrap";
import * as yup from "yup";

const schema = yup.object().shape({
  clientId: yup.string().required("Required"),
  username: yup.string().required("Required"),
  password: yup.string().required("Required"),
});

const LoginForm = () => {
  const auth = useAuth();

  return (
    <Formik
      onSubmit={(values) =>
        auth.signIn(values.clientId, values.username, values.password)
      }
      validationSchema={schema}
      initialValues={{
        clientId: "",
        username: "",
        password: "",
      }}
    >
      {({ handleSubmit, handleChange, values, errors }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Client ID</Form.Label>
            <Form.Control
              type="text"
              name="clientId"
              placeholder="Enter Client ID"
              value={values.clientId}
              onChange={handleChange}
              isInvalid={!!errors.clientId}
            />
            <Form.Control.Feedback type="invalid">
              {errors.clientId}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Enter Username"
              value={values.username}
              onChange={handleChange}
              isInvalid={!!errors.username}
            />
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter Password"
              value={values.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <Button type="submit">Log In</Button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
