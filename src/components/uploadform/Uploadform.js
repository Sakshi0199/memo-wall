import React, { useRef, useState } from 'react';
import ProgressBar from '../progressbar/ProgressBar';
import uploadImg from '../../assets/images/upload.png';

function Uploadform() {
  const inputRef = useRef();
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const allowedTypes = ['image/png', 'image/jpeg'];

  const handleChange = (e) => {
    let selectedFile = e.target.files[0];

    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      setError('');
    } else {
      setFile(null);
      setError('Oops! please select an image file');
    }
    // console.log(selectedFile, 'changes');s
  };

  return (
    <div>
      <form style={{ textAlign: 'center' }}>
        <input
          ref={inputRef}
          type='file'
          name=''
          id=''
          onChange={handleChange}
          style={{ display: 'none' }}
        />
        <img
          src={uploadImg}
          alt='upload-btn'
          style={{ height: '50px', cursor: 'pointer' }}
          onClick={() => {
            inputRef.current.click();
          }}
        />
        <div className='uploadOutput'>
          {error && <div className='err'>{error}</div>}
          {/* {file && <div className='imagefile'>{file.name}</div>} */}
          {file && <ProgressBar file={file} setFile={setFile} />}
        </div>
      </form>
    </div>
  );
}

export default Uploadform;
