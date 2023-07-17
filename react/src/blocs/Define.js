import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Define.css';
import {Alert} from 'react-bootstrap';
import plus from '../assets/plus2.svg';
import bar from '../assets/bar.svg';
import plusP from '../assets/plus3.svg';
import defaultProfile from '../assets/user.png';
import defaultBackground from '../assets/background_default.png'

function Define({
  handleChange
}) {
  const [colorPrimary, setColorPrimary] = useState('#70C2DB');
  const [colorSecondary, setColorSecondary] = useState('#830E7E');

  const [colorPrimaryError, setColorPrimaryError] = useState('');
  const [colorSecondaryError, setColorSecondaryError] = useState('');

  const [fileLinkBackground, setFileLinkBackground] = useState(null);
  const [fileLinkProfile, setFileLinkProfile] = useState(null);

  const [backgroundError, setBackgroundError] = useState('');
  const [profileError, setProfileError] = useState('');

  useEffect(() => {
    handleChange({
      target: {
        name: 'primarycolor',
        value: colorPrimary,
      }
    });
  }, []);

  const handleColorPrimaryChange = (e) => {
    const color = e.target.value;
    setColorPrimary(color);
    validateColor(color, setColorPrimaryError);
    handleChange({
      target: {
        name: 'primarycolor',
        value: color,
      }
    });
  };

  const handleColorSecondaryChange = (e) => {
    const color = e.target.value;
    setColorSecondary(color);
    validateColor(color, setColorSecondaryError);
    handleChange({
      target: {
        name: 'secondarycolor',
        value: color,
      },
    });
  };

  const validateColor = (color, setError) => {
    const colorRegex = /^#([0-9a-f]{3}){1,2}$/i;
    setError(colorRegex.test(color) ? '' : 'Invalid color format');
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
        formatError = `Invalid format: not a ${fileExtension} file `;
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

  const handleBackgroundChange = (e) => {
    if (e.target.files) {
      const file = e.target.files[0];
      validateFile(file, setBackgroundError, setFileLinkBackground, 'fileLinkBackground');
      setProfileError('');
    }
  };

  const handleProfileChange = (e) => {
    if (e.target.files) {
      const file = e.target.files[0];
      validateFile(file, setProfileError, setFileLinkProfile, 'fileLinkProfile');
      setBackgroundError('');
    }
  };

  const handleUseDefaultBackground = () => {
    setFileLinkBackground(null);
    setBackgroundError('');
    handleChange({ target: { name: 'fileLinkBackground', value: null } });
  };

  const handleUseDefaultProfile = () => {
    setFileLinkProfile(null);
    setProfileError('');
    handleChange({ target: { name: 'fileLinkProfile', value: null } });
  };

  return (
    <div className='define_block'>
      <div className='define_color'>
        <h1>Colors</h1>
        <div className='primary'>
          <h2>Primary</h2>
          <div className='aligne_color1'>
            <input onChange={handleColorPrimaryChange} className='inptP' type='color' name='colorPrimary' value={colorPrimary} />
            <input data-testid="primary-color-input" onChange={handleColorPrimaryChange} className='txtC' id='primaryColorInput' type='text' value={colorPrimary} />
            {colorPrimaryError && <Alert variant="danger">{colorPrimaryError}</Alert>}
          </div>
        </div>
        <div className='secondary'>
          <h2>Secondary</h2>
          <div className='aligne_color2'>
            <input onChange={handleColorSecondaryChange} className='inptP' type='color' name='colorSecondary' value={colorSecondary} />
            <input data-testid="secondary-color-input" onChange={handleColorSecondaryChange} className='txtC' id='secondaryColorInput' type='text' value={colorSecondary} />
            {colorSecondaryError && <Alert variant="danger">{colorSecondaryError}</Alert>}
          </div>
        </div>
      </div>
      
      <div className='define_BP'>
        <h1>Background<br />picture</h1>
        <div className='add_BP'>
          <label htmlFor="file-upload">
            <img className='plus_B' src={plus} alt="Plus-logo" />
          </label>

          <input id="file-upload" data-testid="background-picture-input" onChange={handleBackgroundChange} type='file' accept='image/png, image/jpeg, image/gif' />
          {fileLinkBackground && !backgroundError && <img src={fileLinkBackground} className='new_image_background' alt='Background' />}
          {backgroundError && <Alert variant="danger">{backgroundError}</Alert>}
          {fileLinkBackground && !backgroundError && <button className='sliderbis' onClick={handleBackgroundChange}></button>}
          
          <div className="default-background-option">
            <img src={bar} className='barDefine' alt='bar-logo' />
            {!fileLinkBackground && <img src={defaultBackground} className='default_background' alt='Default Profile' />}
            {!fileLinkBackground && <button className='slider' onClick={handleUseDefaultBackground}></button>}
          </div>
          
        </div>
      </div>
      
      <div className='define_PF'>
        <h1>Profile picture</h1>
        <div className='add_PF'>
          <div className="profile-image-options">
            <label htmlFor="file-upload-pf">
              <img className='plus_P' src={plusP} alt="Plus-logo" />
            </label>
            <input id="file-upload-pf" data-testid="profile-picture-input" onChange={handleProfileChange} type='file' accept='image/png, image/jpeg, image/gif' />
            {fileLinkProfile && !profileError && <img src={fileLinkProfile} className='new_profile_picture' alt='Profile' />}
            {profileError && <Alert variant="danger">{profileError}</Alert>}
          </div>
          <div className="default-profile-option">
            {!fileLinkProfile && <img src={defaultProfile} className='new_profile_picture' alt='Default Profile' />}
            <button onClick={handleUseDefaultProfile}>Use Default Profile Picture</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Define;