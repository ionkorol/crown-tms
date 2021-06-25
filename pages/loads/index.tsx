import React from "react";
import { GetServerSideProps } from "next";
import { Layout } from "components/common";
import { LoadProp } from "utils/interfaces";
import { DataTable } from "components/loads";
import Link from "next/link";
import {
  Box,
  Breadcrumbs,
  Button,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { Add, ChevronRight } from "@material-ui/icons";
import { isAuthenticated } from "lib/api/Users";
import { getLoads } from "lib/api/Loads";

interface Props {
  data: LoadProp[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      marginTop: theme.spacing(5),
    },
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
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h2">Loads</Typography>
          <Breadcrumbs separator={<ChevronRight />}>
            <Link href="/">Dashboard</Link>
            <Typography color="textPrimary">Loads</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item>
          <Link href="/loads/new">
            <Button variant="contained" color="primary" startIcon={<Add />}>
              New Load
            </Button>
          </Link>
        </Grid>
      </Grid>
      <Box className={classes.content}>
        <DataTable data={data.sort((a, b) => b.id - a.id)} />
      </Box>
    </Layout>
  );
};

export default Loads;

export const getServerSideProps: GetServerSideProps = async (ctx) =>
  await isAuthenticated(
    ctx,
    async (data) => ({
      props: {
        data: await getLoads(data.clientId),
      },
    }),
    "/"
  );
