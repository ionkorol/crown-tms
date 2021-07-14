import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
} from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { LoadingButton } from "@material-ui/lab";
import { Layout } from "components/common";
import { Breadcrumbs } from "components/ui";
import { useFormik } from "formik";
import { useAuth, useSnack } from "lib";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useStyles } from "styles";
import { ClientBranchProp } from "utils/interfaces";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Required"),
  dba: yup.string(),
  mc: yup.string().required("Required"),
  usdot: yup.string().required("Required"),
  address: yup.object().shape({
    address1: yup.string().required("Required"),
    address2: yup.string(),
    city: yup.string().required("Required"),
    state: yup.string().required("Required"),
    zipCode: yup.string().required("Required"),
    country: yup.string().required("Required"),
  }),
  phone: yup.string().required("Required"),
  fax: yup.string().required("Required"),
  dispatchEmail: yup.string().required("Required"),
  accountingEmail: yup.string().required("Required"),
});

const NewBranch = () => {
  const [submiting, setSubmiting] = useState(false);

  const auth = useAuth();
  const classes = useStyles();
  const snack = useSnack();
  const router = useRouter();

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
        country: "",
      },
      phone: "",
      fax: "",
      dispatchEmail: "",
      accountingEmail: "",
    } as ClientBranchProp,
    onSubmit: async (values) => {
      setSubmiting(true);
      try {
        await fetch("/api/branches", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            user: auth.user.id,
          },
          body: JSON.stringify(values),
        });
        snack.generate("Successfully Created New Branch", "success");
        router.push(`/settings/branches`);
      } catch (error) {
        snack.generate(error.message, "error");
      }
      setSubmiting(false);
    },
  });
  return (
    <Layout>
      <Breadcrumbs
        title="New Branch"
        data={[{ title: "Branches", url: "/settings/branches" }]}
      >
        <Link href="/settings/branches">
          <Button variant="outlined" color="primary" startIcon={<ArrowBack />}>
            Cancel
          </Button>
        </Link>
      </Breadcrumbs>
      <Box className={classes.content}>
        <Card>
          <CardContent>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <CustomTextField formik={formik} id="name" label="Name" />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField formik={formik} id="dba" label="DBA" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomTextField formik={formik} id="mc" label="MC" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomTextField formik={formik} id="usdot" label="US DOT" />
                </Grid>
                {/* Address */}
                <Grid item xs={12}>
                  <CustomTextField
                    formik={formik}
                    id="address.address1"
                    label="Address 1"
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    formik={formik}
                    id="address.address2"
                    label="Address 2"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomTextField
                    formik={formik}
                    id="address.city"
                    label="City"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomTextField
                    formik={formik}
                    id="address.state"
                    label="State"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomTextField
                    formik={formik}
                    id="address.zipCode"
                    label="Zip Code"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomTextField
                    formik={formik}
                    id="address.country"
                    label="Country"
                  />
                </Grid>

                {/* Contact */}
                <Grid item xs={12} md={6}>
                  <CustomTextField formik={formik} id="phone" label="Phone" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomTextField formik={formik} id="fax" label="Fax" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomTextField
                    formik={formik}
                    id="dispatchEmail"
                    label="Dispatch Email"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomTextField
                    formik={formik}
                    id="accountingEmail"
                    label="Accounting Email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <LoadingButton
                    loading={submiting}
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Submit
                  </LoadingButton>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Layout>
  );
};

export default NewBranch;

const CustomTextField = ({
  formik,
  label,
  id,
}: {
  formik: ReturnType<typeof useFormik>;
  label: string;
  id: string;
}) => {
  return (
    <TextField
      variant="outlined"
      color="primary"
      id={id}
      name={id}
      label={label}
      value={formik.values[id]}
      onChange={formik.handleChange}
      error={formik.touched[id] && Boolean(formik.errors[id])}
      helperText={formik.touched[id] && formik.errors[id]}
      fullWidth
    />
  );
};
