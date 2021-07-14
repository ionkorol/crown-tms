import React from "react";
import { GetServerSideProps } from "next";
import { Layout } from "components/common";
import { VehicleProp } from "utils/interfaces";
import { DataTable } from "components/vehicles";
import Link from "next/link";
import { Box, Button } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { isAuthenticated } from "lib/api/Users";
import { getVehicles } from "lib/api/Vehicles";
import { useStyles } from "styles";
import { Breadcrumbs } from "components/ui";

interface Props {
  data: VehicleProp[];
}

const Vehicles: React.FC<Props> = (props) => {
  const { data } = props;
  const classes = useStyles();

  return (
    <Layout>
      <Breadcrumbs title="Vehicles">
        <Link href="/vehicles/new" passHref>
          <Button variant="contained" color="primary" startIcon={<Add />}>
            New Load
          </Button>
        </Link>
      </Breadcrumbs>
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
