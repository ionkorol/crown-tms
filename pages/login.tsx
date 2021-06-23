import {
  Card,
  Paper,
  Grid,
  CardHeader,
  CardContent,
  Container,
  Divider,
} from "@material-ui/core";
import { Layout } from "components/common";
import LoginForm from "components/login";
import React from "react";

const Signin = () => {
  return (
    <Layout>
      <Container maxWidth="sm">
        <Card>
          <CardHeader
            title="Log In"
            subheader="Log in on the internal platform"
          />
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </Container>
    </Layout>
  );
};

export default Signin;
