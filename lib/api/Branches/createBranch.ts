import { firestore } from "utils/firebaseAdmin";
import { ClientBranchProp } from "utils/interfaces";

const createBranch = async (clientId: string, data: ClientBranchProp) => {
  try {
    const ref = await firestore()
      .collection("clients")
      .doc(clientId)
      .collection("branches")
      .add(data);

    await ref.update({
      id: ref.id,
    });
    return true;
  } catch (error) {
    return false;
  }
};

export default createBranch;
