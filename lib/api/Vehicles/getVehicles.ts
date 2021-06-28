import { firestore } from "utils/firebaseAdmin";
import { VehicleProp } from "utils/interfaces";

const getVehicles = async (clientId: string) => {
  const query = await firestore()
    .collection("clients")
    .doc(clientId)
    .collection("vehicles")
    .get();
  const data = query.docs.map((doc) => doc.data());
  return data as VehicleProp[];
};

export default getVehicles;
