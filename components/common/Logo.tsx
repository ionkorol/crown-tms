import { Typography, Box, Icon } from "@material-ui/core";
import { Whatshot } from "@material-ui/icons";

import React from "react";

const Logo = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyItems: "center",
      }}
    >
      <Icon color="primary">
        <Whatshot />
      </Icon>
      <Typography variant="h4" component="h1">
        Crown TMS
      </Typography>
    </Box>
  );
};

export default Logo;
