import { firestore } from "utils/firebaseAdmin";
import { getLoad } from "lib/api/Loads";

const getInvoice = async (clientId: string, invoiceId: string) => {
  const invoiceSnap = await firestore()
    .collection("clients")
    .doc(clientId)
    .collection("invoices")
    .doc(invoiceId)
    .get();

  if (invoiceSnap.exists) {
    const invoiceData = invoiceSnap.data();
    const loadData = await getLoad(clientId, invoiceId);
    return { ...invoiceData, broker: loadData.broker, load: loadData };
  } else {
    return false;
  }
};

export default getInvoice;
