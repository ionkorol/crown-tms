import {
  Box,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { blue, green, orange, red } from "@material-ui/core/colors";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "5px 15px",
      borderRadius: 20,
      width: "fit-content",
    },
    success: {
      backgroundColor: green.A400,
    },
    warning: {
      backgroundColor: orange.A400,
    },
    error: {
      backgroundColor: red.A400,
    },
    info: {
      backgroundColor: blue.A400,
    },
  })
);

interface Props {
  color: "success" | "error" | "info" | "warning";
}
const CustomBadge: React.FC<Props> = (props) => {
  const { color } = props;
  const classes = useStyles();
  return (
    <Box className={`${classes.root} ${classes[color]}`}>
      <Typography>{props.children}</Typography>
    </Box>
  );
};

export default CustomBadge;
