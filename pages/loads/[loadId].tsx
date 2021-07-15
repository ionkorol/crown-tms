import React, { useState } from "react";
import { GetServerSideProps } from "next";
import { LoadProp } from "utils/interfaces";
import { Layout } from "components/common";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  TextField,
  Box,
  Paper,
  Stack,
} from "@material-ui/core";
import Link from "next/link";
import { DropJobIcon, PickJobIcon } from "components/ui/Icons";
import { NewDocumentModal, LineItemsView } from "components/load";
import { formatAddress, useAuth, useSnack } from "lib";
import { isAuthenticated } from "lib/api/Users";
import { getLoad } from "lib/api/Loads";
import { Breadcrumbs } from "components/ui";
import { useStyles } from "styles";
import moment from "moment";

interface Props {
  data: LoadProp;
}

const Load: React.FC<Props> = (props) => {
  const { data } = props;
  const classes = useStyles();
  const [showFiles, setShowFiles] = useState(false);
  const auth = useAuth();
  const snack = useSnack();

  const handleSendToAccounting = async () => {
    try {
      const res = await fetch(`/api/invoices/${data.id}`, {
        method: "POST",
        headers: {
          user: auth.user.id,
        },
      });
      const jsonData = await res.json();
      console.log(jsonData);
      snack.generate("Load has been sent to Accounting", "success");
    } catch (error) {
      snack.generate(error.message, "error");
    }
  };

  return (
    <Layout>
      <Breadcrumbs
        title="Load Details"
        data={[{ title: "Loads", url: "/loads" }]}
      >
        <Button variant="outlined" color="primary">
          Edit Load
        </Button>
      </Breadcrumbs>

      <Box className={classes.content}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ padding: [1, 2] }}>
              <Stack direction="row" spacing={3} sx={{ alignItems: "center" }}>
                <Typography variant="h5">Actions: </Typography>
                <Button onClick={handleSendToAccounting}>
                  Send To Accounting
                </Button>
                <Link href={`/invoices/${data.id}`} passHref>
                  <Button>View Invoice</Button>
                </Link>
                <Button onClick={() => setShowFiles(true)}>Manage Files</Button>
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardHeader title="Load Info" />
              <Divider />
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <strong>Number</strong>
                    </TableCell>
                    <TableCell>{data.id}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Created</strong>
                    </TableCell>
                    <TableCell>
                      {moment(data.createdAt).format("lll")}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>References</strong>
                    </TableCell>
                    <TableCell>
                      {data.references.map(
                        (ref) => `${ref.name}: ${ref.value}`
                      )}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <strong>Driver / Vehicle</strong>
                    </TableCell>
                    <TableCell>
                      {data.driver.firstName} {data.driver.lastName} /{" "}
                      {data.vehicle.id}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Branch</strong>
                    </TableCell>
                    <TableCell>{data.branch.name}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <CardActions>
                <Button color="primary">Edit</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardHeader title="Broker Info" />
              <Divider />
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <strong>Name</strong>
                    </TableCell>
                    <TableCell>{data.broker.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>DBA</strong>
                    </TableCell>
                    <TableCell>{data.broker.dba}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>MC / USDOT</strong>
                    </TableCell>
                    <TableCell>
                      {data.broker.mc} / {data.broker.usdot}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Phone / Fax</strong>
                    </TableCell>
                    <TableCell>
                      {data.broker.phone} / {data.broker.fax}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Emails</strong>
                    </TableCell>
                    <TableCell>
                      {data.broker.billingEmail} / {data.broker.accountingEmail}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <CardActions>
                <Button color="primary">View</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardHeader title="Picks / Drops Info" />
              <Divider />
              <List>
                {data.jobs.map((job, index) => (
                  <ListItem divider key={index}>
                    <ListItemIcon>
                      {job.type === "Pick" ? <PickJobIcon /> : <DropJobIcon />}
                    </ListItemIcon>
                    <ListItemText
                      primary={job.name}
                      secondary={formatAddress(job.address)}
                    />
                  </ListItem>
                ))}
              </List>
              <CardActions>
                <Button color="primary">Edit</Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6}>
            <LineItemsView data={data.lineItems} />
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Load Notes" />
              <Divider />
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  marginTop={1}
                >
                  <TextField
                    variant="outlined"
                    label="New Note"
                    margin="dense"
                  />
                  <Button color="primary">Submit</Button>
                </Box>
                <List>
                  {!data.notes.length && (
                    <Typography align="center" color="error">
                      No notes
                    </Typography>
                  )}
                  {data.notes.map((note, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={note} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <NewDocumentModal
        show={showFiles}
        onClose={() => setShowFiles(false)}
        entity={{ type: "Load", id: String(data.id) }}
      />
    </Layout>
  );
};

export default Load;

export const getServerSideProps: GetServerSideProps = async (ctx) =>
  await isAuthenticated(
    ctx,
    async (data) => ({
      props: {
        data: await getLoad(data.clientId, ctx.query.loadId as string),
      },
    }),
    "/"
  );
