import React from "react";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridRowsProp,
  GridToolbar,
  GridValueFormatterParams,
} from "@material-ui/data-grid";
import { InvoiceProp } from "utils/interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";

interface Props {
  data: InvoiceProp[];
  handleDelete: (invoiceId: string) => void;
  handleEdit: (invoiceData: InvoiceProp) => void;
}

const DataTable: React.FC<Props> = (props) => {
  const { data, handleDelete, handleEdit } = props;

  const rows: GridRowsProp = data.map((invoice) => ({
    id: invoice.id,
    broker: invoice.broker.dba,
    amount: invoice.rate,
    actions: invoice,
  }));
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
            onClick={() => handleEdit(params.value as InvoiceProp)}
            variant="warning"
            className="mr-1"
          >
            <FontAwesomeIcon icon="pencil-alt" color="#fff" />
          </Button>
          <Button
            onClick={() =>
              handleDelete(String((params.value as InvoiceProp).id))
            }
            variant="danger"
          >
            <FontAwesomeIcon icon="trash-alt" color="#fff" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <div style={{ flexGrow: 1 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          autoHeight
          components={{ Toolbar: GridToolbar }}
        />
      </div>
    </div>
  );
};

export default DataTable;
