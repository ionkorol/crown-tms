import { Typography } from "@material-ui/core";
import React from "react";
import { Layout, Logo } from "components/common";

export default function Home() {
  return (
    <Layout>
      <Typography variant="h2">
        Welcome to <Logo />
      </Typography>
    </Layout>
  );
}
