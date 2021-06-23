import {
  AppBar,
  Box,
  Button,
  Theme,
  Grid,
  Toolbar,
  Typography,
  Avatar,
  MenuItem,
  Menu,
  Popper,
  Grow,
  ClickAwayListener,
  MenuList,
  Paper,
  useMediaQuery,
} from "@material-ui/core";
import { createStyles, makeStyles, useTheme } from "@material-ui/core/styles";
import { useAuth } from "lib";
import React, { useState } from "react";
import { Logo } from "components/common";
import Link from "next/link";
import { NavToggle, User } from "components/common/Header";

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


interface Props {
  showDrawer: () => void
}
const Header: React.FC<Props> = (props) => {
  const {showDrawer} = props
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <AppBar position="fixed" className={classes.appBar} color="secondary">
      <Toolbar>
        <div className={classes.logo}>{matches ? <NavToggle toggle={showDrawer} /> : <Logo />}</div>
        <User />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
