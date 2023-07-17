import React, { useState } from 'react';
import QRCode from "react-qr-code";
import { Alert } from 'react-bootstrap';

export default function QRCodeGenerator({
  handleChange
}) {
  const value = "https://google.fr"
  const [QRCodeColor, setQRCodeColor] = useState('#000000');
  const [colorQRCodeError, setColorQRCodeError] = useState('');

  const validateColor = (color, setError) => {
    const colorRegex = /^#([0-9a-f]{3}){1,2}$/i;
    setError(colorRegex.test(color) ? '' : 'Invalid color format');
  };

  const handleQRCodeColorChange = (e) => {
    const color = e.target.value;
    setQRCodeColor(color);
    validateColor(color, setColorQRCodeError);
    handleChange({
      target: {
        name: 'QRCodeColor',
        value: color,
      }
    });
  };

  return (
    <div className='QRCode'>
      <QRCode
        style={{ height: "auto", maxWidth: "250px", width: "250px" }}
        value={value}
        fgColor={QRCodeColor}
        level="H"
        viewBox={`0 0 256 256`}
      />

      <div className='ChangeColor'>
        <h2>Choose your color</h2>
        <input onChange={handleQRCodeColorChange} className='inputQRCode' type='color' name='QRCodeColor' value={QRCodeColor} />
        <input data-testid="QRcode-color-input" onChange={handleQRCodeColorChange} className='txtQRCode' id='QRCodeColorInput' type='text' value={QRCodeColor} />
        {colorQRCodeError && <Alert variant="danger">{colorQRCodeError}</Alert>}
      </div>
    </div>
  );
}