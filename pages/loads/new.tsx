import { Layout } from "components/common";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import nookies from "nookies";
import { auth } from "utils/firebaseAdmin";
import { BrokerProp, JobProp, LoadProp } from "utils/interfaces";
import { JobsView } from "components/loads/Form";
import {
  Paper,
  Breadcrumbs,
  Button,
  Typography,
  Grid,
  makeStyles,
  Theme,
  createStyles,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemAvatar,
  ListItemIcon,
  Box,
  ListItemSecondaryAction,
  IconButton,
  OutlinedInput,
} from "@material-ui/core";
import { useAuth } from "lib";
import { Publish, GetApp } from "@material-ui/icons";

import { ArrowBack, Delete, Add } from "@material-ui/icons";

interface Props {
  data: LoadProp[];
  brokers: BrokerProp[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    controls: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: theme.spacing(2),
    },
    inlineForm: {
      display: "flex",
      justifyContent: "space-between",
    },
    notchedOutline: {
      borderWidth: "1px",
      borderColor: "yellow !important",
    },
  })
);

const NewLoad: React.FC<Props> = (props) => {
  const { data, brokers } = props;
  const [showAddJob, setShowAddJob] = useState(false);
  const [broker, setBroker] = useState(brokers[0].id);
  const [references, setReferences] = useState<
    { name: string; value: string }[]
  >([]);
  const [isTonu, setIsTonu] = useState(false);
  const [jobs, setJobs] = useState<JobProp[]>([]);
  const [rate, setRate] = useState("");
  const [reference, setReference] = useState({ name: "", value: "" });

  const classes = useStyles();

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
      const data = await (
        await fetch("/api/loads", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            user: auth.user.id,
          },
          body: JSON.stringify({
            broker,
            references,
            isTonu,
            jobs,
            rate,
          }),
        })
      ).json();
      if (data.id) {
        console.log(data.id);
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <Grid container className={classes.controls}>
        <Grid item>
          <h1>New Load</h1>
          <Breadcrumbs separator=">">
            <Link href="/" passHref>
              Dashboard
            </Link>
            <Link href="/loads" passHref>
              Loads
            </Link>
            <Typography color="textPrimary">New Load</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item>
          <Link href="/loads" passHref>
            <Button variant="outlined" color="primary">
              <Typography color="primary">
                <ArrowBack /> Cancel
              </Typography>
            </Button>
          </Link>
        </Grid>
      </Grid>
      <Form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper className="p-5">
              <Typography component="h2">Load Info</Typography>
              <Divider className="my-3" />
              <FormControl variant="outlined" fullWidth className="mb-3">
                <InputLabel>Brokers</InputLabel>
                <Select
                  variant="outlined"
                  name="broker"
                  label="Brokers"
                  value={broker}
                  onChange={(e) => setBroker(e.target.value as string)}
                  fullWidth
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>

                  {brokers.map((broker) => (
                    <MenuItem value={broker.id} key={broker.id}>
                      {broker.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                variant="outlined"
                label="Rate"
                name="rate"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                fullWidth
                className="mb-3"
              />
              <List className="mb-3">
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
              <Grid container spacing={3}>
                <Grid item xs={5}>
                  <TextField
                    size="small"
                    variant="outlined"
                    label="Reference Name"
                    value={reference.name}
                    onChange={(e) =>
                      setReference((prevState) => ({
                        ...prevState,
                        name: e.target.value,
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    size="small"
                    variant="outlined"
                    label="Reference Value"
                    value={reference.value}
                    onChange={(e) =>
                      setReference((prevState) => ({
                        ...prevState,
                        value: e.target.value,
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddReference}
                  >
                    <Add /> ADD
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className="p-5">
              <Grid container justify="space-between" alignItems="center">
                <Grid item>
                  <Typography component="h1">Jobs Info</Typography>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setShowAddJob(true)}
                  >
                    <Add /> Add Job
                  </Button>
                </Grid>
              </Grid>
              <Divider className="my-3" />
              <FormControlLabel
                label="Is tonu?"
                control={
                  <Switch
                    name="isTonu"
                    color="primary"
                    onChange={(e) => setIsTonu(!isTonu)}
                  />
                }
              />
              <List subheader={<Typography>Job List</Typography>}>
                {jobs
                  .sort((a, b) => {
                    if (a.type === "Pick" && b.type === "Drop") {
                      return -1;
                    } else if (a.type === "Drop" && b.type === "Pick") {
                      return 1;
                    } else {
                      return 0;
                    }
                  })
                  .map((job, index) => (
                    <ListItem key={index} divider>
                      <ListItemIcon>
                        {job.type === "Pick" ? (
                          <Publish color="secondary" />
                        ) : (
                          <GetApp color="error" />
                        )}
                      </ListItemIcon>
                      <ListItemText>
                        {job.name}: {job.address.address1}, {job.address.city},{" "}
                        {job.address.state} {job.address.zipCode}
                      </ListItemText>
                    </ListItem>
                  ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
        <Button type="submit">Submit</Button>
      </Form>
      <JobsView
        onSubmit={(values) => setJobs((prevState) => [...prevState, values])}
        show={showAddJob}
        handleClose={() => setShowAddJob(false)}
      />
    </Layout>
  );
};

export default NewLoad;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { token } = nookies.get(ctx);
    const { uid } = await auth().verifyIdToken(token);
    const data = await (
      await fetch(`${process.env.SERVER}/api/loads`, {
        headers: {
          user: uid,
        },
      })
    ).json();

    const brokers = await (
      await fetch(`${process.env.SERVER}/api/brokers`)
    ).json();
    return {
      props: {
        data,
        brokers,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};