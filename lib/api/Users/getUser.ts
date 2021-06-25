import { firestore } from "utils/firebaseAdmin";
import { UserProp } from "utils/interfaces";

const getUser = async (userId: string) => {
  try {
    const docSnap = await firestore().collection("users").doc(userId).get();
    const docData = docSnap.data();
    return docData as UserProp;
  } catch (error) {
    return false;
  }
};

export default getUser;
