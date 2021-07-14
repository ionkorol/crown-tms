import {
  Card,
  CardHeader,
  CardContent,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
} from "@material-ui/core";
import { formatCurrency } from "lib";
import React from "react";
import { LoadLineItemProp } from "utils/interfaces";

interface Props {
  data: LoadLineItemProp[];
  actions?: any;
}

const LineItemsView: React.FC<Props> = (props) => {
  const { data, actions } = props;
  return (
    <Card>
      <CardHeader title="Line Items" action={actions} />
      <CardContent>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Rate</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((lineItem, index) => (
              <TableRow key={index}>
                <TableCell>{lineItem.title}</TableCell>
                <TableCell>{lineItem.notes}</TableCell>
                <TableCell>{lineItem.quantity}</TableCell>
                <TableCell>{formatCurrency(lineItem.rate)}</TableCell>
                <TableCell>{formatCurrency(lineItem.total)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default LineItemsView;
