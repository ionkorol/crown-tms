import { Layout } from "components/common";
import LoginForm from "components/login";
import React from "react";
import { Container } from "react-bootstrap";

const Signin = () => {
  return (
    <Layout>
      <div className="d-flex justify-content-center align-items-center h-100">
        <LoginForm />
      </div>
    </Layout>
  );
};

export default Signin;
