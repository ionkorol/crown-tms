import { firestore } from "utils/firebaseAdmin";
import { InvoiceProp, LoadProp } from "utils/interfaces";
import { getLoad } from "lib/api/Loads";

const createInvoice = async (clientId: string, invoiceId: string) => {
  const loadData = await getLoad(clientId, invoiceId);
  let invoiceBalance = 0;

  loadData.lineItems.forEach((item) => (invoiceBalance += item.total));

  const invoiceData = {
    id: Number(invoiceId),
    createdAt: Date.now(),
    status: "Generated",
    payments: [],
    balance: invoiceBalance,
    notes: "",
  } as InvoiceProp;

  await firestore()
    .collection("clients")
    .doc(clientId)
    .collection("invoices")
    .doc(invoiceId)
    .set(invoiceData);

  return { ...invoiceData, load: loadData, broker: loadData.broker };
};

export default createInvoice;
