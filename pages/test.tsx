import { getLoads } from "lib/api/Loads";
import { GetServerSideProps } from "next";
import React from "react";

const test = (props) => {
  console.log(props);
  return <div></div>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      data: await getLoads("100"),
    },
  };
};

export default test;
