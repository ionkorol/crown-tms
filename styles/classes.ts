import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    marginTop: theme.spacing(5),
  },
}));

export default useStyles;
