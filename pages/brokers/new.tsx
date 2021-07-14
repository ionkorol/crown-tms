import { Button, Grid, TextField, Paper, Box } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { Layout } from "components/common";
import { Breadcrumbs } from "components/ui";
import { getIn, useFormik } from "formik";
import Link from "next/link";
import React from "react";
import { useStyles } from "styles";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  dba: yup.string().required("DBA is required"),
  mc: yup.string().required("MC number is requred"),
  usdot: yup.string().required("MC number is requred"),
  address: yup.object({
    address1: yup.string().required("Address is required"),
    address2: yup.string(),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    zipCode: yup.string().required("Zip Code is required"),
  }),
  phone: yup.string().required("Phone is required"),
  fax: yup.string().required("Fax is required"),
  billingEmail: yup.string().required("Billing email is required"),
  accountingEmail: yup.string().required("Accounting email is required"),
  terms: yup.string().required("Terms are required"),
});

const NewBroker = () => {
  const classes = useStyles();
  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
      name: "",
      dba: "",
      mc: "",
      usdot: "",
      address: {
        address1: "",
        address2: "",
        city: "",
        state: "",
        zipCode: "",
      },
      phone: "",
      fax: "",
      billingEmail: "",
      accountingEmail: "",
      terms: "",
    },
    onSubmit: async (values) => {
      const res = await (
        await fetch("/api/brokers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formik.values),
        })
      ).json();
      alert(res.id);
    },
  });
  return (
    <Layout>
      <Breadcrumbs
        title="New Broker"
        data={[{ title: "Brokers", url: "/brokers" }]}
      >
        <Link href="/brokers">
          <Button variant="outlined" color="primary" startIcon={<ArrowBack />}>
            Cancel
          </Button>
        </Link>
      </Breadcrumbs>

      <Paper className={classes.content}>
        <Box padding={3}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  id="name"
                  name="name"
                  label="Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  id="dba"
                  name="dba"
                  label="DBA"
                  value={formik.values.dba}
                  onChange={formik.handleChange}
                  error={formik.touched.dba && Boolean(formik.errors.dba)}
                  helperText={formik.touched.dba && formik.errors.dba}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  id="mc"
                  name="mc"
                  label="MC Number"
                  value={formik.values.mc}
                  onChange={formik.handleChange}
                  error={formik.touched.mc && Boolean(formik.errors.mc)}
                  helperText={formik.touched.mc && formik.errors.mc}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  id="usdot"
                  name="usdot"
                  label="US Dot"
                  value={formik.values.usdot}
                  onChange={formik.handleChange}
                  error={formik.touched.usdot && Boolean(formik.errors.usdot)}
                  helperText={formik.touched.usdot && formik.errors.usdot}
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
              <Grid item md={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  id="phone"
                  name="phone"
                  label="Phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  id="fax"
                  name="fax"
                  label="Fax"
                  value={formik.values.fax}
                  onChange={formik.handleChange}
                  error={formik.touched.fax && Boolean(formik.errors.fax)}
                  helperText={formik.touched.fax && formik.errors.fax}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  id="billingEmail"
                  name="billingEmail"
                  label="Billing Email"
                  value={formik.values.billingEmail}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.billingEmail &&
                    Boolean(formik.errors.billingEmail)
                  }
                  helperText={
                    formik.touched.billingEmail && formik.errors.billingEmail
                  }
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  id="accountingEmail"
                  name="accountingEmail"
                  label="Accounting Email"
                  value={formik.values.accountingEmail}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.accountingEmail &&
                    Boolean(formik.errors.accountingEmail)
                  }
                  helperText={
                    formik.touched.accountingEmail &&
                    formik.errors.accountingEmail
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  id="terms"
                  name="terms"
                  label="Terms"
                  value={formik.values.terms}
                  onChange={formik.handleChange}
                  error={formik.touched.terms && Boolean(formik.errors.terms)}
                  helperText={formik.touched.terms && formik.errors.terms}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Paper>
    </Layout>
  );
};

export default NewBroker;
