import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import './LoaderPage.css'
import plus from '../assets/plus2.svg';
import bar from '../assets/bar.svg'

export default function LoaderPage({
  handleChange,
  information
}) {
  const [fileLinkLoader, setFileLinkLoader] = useState();
  const [error, setError] = useState('');

  const handleLoaderChange = (event) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const fileLinkName = 'fileLinkLoader';
      validateFile(file, setError, setFileLinkLoader, fileLinkName);
    }
  };

  const handleUseDefaultLoader = () => {
    setFileLinkLoader(null);
    setError('');
    handleChange({ target: { name: 'fileLinkLoader', value: null } });
  };

  const validateFile = (file, setError, setFileLink, fileLinkName) => {
    const validFormats = ['image/png', 'image/jpeg', 'image/gif'];
    const validSize = 500000; // Minimum file size (0.5 MB)

    if (validFormats.includes(file.type) && file.size >= validSize) {
      const fileLink = URL.createObjectURL(file);
      setFileLink(fileLink);
      setError('');
      handleChange({ target: { name: fileLinkName, value: fileLink } });
    } else {
      let formatError = '';
      if (!validFormats.includes(file.type)) {
        const fileExtension = file.name.split('.').pop().toUpperCase();
        formatError = `Invalid format: not a ${fileExtension} file`;
      }
      let sizeError = '';
      if (file.size < validSize) {
        sizeError = 'Invalid size (min 0.5 MB)';
      }
      setError(`${formatError} ${sizeError}`);
      setFileLink(null);
      handleChange({ target: { name: fileLinkName, value: null } });
    }
  };

  return (

    <div className='define_LP'>
      <h1>Loader image</h1>
      <div className='add_LP'>

        <label htmlFor="file-loader">
          <img className='plus_B' src={plus} alt="Plus-logo" />
        </label>
        
        <div className='filedefine'>
          <input id='file-loader' data-testid="loader-page-input" onChange={handleLoaderChange} type="file" accept="image/png, image/jpeg, image/gif" />
          {error && <Alert variant="danger">{error}</Alert>}

        {fileLinkLoader &&
          <div className='preview-loader'>
            <img src={fileLinkLoader} className='new_image_loader' alt="LoaderPage" width="200" />
            {fileLinkLoader && <div className='sliderbis' onClick={handleUseDefaultLoader}></div>}          
          </div>}
        </div>

        <div className='default-Loader-option' onClick={handleUseDefaultLoader}>
          <img src={bar} className='bar' alt='bar-logo' />
          {!fileLinkLoader && <div className='sliderLoader'onClick={handleLoaderChange}></div>}
        </div>

      </div>
    </div>
  );
}