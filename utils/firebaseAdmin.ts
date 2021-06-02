import admin, { firestore } from "firebase-admin";

import serviceAccount from "./firebase-admin.json";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as any),
  });
}

export { firestore as firestoreAdmin };
