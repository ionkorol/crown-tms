import React, { useEffect, useState } from "react";
import { InvoicePdf } from "components/invoices";
import { GetServerSideProps } from "next";
import { InvoiceProp } from "utils/interfaces";

interface Props {
  data: InvoiceProp;
}

const Invoice: React.FC<Props> = (props) => {
  const { data } = props;

  return <InvoicePdf data={data} />;
};

export default Invoice;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { invoiceId } = ctx.query;
  try {
    const data = await (
      await fetch(`${process.env.SERVER}/api/invoices/${invoiceId}`)
    ).json();
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/invoices",
        permanent: false,
      },
    };
  }
};
