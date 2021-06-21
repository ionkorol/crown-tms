import {
  AppBar,
  createStyles,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { useAuth } from "lib";
import React from "react";
import { Logo } from "components/common";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      boxShadow: "none",
      borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
    },
    logo: {
      flexGrow: 1,
    },
  })
);

const Header = () => {
  const auth = useAuth();
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar} color="secondary">
      <Toolbar>
        <div className={classes.logo}>
          <Logo />
        </div>
        <Typography>{auth.user ? auth.user.name : "Please Login"}</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
