import { IconButton } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import React from "react";

interface Props {
  toggle: () => void;
}

const NavToggle: React.FC<Props> = (props) => {
  const { toggle } = props;
  return (
    <IconButton onClick={toggle}>
      <Menu />
    </IconButton>
  );
};

export default NavToggle;
