import {
  Button,
  Card,
  CardContent,
  CardHeader,
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from "@material-ui/core";
import { Layout } from "components/common";
import React, { useRef } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const useStyles = makeStyles((them: Theme) =>
  createStyles({
    chart: {
      width: 900,
      height: 600,
    },
  })
);

const data = [
  {
    name: "Jan",
    uv: 4000,
  },
  {
    name: "Feb",
    uv: 3000,
  },
  {
    name: "March",
    uv: 2000,
  },
  {
    name: "Apr",
    uv: 2780,
  },
  {
    name: "May",
    uv: 1890,
  },
  {
    name: "Jun",
    uv: 2390,
  },
  {
    name: "Jul",
    uv: 0,
  },
  {
    name: "Aug",
    uv: 0,
  },
  {
    name: "Sep",
    uv: 0,
  },
  {
    name: "Oct",
    uv: 0,
  },
  {
    name: "Nov",
    uv: 0,
  },
  {
    name: "Dec",
    uv: 0,
  },
];

const reports = () => {
  const theme = useTheme();

  //   const generateChart = () => {
  //     const myChartRef = chartRef.current.getContext("2d");
  //     Chart.register(...registerables);
  //     new Chart(myChartRef, {
  //       type: "bar",
  //       data: {
  //         //Bring in data
  //         labels: [
  //           "Jan",
  //           "Feb",
  //           "Mar",
  //           "Apr",
  //           "May",
  //           "Jun",
  //           "Jul",
  //           "Aug",
  //           "Sep",
  //           "Nov",
  //           "Dec",
  //         ],
  //         datasets: [
  //           {
  //             label: "Sales",
  //             data: [86, 67, 91],
  //             backgroundColor: theme.palette.primary.light,
  //             hoverBackgroundColor: theme.palette.primary.dark,
  //             borderColor: "#fff",
  //             hoverBorderColor: theme.palette.primary.main,
  //           },
  //         ],
  //       },
  //       options: {
  //         responsive: true,
  //         maintainAspectRatio: true,
  //         aspectRatio: 3,
  //         backgroundColor: theme.palette.primary.main,
  //         color: "#fff",
  //         borderColor: "#fff",
  //         legends: {
  //           labels: {
  //             color: theme.palette.primary.main,
  //           },
  //         },
  //         title: {
  //           text: "Test",
  //         },
  //         scales: {
  //           y: {
  //             color: "#fff",
  //           },
  //         },
  //         //Customize chart options
  //       },
  //     });
  //   };

  //   return (
  //     <Layout>
  //       <Button onClick={generateChart}>Generate</Button>
  //       <Card>
  //         <CardHeader title="Monthly Growth Revenue" />
  //         <CardContent>
  //           <canvas style={{ height: "auto" }} ref={chartRef} />
  //         </CardContent>
  //       </Card>
  //     </Layout>
  //   );

  return (
    <Layout>
      <Card>
        <CardHeader title="Monthly Growth Revenue" />
        <CardContent>
          <BarChart
            width={1000}
            height={500}
            data={data}
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
            <Bar dataKey="uv" fill="#8884d8" />
          </BarChart>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default reports;
