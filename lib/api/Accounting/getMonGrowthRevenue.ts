import { firestore } from "utils/firebaseAdmin";
import { InvoiceProp } from "utils/interfaces";

const getMonGrowthRevenue = async (clientId: string) => {
  let mgr = {
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0,
  };
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const invoicesQuery = await firestore()
    .collection("clients")
    .doc(clientId)
    .collection("invoices")
    .get();
  const invoicesData = invoicesQuery.docs.map((invoiceSnap) =>
    invoiceSnap.data()
  ) as InvoiceProp[];

  for (const invoice of invoicesData) {
    const month = months[new Date(invoice.createdAt).getMonth()];
    const amount = Number(invoice.balance);
    mgr = {
      ...mgr,
      [month]: mgr[month] + amount,
    };
  }

  return mgr;
};

export default getMonGrowthRevenue;
