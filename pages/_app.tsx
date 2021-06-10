import "styles/globals.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCrown,
  faFileInvoice,
  faPencilAlt,
  faPlus,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { PageTransition } from "components/common";

library.add(faCrown, faFileInvoice, faPencilAlt, faPlus, faTrashAlt);

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <PageTransition
        color="#edbe48"
        startPosition={0.3}
        stopDelayMs={200}
        height={5}
      />
      <Component {...pageProps} />
    </React.Fragment>
  );
}

export default MyApp;
