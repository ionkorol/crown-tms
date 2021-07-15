import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@material-ui/core";
import React from "react";
import { DocumentProp } from "utils/interfaces";

interface Props {
  data: DocumentProp[];
}

const DocumentsView: React.FC<Props> = (props) => {
  const { data } = props;
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Date</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((file) => (
          <TableRow key={file.id}>
            <TableCell>
              {file.entity.type} {file.entity.id} - {file.type}
            </TableCell>
            <TableCell>
              {new Date(file.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell>
              <Button>Download</Button>
              <Button>Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DocumentsView;
