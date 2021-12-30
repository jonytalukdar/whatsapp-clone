import { useEffect, useRef, useState } from 'react';
import { app } from '../firebase/Firebase.config';
import {
  getFirestore,
  collection,
  onSnapshot,
  where,
  orderBy,
  query,
} from 'firebase/firestore';

const db = getFirestore(app);

const useCollection = (collectionName, _queryString, _orderBy) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // if you don't use ref - useEffect get inifinite loop
  // _queryString is an array it is "different"  on every function call
  const queryString = useRef(_queryString).current;
  const orderByDoc = useRef(_orderBy).current;

  useEffect(() => {
    setIsLoading(true);
    let ref = query(collection(db, `${collectionName}`));

    if (queryString) {
      ref = query(ref, where(...queryString));
    }

    if (orderByDoc) {
      ref = query(ref, orderBy(...orderByDoc));
    }

    const unsubscribe = onSnapshot(
      ref,
      (querySnapshot) => {
        const results = [];
        querySnapshot.forEach((docs) => {
          results.push({ ...docs.data(), id: docs.id });
        });
        setDocuments(results);
        setError(null);
        setIsLoading(false);
      },
      (error) => {
        setError(error.code);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [collectionName, queryString, orderByDoc]);

  return { documents, error, isLoading };
};

export default useCollection;
