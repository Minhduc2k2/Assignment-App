import { useState, useEffect } from "react";
import { projectFireStore } from "../firebase/config";

export const useDocument = (collection, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const ref = projectFireStore.collection(collection).doc(id);

    const unsub = ref.onSnapshot(
      (snapshot) => {
        setDocument({ ...snapshot.data(), id: snapshot.id });
        setError(null);
      },
      (error) => {
        setError(error.message);
      }
    );
    return () => unsub();
  }, [collection, id]);
  return { document, error };
};
