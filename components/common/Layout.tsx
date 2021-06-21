import React from "react";
import { Navigation, Header } from "components/common";
import {
  createStyles,
  CssBaseline,
  makeStyles,
  Theme,
  Toolbar,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { display: "flex" },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

const Layout = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />

      <Header />
      <Navigation />
      <main className={classes.content}>
        <Toolbar />
        {props.children}
      </main>
    </div>
  );
};

export default Layout;
