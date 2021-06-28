import { firestore } from "utils/firebaseAdmin";
import { VehicleProp } from "utils/interfaces";

const createVehicle = async (clientId: string, data: VehicleProp) => {
  try {
    await firestore()
      .collection("clients")
      .doc(clientId)
      .collection("vehicles")
      .doc(data.id)
      .set({
        ...data,
        createdAt: Date.now(),
      });

    return true;
  } catch (error) {
    return false;
  }
};

export default createVehicle;
