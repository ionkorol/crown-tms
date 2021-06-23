import React from "react";
import { Navigation, Header } from "components/common";
import { Container, CssBaseline, Theme, Toolbar } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { display: "flex" },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      minHeight: "100vh",
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
      <div className={classes.content}>
        <Toolbar />
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
