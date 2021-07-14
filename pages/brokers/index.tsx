import React, { useState } from "react";
import { Layout } from "components/common";
import { DataTable } from "components/brokers";
import { GetServerSideProps } from "next";
import { BrokerProp } from "utils/interfaces";
import { Button, Box } from "@material-ui/core";
import Link from "next/link";
import { Add } from "@material-ui/icons";
import { isAuthenticated } from "lib/api/Users";
import { getBrokers } from "lib/api/Brokers";
import { Breadcrumbs } from "components/ui";
import { useStyles } from "styles";

interface Props {
  data: BrokerProp[];
}

const Brokers: React.FC<Props> = (props) => {
  const { data } = props;
  const [currentData, setCurrentData] = useState(data);

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

  const handleRefresh = async () => {
    const res = await fetch("/api/brokers");
    const data = await res.json();
    setCurrentData(data);
    alert("Refresh");
  };

  return (
    <Layout>
      <Breadcrumbs title="Brokers" data={[]}>
        <Link href="/brokers/new">
          <Button variant="contained" color="primary" startIcon={<Add />}>
            New Broker
          </Button>
        </Link>
      </Breadcrumbs>
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
    async () => ({
      props: {
        data: await getBrokers(),
      },
    }),
    "/"
  );
