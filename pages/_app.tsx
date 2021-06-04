import "styles/globals.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCrown, faFileInvoice, faPencilAlt, faPlus } from "@fortawesome/free-solid-svg-icons";

library.add(faCrown, faFileInvoice, faPencilAlt, faPlus);

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
