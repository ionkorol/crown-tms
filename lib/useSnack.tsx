import { useContext } from "react";
import { SnackContext } from "utils/SnackProvider";

const useSnack = () => {
  return useContext(SnackContext);
};

export default useSnack;
