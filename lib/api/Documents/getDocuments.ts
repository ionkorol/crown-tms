import { firestore } from "utils/firebaseAdmin";

const getDocuments = async (clientId: string) => {
  const query = await firestore()
    .collection("clients")
    .doc(clientId)
    .collection("documents")
    .get();
  const data = query.docs.map((snap) => snap.data());
  return data;
};

export default getDocuments;
