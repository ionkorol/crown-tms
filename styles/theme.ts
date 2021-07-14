import { createTheme } from "@material-ui/core/styles";
import { green, red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: "dark",
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
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {},
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        fullWidth: true,
      },
    },
    MuiFormControl: {
      defaultProps: {
        fullWidth: true,
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid gray",
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        fullWidth: true,
      },
    },
  },
});

export default theme;
