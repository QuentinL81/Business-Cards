import React, { useState } from 'react';
import QRCode from "react-qr-code";

function QRCodeGenerator() {
  const value = "https://google.fr"
  const [QRCodeColor, setQRCodeColor] = useState('#000000');

  const handleQRCodeColorChange = (e) => {
    const color = e.target.value;
    setQRCodeColor(color);
  };
  return (
    <div>
      <QRCode
          style={{ height: "auto", maxWidth: "250px", width: "250px" }}
          value={value}
          fgColor={QRCodeColor}
          level="H"
          viewBox={`0 0 256 256`}
        />
         <input onChange={handleQRCodeColorChange} className='inptP' type='color' name='qrcodecolor' value={QRCodeColor} />
    </div>
  );
}

export default QRCodeGenerator;
