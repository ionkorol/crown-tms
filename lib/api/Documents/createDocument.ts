import { firestore } from "utils/firebaseAdmin";
import { DocumentProp } from "utils/interfaces";

const createDocument = async (
  clientId: string,
  data: DocumentProp,
  user: string
) => {
  const fileRef = await firestore()
    .collection("clients")
    .doc(clientId)
    .collection("documents")
    .add({
      ...data,
      createdAt: Date.now(),
      uploadedBy: user,
    } as DocumentProp);

  await fileRef.update({
    id: fileRef.id,
  });
};

export default createDocument;
