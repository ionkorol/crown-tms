import React, { useState } from "react";
import { Navigation, Header } from "components/common";
import { Theme, Toolbar } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/styles";

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

  const [showDrawer, setShowDrawer] = useState(false);
  return (
    <div className={classes.root}>
      <Header showDrawer={() => setShowDrawer(true)} />
      <Navigation open={showDrawer} onClose={() => setShowDrawer(false)} />
      <div className={classes.content}>
        <Toolbar />
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
