import { useEffect, useRef, useState } from "react";
import { projectFireStore } from "../firebase/config";

export const useCollection = (collection, _query, _orderBy) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  const query = useRef(_query).current;
  const orderBy = useRef(_orderBy).current;

  useEffect(() => {
    let ref = projectFireStore.collection(collection);

    if (query) {
      ref = ref.where(query);
    }
    if (orderBy) {
      ref = ref.orderBy(orderBy);
    }
    const unsub = ref.onSnapshot(
      (snapshot) => {
        let result = [];
        snapshot.docs.forEach((doc) =>
          result.push({ ...doc.data(), id: doc.id })
        );
        setDocument(result);
        setError(null);
      },
      (error) => {
        setError(error.message);
      }
    );
    return () => unsub();
  }, [collection, query, orderBy]);
  return { document, error };
};
