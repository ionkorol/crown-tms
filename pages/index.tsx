import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import Image from "next/image";
import { Layout, Logo } from "../components/common";
import styles from "../styles/Home.module.scss";

export default function Home() {
  return (
    <Layout>
      <h1 className={styles.title}>
        Welcome to <Logo />
      </h1>
    </Layout>
  );
}
