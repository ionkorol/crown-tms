import { storage } from "utils/firebaseClient";
import { EntityProp } from "utils/interfaces";
import { v4 as uuidv4 } from "uuid";

const uploadFile = async (
  clientId: string,
  entity: EntityProp,
  file: File,
  onComplete: () => void,
  onError: () => void
) => {
  const fileRef = storage().ref(
    `clients/${clientId}/${entity.type}/${entity.id}/${uuidv4()}.pdf`
  );
  const res = fileRef.put(file);
  res.on(storage.TaskEvent.STATE_CHANGED, {
    next: null,
    error: onError,
    complete: onComplete,
  });
  return fileRef.fullPath;
};

export default uploadFile;
