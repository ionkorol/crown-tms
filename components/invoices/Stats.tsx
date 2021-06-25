import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@material-ui/core";
import React from "react";
import { InvoiceProp } from "utils/interfaces";

interface Props {
  data: InvoiceProp[];
}

const Stats: React.FC<Props> = (props) => {
  const { data } = props;
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const invoicesToday = data.filter(
    (invoice) =>
      new Date(invoice.createdAt).toLocaleDateString() ===
      today.toLocaleDateString()
  ).length;
  const invoicesYesterday = data.filter(
    (invoice) =>
      new Date(invoice.createdAt).toLocaleDateString() ===
      yesterday.toLocaleDateString()
  ).length;
  const invoicesMonth = data.filter(
    (invoice) => new Date(invoice.createdAt).getMonth() === today.getMonth()
  ).length;

  const invoicesPending = data.filter(
    (invoice) => invoice.status === "Pending"
  ).length;
  return (
    <Grid container spacing={3}>
      <Grid item>
        <Card>
          <CardContent>
            <Typography color="textSecondary">Unpaid Invoices</Typography>
            <Typography variant="h4">{invoicesPending}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item>
        <Card>
          <CardContent>
            <Typography color="textSecondary">Invoices Today</Typography>
            <Typography variant="h4">{invoicesToday}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item>
        <Card>
          <CardContent>
            <Typography color="textSecondary">Invoices Yesterday</Typography>
            <Typography variant="h4">{invoicesYesterday}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item>
        <Card>
          <CardContent>
            <Typography color="textSecondary">Invoices This Month</Typography>
            <Typography variant="h4">{invoicesMonth}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Stats;
