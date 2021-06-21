import {
  TextField,
  Dialog,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  DialogContent,
  DialogActions,
  Button,
  DialogTitle,
} from "@material-ui/core";
import { getIn, useFormik } from "formik";
import React from "react";
import { JobProp } from "utils/interfaces";

import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Required"),
  address: yup.object().shape({
    address1: yup.string().required("Required"),
    address2: yup.string(),
    city: yup.string().required("Required"),
    state: yup.string().required("Required"),
    zipCode: yup.string().required("Required"),
  }),
  date: yup.string().required("Required"),
  type: yup.string().required("Required"),
});

interface Props {
  onSubmit: any;
  show: boolean;
  handleClose: any;
}

const JobsView: React.FC<Props> = (props) => {
  const { onSubmit, show, handleClose } = props;

  const formik = useFormik({
    initialValues: {
      name: "",
      address: {
        address1: "",
        address2: "",
        city: "",
        state: "",
        zipCode: "",
      },
      date: "",
      type: "",
    },
    validationSchema: schema,
    onSubmit: (values) => onSubmit({ ...values }),
  });

  return (
    <Dialog open={show} onClose={handleClose}>
      <DialogTitle>Add Job</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit} id="JobForm">
          <TextField
            variant="outlined"
            label="Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            fullWidth
            margin="dense"
          />
          <TextField
            variant="outlined"
            label="Address"
            name="address.address1"
            value={formik.values.address.address1}
            onChange={formik.handleChange}
            error={
              getIn(formik.touched, "address.address1") &&
              Boolean(getIn(formik.errors, "address.address1"))
            }
            helperText={
              getIn(formik.touched, "address.address1") &&
              getIn(formik.errors, "address.address1")
            }
            fullWidth
            margin="dense"
          />

          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                label="City"
                name="address.city"
                value={formik.values.address.city}
                onChange={formik.handleChange}
                error={!!getIn(formik.errors, "address.city")}
                margin="dense"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                variant="outlined"
                label="State"
                name="address.state"
                value={formik.values.address.state}
                onChange={formik.handleChange}
                error={!!getIn(formik.errors, "address.state")}
                margin="dense"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                variant="outlined"
                label="ZipCode"
                name="address.zipCode"
                value={formik.values.address.zipCode}
                onChange={formik.handleChange}
                error={!!getIn(formik.errors, "address.zipCode")}
                margin="dense"
              />
            </Grid>
          </Grid>
          <TextField
            variant="outlined"
            label="Date"
            name="date"
            value={formik.values.date}
            onChange={formik.handleChange}
            error={!!formik.errors.date}
            margin="dense"
          />
          <FormControl variant="outlined" fullWidth className="mb-3">
            <InputLabel>Type</InputLabel>
            <Select
              variant="outlined"
              label="Type"
              name="type"
              value={formik.values.type}
              onChange={formik.handleChange}
              error={!!formik.errors.type}
              margin="dense"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Pick">Pick</MenuItem>
              <MenuItem value="Drop">Drop</MenuItem>
            </Select>
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button type="submit" color="primary" variant="contained" form="JobForm">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default JobsView;
