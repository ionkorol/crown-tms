import React from "react";
import { GetServerSideProps } from "next";
import { Layout } from "components/common";
import { LoadProp, VehicleProp } from "utils/interfaces";
import { DataTable } from "components/vehicles";
import Link from "next/link";
import { Box, Breadcrumbs, Button, Grid, Typography } from "@material-ui/core";
import { Add, ChevronRight } from "@material-ui/icons";
import { isAuthenticated } from "lib/api/Users";
import { getVehicles } from "lib/api/Vehicles";
import { useStyles } from "styles";

interface Props {
  data: VehicleProp[];
}

const Vehicles: React.FC<Props> = (props) => {
  const { data } = props;
  const classes = useStyles();

  return (
    <Layout>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h2">Vehicles</Typography>
          <Breadcrumbs separator={<ChevronRight />}>
            <Link href="/">Dashboard</Link>
            <Typography color="textPrimary">Vehicles</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item>
          <Link href="/vehicles/new">
            <Button variant="contained" color="primary" startIcon={<Add />}>
              New Load
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

export default Vehicles;

export const getServerSideProps: GetServerSideProps = async (ctx) =>
  await isAuthenticated(
    ctx,
    async (data) => ({
      props: {
        data: await getVehicles(data.clientId),
      },
    }),
    "/"
  );
