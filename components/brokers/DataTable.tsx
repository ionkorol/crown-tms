import React from "react";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridRowsProp,
  GridToolbar,
} from "@material-ui/data-grid";
import { BrokerProp } from "utils/interfaces";
import { Delete, Visibility } from "@material-ui/icons";
import { Box, IconButton, Paper } from "@material-ui/core";
import Link from "next/link";

interface Props {
  data: BrokerProp[];
  handleDelete: (brokerId: string) => void;
  handleEdit: (brokerData: BrokerProp) => void;
}

const DataTable: React.FC<Props> = (props) => {
  const { data, handleDelete, handleEdit } = props;

  const rows: GridRowsProp = data.map((broker) => ({
    id: broker.id,
    name: broker.dba,
    email: broker.billingEmail,
    terms: broker.terms,
    actions: broker.id,
  }));
  const columns: GridColDef[] = [
    { field: "id", headerName: "id", hide: true },
    { field: "name", headerName: "Name", flex: 2 },
    { field: "email", headerName: "Email", flex: 2 },
    {
      field: "terms",
      headerName: "Terms",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: (params: GridCellParams) => (
        <Box>
          <Link href={`/brokers/${params.value}`}>
            <IconButton>
              <Visibility />
            </IconButton>
          </Link>
          <IconButton
            color="primary"
            onClick={() => handleDelete(params.value as string)}
          >
            <Delete />
          </IconButton>
        </Box>
      ),
    },
  ];

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
