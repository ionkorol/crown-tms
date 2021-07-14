import { getLoads } from "lib/api/Loads";
import { GetServerSideProps } from "next";
import React from "react";

const test = () => {
  return <div></div>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      data: getLoads("100"),
    },
  };
};

export default test;
