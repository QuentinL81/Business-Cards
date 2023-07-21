import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./PopupQR.css"
import telecharger from "../assets/Picto-telecharger.svg"
import partager from "../assets/Picto-partager.svg"
import QRCode from 'react-qr-code';
import croix from "../assets/croix-popup.svg"

function PopupQR({
  valueQRCode,
  colorQRCode,
  showPopUp
}) {
  const [show, setShow] = useState(showPopUp);

  const handleClose = () => setShow(false);

  return (
    <>
    {show &&
    (
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
          <p className='texte-intro'>You can now download your QRcode, to print it or integrate it into your media<br></br>
          Sharing your contact information more easily</p>
          <QRCode 
        style={{ height: "auto", maxWidth: "150px", width: "150px" }}
        value={valueQRCode}
        fgColor={colorQRCode}
        level="H"
        viewBox={`0 0 256 256`}
      />
          <a><img src={telecharger} alt="téléchargement" />Download</a>

          <a><img src={partager} alt="partage" />Share the link</a>
          <span className='lien-vcard'>www.lienvcard.fr/021606</span>
        </Modal.Body>
      </Modal>
    )}
    </> 
  );
};

export default PopupQR;
