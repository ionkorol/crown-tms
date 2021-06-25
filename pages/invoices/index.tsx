import React, { useState } from "react";
import { Layout } from "components/common";
import { GetServerSideProps } from "next";
import { InvoiceProp } from "utils/interfaces";
import { DataTable, Stats } from "components/invoices";
import {
  Box,
  Breadcrumbs,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { isAuthenticated } from "lib/api/Users";
import { getInvoices } from "lib/api/Invoices";
import { useAuth } from "lib";
import Link from "next/link";
import { ChevronRight } from "@material-ui/icons";

interface Props {
  data: InvoiceProp[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      marginTop: theme.spacing(5),
    },
  })
);

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
      <Grid container alignItems="center" justify="space-between">
        <Grid item>
          <Typography variant="h2">Invoices</Typography>
          <Breadcrumbs separator={<ChevronRight />}>
            <Link href="/">Dashboard</Link>
            <Typography color="textPrimary">Invoices</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item>
          <Stats data={currentData} />
        </Grid>
      </Grid>

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
