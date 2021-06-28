import { firestore } from "utils/firebaseAdmin";
import { VehicleProp } from "utils/interfaces";

const getVehicle = async (clientId: string, vehicleId: string) => {
  const snap = await firestore()
    .collection("clients")
    .doc(clientId)
    .collection("vehicles")
    .doc(vehicleId)
    .get();
  const data = snap.data();
  return data as VehicleProp;
};

export default getVehicle;
