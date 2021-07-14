import {
  Grid,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  Box,
  IconButton,
  InputAdornment,
} from "@material-ui/core";
import { ArrowBack, Check } from "@material-ui/icons";
import { Layout } from "components/common";
import { Breadcrumbs } from "components/ui";
import { useFormik } from "formik";
import { useAuth } from "lib";
import Link from "next/link";
import React from "react";
import { useStyles } from "styles";
import * as yup from "yup";

const schema = yup.object().shape({
  id: yup.string().required("Required"),
  vin: yup.string().required("Required"),
  year: yup.number().required("Required"),
  make: yup.string().required("Required"),
  model: yup.string().required("Required"),
  manufacturer: yup.string(),
  engine: yup.string(),
});

const NewVehicles = () => {
  const auth = useAuth();
  const classes = useStyles();
  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
      id: "",
      vin: "",
      year: 0,
      make: "",
      model: "",
      type: "",
    },
    onSubmit: async () => {
      try {
        const res = await (
          await fetch("/api/vehicles", {
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

  const handleCheckVin = async () => {
    const res = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${formik.values.vin}?format=json`,
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
    const data = (await res.json()).Results as {
      Value: string;
      ValueId: string;
      Variable: string;
      VariableId: number;
    }[];

    formik.setFieldValue(
      "year",
      data[data.findIndex((value) => value.VariableId === 29)].Value
    );
    formik.setFieldValue(
      "make",
      data[data.findIndex((value) => value.VariableId === 26)].Value
    );
    formik.setFieldValue(
      "model",
      data[data.findIndex((value) => value.VariableId === 28)].Value
    );
    formik.setFieldValue(
      "type",
      data[data.findIndex((value) => value.VariableId === 39)].Value
    );
  };

  return (
    <Layout>
      <Breadcrumbs
        title="New Vehicle"
        data={[{ title: "Vehicles", url: "/vehicles" }]}
      >
        <Link href="/vehicles" passHref>
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
                <Grid item xs={12} md={3}>
                  <TextField
                    variant="outlined"
                    id="id"
                    name="id"
                    label="ID"
                    value={formik.values.id}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={9}>
                  <TextField
                    variant="outlined"
                    id="vin"
                    name="vin"
                    label="VIN"
                    value={formik.values.vin}
                    onChange={formik.handleChange}
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton color="primary" onClick={handleCheckVin}>
                            <Check />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    variant="outlined"
                    id="year"
                    name="year"
                    label="Year"
                    value={formik.values.year}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    variant="outlined"
                    id="make"
                    name="make"
                    label="Make"
                    value={formik.values.make}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    variant="outlined"
                    id="model"
                    name="model"
                    label="Model"
                    value={formik.values.model}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    variant="outlined"
                    id="type"
                    name="type"
                    label="Type"
                    value={formik.values.type}
                    onChange={formik.handleChange}
                    fullWidth
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

export default NewVehicles;
