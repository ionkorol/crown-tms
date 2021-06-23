import React, { useState } from "react";
import { useAuth } from "lib";
import {
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Theme,
  ListSubheader,
  Typography,
  useMediaQuery,
  Divider,
} from "@material-ui/core";
import { createStyles, makeStyles, useTheme } from "@material-ui/core/styles";
import { Business, Description, Work, People } from "@material-ui/icons";
import Link from "next/link";
import { NavItem } from "components/common/Navigation";
import Logo from "../Logo";
const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: "auto",
      padding: 20,
    },
    nestedNav: {
      paddingLeft: theme.spacing(4),
    },
  })
);

interface Props {
  open?: boolean;
  onClose?: () => void;
}

const Navigation: React.FC<Props> = (props) => {
  const { open, onClose } = props;

  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Drawer
      className={classes.drawer}
      variant={matches ? "temporary" : "permanent"}
      classes={{
        paper: classes.drawerPaper,
      }}
      open={open}
      onClose={onClose}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        {matches && <Logo />}
        <Divider />
        <List
          component="nav"
          subheader={<ListSubheader>Managment</ListSubheader>}
        >
          <NavItem text="Loads" icon={<Work />}>
            <Link href="/loads">
              <ListItem button>
                <ListItemText className={classes.nestedNav}>List</ListItemText>
              </ListItem>
            </Link>
            <Link href="/loads/new">
              <ListItem button>
                <ListItemText className={classes.nestedNav}>New</ListItemText>
              </ListItem>
            </Link>
          </NavItem>
          <NavItem text="Brokers" icon={<Business />}>
            <Link href="/brokers">
              <ListItem button>
                <ListItemText className={classes.nestedNav}>List</ListItemText>
              </ListItem>
            </Link>
            <Link href="/brokers/new">
              <ListItem button>
                <ListItemText className={classes.nestedNav}>New</ListItemText>
              </ListItem>
            </Link>
          </NavItem>
          <NavItem text="Invoices" icon={<Description />}>
            <ListItem button>
              <ListItemText className={classes.nestedNav}>List</ListItemText>
            </ListItem>
            <ListItem button>
              <ListItemText className={classes.nestedNav}>New</ListItemText>
            </ListItem>
          </NavItem>
          <NavItem text="Users" icon={<People />}>
            <ListItem button>
              <ListItemText className={classes.nestedNav}>List</ListItemText>
            </ListItem>
            <ListItem button>
              <ListItemText className={classes.nestedNav}>New</ListItemText>
            </ListItem>
          </NavItem>
        </List>
      </div>
    </Drawer>
  );
};

export default Navigation;
