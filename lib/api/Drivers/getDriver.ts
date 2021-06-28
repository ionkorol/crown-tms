import { firestore } from "utils/firebaseAdmin";
import { DriverProp } from "utils/interfaces";

const getDriver = async (clientId: string, driverId: string) => {
  const snap = await firestore()
    .collection("clients")
    .doc(clientId)
    .collection("drivers")
    .doc(driverId)
    .get();
  const data = snap.data();
  return data as DriverProp;
};

export default getDriver;
