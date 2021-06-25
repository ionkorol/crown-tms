import { firestore } from "utils/firebaseAdmin";

const getBrokers = async () => {
  const query = await firestore().collection("brokers").get();
  const data = query.docs.map((doc) => doc.data());
  return data;
};

export default getBrokers;
