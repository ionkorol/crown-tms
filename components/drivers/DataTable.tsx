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
import { DriverProp } from "utils/interfaces";
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
  data: DriverProp[];
}

const DataTable: React.FC<Props> = (props) => {
  const { data } = props;

  const columns: GridColDef[] = [
    { field: "fullName", headerName: "Full Name", flex: 1, sortable: false },
    {
      type: "date",
      field: "date",
      headerName: "Created on",
      flex: 1,
      valueFormatter: (params: GridValueFormatterParams) =>
        new Date(params.value as number).toLocaleDateString(),
    },
    {
      field: "from",
      headerName: "From",
      flex: 2,
    },
    {
      field: "id",
      headerName: "#",
      flex: 2,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
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
    (driver) =>
      ({
        id: driver.id,
        fullName: `${driver.firstName} ${driver.lastName}`,
        date: driver.createdAt,
        from: `${driver.address.city} ${driver.address.state}`,
        action: driver.id,
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
          placeholder="Search for Driver Name"
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
