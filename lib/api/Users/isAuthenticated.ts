import { GetServerSidePropsContext, Redirect } from "next";
import nookies from "nookies";
import { auth } from "utils/firebaseAdmin";
import { UserProp } from "utils/interfaces";
import { getUser } from ".";

const isAuthenticated = async (
  ctx: GetServerSidePropsContext,
  onSuccess: (data: UserProp) => any,
  onErrorRedirect: string
) => {
  try {
    const { token } = nookies.get(ctx);
    const { uid } = await auth().verifyIdToken(token);
    const userData = await getUser(uid);
    if (userData) {
      return onSuccess(userData);
    } else {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        } as Redirect,
      };
    }
  } catch (error) {
    return {
      redirect: {
        destination: onErrorRedirect,
        permanent: false,
      } as Redirect,
    };
  }
};

export default isAuthenticated;
