import { firestore } from "utils/firebaseAdmin";
import { LoadProp } from "utils/interfaces";
import { getBroker } from "../Brokers";

const getLoads = async (clientId: string) => {
  const loadsQuery = await firestore()
    .collection("clients")
    .doc(clientId)
    .collection("loads")
    .orderBy("id")
    .limitToLast(10)
    .get();
  let loadsData = [];
  for (const loadSnap of loadsQuery.docs) {
    const loadData = loadSnap.data() as LoadProp;
    const brokerData = await getBroker(loadData.broker as any);
    loadsData = [...loadsData, { ...loadData, broker: brokerData }];
  }
  return loadsData;
};

export default getLoads;
