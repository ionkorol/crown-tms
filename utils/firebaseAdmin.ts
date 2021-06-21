import admin from "firebase-admin";

import serviceAccount from "./firebase-admin.json";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as any),
  });
}

const { firestore, auth, storage } = admin;

export { firestore, auth, storage };
