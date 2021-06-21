import React from "react";
import { GetServerSideProps } from "next";
import { Layout } from "components/common";
import nookies from "nookies";

import styles from "./Loads.module.scss";
import { auth } from "firebase-admin";
import { LoadProp } from "utils/interfaces";
import { DataTable } from "components/loads";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import {
  Breadcrumbs,
  Button,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";

interface Props {
  data: LoadProp[];
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

const Loads: React.FC<Props> = (props) => {
  const { data } = props;
  const classes = useStyles();
  return (
    <Layout>
      <Grid container className={classes.controls}>
        <Grid item>
          <h1>Loads</h1>
          <Breadcrumbs>
            <Link href="/" passHref>
              Dashboard
            </Link>
            <Typography color="textPrimary">Loads</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item>
          <Link href="/loads/new" passHref>
            <Button variant="contained" color="primary" component="a">
              <Typography color="textPrimary">
                <FontAwesomeIcon icon="plus" className="mr-1" /> New Load
              </Typography>
            </Button>
          </Link>
        </Grid>
      </Grid>

      <DataTable data={data} />
    </Layout>
  );
};

export default Loads;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { token } = nookies.get(ctx);
    const { uid } = await auth().verifyIdToken(token);
    const data = await (
      await fetch(`${process.env.SERVER}/api/loads`, {
        headers: {
          user: uid,
        },
      })
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