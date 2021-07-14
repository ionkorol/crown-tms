import { firestore } from "utils/firebaseAdmin";

const getBranches = async (clientId: string) => {
  const query = await firestore()
    .collection("clients")
    .doc(clientId)
    .collection("branches")
    .get();
  const data = query.docs.map((doc) => doc.data());
  return data;
};

export default getBranches;
