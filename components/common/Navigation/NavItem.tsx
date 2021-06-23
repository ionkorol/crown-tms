import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  List,
  SvgIconTypeMap,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core";
import { ExpandLess, ExpandMore, StarBorder } from "@material-ui/icons";
import React, { useState } from "react";

interface Props {
  text: string;
  icon: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    nested: {},
  })
);

const NavItem: React.FC<Props> = (props) => {
  const { text, icon, children } = props;
  const [open, setOpen] = useState(false);

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
