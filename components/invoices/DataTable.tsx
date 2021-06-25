import React from "react";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridRowModel,
  GridRowsProp,
  GridToolbar,
  GridToolbarContainer,
  GridValueFormatterParams,
} from "@material-ui/data-grid";
import { BrokerProp, InvoiceProp } from "utils/interfaces";
import {
  Chip,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { Check, Search, Visibility } from "@material-ui/icons";
import { Box } from "@material-ui/core";
import { CustomBadge } from "components/ui";

interface Props {
  data: InvoiceProp[];
}

const DataTable: React.FC<Props> = (props) => {
  const { data } = props;

  const columns: GridColDef[] = [
    { field: "id", headerName: "#", width: 90 },
    {
      field: "broker",
      headerName: "Broker",
      flex: 2,
      // renderCell: (params: GridCellParams) => (
      //   <Box>
      //     <Typography>{(params.value as BrokerProp).dba}</Typography>
      //     <Typography variant="subtitle2" color="textSecondary">
      //       {(params.value as BrokerProp).billingEmail}
      //     </Typography>
      //   </Box>
      // ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params: GridCellParams) => (
        <CustomBadge
          color={
            params.value === "Generate"
              ? "info"
              : params.value === "Pending"
              ? "warning"
              : "success"
          }
        >
          {params.value}
        </CustomBadge>
      ),
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
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
      width: 100,
      align: "center",
      renderCell: (params: GridCellParams) => (
        <IconButton href={`/invoices/${params.id}`}>
          <Visibility />
        </IconButton>
      ),
    },
  ];

  const rows = data.map(
    (invoice) =>
      ({
        id: invoice.id,
        broker: invoice.broker.dba,
        status: invoice.status,
        date: new Date(invoice.createdAt).toLocaleDateString(),
        amount: invoice.load.rate,
        actions: invoice,
      } as GridRowModel)
  );

  return (
    <Paper style={{ flexGrow: 1 }}>
      <DataGrid
        rows={rows}
        rowHeight={75}
        columns={columns}
        pageSize={10}
        autoHeight
        components={{ Toolbar: CustomToolbar }}
      />
    </Paper>
  );
};

export default DataTable;

const CustomToolbar = () => {
  return (
    <GridToolbarContainer>
      <Grid container spacing={3} style={{ padding: 20 }}>
        <Grid item xs={3}>
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
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel id="invoice-status-select-label">
              Invoice Status
            </InputLabel>
            <Select
              variant="outlined"
              id="invoice-status-select"
              labelId="invoice-status-select-label"
              label="Invoice Status"
              fullWidth
            >
              <MenuItem>Generated</MenuItem>
              <MenuItem>Pending</MenuItem>
              <MenuItem>Paid</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </GridToolbarContainer>
  );
};
