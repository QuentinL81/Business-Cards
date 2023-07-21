  import React, { useState, useEffect } from 'react';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import './Define.css';
  import { Alert } from 'react-bootstrap';
  import plus from '../assets/plus2.svg';
  import bar from '../assets/bar.svg';
  import plusP from '../assets/plus3.svg';
  import defaultProfile from '../assets/user.jpg';
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
          name: 'color_primary',
          value: colorPrimary,
        }
      });
      handleChange({
        target: {
          name: 'color_secondary',
          value: colorSecondary,
        }
      });
      handleChange({
        target: {
          name: 'file_link_profile',
          value: defaultProfile,
        }
      });
      handleChange({
        target: {
          name: 'file_link_background',
          value: defaultBackground,
        }
      });
    }, []);

    const handleColorPrimaryChange = (e) => {
      const color = e.target.value;
      setColorPrimary(color);
      validateColor(color, setColorPrimaryError);
      handleChange({
        target: {
          name: 'color_primary',
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
          name: 'color_secondary',
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
        validateFile(file, setBackgroundError, setFileLinkBackground, 'file_link_background');
        setProfileError('');
      }
    };

    const handleProfileChange = (e) => {
      if (e.target.files) {
        const file = e.target.files[0];
        validateFile(file, setProfileError, setFileLinkProfile, 'file_link_profile');
        setBackgroundError('');
      }
    };

    const handleUseDefaultBackground = () => {
      setFileLinkBackground(null);
      setBackgroundError('');
      handleChange({ target: { name: 'file_link_background', value: defaultBackground } });
    };

    const handleUseDefaultProfile = () => {
      setFileLinkProfile(null);
      setProfileError('');
      handleChange({ target: { name: 'file_link_profile', value: defaultProfile } });
    };

    return (
      <div className='define_block'>
        
        <div className='define_color'>
          <h1>Colors</h1>
          <div className='les-2-div'>
          <div className='primary'>
            <h2>Primary</h2>
            <div className='aligne_color1'>
              <input onChange={handleColorPrimaryChange} className='inptP' type='color' name='color_primary' value={colorPrimary} />
              <input data-testid="primary-color-input" onChange={handleColorPrimaryChange} className='txtC' id='primaryColorInput' type='text' value={colorPrimary} />
              {colorPrimaryError && <Alert variant="danger">{colorPrimaryError}</Alert>}
            </div>
          </div>
          <div className='secondary'>
            <h2>Secondary</h2>
            <div className='aligne_color2'>
              <input onChange={handleColorSecondaryChange} className='inptP' type='color' name='color_secondary' value={colorSecondary} />
              <input data-testid="secondary-color-input" onChange={handleColorSecondaryChange} className='txtC' id='secondaryColorInput' type='text' value={colorSecondary} />
              {colorSecondaryError && <Alert variant="danger">{colorSecondaryError}</Alert>}
            </div>
          </div>
          </div>
        </div>

        <div className='define_BP'>
          <h1>Background<br />picture</h1>
          <div className='add_BP'>

            <label htmlFor="file-upload">
              <img className='plus_B' src={plus} alt="Plus-logo" />
            </label>

            <div className='filedefine'>
              <input id="file-upload" data-testid="background-picture-input" onChange={handleBackgroundChange} type='file' accept='image/png, image/jpeg, image/gif' />
              {fileLinkBackground && !backgroundError && <img src={fileLinkBackground} className='new_image_background' alt='Background' />}
              {backgroundError && <Alert variant="danger">{backgroundError}</Alert>}
              {fileLinkBackground && !backgroundError && <div className='sliderbis' onClick={handleBackgroundChange}></div>}
            </div>

            <div className="default-background-option" onClick={handleUseDefaultBackground}>
              <img src={bar} className='barDefine' alt='bar-logo' />
              {!fileLinkBackground && <img src={defaultBackground} className='default_background' alt='Default Profile' />}
              {!fileLinkBackground && <div className='slider'onClick={handleUseDefaultBackground}></div>}
            </div>

          </div>
        </div>

        <div className='define_PF'>
          <h1>Profile picture</h1>
          <div className='add_PF'>

            <label htmlFor="file-upload-pf">
              <img className='plus_P' src={plusP} alt="Plus-logo" />
            </label>

            <div className='filedefine'>
              <input id="file-upload-pf" data-testid="profile-picture-input" onChange={handleProfileChange} type='file' accept='image/png, image/jpeg, image/gif' />
              {fileLinkProfile && !profileError && <img src={fileLinkProfile} className='new_profile_picture' alt='Profile' />}
              {profileError && <Alert variant="danger">{profileError}</Alert>}
              {fileLinkProfile && !profileError && <div className='sliderProfileBis' onClick={handleProfileChange}></div>}
            </div>

            <div className="default-profile-option" onClick={handleUseDefaultProfile}>
              {<img src={defaultProfile} className='default_profile' alt='Default Profile' />}
              {!fileLinkProfile && <div className='sliderProfile' onClick={handleUseDefaultProfile}></div>}
            </div>

          </div>
        </div>

      </div>
    );
  }

  export default Define;