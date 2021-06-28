import {
  Grid,
  Typography,
  Breadcrumbs,
  Button,
  TextField,
  Card,
  CardContent,
  Box,
} from "@material-ui/core";
import { ArrowBack, ChevronRight } from "@material-ui/icons";
import { Layout } from "components/common";
import { getIn, useFormik } from "formik";
import { useAuth } from "lib";
import Link from "next/link";
import React from "react";
import { useStyles } from "styles";
import * as yup from "yup";

const schema = yup.object().shape({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  address: yup.object().shape({
    address1: yup.string().required("Required"),
    address2: yup.string(),
    city: yup.string().required("Required"),
    state: yup.string().required("Required"),
    zipCode: yup.string().required("Required"),
  }),
});

const NewDriver = () => {
  const auth = useAuth();
  const classes = useStyles();
  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
      firstName: "",
      lastName: "",
      address: {
        address1: "",
        address2: "",
        city: "",
        state: "",
        zipCode: "",
      },
    },
    onSubmit: async () => {
      try {
        const res = await (
          await fetch("/api/drivers", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              user: auth.user.id,
            },
            body: JSON.stringify(formik.values),
          })
        ).json();
        alert(res);
      } catch (error) {
        alert(error);
      }
    },
  });

  return (
    <Layout>
      <Grid container alignItems="center" justify="space-between">
        <Grid item>
          <Typography variant="h2">New Driver</Typography>
          <Breadcrumbs separator={<ChevronRight />}>
            <Link href="/">Dashboard</Link>
            <Link href="/drivers">Drivers</Link>
            <Typography color="textPrimary">New Driver</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item>
          <Link href="/drivers">
            <Button
              variant="outlined"
              color="primary"
              startIcon={<ArrowBack />}
            >
              Cancel
            </Button>
          </Link>
        </Grid>
      </Grid>
      <Box className={classes.content}>
        <Card>
          <CardContent>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    variant="outlined"
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    variant="outlined"
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    id="address.address1"
                    name="address.address1"
                    label="Address 1"
                    value={getIn(formik.values, "address.address1")}
                    onChange={formik.handleChange}
                    error={
                      getIn(formik.touched, "address.address1") &&
                      Boolean(getIn(formik.errors, "address.address1"))
                    }
                    helperText={
                      getIn(formik.touched, "address.address1") &&
                      getIn(formik.errors, "address.address1")
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    id="address.address2"
                    name="address.address2"
                    label="Address 2"
                    value={formik.values.address.address2}
                    onChange={formik.handleChange}
                    error={
                      getIn(formik.touched, "address.address2") &&
                      Boolean(getIn(formik.errors, "address.address2"))
                    }
                    helperText={
                      getIn(formik.touched, "address.address2") &&
                      getIn(formik.errors, "address.address2")
                    }
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    id="address.city"
                    name="address.city"
                    label="City"
                    value={formik.values.address.city}
                    onChange={formik.handleChange}
                    error={
                      getIn(formik.touched, "address.city") &&
                      Boolean(getIn(formik.errors, "address.city"))
                    }
                    helperText={
                      getIn(formik.touched, "address.city") &&
                      getIn(formik.errors, "address.city")
                    }
                  />
                </Grid>
                <Grid item md={3}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    id="address.state"
                    name="address.state"
                    label="State"
                    value={formik.values.address.state}
                    onChange={formik.handleChange}
                    error={
                      getIn(formik.touched, "address.state") &&
                      Boolean(getIn(formik.errors, "address.state"))
                    }
                    helperText={
                      getIn(formik.touched, "address.state") &&
                      getIn(formik.errors, "address.state")
                    }
                  />
                </Grid>
                <Grid item md={3}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    id="address.zipCode"
                    name="address.zipCode"
                    label="Zip Code"
                    value={formik.values.address.zipCode}
                    onChange={formik.handleChange}
                    error={
                      getIn(formik.touched, "address.zipCode") &&
                      Boolean(getIn(formik.errors, "address.zipCode"))
                    }
                    helperText={
                      getIn(formik.touched, "address.zipCode") &&
                      getIn(formik.errors, "address.zipCode")
                    }
                  />
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary" type="submit">
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Layout>
  );
};

export default NewDriver;
