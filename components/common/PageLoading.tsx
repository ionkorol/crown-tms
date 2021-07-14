import React, { useEffect, useState } from "react";
import Router from "next/router";
import { Backdrop, CircularProgress } from "@material-ui/core";

interface Props {
  data?: string;
}

const PageLoading: React.FC<Props> = (props) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Router.events.on("routeChangeStart", () => setLoading(true));
    Router.events.on("routeChangeComplete", () => setLoading(false));
    Router.events.on("routeChangeError", () => setLoading(false));
  }, []);

  console.log(loading);

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 2 }}
      open={loading}
    >
      <CircularProgress color="primary" />
    </Backdrop>
  );
};

export default PageLoading;
