import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  DialogActions,
  Button,
  InputAdornment,
} from "@material-ui/core";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { LoadLineItemProp } from "utils/interfaces";
import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().required("Required"),
  quantity: yup.number().required("Required"),
  rate: yup.number().required("Required"),
  total: yup.number().required("Required"),
  notes: yup.string(),
});

interface Props {
  show: boolean;
  handleClose: () => void;
  handleSubmit: (data: LoadLineItemProp) => void;
}

const LineItemModal: React.FC<Props> = (props) => {
  const { show, handleClose, handleSubmit } = props;
  const formik = useFormik({
    initialValues: {
      title: "Line Haul",
      quantity: 1,
      rate: 0,
      total: 0,
      notes: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      handleSubmit(values as LoadLineItemProp);
    },
  });

  useEffect(() => {
    formik.resetForm();
    console.log("reset");
  }, [show]);

  useEffect(() => {
    formik.setFieldValue("total", formik.values.quantity * formik.values.rate);
  }, [formik.values.quantity, formik.values.rate]);

  return (
    <Dialog open={show} onClose={handleClose}>
      <DialogTitle>Add Line Item</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit} id="LineItemForm">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl>
                <InputLabel>Title</InputLabel>
                <Select
                  label="Title"
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  error={!!formik.errors.title}
                >
                  <MenuItem value="Line Haul">Line Haul</MenuItem>
                  <MenuItem value="TONU">Line Haul</MenuItem>
                  <MenuItem value="Tolls">Tolls</MenuItem>
                  <MenuItem value="Lumper">Lumper</MenuItem>
                  <MenuItem value="Fuel">Fuel</MenuItem>
                  <MenuItem value="Mileage">Mileage</MenuItem>
                  <MenuItem value="Deadhead">Deadhead</MenuItem>
                  <MenuItem value="Extra Stops">Extra Stops</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="number"
                name="quantity"
                label="Quantity"
                value={formik.values.quantity}
                onChange={formik.handleChange}
                error={!!formik.errors.quantity}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">#</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="number"
                name="rate"
                label="Rate"
                value={formik.values.rate}
                onChange={formik.handleChange}
                error={!!formik.errors.rate}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="number"
                name="total"
                label="Total"
                value={formik.values.total}
                disabled
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                rows={3}
                label="Notes"
                name="notes"
                value={formik.values.notes}
                onChange={formik.handleChange}
                error={!!formik.errors.notes}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          form="LineItemForm"
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LineItemModal;
