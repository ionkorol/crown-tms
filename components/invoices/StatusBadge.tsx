import { CustomBadge } from "components/ui";
import React from "react";

interface Props {
  data: "Generated" | "Pending" | "Paid";
}

const StatusBadge: React.FC<Props> = (props) => {
  const { data } = props;
  const color =
    data === "Generated" ? "info" : data === "Pending" ? "warning" : "success";
  return <CustomBadge color={color}>{data}</CustomBadge>;
};

export default StatusBadge;
