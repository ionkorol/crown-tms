import { firestore } from "utils/firebaseAdmin";

const getDrivers = async (clientId: string) => {
  const query = await firestore()
    .collection("clients")
    .doc(clientId)
    .collection("drivers")
    .get();
  const data = query.docs.map((doc) => doc.data());
  return data;
};

export default getDrivers;
