import React from 'react';
import useFirestore from '../../hooks/useFirestore';
import './imagebox.css';

function Imagebox() {
  const { docs } = useFirestore('gallery');
  return (
    <div className='gallery-wall'>
      {docs &&
        docs.map((doc) => (
          <div className='img-container' key={doc.id}>
            <img
              src={doc.url}
              alt='img-uploaded-by-me'
              className='img-uploaded-by-me'
            />
          </div>
        ))}
    </div>
  );
}

export default Imagebox;
