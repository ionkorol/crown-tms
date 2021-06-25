import { firestore } from "utils/firebaseAdmin";

const changeInvoiceStatus = async (
  clientId: string,
  invoiceId: string,
  status: "Generated" | "Pending" | "Paid"
) => {
  try {
    await firestore()
      .collection("clients")
      .doc(clientId)
      .collection("invoices")
      .doc(invoiceId)
      .update({
        status,
      });
    return true;
  } catch (error) {
    return false;
  }
};

export default changeInvoiceStatus;
