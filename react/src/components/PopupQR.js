import React, { useState, useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import "./PopupQR.css";
import telecharger from "../assets/Picto-telecharger.svg";
import partager from "../assets/Picto-partager.svg";
import QRCode from 'react-qr-code';
import croix from "../assets/croix-popup.svg";
import html2canvas from 'html2canvas';

function PopupQR({
  valueQRCode,
  colorQRCode,
  showPopUp,
  onClose
}) {
  const [show, setShow] = useState(showPopUp);
  const spanRef = useRef(null);

  const handleClose = () => {
    setShow(false);
    onClose(); // Appeler la fonction onClose lorsque le composant est fermé
  };

  // Function Download QRCode
  const handleDownload = async () => {
    const element = document.getElementById('qr-code');
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');

    link.href = data;
    link.download = 'downloaded-image.jpg';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyClick = () => {
    const spanContent = spanRef.current.innerText;
    const tempInput = document.createElement('input');
    tempInput.value = spanContent;
    document.body.appendChild(tempInput);
  
    tempInput.select();
    document.execCommand('copy');
  
    document.body.removeChild(tempInput);
  
    alert('Le contenu a été copié dans le presse-papiers.');
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <img src={croix} alt="close" />
        </Modal.Header>
        <Modal.Body>
          <p className='texte-intro'>
            You can now download your QRcode, to print it or integrate it into your media<br/>
            Sharing your contact information more easily
          </p>
          <div id='qr-code'>
            <QRCode
              style={{ height: "auto", maxWidth: "150px", width: "150px" }}
              value={valueQRCode}
              fgColor={colorQRCode}
              level="H"
              viewBox={`10 10 256 256`}
            />
          </div>
          <a onClick={handleDownload}>
            <img src={telecharger} alt="téléchargement" />Download
          </a>
          <a onClick={handleCopyClick}>
            <img src={partager} alt="partage" />Share the link
          </a>
          <span ref={spanRef} className='lien-vcard'>
            {valueQRCode}
          </span>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PopupQR;
