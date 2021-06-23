import { createMuiTheme, StyleRules } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import { green } from "@material-ui/core/colors";
import { CardHeaderClassKey, TableClassKey } from "@material-ui/core";

declare module "@material-ui/core/styles/overrides" {
  export interface ComponentNameToClassKey {
    MuiDataGrid: TableClassKey;
  }
}

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#ffbb48",
      contrastText: "#fff",
    },
    secondary: {
      main: "#293142",
    },
    error: {
      main: red.A400,
    },
    success: {
      main: green.A400,
    },
    background: {
      default: "#1c2531",
      paper: "#293142",
    },
    text: {
      primary: "#fff",
      secondary: "#919eab",
    },
  },
  shape: {
    borderRadius: 20,
  },
  typography: {},
  overrides: {
    MuiCardHeader: {
      action: {
        alignSelf: "center",
      },
    },
    MuiDataGrid: {
      root: {
        border: "none",
      },
    },
  },
});

export default theme;
