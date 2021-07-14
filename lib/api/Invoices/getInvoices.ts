import { firestore } from "utils/firebaseAdmin";
import { InvoiceProp } from "utils/interfaces";
import { getLoad } from "lib/api/Loads";

const getInvoices = async (clientId: string) => {
  const invoicesQuery = await firestore()
    .collection("clients")
    .doc(clientId)
    .collection("invoices")
    .where("status", "==", "Generated")
    .get();
  let invoicesData = [];
  for (const invoiceSnap of invoicesQuery.docs) {
    const invoiceData = invoiceSnap.data() as InvoiceProp;
    const loadData = await getLoad(clientId, String(invoiceData.id));
    invoicesData = [
      ...invoicesData,
      { ...invoiceData, load: loadData, broker: loadData.broker },
    ];
  }
  return invoicesData as InvoiceProp[];
};

export default getInvoices;
