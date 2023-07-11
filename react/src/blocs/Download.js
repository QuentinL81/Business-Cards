import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Download.css';
import plus from '../assets/plus2.svg'
import barre from '../assets/barre.svg'
import poubelle from '../assets/poubelle.svg'

import Alert from 'react-bootstrap/Alert';

export default function Download({ handleChange }) {
  const [fileLinkDownload, setFileLinkDownload] = useState();
  const [error, setError] = useState('');

  const handleDownloadChange = (event) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const fileLinkName = 'fileLinkDownload';
      validateFile(file, setError, setFileLinkDownload, fileLinkName);
    }
  };

  const handleImageRemove = () => {
    setFileLinkDownload(null);
    setError('');
    handleChange({ target: { name: 'fileLinkDownload', value: null } });
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
    <div className='download'>
      <h1>Download Picture</h1>
      <div className='add_download'>
        <label htmlFor="form-control">
          <img className='plus_B' src={plus} alt="Plus-logo" />
        </label>
        <input id="form-control" data-testid="background-picture-input" onChange={handleDownloadChange} type='file' accept='image/png, image/jpeg, image/gif' />
        {error && (
          <Alert variant="danger">{error}</Alert>
        )}
        {fileLinkDownload && (
          <div className="preview-image">
            <img src={fileLinkDownload} className='download-preview' alt="DownloadPreview" />
            <img src={poubelle} alt="remove" className="remove-btn" data-testid="remove-picture-input" onClick={handleImageRemove}/>
          </div>
        )}
        <img src={barre} className='barre' alt='barre-logo' />
      </div>
    </div>
  );
}
