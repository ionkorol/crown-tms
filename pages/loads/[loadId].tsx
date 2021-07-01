import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { LoadProp } from "utils/interfaces";
import { Layout } from "components/common";
import {
  Breadcrumbs,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  createStyles,
  Divider,
  Grid,
  makeStyles,
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
  Theme,
  TextField,
  Box,
} from "@material-ui/core";
import Link from "next/link";
import { DropJobIcon, PickJobIcon } from "components/ui/Icons";
import { FilesView } from "components/load";
import { formatAddress, formatCurrency } from "lib";
import { isAuthenticated } from "lib/api/Users";
import { getLoad } from "lib/api/Loads";
import { ChevronRight } from "@material-ui/icons";

interface Props {
  data: LoadProp;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      marginTop: theme.spacing(5),
    },
  })
);

const Load: React.FC<Props> = (props) => {
  const { data } = props;
  const classes = useStyles();
  const [showFiles, setShowFiles] = useState(false);

  return (
    <Layout>
      <Grid container spacing={3} justify="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h2">Load# {data.id}</Typography>
          <Breadcrumbs separator={<ChevronRight />}>
            <Link href="/">Dashboard</Link>
            <Link href="/loads">Loads</Link>
            <Typography color="textPrimary">Load# {data.id}</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item>
          <Grid container spacing={3}>
            <Grid item>
              <Button variant="outlined" color="primary">
                Edit Load
              </Button>
            </Grid>
            <Grid item>
              <Link href={`/invoices/${data.id}`}>
                <Button variant="contained" color="primary">
                  View Invoice
                </Button>
              </Link>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setShowFiles(true)}
              >
                Manage Files
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box className={classes.content}>
        <Grid container spacing={3}>
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
                      <strong>TONU</strong>
                    </TableCell>
                    <TableCell>{data.isTonu ? "Yes" : "No"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Rate</strong>
                    </TableCell>
                    <TableCell>{formatCurrency(data.rate)}</TableCell>
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
      <FilesView
        show={showFiles}
        onClose={() => setShowFiles(false)}
        loadId={data.id}
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
