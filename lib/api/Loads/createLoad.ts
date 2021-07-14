import { firestore } from "utils/firebaseAdmin";
import { LoadProp } from "utils/interfaces";

const createLoad = async (clientId: string, data: LoadProp) => {
  try {
    const loadsRef = firestore()
      .collection("clients")
      .doc(clientId)
      .collection("loads");

    const lastId = (
      await loadsRef.orderBy("id").limitToLast(1).get()
    ).docs[0].data().id;

    const currentId = lastId + 1;

    await loadsRef.doc(String(currentId)).set({
      ...data,
      id: currentId,
      createdAt: Date.now(),
      notes: [],
    } as LoadProp);

    return true;
  } catch (error) {
    return false;
  }
};

export default createLoad;
