import {
  Grid,
  Card,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
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
} from "@material-ui/core";
import { Layout } from "components/common";
import Link from "next/link";
import { DropJobIcon, PickJobIcon } from "components/ui/Icons";
import React, { useState } from "react";
import { InvoiceProp } from "utils/interfaces";
import { GetServerSideProps } from "next";
import { formatAddress, formatCurrency } from "lib";
import { generateClassicInvoice } from "lib/invoice";
import { createInvoice, getInvoice } from "lib/api/Invoices";
import { isAuthenticated } from "lib/api/Users";
import { StatusBadge, StatusChange } from "components/invoices";
import { ChevronRight } from "@material-ui/icons";

interface Props {
  data: InvoiceProp;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      marginTop: theme.spacing(5),
    },
  })
);

const Invoice: React.FC<Props> = (props) => {
  const { data } = props;

  const { broker, load } = data;
  const classes = useStyles();
  const [showChangeStatus, setShowChangeStatus] = useState(false);

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

  return (
    <Layout>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h2">Invoice Details</Typography>
          <Breadcrumbs separator={<ChevronRight />}>
            <Link href="/">Dashboard</Link>
            <Link href="/invoices">Invoices</Link>
            <Typography color="textPrimary">Invoice# {data.id}</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item>
          <Grid container spacing={3}>
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setShowChangeStatus(true)}
              >
                Change Status
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
      <Card className={classes.content}>
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
              <Grid item md={6} direction="row">
                <Typography variant="h3">Invoice# {data.id}</Typography>
                <StatusBadge data={data.status} />
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
      <StatusChange
        show={showChangeStatus}
        onClose={() => setShowChangeStatus(false)}
        data={data}
      />
    </Layout>
  );
};

export default Invoice;

export const getServerSideProps: GetServerSideProps = async (ctx) =>
  await isAuthenticated(
    ctx,
    async (userData) => {
      let data = await getInvoice(
        userData.clientId,
        ctx.query.invoiceId as string
      );
      if (!data) {
        data = await createInvoice(
          userData.clientId,
          ctx.query.invoiceId as string
        );
      }
      return {
        props: {
          data,
        },
      };
    },
    "/"
  );
