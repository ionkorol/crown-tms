import React, { useEffect, useState } from "react";
import { Layout } from "components/common";
import { DataTable } from "components/brokers";
import { GetServerSideProps } from "next";
import { BrokerProp } from "utils/interfaces";
import {
  Breadcrumbs,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
  Button,
  Box,
} from "@material-ui/core";
import Link from "next/link";
import { Add, ChevronRight } from "@material-ui/icons";
import { isAuthenticated } from "lib/api/Users";
import { getBrokers } from "lib/api/Brokers";

interface Props {
  data: BrokerProp[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      marginTop: theme.spacing(5),
    },
  })
);

const Brokers: React.FC<Props> = (props) => {
  const { data } = props;
  const [currentData, setCurrentData] = useState(data);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editBroker, setEditBroker] = useState(null);

  const classes = useStyles();

  const handleDelete = async (brokerId: string) => {
    try {
      await fetch(`/api/brokers/${brokerId}`, {
        method: "DELETE",
      });
      alert(`Deleted ${brokerId}`);
      await handleRefresh();
    } catch (error) {
      alert(error);
    }
  };

  const handleAdd = async (values: any) => {
    try {
      const res = await fetch("/api/brokers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values }),
      });
      const data = await res.json();
      alert(`Added ${data.id}`);
      await handleRefresh();
    } catch (error) {
      alert(error);
    }
  };

  const handleUpdate = async (values: any) => {
    try {
      const res = await fetch(`/api/brokers/${values.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values }),
      });
      const data = await res.json();
      alert(`Updated ${data.id}`);
      await handleRefresh();
    } catch (error) {
      alert(error);
    }
  };

  const handleRefresh = async () => {
    const res = await fetch("/api/brokers");
    const data = await res.json();
    setCurrentData(data);
    alert("Refresh");
  };

  return (
    <Layout>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h2">Brokers</Typography>
          <Breadcrumbs separator={<ChevronRight />}>
            <Link href="/">Dashboard</Link>
            <Typography color="textPrimary">Brokers</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item>
          <Link href="/brokers/new">
            <Button variant="contained" color="primary" startIcon={<Add />}>
              New Broker
            </Button>
          </Link>
        </Grid>
      </Grid>
      <Box className={classes.content}>
        <DataTable data={currentData} handleDelete={handleDelete} />
      </Box>
    </Layout>
  );
};

export default Brokers;

export const getServerSideProps: GetServerSideProps = async (ctx) =>
  await isAuthenticated(
    ctx,
    async (userData) => ({
      props: {
        data: await getBrokers(),
      },
    }),
    "/"
  );
