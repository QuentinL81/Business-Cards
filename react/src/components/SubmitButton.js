import React, { useState, useEffect } from 'react';
import CardDataService from "../services/card.service";
import './SubmitButton.css';
import Modal from 'react-modal';
import PopupQR from './PopupQR';

Modal.setAppElement('#root');

export default function SubmitButton({ digitalData }) {
  const [isFieldsComplete, setIsFieldsComplete] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [missingFields, setMissingFields] = useState([]);
  const [isPopUpQRCodeOpen, setPopUpQRCodeOpen] = useState(false);
  const [QRCode, setQRCode] = useState()

  const getMissingFields = (data) => {
    const requiredFields = [
      'first_name',
      'last_name',
      'mobile',
      'business_phone',
      'email',
      'compagny',
      'position',
      'job_id',
      'department',
      'address',
      'resume',
      'site_name',
      'site_url',
    ];
  
    const missingFields = requiredFields.filter(field => !data[field] || data[field].trim() === '');
    return missingFields;
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const modalContent = (
    <div className="custom-modal">
      <button className="close-button" onClick={handleModalClose}>
        &#x2716;
      </button>
      <h2>Missing or invalid fields</h2>
      <p>Please fill out all required fields :</p>
      <div className="missing-fields-list">
        {missingFields.map(field => (
          <div key={field} className="missing-field">
            <span className="missing-field-marker"></span>
            <span className="missing-field-name">{field}</span>
          </div>
        ))}
      </div>
    </div>
  );

  useEffect(() => {
    const isFieldsValid = checkFields(digitalData);
    setIsFieldsComplete(isFieldsValid);
  }, [digitalData]);

  const handleSubmit = () => {
    console.log('Button "Generate Card" clicked');
    console.log(digitalData);

    const isFieldsValid = checkFields(digitalData);
    setIsFieldsComplete(isFieldsValid);

    if (isFieldsValid) {
      const defaultData = {
        QRCodeColor: '#830E7E',
      };

      console.log("Data envoyé a l'api", digitalData)

      const updatedData = {
        ...digitalData,
        ...Object.fromEntries(Object.entries(defaultData).map(([key, value]) => [key, digitalData[key] !== null && digitalData[key] !== undefined ? digitalData[key] : value]))
      };

      console.log("Data envoyé a l'api apres update", updatedData)

      CardDataService.create(updatedData)
        .then(response => {


          console.log(response.data);


          //si tu as bien le lien
          setPopUpQRCodeOpen(true);
          console.log(isPopUpQRCodeOpen)
          let qrcode = {
            value: window.location.origin + "/view/" + response.data.id,
            color: response.data.qr_code
          }
          setQRCode(qrcode)




        })
        .catch(e => {
          console.log(e);
        });
    } else {
      const missingFields = getMissingFields(digitalData);
      setMissingFields(missingFields);
      setIsModalOpen(true);
      console.log('Some required fields are missing or invalid');
    }
  };

  const isTextValid = (value) => /^[A-Za-z0-9\s]+$/.test(value ?? '');
  const isTextLengthValid = (value, maxLength) => (value ?? '').length <= maxLength;

  const checkFields = (data) => { //mandatory fieldss

    console.log("VERIIER LES ACCENTS : TODO");

    console.log(data)
    const requiredFields = [
      'first_name',
      'last_name',
      'mobile',
      'business_phone',
      'email',
      'compagny',
      'position',
      'job_id',
      'department',
      'address',
      'resume',
      'site_name',
      'site_url',
    ];

    const optionalFields = [
      'facebook',
      'twitter',
      'linkedin',
      'instagram',
      'skype',
      'github',
      'slack',
      'youtube',
      'behance',
      'whatsapp'
    ];

    
    for (const field of optionalFields) {
      if (data[field] !== null && data[field] !== undefined) {
        if (data[field].length > 255) {
          return false;
        }
      } else {
        data[field] = "";
      }
    }

    const isCompagnyValid = isTextValid(data.compagny) && isTextLengthValid(data.compagny, 50);
    const isPositionValid = isTextValid(data.position) && isTextLengthValid(data.position, 50);
    const isDepartmentValid = isTextValid(data.department) && isTextLengthValid(data.department, 50);
    const isJobIdValid = isTextValid(data.job_id) && isTextLengthValid(data.job_id, 30);
    const isAddressValid = isTextValid(data.address) && isTextLengthValid(data.address, 500);
    const isResumeValid = isTextValid(data.resume) && isTextLengthValid(data.resume, 500);

    if (!isCompagnyValid || !isPositionValid || !isDepartmentValid || !isJobIdValid || !isAddressValid || !isResumeValid) {
      return false;
    }

    if (!data.site_url || data.site_url.trim() === '') {
      return false;
    }

    const urlPattern = /^www\.[A-Za-z0-9-]+\.(com|fr|dev|net|org|io)(\/[^\s]*)?$/i;
    const isUrlValid = urlPattern.test(data.site_url) && data.site_url.length <= 255;

    if (!isUrlValid) {
      return false;
    }

    for (const field of requiredFields) {
      if (!data[field] || data[field].trim() === '') {
        return false;
      }
    }

    return true;
  };

  return (
    <div className="button-submit">
      <button className="SubmitButton" type="button" onClick={handleSubmit}>
        Generate Card
      </button>
      <div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        contentLabel="Champs manquants ou invalides"
        className="custom-modal"
        overlayClassName="custom-modal-overlay"
      >
        {modalContent}
      </Modal>
      </div>
      { isPopUpQRCodeOpen && <PopupQR valueQRCode={QRCode.value} colorQRCode={QRCode.color} showPopUp={isPopUpQRCodeOpen} />}

    </div>
  );
}
