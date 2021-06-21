import React, { useEffect, useState } from "react";
import { Layout } from "components/common";
import { AddModal, DataTable } from "components/brokers";
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
} from "@material-ui/core";
import Link from "next/link";
import { Add } from "@material-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  data: BrokerProp[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    controls: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: theme.spacing(2),
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
      <Grid container className={classes.controls}>
        <Grid item>
          <h1>Brokers</h1>
          <Breadcrumbs>
            <Link href="/">Dashboard</Link>
            <Typography color="textPrimary">Brokers</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item>
          <Link href="/brokers/new" passHref>
            <Button component="a" variant="contained" color="primary">
              <Typography color="textPrimary">
                <FontAwesomeIcon icon="plus" className="mr-1" />
                New Broker
              </Typography>
            </Button>
          </Link>
        </Grid>
      </Grid>
      <DataTable
        data={currentData}
        handleDelete={handleDelete}
        handleEdit={(brokerData: BrokerProp) => {
          setEditBroker(brokerData);
          setShowEdit(true);
        }}
      />

      <AddModal
        show={showAdd || showEdit}
        handleClose={() => {
          setShowAdd(false);
          setShowEdit(false);
          setEditBroker(null);
        }}
        brokerData={editBroker}
        handleSubmit={showEdit ? handleUpdate : handleAdd}
      />
    </Layout>
  );
};

export default Brokers;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const data = await (
      await fetch(`${process.env.SERVER}/api/brokers`)
    ).json();
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};
