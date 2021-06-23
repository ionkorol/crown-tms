import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import Image from "next/image";
import { Layout, Logo } from "../components/common";

export default function Home() {
  return (
    <Layout>
      <h1>
        Welcome to <Logo />
      </h1>
    </Layout>
  );
}
