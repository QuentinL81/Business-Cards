import React, { useState } from 'react';

export default function LoaderPage({ handleChange }) {
  const [fileLinkLoader, setFileLinkLoader] = useState();
  const [error, setError] = useState('');

  const handleLoaderChange = (event) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const fileLinkName = 'fileLinkLoader';
      validateFile(file, setError, setFileLinkLoader, fileLinkName);
    }
  };

  const validateFile = (file, setError, setFileLink, fileLinkName) => {
    const validFormats = ['image/png', 'image/jpeg', 'image/gif'];
    const validSize = 500000; // Minimum file size (0.5 MB)

    if (validFormats.includes(file.type) && file.size >= validSize) {
      const fileLink = URL.createObjectURL(file);
      setFileLink(fileLink);expect.any(String) 
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
    <div>
      <h2>Loader Page</h2>
      <input data-testid="loader-page-input" onChange={handleLoaderChange} type="file" accept="image/png, image/jpeg, image/gif" />
      {fileLinkLoader && <img src={fileLinkLoader} alt="LoaderPage" width="200" />}
      {error && <p>{error}</p>}
    </div>
  );
}
