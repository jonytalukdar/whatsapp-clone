import { useEffect, useState } from 'react';
import { app } from '../firebase/Firebase.config';
import { getFirestore, onSnapshot, doc } from 'firebase/firestore';

const db = getFirestore(app);

const useDocument = (collectionName, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const unsub = onSnapshot(
      doc(db, `${collectionName}`, `${id}`),
      (doc) => {
        if (doc.data()) {
          setDocument({ ...doc.data(), id: doc.id });
          setError(null);
          setIsLoading(false);
        } else {
          setError('No Document Exists!');
        }
      },
      (error) => {
        setError(error.code);
        setIsLoading(false);
      }
    );

    return () => unsub();
  }, [collectionName, id]);

  return { document, error, isLoading };
};

export default useDocument;
