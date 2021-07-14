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
import { DatePicker } from "@material-ui/lab";
import { getIn, useFormik } from "formik";
import { Moment } from "moment";
import React from "react";

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

const JobsModal: React.FC<Props> = (props) => {
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
  console.log(formik.values.date);

  return (
    <Dialog open={show} onClose={handleClose}>
      <DialogTitle>Add Job</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit} id="JobForm">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
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
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="City"
                name="address.city"
                value={formik.values.address.city}
                onChange={formik.handleChange}
                error={!!getIn(formik.errors, "address.city")}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="State"
                name="address.state"
                value={formik.values.address.state}
                onChange={formik.handleChange}
                error={!!getIn(formik.errors, "address.state")}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="ZipCode"
                name="address.zipCode"
                value={formik.values.address.zipCode}
                onChange={formik.handleChange}
                error={!!getIn(formik.errors, "address.zipCode")}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Date"
                value={formik.values.date}
                onChange={(value: Moment) =>
                  formik.setFieldValue("date", value.format("l"))
                }
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" fullWidth className="mb-3">
                <InputLabel>Type</InputLabel>
                <Select
                  label="Type"
                  name="type"
                  value={formik.values.type}
                  onChange={formik.handleChange}
                  error={!!formik.errors.type}
                  fullWidth
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Pick">Pick</MenuItem>
                  <MenuItem value="Drop">Drop</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          form="JobForm"
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default JobsModal;
