import React from "react";
import { Layout } from "components/common";
import { GetServerSideProps } from "next";
import { DriverProp } from "utils/interfaces";
import { DataTable } from "components/drivers";
import { Box, Button } from "@material-ui/core";
import { isAuthenticated } from "lib/api/Users";
import Link from "next/link";
import { Add } from "@material-ui/icons";
import { getDrivers } from "lib/api/Drivers";
import { Breadcrumbs } from "components/ui";
import { useStyles } from "styles";

interface Props {
  data: DriverProp[];
}

const Drivers: React.FC<Props> = (props) => {
  const { data } = props;
  const classes = useStyles();

  return (
    <Layout>
      <Breadcrumbs title="Drivers" data={[]}>
        <Link href="/drivers/new">
          <Button variant="contained" color="primary" startIcon={<Add />}>
            New Driver
          </Button>
        </Link>
      </Breadcrumbs>

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
