import React from "react";
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
} from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Business, Description, Work, People, Group } from "@material-ui/icons";
import Link from "next/link";
import NavItem from "./NavItem";
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
  })
);

const Navigation = () => {
  const auth = useAuth();
  const classes = useStyles();
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List
          component="nav"
          subheader={<ListSubheader>Managment</ListSubheader>}
        >
          <NavItem text="Loads" icon={<Work />}>
            <ListItem button>
              <ListItemText>List</ListItemText>
            </ListItem>
            <ListItem button>
              <ListItemText>New</ListItemText>
            </ListItem>
          </NavItem>
          <NavItem text="Brokers" icon={<Group />}>
            <ListItem button>
              <ListItemText>List</ListItemText>
            </ListItem>
            <ListItem button>
              <ListItemText>New</ListItemText>
            </ListItem>
          </NavItem>
          <NavItem text="Invoices" icon={<Description />}>
            <ListItem button>
              <ListItemText>List</ListItemText>
            </ListItem>
            <ListItem button>
              <ListItemText>New</ListItemText>
            </ListItem>
          </NavItem>
          <NavItem text="Users" icon={<People />}>
            <ListItem button>
              <ListItemText>List</ListItemText>
            </ListItem>
            <ListItem button>
              <ListItemText>New</ListItemText>
            </ListItem>
          </NavItem>
        </List>
      </div>
    </Drawer>
  );
};

export default Navigation;
