import { Layout } from "components/common";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React, { useState } from "react";
import {
  BrokerProp,
  ClientBranchProp,
  DriverProp,
  JobProp,
  LoadLineItemProp,
  VehicleProp,
} from "utils/interfaces";
import { JobsModal, LineItemModal } from "components/loads/Form";
import {
  Card,
  Button,
  Typography,
  Grid,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  CardHeader,
  CardContent,
  Box,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Autocomplete,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { formatAddress, useAuth } from "lib";

import { ArrowBack, Delete, Add } from "@material-ui/icons";
import { DropJobIcon, PickJobIcon } from "components/ui/Icons";
import { isAuthenticated } from "lib/api/Users";
import { getBrokers } from "lib/api/Brokers";
import { getDrivers } from "lib/api/Drivers";
import { getVehicles } from "lib/api/Vehicles";
import { useRouter } from "next/router";
import { Breadcrumbs } from "components/ui";
import { useStyles } from "styles";
import { getBranches } from "lib/api/Branches";
import { LineItemsView } from "components/load";

interface Props {
  brokers: BrokerProp[];
  drivers: DriverProp[];
  vehicles: VehicleProp[];
  branches: ClientBranchProp[];
}

const NewLoad: React.FC<Props> = (props) => {
  const { brokers, drivers, vehicles, branches } = props;
  const [showJobModal, setShowJobModal] = useState(false);
  const [showLineItemModal, setShowLineItemModal] = useState(false);

  const [status, setStatus] = useState("");
  const [branch, setBranch] = useState(branches[0].id);

  const [broker, setBroker] = useState<BrokerProp | null>(brokers[0]);
  const [references, setReferences] = useState<
    { name: string; value: string }[]
  >([]);
  const [jobs, setJobs] = useState<JobProp[]>([]);
  const [lineItems, setLineItems] = useState<LoadLineItemProp[]>([]);
  const [reference, setReference] = useState({ name: "", value: "" });

  const [driver, setDriver] = useState("");
  const [vehicle, setVehicle] = useState("");

  const classes = useStyles();
  const router = useRouter();
  const auth = useAuth();

  const handleAddReference = () => {
    if (references.some((item) => item.name === reference.name)) {
      alert("Reference Type Already Exists!");
      return;
    }
    setReferences((prevState) => [...prevState, reference]);
    setReference({ name: "", value: "" });
  };

  const handleRemoveReference = (refName: string) => {
    setReferences((prevState) =>
      prevState.filter((item) => item.name !== refName)
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/loads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          user: auth.user.id,
        },
        body: JSON.stringify({
          status,
          branch,
          broker: broker.id,
          references,
          jobs,
          lineItems,
          driver,
          vehicle,
          notes: [],
        }),
      });

      const data = await res.json();
      if (data.id) {
        alert(data.id);
        router.push(`/loads/${data.id}`);
      } else {
        alert("Error");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Layout>
      <Breadcrumbs title="New Load" data={[{ title: "Loads", url: "/loads" }]}>
        <Link href="/loads">
          <Button variant="outlined" color="primary" startIcon={<ArrowBack />}>
            Cancel
          </Button>
        </Link>
      </Breadcrumbs>
      <Box className={classes.content}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item md={12}>
              <Card>
                <CardHeader title="Load Info" />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                          label="Status"
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value="Booked">Booked</MenuItem>
                          <MenuItem value="Dispatched">Dispatched</MenuItem>
                          <MenuItem value="In Transit">In Transit</MenuItem>
                          <MenuItem value="Completed">Completed</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel>Branch</InputLabel>
                        <Select
                          value={branch}
                          onChange={(e) => setBranch(e.target.value)}
                          label="Branch"
                        >
                          {branches.map((item) => (
                            <MenuItem value={item.id} key={item.id}>
                              {item.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <Autocomplete
                        autoHighlight
                        value={broker}
                        onChange={(e, newValue: BrokerProp | null) =>
                          setBroker(newValue)
                        }
                        options={brokers}
                        getOptionLabel={(option) =>
                          `${option.name}(${option.dba})`
                        }
                        renderOption={(props, option) => (
                          <Box>
                            <Typography>{option.name}</Typography>
                            <Typography variant="caption" color="textSecondary">
                              {option.dba}
                            </Typography>
                          </Box>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Broker"
                            inputProps={{
                              ...params.inputProps,
                              autoComplete: "new-password", // disable autocomplete and autofill
                            }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md>
                      <TextField
                        label="Ref Name"
                        value={reference.name}
                        onChange={(e) =>
                          setReference((prevState) => ({
                            ...prevState,
                            name: e.target.value,
                          }))
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md>
                      <TextField
                        label="Ref Value"
                        value={reference.value}
                        onChange={(e) =>
                          setReference((prevState) => ({
                            ...prevState,
                            value: e.target.value,
                          }))
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md sx={{ alignItems: "center" }}>
                      <Button
                        color="primary"
                        onClick={handleAddReference}
                        startIcon={<Add />}
                      >
                        ADD
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <List>
                      {!references.length && (
                        <ListItem>
                          <ListItemText
                            primary={
                              <Typography color="error">
                                No load references
                              </Typography>
                            }
                          />
                        </ListItem>
                      )}
                      {references.map((ref, index) => (
                        <ListItem divider key={index}>
                          <ListItemText primary={`${ref.name}: ${ref.value}`} />
                          <ListItemSecondaryAction>
                            <IconButton
                              onClick={() => handleRemoveReference(ref.name)}
                            >
                              <Delete color="error" />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={12}>
              <Card>
                <CardHeader
                  title="Jobs Info"
                  action={
                    <Button
                      aria-label="settings"
                      color="primary"
                      onClick={() => setShowJobModal(true)}
                      startIcon={<Add />}
                    >
                      Add
                    </Button>
                  }
                />
                <CardContent>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Type</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {jobs.map((job, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            {job.type === "Drop" ? (
                              <DropJobIcon />
                            ) : (
                              <PickJobIcon />
                            )}
                          </TableCell>
                          <TableCell>{job.name}</TableCell>
                          <TableCell>{formatAddress(job.address)}</TableCell>
                          <TableCell>{job.date}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <LineItemsView
                data={lineItems}
                actions={
                  <Button
                    onClick={() => setShowLineItemModal(true)}
                    startIcon={<Add />}
                  >
                    Add
                  </Button>
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardHeader title="Assignemnts" />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <FormControl variant="outlined" fullWidth>
                        <InputLabel>Driver</InputLabel>
                        <Select
                          label="Driver"
                          value={driver}
                          onChange={(e) => setDriver(e.target.value as any)}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {drivers.map((driver) => (
                            <MenuItem key={driver.id} value={driver.id}>
                              {driver.firstName} {driver.lastName}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl variant="outlined" fullWidth>
                        <InputLabel>Vehicle</InputLabel>
                        <Select
                          label="Vehicle"
                          value={vehicle}
                          onChange={(e) => setVehicle(e.target.value as any)}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {vehicles.map((vehicle) => (
                            <MenuItem key={vehicle.id} value={vehicle.id}>
                              {vehicle.id}. {vehicle.year} {vehicle.make}{" "}
                              {vehicle.model}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
      <JobsModal
        show={showJobModal}
        handleClose={() => setShowJobModal(false)}
        onSubmit={(values) => setJobs((prevState) => [...prevState, values])}
      />
      <LineItemModal
        show={showLineItemModal}
        handleClose={() => setShowLineItemModal(false)}
        handleSubmit={(values) =>
          setLineItems((prevState) => [...prevState, values])
        }
      />
    </Layout>
  );
};

export default NewLoad;

export const getServerSideProps: GetServerSideProps = async (ctx) =>
  await isAuthenticated(
    ctx,
    async (data) => ({
      props: {
        brokers: await getBrokers(),
        drivers: await getDrivers(data.clientId),
        vehicles: await getVehicles(data.clientId),
        branches: await getBranches(data.clientId),
      },
    }),
    "/"
  );
