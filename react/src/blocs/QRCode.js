import React, { useState } from 'react';
import QRCode from "react-qr-code";
import { Alert } from 'react-bootstrap';
import './QRCode.css';

export default function QRCodeGenerator({
  handleChange
}) {
  const value = window.location.href;
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
        name: 'qr_code',
        value: color,
      }
    });
  };

  return (
    <div className='QRCode'>
      <QRCode
        data-testid="qr-code-svg"
        style={{ height: "auto", maxWidth: "150px", width: "150px" }}
        value={value}
        fgColor={QRCodeColor}
        level="H"
        viewBox={`0 0 256 256`}
      />

      <div className='ChangeColor'>
        <h2>Choose your color</h2>
        <div className='aligne_color_QR'>
          <input onChange={handleQRCodeColorChange} className='inputQRCode' type='color' name='qr_code' value={QRCodeColor} />
          <input data-testid="QRcode-color-input" onChange={handleQRCodeColorChange} className='txtQRCode' id='QRCodeColorInput' type='text' value={QRCodeColor} />
          {colorQRCodeError && <Alert variant="danger">{colorQRCodeError}</Alert>}
        </div>
      </div>
    </div>
  );
}