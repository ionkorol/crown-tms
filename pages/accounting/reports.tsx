import { Button, Card, CardContent, CardHeader } from "@material-ui/core";
import { Layout } from "components/common";
import { useAuth } from "lib";
import { isAuthenticated } from "lib/api/Users";
import { GetServerSideProps } from "next";
import React, { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { InvoiceProp } from "utils/interfaces";

interface Props {
  data: InvoiceProp[];
}
const Reports: React.FC<Props> = (props) => {
  const { data } = props;
  const [mgr, setMGR] = useState<{ [key: string]: number }[]>([]);
  const auth = useAuth();

  const handleMGR = async () => {
    const data = await (
      await fetch("/api/accounting/reports/mgr", {
        headers: {
          user: auth.user.id,
        },
      })
    ).json();
    setMGR(data);
  };
  console.log(data);

  return (
    <Layout>
      <Button onClick={handleMGR}>Generate</Button>
      <Card>
        <CardHeader title="Monthly Growth Revenue" />
        <CardContent>
          <BarChart
            width={1000}
            height={500}
            data={Object.entries(mgr).map(([key, value]) => ({
              name: key,
              value,
            }))}
            style={{ padding: 10 }}
          >
            <CartesianGrid strokeDasharray="4" />
            <XAxis dataKey="name" color="#fff" />
            <YAxis
              fill="#fff"
              domain={[0, 5000]}
              tick={{ stroke: "#c0c0c0" }}
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Reports;

export const getServerSideProps: GetServerSideProps = async (ctx) =>
  await isAuthenticated(ctx, () => ({ props: {} }), "/");
