import { firestore } from "utils/firebaseAdmin";
import { ClientBranchProp } from "utils/interfaces";

const getBranch = async (clientId: string, branchId: string) => {
  const snap = await firestore()
    .collection("clients")
    .doc(clientId)
    .collection("branches")
    .doc(branchId)
    .get();
  const data = snap.data();
  return data as ClientBranchProp;
};

export default getBranch;
