import React from "react";
import { Layout } from "components/common";
import { GetServerSideProps } from "next";
import { DriverProp } from "utils/interfaces";
import { DataTable } from "components/drivers";
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
import { isAuthenticated } from "lib/api/Users";
import { useAuth } from "lib";
import Link from "next/link";
import { Add, ChevronRight } from "@material-ui/icons";
import { getDrivers } from "lib/api/Drivers";

interface Props {
  data: DriverProp[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      marginTop: theme.spacing(5),
    },
  })
);

const Drivers: React.FC<Props> = (props) => {
  const { data } = props;
  const classes = useStyles();

  return (
    <Layout>
      <Grid container alignItems="center" justify="space-between">
        <Grid item>
          <Typography variant="h2">Drivers</Typography>
          <Breadcrumbs separator={<ChevronRight />}>
            <Link href="/">Dashboard</Link>
            <Typography color="textPrimary">Drivers</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item>
          <Link href="/drivers/new">
            <Button variant="contained" color="primary" startIcon={<Add />}>
              New Driver
            </Button>
          </Link>
        </Grid>
      </Grid>

      <Box className={classes.content}>
        <DataTable data={data} />
      </Box>
    </Layout>
  );
};

export default Drivers;

export const getServerSideProps: GetServerSideProps = async (ctx) =>
  await isAuthenticated(
    ctx,
    async (userData) => ({
      props: {
        data: await getDrivers(userData.clientId),
      },
    }),
    "/"
  );
