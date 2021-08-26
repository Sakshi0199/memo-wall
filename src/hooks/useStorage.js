import { useState, useEffect } from 'react';
import { memoStorage, memoFirestore, timestamp } from '../firebase/config';

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const storageRef = memoStorage.ref(file.name);
    const collectionRef = memoFirestore.collection('gallery');

    storageRef.put(file).on(
      'state_changed',
      (snap) => {
        let progressPercent = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(progressPercent);
      },
      (err) => {
        setError(err);
      },
      async () => {
        const url = await storageRef.getDownloadURL();
        const createdAt = timestamp();
        collectionRef.add({ url, createdAt });
        setUrl(url);
      }
    );
  }, [file]);

  return { progress, error, url };
};

export default useStorage;
