import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Typography,
  Box,
  Icon,
  Theme,
  createStyles,
  makeStyles,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      marginRight: theme.spacing(2),
    },
  })
);

const Logo = () => {
  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="row" alignItems="center">
      <Typography variant="h4" component="h1" className={classes.icon}>
        <FontAwesomeIcon icon="crown" color="orange" fixedWidth />
        Crown TMS
      </Typography>
    </Box>
  );
};

export default Logo;
