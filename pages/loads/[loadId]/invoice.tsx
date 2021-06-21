import {
  Grid,
  Card,
  Paper,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Breadcrumbs,
  Button,
  Box,
  makeStyles,
  Theme,
  createStyles,
  CardContent,
  CardActions,
  CardHeader,
} from "@material-ui/core";
import { Layout } from "components/common";
import Link from "next/link";
import { DropJobIcon, PickJobIcon } from "components/ui/Icons";
import React from "react";
import { InvoiceProp, LoadProp } from "utils/interfaces";
import { GetServerSideProps } from "next";
import { auth } from "utils/firebaseAdmin";
import nookies from "nookies";
import { formatAddress, formatCurrency } from "lib";
import { generateClassicInvoice } from "lib/invoice";

interface Props {
  data: InvoiceProp;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      marginTop: theme.spacing(3),
    },
  })
);

const Invoice: React.FC<Props> = (props) => {
  const { data } = props;
  const classes = useStyles();

  const { broker, load } = data;

  const picks = load.jobs.filter((job) => job.type === "Pick");
  const drops = load.jobs.filter((job) => job.type === "Drop");

  const handleTotal = () => {
    let total = 0;
    total += load.rate;
    for (const fee of data.additionalItems) {
      total += fee.amount;
    }
    return total;
  };

  if (!data) {
    return (
      <Layout>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <h1>Invoice# 1231 Details</h1>
            <Breadcrumbs>
              <Link href="/" passHref>
                Dashboard
              </Link>
              <Link href="/loads" passHref>
                Loads
              </Link>
              <Typography color="textPrimary">Invoice# 123</Typography>
            </Breadcrumbs>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item>
                <Button variant="outlined" color="primary">
                  Edit Invoice
                </Button>
              </Grid>
              <Grid item>
                <Link href={`/loads/${data.id}`}>
                  <Button variant="contained" color="primary">
                    View Load
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Paper>
          <Typography variant="h2" color="error">
            Invoice Doesn't Exitst
          </Typography>
        </Paper>
      </Layout>
    );
  }

  return (
    <Layout>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <h1>Invoice# 1231 Details</h1>
          <Breadcrumbs>
            <Link href="/" passHref>
              Dashboard
            </Link>
            <Link href="/loads" passHref>
              Loads
            </Link>
            <Typography color="textPrimary">Invoice# 123</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item>
          <Grid container spacing={3}>
            <Grid item>
              <Button variant="outlined" color="primary">
                Edit Invoice
              </Button>
            </Grid>
            <Grid item>
              <Link href={`/loads/123`}>
                <Button variant="contained" color="primary">
                  View Load
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Card className={classes.main}>
        <CardContent>
          <Box padding={3}>
            <Grid container spacing={3}>
              <Grid item md={6}>
                <Typography>
                  <strong>J EXPRESS LLC</strong>
                </Typography>
                <Typography>4607 PINECREST DR</Typography>
                <Typography>BUFORD, GA 30518</Typography>
                <br />
                <Typography>678-482-0071 phone</Typography>
                <Typography>877-828-2599 fax</Typography>
                <br />
                <Typography>JXbilling@gmail.com</Typography>
              </Grid>
              <Grid item md={6}>
                <Typography variant="h3">Invoice# 3333</Typography>
                <Typography
                  component="span"
                  style={{
                    backgroundColor: "red",
                    padding: "5px",
                    borderRadius: "10px",
                  }}
                >
                  UNPAID
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography>
                  <strong>{broker.dba}</strong>
                </Typography>
                <Typography>{broker.address.address1}</Typography>
                {broker.address.address2 && (
                  <Typography>{broker.address.address2}</Typography>
                )}
                <Typography>
                  {broker.address.city}, {broker.address.state}{" "}
                  {broker.address.zipCode}
                </Typography>
                <br />
                {broker.phone && <Typography>{broker.phone} phone</Typography>}
                {broker.fax && <Typography>{broker.fax} fax</Typography>}
                <br />
                {broker.accountingEmail && (
                  <Typography>{broker.accountingEmail}</Typography>
                )}
              </Grid>
              <Grid item md={6}>
                <Typography variant="h6">References:</Typography>
                <List>
                  {load.references.map((ref, index) => (
                    <ListItem dense key={index}>
                      <ListItemText primary={`${ref.name}: ${ref.value}`} />
                    </ListItem>
                  ))}
                </List>
              </Grid>
              <Grid item md={6}>
                <Typography>
                  <strong>Date of Isue</strong>
                </Typography>

                <Typography variant="h5">
                  {new Date(data.createdAt).toLocaleDateString()}
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography>
                  <strong>Invoice Terms</strong>
                </Typography>
                <Typography variant="h5">{broker.terms}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Table>
                  <TableBody>
                    {picks.map((pick, index) => (
                      <TableRow key={index}>
                        <TableCell key={index}>
                          <ListItem>
                            <ListItemIcon>
                              <PickJobIcon />
                            </ListItemIcon>
                            <ListItemText
                              primary={`${pick.name} - ${pick.date}`}
                              secondary={formatAddress(pick.address)}
                            />
                          </ListItem>
                        </TableCell>
                        <TableCell />
                        <TableCell />
                      </TableRow>
                    ))}
                    {drops.map((drop, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <ListItem>
                            <ListItemIcon>
                              <DropJobIcon />
                            </ListItemIcon>
                            <ListItemText
                              primary={`${drop.name} - ${drop.date}`}
                              secondary={formatAddress(drop.address)}
                            />
                          </ListItem>
                        </TableCell>
                        <TableCell />
                        <TableCell />
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell />
                      <TableCell>Confirmed Rate</TableCell>
                      <TableCell>{formatCurrency(load.rate)}</TableCell>
                    </TableRow>
                    {data.additionalItems.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell />
                        <TableCell>{item.title}</TableCell>
                        <TableCell>{item.amount}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell />
                      <TableCell>
                        <strong>Balance To Pay</strong>
                      </TableCell>
                      <TableCell>
                        <strong>{formatCurrency(handleTotal())}</strong>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <CardActions>
          <Grid spacing={2} container>
            <Grid item>
              <Button
                onClick={() => generateClassicInvoice(data)}
                variant="outlined"
                color="primary"
              >
                Preview PDF
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary">
                Download PDF
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Layout>
  );
};

export default Invoice;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { loadId } = ctx.query;

  try {
    const { token } = nookies.get(ctx);
    const { uid } = await auth().verifyIdToken(token);
    let data = null;
    data = await (
      await fetch(`${process.env.SERVER}/api/invoices/${loadId}`, {
        headers: {
          user: uid,
        },
      })
    ).json();

    if (!data) {
      data = await (
        await fetch(`${process.env.SERVER}/api/invoices/${loadId}`, {
          method: "POST",
          headers: {
            user: uid,
          },
        })
      ).json();
    }

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/loads",
        permanent: false,
      },
    };
  }
};
