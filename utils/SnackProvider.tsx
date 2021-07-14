import { Alert, AlertColor, Snackbar } from "@material-ui/core";
import React, { createContext, useState } from "react";

interface SnackProps {
  message: string;
  color: AlertColor;
  open: boolean;
}

export const SnackContext = createContext<{
  generate: (message: string, variant: AlertColor) => void;
}>({ generate: null });

const SnackProvider = ({ children }) => {
  const [snack, setSnack] = useState<SnackProps>({
    message: "",
    color: "success",
    open: false,
  });

  const handleShow = (message: string, variant: AlertColor) => {
    setSnack({
      message,
      color: variant,
      open: true,
    });
  };

  const handleClose = (event?, reason?) => {
    if (reason === "clickaway") {
      return;
    }
    setSnack((prevState) => ({ ...prevState, open: false }));
  };
  return (
    <SnackContext.Provider value={{ generate: handleShow }}>
      <Snackbar open={snack.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          variant="filled"
          onClose={handleClose}
          severity={snack.color}
          sx={{ width: "100%" }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
      {children}
    </SnackContext.Provider>
  );
};

export default SnackProvider;
