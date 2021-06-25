import React from "react";
import { CustomBadge } from "components/ui";

interface Props {
  data: "In Progress" | "Complete";
}
const LoadStatusBadge: React.FC<Props> = (props) => {
  const { data } = props;
  const color = data === "In Progress" ? "warning" : "success";
  return <CustomBadge color={color}>{data}</CustomBadge>;
};

export default LoadStatusBadge;
