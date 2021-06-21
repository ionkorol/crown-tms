import React from "react";
import { useAuth } from "lib";
import {
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  createStyles,
  Theme,
  makeStyles,
} from "@material-ui/core";
import {Business, Description, Work, People} from '@material-ui/icons'
import Link from "next/link";
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
        <List>
          {["Loads", "Brokers", "Invoices", "Users"].map((text, index) => (
            <Link href={`/${text.toLowerCase()}`} key={text}>
              <ListItem button>
                <ListItemIcon>
                  {text==="Loads" && <Work />}
                  {text==="Brokers" && <Business />}
                  {text==="Invoices" && <Description />}
                  {text==="Users" && <People />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

export default Navigation;
