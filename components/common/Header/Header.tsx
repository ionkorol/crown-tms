import { AppBar, Box, Theme, Toolbar, useMediaQuery } from "@material-ui/core";
import React from "react";
import { Logo } from "components/common";
import { NavToggle, User } from "components/common/Header";
import { makeStyles, createStyles } from "@material-ui/styles";
import { useTheme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      boxShadow: "none",
      borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
      background: theme.palette.secondary.main,
    },
  })
);

interface Props {
  showDrawer: () => void;
}
const Header: React.FC<Props> = (props) => {
  const { showDrawer } = props;
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <AppBar position="fixed" className={classes.appBar} color="secondary">
      <Toolbar>
        {matches ? <NavToggle toggle={showDrawer} /> : <Logo />}
        <User />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
