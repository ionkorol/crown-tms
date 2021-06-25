import {
  Grid,
  Breadcrumbs,
  Typography,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Divider,
  CardActions,
  Box,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core";
import { ChevronRight, Edit } from "@material-ui/icons";
import { Layout } from "components/common";
import { formatAddress } from "lib";
import { getBroker } from "lib/api/Brokers";
import { isAuthenticated } from "lib/api/Users";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";
import { BrokerProp } from "utils/interfaces";

interface Props {
  data: BrokerProp;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      marginTop: theme.spacing(5),
    },
  })
);

const Broker: React.FC<Props> = (props) => {
  const { data } = props;
  const classes = useStyles();
  return (
    <Layout>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h2">Broker Details</Typography>
          <Breadcrumbs separator={<ChevronRight />}>
            <Link href="/">Dashboard</Link>
            <Typography color="textPrimary">Brokers</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item>
          <Link href="/brokers/new">
            <Button variant="contained" color="primary" startIcon={<Edit />}>
              Edit Broker
            </Button>
          </Link>
        </Grid>
      </Grid>
      <Box className={classes.content}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Info" />
              <Divider />
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <strong>Name</strong>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary">{data.name}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>DBA</strong>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary">{data.dba}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>MC / US DOT</strong>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary">
                        {data.mc} / {data.usdot}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Address</strong>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary">
                        {formatAddress(data.address)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <CardActions>
                <Button color="primary" startIcon={<Edit />}>
                  Edit
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Contact" />
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <strong>Phone</strong>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary">
                        {data.phone}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Fax</strong>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary">
                        {data.fax || "None"}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Billing Email</strong>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary">
                        {data.billingEmail}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Accounting Email</strong>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary">
                        {data.accountingEmail || "None"}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <CardActions>
                <Button color="primary" startIcon={<Edit />}>
                  Edit
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default Broker;

export const getServerSideProps: GetServerSideProps = async (ctx) =>
  await isAuthenticated(
    ctx,
    async (user) => ({
      props: { data: await getBroker(ctx.query.brokerId as string) },
    }),
    "/"
  );
