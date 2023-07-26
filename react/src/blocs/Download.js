import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Download.css';
import plus from '../assets/plus2.svg'
import bar from '../assets/bar.svg'
import poubelle from '../assets/poubelle.svg'

import Alert from 'react-bootstrap/Alert';

export default function Download({ handleChange }) {
  const [file_link_download, setFileLinkDownload] = useState();
  const [error, setError] = useState('');

  const handleDownloadChange = (event) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const fileLinkName = 'file_link_download';
      validateFile(file, setError, setFileLinkDownload, fileLinkName);
    }
  };

  const handleImageRemove = () => {
    setFileLinkDownload(null);
    setError('');
    handleChange({ target: { name: 'file_link_download', value: null } });
  };

  const handleUseDefaultDownload = () => {
    setFileLinkDownload(null);
    setError('');
    handleChange({ target: { name: 'file_link_download', value: null } });
  }

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

        <div className='filedefine'>
          <input id="form-control" data-testid="Download-picture-input" onChange={handleDownloadChange} type='file' accept='image/png, image/jpeg, image/gif' />
          {file_link_download && !setError && <img src={file_link_download} className='new_download_picture' alt='Download' />}
          {error && (<Alert variant="danger">{error}</Alert>)}


          {file_link_download && (
            <div className="preview-image">
              <img src={file_link_download} className='download-preview' alt="DownloadPreview" />
              <img src={poubelle} alt="remove" className="remove-btn" data-testid="remove-picture-input" onClick={handleImageRemove} />
              {file_link_download && <div className='sliderbis' onClick={handleUseDefaultDownload}></div>}
            </div>)}
        </div>

        <div className='default-Download-option' onClick={handleUseDefaultDownload}>
          <img src={bar} className='barDownload' alt='bar-logo' />
          {!file_link_download && <div className='slider' onClick={handleDownloadChange}></div>}
        </div>

      </div>
    </div>
  );
}
