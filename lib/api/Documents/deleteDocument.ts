import { firestore } from "utils/firebaseAdmin";

const deleteDocument = async (clientId: string, documentId: string) => {
  await firestore()
    .collection("clients")
    .doc(clientId)
    .collection("documents")
    .doc(documentId)
    .delete();
};

export default deleteDocument;
