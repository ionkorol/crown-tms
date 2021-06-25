import React from "react";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridRowModel,
  GridRowsProp,
  GridToolbar,
  GridPanel,
  GridValueFormatterParams,
  GridToolbarContainer,
} from "@material-ui/data-grid";
import { LoadProp } from "utils/interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Icon,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
} from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Visibility } from "@material-ui/icons";
import Link from "next/link";
import { formatCurrency } from "lib";
import { Search, Check } from "@material-ui/icons";
import { CustomBadge } from "components/ui";
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
      type: "date",
      field: "date",
      headerName: "Created on",
      flex: 1,
      valueFormatter: (params: GridValueFormatterParams) =>
        new Date(params.value as number).toLocaleDateString(),
    },
    {
      type: "number",
      field: "amount",
      headerName: "Amount",
      flex: 1,
      valueFormatter: (params: GridValueFormatterParams) =>
        formatCurrency(params.value as number),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params: GridCellParams) => (
        <CustomBadge color="success">{params.value}</CustomBadge>
      )
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      align: "center",
      filterable: false,
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
        date: invoice.createdAt,
        amount: invoice.rate,
        status: invoice.status,
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
        components={{ Toolbar: CustomToolbar }}
        className={classes.table}
      />
    </Paper>
  );
};

export default DataTable;

const CustomToolbar = () => {
  return (
    <GridToolbarContainer>
      <form>
        <TextField
          variant="outlined"
          placeholder="Search for Invoice Number"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton color="primary">
                  <Check />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </form>
    </GridToolbarContainer>
  );
};
