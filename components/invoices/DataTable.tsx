import React from "react";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridRowModel,
  GridRowsProp,
  GridToolbar,
  GridValueFormatterParams,
} from "@material-ui/data-grid";
import { InvoiceProp } from "utils/interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Paper } from "@material-ui/core";

interface Props {
  data: InvoiceProp[];
  handleDelete: (invoiceId: string) => void;
}

const DataTable: React.FC<Props> = (props) => {
  const { data, handleDelete } = props;

  const columns: GridColDef[] = [
    { field: "id", headerName: "#", width: 100 },
    { field: "broker", headerName: "Broker", flex: 3 },
    {
      type: "number",
      field: "amount",
      headerName: "Amount",
      flex: 1,
      valueFormatter: (params: GridValueFormatterParams) =>
        (params.value as number).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        }),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      align: "center",
      renderCell: (params: GridCellParams) => (
        <div>
          <Button
            href={`/invoices/${params.id}`}
            className="mr-1"
            target="_blank"
          >
            <FontAwesomeIcon icon="file-invoice" color="#fff" />
          </Button>
          <Button
            onClick={() =>
              handleDelete(String((params.value as InvoiceProp).id))
            }
          >
            <FontAwesomeIcon icon="trash-alt" color="#fff" />
          </Button>
        </div>
      ),
    },
  ];

  const rows = data.map(
    (invoice) =>
      ({
        id: invoice.id,
        broker: invoice.broker.dba,
        amount: invoice.load.rate,
        actions: invoice,
      } as GridRowModel)
  );

  return (
    <Paper style={{ flexGrow: 1 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        autoHeight
        components={{ Toolbar: GridToolbar }}
      />
    </Paper>
  );
};

export default DataTable;
