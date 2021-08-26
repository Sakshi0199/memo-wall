import { useState, useEffect } from 'react';
import { memoFirestore } from '../firebase/config';

const useFirestore = (imgscollection) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const unsub = memoFirestore.collection(imgscollection)
      .orderBy('createdAt', 'desc')
      .onSnapshot((snap) => {
        let documents = [];
        snap.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        setDocs(documents);
      });

    return () => unsub();
  }, [imgscollection]);

  return { docs };
};

export default useFirestore;
