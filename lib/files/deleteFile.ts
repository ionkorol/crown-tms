import { storage } from "utils/firebaseClient";

const deleteFile = async (ref: string) => {
  await storage().ref(ref).delete();
};

export default deleteFile;
