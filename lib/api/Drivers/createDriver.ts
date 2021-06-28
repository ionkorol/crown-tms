import { firestore } from "utils/firebaseAdmin";
import { DriverProp } from "utils/interfaces";

const createDriver = async (clientId: string, data: DriverProp) => {
  try {
    const docRef = await firestore()
      .collection("clients")
      .doc(clientId)
      .collection("drivers")
      .add({
        ...data,
        createdAt: Date.now()
      });
    await docRef.update({
      id: docRef.id,
    });
    return true;
  } catch (error) {
    return false;
  }
};

export default createDriver;
