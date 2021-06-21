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
import { LoadProp } from "utils/interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  createStyles,
  Icon,
  IconButton,
  makeStyles,
  Paper,
} from "@material-ui/core";
import { Visibility } from "@material-ui/icons";
import Link from "next/link";
import { formatCurrency } from "lib";
interface Props {
  data: LoadProp[];
  // handleDelete: (invoiceId: string) => void;
  // handleEdit: (invoiceData: LoadProp) => void;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    table: {},
  })
);

const DataTable: React.FC<Props> = (props) => {
  const { data } = props;
  const classes = useStyles();
  const columns: GridColDef[] = [
    { field: "id", headerName: "#", width: 100 },
    { field: "broker", headerName: "Broker", flex: 3, sortable: false },
    {
      type: "number",
      field: "amount",
      headerName: "Amount",
      flex: 1,
      valueFormatter: (params: GridValueFormatterParams) =>
        formatCurrency(params.value as number),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      align: "center",
      renderCell: (params: GridCellParams) => (
        <Link href={`/loads/${params.value}`}>
          <IconButton>
            <Visibility />
          </IconButton>
        </Link>
      ),
      sortable: false,
    },
  ];

  const rows = data.map(
    (invoice) =>
      ({
        id: invoice.id,
        broker: invoice.broker.dba,
        amount: invoice.rate,
        actions: invoice.id,
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
        className={classes.table}
      />
    </Paper>
  );
};

export default DataTable;
