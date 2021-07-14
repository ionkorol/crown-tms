import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormLabel,
  Typography,
} from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import { FileProp } from "utils/interfaces";
import { useAuth } from "lib";
import { storage } from "utils/firebaseClient";

interface Props {
  show: boolean;
  onClose: () => void;
  loadId: number;
}
const FilesView: React.FC<Props> = (props) => {
  const { show, onClose, loadId } = props;
  const [data, setData] = useState<FileProp[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState("");

  const auth = useAuth();

  const classes = useStyles();

  const refreshFiles = async () => {
    const filesData = await (
      await fetch(`/api/loads/${loadId}/files`, {
        headers: {
          user: auth.user.id,
        },
      })
    ).json();
    setData(filesData);
  };

  useEffect(() => {
    if (show) {
      refreshFiles();
    }
  }, [show]);

  const uploadFile = async (filed: File) => {
    try {
      const fileRef = storage().ref(
        `clients/${auth.user.clientId}/loads/${loadId}/${fileType}.pdf`
      );
      const res = fileRef.put(filed);
      res.on(storage.TaskEvent.STATE_CHANGED, {
        next: null,
        error: console.log,
        complete: () => console.log("File Uploaded"),
      });
      await refreshFiles();
      return fileRef.fullPath;
    } catch (error) {
      console.log(error);
    }
  };

  const downloadFile = async (data: FileProp) => {
    const url = await storage().ref(data.ref).getDownloadURL();
    window.open(url);
  };

  const deleteFile = async (data: FileProp) => {
    try {
      await fetch(`/api/loads/${loadId}/files/${data.id}`, {
        method: "DELETE",
        headers: {
          user: auth.user.id,
        },
      });
      await storage().ref(data.ref).delete();
      await refreshFiles();
      alert("File Deleted");
    } catch (error) {
      alert(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const ref = await uploadFile(file);
    // Create file document
    await fetch(`/api/loads/${loadId}/files`, {
      method: "POST",
      headers: {
        user: auth.user.id,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: fileType,
        ref,
      }),
    });
    alert("File Uploaded");
  };

  return (
    <Dialog open={show} onClose={onClose}>
      <DialogTitle>Files</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <FormControl variant="outlined" fullWidth required>
            <InputLabel required>Type</InputLabel>
            <Select
              value={fileType}
              onChange={(e) => setFileType(e.target.value as string)}
              label="Type"
              required
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="RC">Rate Confirmation</MenuItem>
              <MenuItem value="BOL">BOL</MenuItem>
              <MenuItem value="POD">POD</MenuItem>
              <MenuItem value="Invoice">INVOICE</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            variant="outlined"
            fullWidth
            className={classes.uploadControl}
          >
            <FormLabel
              className={classes.uploadControlInput}
              htmlFor="button-file"
              required
            >
              <input
                style={{ display: "none" }}
                id="button-file"
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files[0])}
                required
              />
              <Button variant="outlined" color="primary" component="span">
                Select File
              </Button>
              <Typography className={classes.uploadControlLabel}>
                {file ? file.name : "No File Selected"}
              </Typography>
            </FormLabel>
          </FormControl>
          <Button variant="contained" color="primary" type="submit">
            Upload
          </Button>
        </form>

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
                <TableCell>{file.fileName}</TableCell>
                <TableCell>
                  {new Date(file.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button onClick={() => downloadFile(file)}>Download</Button>
                  <Button onClick={() => deleteFile(file)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
};

export default FilesView;

const useStyles = makeStyles((theme) =>
  createStyles({
    uploadControl: {
      margin: "10px 0",
    },
    uploadControlInput: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      border: "1px solid rgba(255, 255, 255, 0.23)",
      borderRadius: 20,
      padding: 10,
    },
    uploadControlLabel: {
      marginLeft: 10,
    },
  })
);
