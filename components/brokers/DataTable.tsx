import React from "react";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridRowsProp,
  GridToolbar,
} from "@material-ui/data-grid";
import { BrokerProp } from "utils/interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";

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
    actions: broker,
  }));
  const columns: GridColDef[] = [
    { field: "id", headerName: "id", hide: true },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "terms",
      headerName: "Terms",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: (params: GridCellParams) => (
        <div>
          <Button
            onClick={() => handleEdit(params.value as BrokerProp)}
            variant="warning"
            className="mr-1"
          >
            <FontAwesomeIcon icon="pencil-alt" color="#fff" />
          </Button>
          <Button
            onClick={() => handleDelete((params.value as BrokerProp).id)}
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
