import { Button, Grid, TextField } from "@material-ui/core";
import { Formik, useFormik } from "formik";
import { useAuth } from "lib";
import React from "react";
import * as yup from "yup";

const schema = yup.object().shape({
  clientId: yup.string().required("Required"),
  username: yup.string().required("Required"),
  password: yup.string().required("Required"),
});

const LoginForm = () => {
  const auth = useAuth();

  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
      clientId: "",
      username: "",
      password: "",
    },
    onSubmit: (values) =>
      auth.signIn(values.clientId, values.username, values.password),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            name="clientId"
            label="Client ID"
            placeholder="Enter Client ID"
            value={formik.values.clientId}
            onChange={formik.handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            name="username"
            label="Username"
            placeholder="Enter Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            type="password"
            name="password"
            label="Password"
            placeholder="Enter Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            size="large"
          >
            Log In
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default LoginForm;
