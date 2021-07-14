import React, { useEffect } from "react";
import { PageLoading } from "components/common";
import AuthProvider from "utils/AuthProvider";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "styles/theme";
import { CssBaseline } from "@material-ui/core";
import "@fontsource/roboto";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import SnackProvider from "utils/SnackProvider";
import { LocalizationProvider } from "@material-ui/lab";
import AdapterDateMoment from "@material-ui/lab/AdapterMoment";

const cache = createCache({ key: "css" });
cache.compat = true;

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider
          dateAdapter={AdapterDateMoment}
          dateFormats={{ normalDate: "MM/DD/YYYY" }}
        >
          <SnackProvider>
            <AuthProvider>
              <PageLoading />
              <CssBaseline />
              <Component {...pageProps} />
            </AuthProvider>
          </SnackProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;
