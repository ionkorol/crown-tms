import { firestore } from "utils/firebaseAdmin";

const deleteBranch = async (clientId: string, id: string) => {
  try {
    const ref = firestore()
      .collection("clients")
      .doc(clientId)
      .collection("branches")
      .doc(id);

    await ref.delete();
    return true;
  } catch (error) {
    return false;
  }
};

export default deleteBranch;
