import React from "react";
import { GetServerSideProps } from "next";
import { Layout } from "components/common";
import { LoadProp } from "utils/interfaces";
import { DataTable } from "components/loads";
import Link from "next/link";
import { Box, Button } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { isAuthenticated } from "lib/api/Users";
import { getLoads } from "lib/api/Loads";
import { Breadcrumbs } from "components/ui";
import { useStyles } from "styles";

interface Props {
  data: LoadProp[];
}

const Loads: React.FC<Props> = (props) => {
  const { data } = props;
  const classes = useStyles();

  return (
    <Layout>
      <Breadcrumbs title="Loads" data={[]}>
        <Link href="/loads/new">
          <Button variant="contained" color="primary" startIcon={<Add />}>
            New Load
          </Button>
        </Link>
      </Breadcrumbs>
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
