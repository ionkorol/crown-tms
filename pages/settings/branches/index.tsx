import { Button, Box } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { Layout } from "components/common";
import { getBranches } from "lib/api/Branches";
import { isAuthenticated } from "lib/api/Users";
import { GetServerSideProps } from "next";
import React from "react";
import { BranchesTable } from "components/branches";
import { ClientBranchProp } from "utils/interfaces";
import { useStyles } from "styles";
import { Breadcrumbs } from "components/ui";
import Link from "next/link";

interface Props {
  data: ClientBranchProp[];
}

const Branches: React.FC<Props> = (props) => {
  const { data } = props;
  const classes = useStyles();
  console.log(data);
  return (
    <Layout>
      <Breadcrumbs title="Branches">
        <Link href="/settings/branches/new">
          <Button variant="contained" color="primary" startIcon={<Add />}>
            New Branch
          </Button>
        </Link>
      </Breadcrumbs>
      <Box className={classes.content}>
        <BranchesTable data={data} />
      </Box>
    </Layout>
  );
};

export default Branches;

export const getServerSideProps: GetServerSideProps = async (ctx) =>
  await isAuthenticated(
    ctx,
    async (data) => ({
      props: { data: await getBranches(data.clientId) },
    }),
    "/"
  );
