import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormLabel,
  Typography,
  Grid,
} from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import { useAuth } from "lib";
import { uploadFile } from "lib/files";
import * as yup from "yup";
import { useFormik } from "formik";
import { DocumentProp } from "utils/interfaces";

const schema = yup.object().shape({
  type: yup.string().required(),
  uploadedBy: yup.string().required(),
  ref: yup.string().required(),
  entity: yup.object().shape({
    type: yup.string().required(),
    id: yup.string().required(),
  }),
});

interface Props {
  show: boolean;
  onClose: () => void;
  entity: {
    type: "Load" | "Invoice" | "Driver" | "Vehicle";
    id: string;
  };
}
const FilesView: React.FC<Props> = (props) => {
  const { show, onClose, entity } = props;

  const [file, setFile] = useState<File | null>(null);

  const classes = useStyles();
  const { user } = useAuth();

  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
      type: "",
      uploadedBy: "",
      ref: "",
      entity,
    },
    onSubmit: async (values) => {
      const res = await fetch("/api/documents", {
        method: "POST",
        headers: {
          user: user.id,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const jsonData = await res.json();
      if (jsonData) {
        alert("Doc Created");
      } else {
        alert("Error");
      }
    },
  });

  useEffect(() => {
    if (user) {
      formik.setFieldValue("uploadedBy", user.id);
    }
  }, [user]);

  return (
    <Dialog open={show} onClose={onClose}>
      <DialogTitle>Files</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={5}>
            <Grid item>
              <FormControl className={classes.uploadControl}>
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
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={async () => {
                  const ref = await uploadFile(
                    user.clientId,
                    entity,
                    file,
                    () => alert("File Uploaded"),
                    () => alert("Error")
                  );
                  formik.setFieldValue("ref", ref);
                }}
              >
                Upload
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl>
                <InputLabel>Type</InputLabel>
                <Select
                  name="type"
                  value={formik.values.type}
                  onChange={formik.handleChange}
                  label="Type"
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
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" type="submit">
                Upload
              </Button>
            </Grid>
          </Grid>
        </form>
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
