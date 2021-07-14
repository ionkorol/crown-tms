import React, { useState } from "react";
import { Layout } from "components/common";
import { GetServerSideProps } from "next";
import { InvoiceProp } from "utils/interfaces";
import { DataTable, Stats } from "components/invoices";
import { Box, Grid, Theme, Typography } from "@material-ui/core";
import { isAuthenticated } from "lib/api/Users";
import { getInvoices } from "lib/api/Invoices";
import { useAuth } from "lib";
import Link from "next/link";
import { Breadcrumbs } from "components/ui";
import { useStyles } from "styles";

interface Props {
  data: InvoiceProp[];
}

const Invoices: React.FC<Props> = (props) => {
  const { data } = props;
  const [currentData, setCurrentData] = useState(data);
  const auth = useAuth();
  const classes = useStyles();

  const handleRefresh = async () => {
    const res = await fetch("/api/invoices", {
      headers: {
        user: auth.user.id,
      },
    });
    const data = await res.json();
    setCurrentData(data);
    console.log("Refresh");
  };

  return (
    <Layout>
      <Breadcrumbs title="Invoices" data={[]}>
        <Stats data={currentData} />
      </Breadcrumbs>
      <Box className={classes.content}>
        <DataTable data={currentData} />
      </Box>
    </Layout>
  );
};

export default Invoices;

export const getServerSideProps: GetServerSideProps = async (ctx) =>
  await isAuthenticated(
    ctx,
    async (userData) => ({
      props: {
        data: await getInvoices(userData.clientId),
      },
    }),
    "/"
  );
