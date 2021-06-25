import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Slide,
} from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions";
import { useAuth } from "lib";
import React, { FormEvent, useState } from "react";
import { InvoiceProp } from "utils/interfaces";

interface Props {
  show: boolean;
  onClose: () => void;
  data: InvoiceProp;
}

const StatusChange: React.FC<Props> = (props) => {
  const { show, onClose, data } = props;

  const [status, setStatus] = useState(data.status);
  const auth = useAuth();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch(`/api/invoices/${data.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        user: auth.user.id,
      },
      body: JSON.stringify({
        status,
      }),
    });
    if (await res.json()) {
      alert(`Status change to ${status}`);
    } else {
      alert(`Failure`);
    }
  };
  return (
    <Dialog open={show} onClose={onClose} TransitionComponent={Transition}>
      <DialogTitle>Change Invoice Status</DialogTitle>
      <DialogContent style={{ overflow: "hidden" }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Invoice Status</InputLabel>
                <Select
                  variant="outlined"
                  label="Invoice Status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                >
                  <MenuItem value="Generated">Generated</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Paid">Paid</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default StatusChange;

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
