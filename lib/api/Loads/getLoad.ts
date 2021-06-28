import { firestore } from "utils/firebaseAdmin";
import { LoadProp } from "utils/interfaces";
import { getDriver } from "../Drivers";
import { getVehicle } from "../Vehicles";

const getLoad = async (clientId: string, loadId: string) => {
  const clientRef = firestore().collection("clients").doc(clientId);
  const loadSnap = await clientRef.collection("loads").doc(loadId).get();

  const loadData = loadSnap.data();

  const brokerSnap = await firestore()
    .collection("brokers")
    .doc(loadData.broker)
    .get();
  const brokerData = brokerSnap.data();

  const driver = await getDriver(clientId, loadData.driver);
  const vehicle = await getVehicle(clientId, loadData.vehicle);

  return { ...loadData, broker: brokerData, driver, vehicle } as LoadProp;
};

export default getLoad;
