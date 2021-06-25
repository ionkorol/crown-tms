import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  List,
  Button,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core";
import { ExpandLess, ExpandMore, StarBorder } from "@material-ui/icons";
import Link from "next/link";
import React, { useState } from "react";

interface Props {
  text: string;
  icon: any;
  url?: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    nested: {},
  })
);

const NavItem: React.FC<Props> = (props) => {
  const { text, icon, children, url } = props;
  const [open, setOpen] = useState(false);
  if (!children) {
    return (
      <Link href={url}>
        <ListItem button component="a">
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      </Link>
    );
  }
  return (
    <>
      <ListItem button onClick={() => setOpen(!open)}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children}
        </List>
      </Collapse>
    </>
  );
};

export default NavItem;
