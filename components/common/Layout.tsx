import React from "react";
import { Container } from "react-bootstrap";
import { Navigation } from "components/common";
import styles from "./Layout.module.scss";

const Layout = (props) => {
  return (
    <Container fluid className={styles.container}>
      <Navigation />
      <main className={styles.main}>{props.children}</main>

      <footer className={styles.footer}>
        <a href="/">
          Powered by <span className={styles.logo}>Crown TMS</span>
        </a>
      </footer>
    </Container>
  );
};

export default Layout;
