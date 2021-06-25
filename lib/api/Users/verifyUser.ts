import { GetServerSidePropsContext } from "next";
import nookies from "nookies";
import { auth } from "utils/firebaseAdmin";

const verifyUser = async (ctx: GetServerSidePropsContext) => {
  const { token } = nookies.get(ctx);
  const { uid } = await auth().verifyIdToken(token);
  return uid;
};

export default verifyUser;
