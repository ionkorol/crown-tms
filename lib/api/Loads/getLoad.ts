import { firestore } from "utils/firebaseAdmin";
import { LoadProp } from "utils/interfaces";

const getLoad = async (clientId: string, loadId: string) => {
  const clientRef = firestore().collection("clients").doc(clientId);
  const loadSnap = await clientRef.collection("loads").doc(loadId).get();

  const loadData = loadSnap.data();

  const brokerSnap = await firestore()
    .collection("brokers")
    .doc(loadData.broker)
    .get();
  const broekrData = brokerSnap.data();

  return { ...loadData, broker: broekrData } as LoadProp;
};

export default getLoad;
