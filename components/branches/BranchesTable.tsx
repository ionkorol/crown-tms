import React, { useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridRowModel,
  GridToolbarContainer,
} from "@material-ui/data-grid";
import { ClientBranchProp } from "utils/interfaces";
import { Box, Button, Grid, Paper, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import { Create, Delete } from "@material-ui/icons";
import Link from "next/link";
import { useAuth, useSnack } from "lib";

interface Props {
  data: ClientBranchProp[];
}

const DataTable: React.FC<Props> = (props) => {
  const { data } = props;
  const [row, setRow] = useState(null);

  const router = useRouter();

  const columns: GridColDef[] = [
    { field: "id", headerName: "#", hide: true },
    {
      field: "name",
      headerName: "Name",
      flex: 3,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <Typography>{(params.value as ClientBranchProp).name}</Typography>
          <Typography color="textSecondary">
            {(params.value as ClientBranchProp).dba}
          </Typography>
        </Box>
      ),
    },
    {
      field: "mc",
      headerName: "MC Number",
      flex: 1,
    },
    {
      field: "emails",
      headerName: "Emails",
      flex: 1,
      renderCell: (params) => (
        <Box>
          <Typography>
            {(params.value as ClientBranchProp).accountingEmail}
          </Typography>
          <Typography color="textSecondary">
            {(params.value as ClientBranchProp).dispatchEmail}
          </Typography>
        </Box>
      ),
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
    },
  ];

  const rows = data.map(
    (branch) =>
      ({
        id: branch.id,
        name: branch,
        mc: branch.mc,
        emails: branch,
        phone: branch.phone,
      } as GridRowModel)
  );

  return (
    <Paper style={{ flexGrow: 1 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        autoHeight
        components={{ Toolbar }}
        componentsProps={{ toolbar: { data: row } }}
        onRowDoubleClick={(params) =>
          router.push(`/settings/branches/${params.id}`)
        }
        onRowSelected={(params) => setRow(params.data)}
      />
    </Paper>
  );
};

export default DataTable;

interface TBProps {
  data: ClientBranchProp;
}

const Toolbar: React.FC<TBProps> = (props) => {
  const { data } = props;
  const { user } = useAuth();
  const snack = useSnack();

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/branches/${data.id}`, {
        method: "DELETE",
        headers: {
          user: user.id,
        },
      });
      alert(await res.json());
      snack.generate("Successfully Deleted Branch", "success");
    } catch (error) {
      snack.generate(error.message, "error");
    }
  };

  return (
    <GridToolbarContainer>
      <Grid container sx={{ alignItems: "center" }} spacing={3}>
        <Grid item>
          <Typography>Branches Actions:</Typography>
        </Grid>
        {data ? (
          <React.Fragment>
            <Grid item>
              <Link href={`/branches/${data.id}`}>
                <Button color="primary" startIcon={<Create />}>
                  Edit Load
                </Button>
              </Link>
            </Grid>
            <Grid item>
              <Button
                color="primary"
                startIcon={<Delete />}
                onClick={handleDelete}
              >
                Delete Branch
              </Button>
            </Grid>
          </React.Fragment>
        ) : (
          <Grid item>
            <Typography color="error">Select Branch</Typography>
          </Grid>
        )}
      </Grid>
    </GridToolbarContainer>
  );
};
