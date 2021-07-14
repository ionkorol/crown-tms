import { Grid, Typography, Breadcrumbs } from "@material-ui/core";
import { ChevronRight } from "@material-ui/icons";
import React from "react";
import { Link } from "components/ui";

interface Props {
  title: string;
  data?: {
    title: string;
    url: string;
  }[];
}

const CustomBreadcrumbs: React.FC<Props> = (props) => {
  const { title, data, children } = props;
  return (
    <Grid
      container
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Grid item>
        <Typography variant="h2">{title}</Typography>
        <Breadcrumbs separator={<ChevronRight />}>
          <Link href="/">Dashboard</Link>
          {data &&
            data.map((item) => (
              <Link href={item.url} key={item.url}>
                {item.title}
              </Link>
            ))}
          <Typography color="textPrimary">{title}</Typography>
        </Breadcrumbs>
      </Grid>
      <Grid item>{children}</Grid>
    </Grid>
  );
};

export default CustomBreadcrumbs;
