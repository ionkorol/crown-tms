import "styles/globals.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCrown,
  faEye,
  faFileInvoice,
  faPencilAlt,
  faPlus,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { PageTransition } from "components/common";
import AuthProvider from "utils/AuthProvider";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "styles/theme";
import "@fontsource/roboto";

library.add(faCrown, faFileInvoice, faPencilAlt, faPlus, faTrashAlt, faEye);

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <PageTransition
          color="#edbe48"
          startPosition={0.3}
          stopDelayMs={200}
          height={5}
        />
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default MyApp;
