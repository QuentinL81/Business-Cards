import React, { useState } from 'react';
import axios from 'axios';

function QRCodeGenerator() {
  const [qrcodeImageUrl, setQRCodeImageUrl] = useState('');
  const [text, setText] = useState('');
  const [size, setSize] = useState('200');
  const [format, setFormat] = useState('png');
  const [errorCorrection, setErrorCorrection] = useState('M');
  const [foregroundColor, setForegroundColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');

  const generateQRCode = () => {
    const requestData = {
      data: text,
      size: parseInt(size),
      format,
      qzone: parseInt(errorCorrection),
      fgcolor: foregroundColor.substring(1),
      bgcolor: backgroundColor.substring(1),
    };

    axios
      .post('https://api.qrcode-monkey.com/qr/custom', requestData, {
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        const qrCodeImageBlob = new Blob([response.data], { type: 'image/png' });
        const qrCodeImageUrl = URL.createObjectURL(qrCodeImageBlob);
        setQRCodeImageUrl(qrCodeImageUrl);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Entrez le texte du QR Code"
      />
      <select value={size} onChange={e => setSize(e.target.value)}>
        <option value="200">Petit</option>
        <option value="400">Moyen</option>
        <option value="600">Grand</option>
      </select>
      <select value={format} onChange={e => setFormat(e.target.value)}>
        <option value="png">PNG</option>
        <option value="svg">SVG</option>
        <option value="pdf">PDF</option>
      </select>
      <select value={errorCorrection} onChange={e => setErrorCorrection(e.target.value)}>
        <option value="7">7%</option>
        <option value="15">15%</option>
        <option value="25">25%</option>
        <option value="30">30%</option>
      </select>
      <input
        type="color"
        value={foregroundColor}
        onChange={e => setForegroundColor(e.target.value)}
      />
      <input
        type="color"
        value={backgroundColor}
        onChange={e => setBackgroundColor(e.target.value)}
      />
      <button onClick={generateQRCode}>Générer QR Code</button>
      {qrcodeImageUrl && (
        <div>
          <h3>Prévisualisation :</h3>
          <img src={qrcodeImageUrl} alt="QR Code" />
        </div>
      )}
    </div>
  );
}

export default QRCodeGenerator;
