import React from 'react';
import CardDataService from "../services/card.service";
import './SubmitButton.css'

export default function SubmitButton({ 
  digitalData 
}) {

  const handleSubmit = () => {
    console.log('Button "Generate Card" clicked');
    console.log(digitalData);
    checkFields(digitalData)

    const isFieldsValid = checkFields(digitalData);

    if (isFieldsValid) {
        const updatedData = {
          ...digitalData,
          colorPrimary: digitalData.colorPrimary !== null && digitalData.colorPrimary !== undefined ? digitalData.colorPrimary : '#70C2DB',
          colorSecondary: digitalData.colorSecondary !== null && digitalData.colorSecondary !== undefined ? digitalData.colorSecondary : '#830E7E',
          fileLinkBackground: digitalData.fileLinkBackground !== null && digitalData.fileLinkBackground !== undefined ? digitalData.fileLinkBackground : 'defaultFileLinkBackground',
          fileLinkProfile: digitalData.fileLinkProfile !== null && digitalData.fileLinkProfile !== undefined ? digitalData.fileLinkProfile : 'defaultFileLinkProfile',
          fileLinkLoader: digitalData.fileLinkLoader !== null && digitalData.fileLinkLoader !== undefined ? digitalData.fileLinkLoader : 'defaultFileLinkLoader',
          QRCodeColor: digitalData.QRCodeColor !== null && digitalData.QRCodeColor !== undefined ? digitalData.QRCodeColor : '#830E7E',
          fileLinkDownload: digitalData.fileLinkDownload !== null && digitalData.fileLinkDownload !== undefined ? digitalData.fileLinkDownload : 'defaultFileLinkDownload'
        };
      CardDataService.create(updatedData)
        .then(response => {
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      console.log('Some required fields are missing or invalid');
    }
  };

  const checkFields = (data) => { //mandatory fieldss
    const requiredFields = [
      'firstName',
      'lastName',
      'mobile',
      'businessPhone',
      'email',
      'compagny',
      'position',
      'jobId',
      'department',
      'address',
      'resume',
      'siteName',
      'siteUrl',
    ];

    const optionalFields = [
      'facebook',
      'twitter',
      'linkedin',
      'instagram',
      'skype',
      'github',
      'slack',
      'youtube'
    ];
  
    for (const field of optionalFields) {
      if (data[field] !== null && data[field] !== undefined) {
        if (data[field].length > 255) {
          return false;
        }
      } else {
        data[field] = "pp";
      }
    }

    const isNameValid = /^[A-Za-z\s]+$/.test(data.firstName ?? '') && /^[A-Za-z\s]+$/.test(data.lastName ?? '') && (data.firstName ?? '').length <= 30 && (data.lastName ?? '').length <= 30;

    if (!isNameValid) {
      return false;
    }

    const isPhoneNumberValid = /^\d{10,20}$/.test(data.mobile) && /^\d{10,20}$/.test(data.businessPhone);

    if (!isPhoneNumberValid) {
      return false;
    }

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email ?? '') && (data.email ?? '').length <= 100;

    if (!isEmailValid) {
      return false;
    }

    const isTextValid = /^[A-Za-z0-9\s]+$/.test(data.compagny ?? '') && /^[A-Za-z0-9\s]+$/.test(data.position ?? '') && /^[A-Za-z0-9\s]+$/.test(data.department ?? '') && /^[A-Za-z0-9\s]+$/.test(data.jobId ?? '') && /^[A-Za-z0-9\s]+$/.test(data.address ?? '') && /^[A-Za-z0-9\s]+$/.test(data.resume ?? '');
    const isTextLengthValid = (data.compagny ?? '').length <= 50 && (data.position ?? '').length <= 50 && (data.department ?? '').length <= 50 && (data.jobId ?? '').length <= 30 && (data.address ?? '').length <= 500 && (data.resume ?? '').length <= 500;


    if (!isTextValid || !isTextLengthValid) {
      return false;
    }

    if (!data.siteUrl || data.siteUrl.trim() === '') {
      return false;
    }

    const urlPattern = /^www\.[A-Za-z0-9-]+\.(com|fr|dev|net|org|io)(\/[^\s]*)?$/i;
    const isUrlValid = urlPattern.test(data.siteUrl) && data.siteUrl.length <= 255;

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
    <div className='button-submit'>
      <button className="SubmitButton" type="button" onClick={handleSubmit} >
        Generate Card
      </button>
    </div>
  );
}
