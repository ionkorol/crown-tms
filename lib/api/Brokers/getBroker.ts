import { firestore } from "utils/firebaseAdmin";

const getBroker = async (brokerId: string) => {
  const snap = await firestore()
    .collection("brokers")
    .doc(brokerId as string)
    .get();
  const data = snap.data();
  return data;
};

export default getBroker;
