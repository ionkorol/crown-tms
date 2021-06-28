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
import { DriverProp, VehicleProp } from "utils/interfaces";
import {
  IconButton,
  InputAdornment,
  Paper,
  TextField,
} from "@material-ui/core";
import { Visibility } from "@material-ui/icons";
import Link from "next/link";
import { Search, Check } from "@material-ui/icons";
interface Props {
  data: VehicleProp[];
}

const DataTable: React.FC<Props> = (props) => {
  const { data } = props;

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID#",
      width: 100,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "make",
      headerName: "Make",
      flex: 1,
    },
    {
      field: "model",
      headerName: "Model",
      flex: 1,
    },
    {
      field: "year",
      headerName: "Year",
      flex: 1,
    },
    {
      type: "date",
      field: "date",
      headerName: "Added on",
      flex: 1,
      valueFormatter: (params: GridValueFormatterParams) =>
        new Date(params.value as number).toLocaleDateString(),
    },
    {
      field: "vin",
      headerName: "VIN",
      flex: 2,
    },
    {
      field: "action",
      headerName: " ",
      width: 100,
      filterable: false,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <Link href={`/drivers/${params.value}`}>
          <IconButton>
            <Visibility />
          </IconButton>
        </Link>
      ),
    },
  ];

  const rows = data.map(
    (vehicle) =>
      ({
        id: vehicle.id,
        make: vehicle.make,
        model: vehicle.model,
        year: vehicle.year,
        date: vehicle.createdAt,
        vin: vehicle.vin,
        action: vehicle.id,
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
          placeholder="Search for Vehicle"
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
