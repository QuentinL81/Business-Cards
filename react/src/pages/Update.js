import React, { useEffect, useState } from 'react';
import Define from '../blocs/Define';
import Download from '../blocs/Download';
import Informations from '../blocs/Informations';
import LoaderPage from '../blocs/LoaderPage';
import SocialNetwork from '../blocs/SocialNetwork';
import './Create.css'
import SubmitButton from '../components/SubmitButton';
import AccordionDisplay from '../components/Accordion';
import Links from '../blocs/Links';
import Preview from './Preview';
import NavBar from '../components/Navbar';
import QRCode from '../blocs/QRCode';
import CardDataService from "../services/card.service";

import ButtonPreviewMobile from '../components/Button_preview_mobile'
import { useParams } from 'react-router-dom';


export default function Update() {
  const [userInformation, setUserInformation] = useState({});
  const { id } = useParams();

  useEffect(() => {
    CardDataService.get(id)
      .then(response => {
        setUserInformation(response.data);
        console.log("load", response.data);

      })
      .catch(e => {
        console.log(e);
      });
  }, [id]);


  const handleChange = (event) => {
    console.log(event.target.value);
    const { name, value, files } = event.target;

    if (files) {
      const file = files[0];
      const fileURL = URL.createObjectURL(file);
      setUserInformation((prevInformation) => ({
        ...prevInformation,
        [name]: fileURL,
      }));
    } else {
      setUserInformation((prevInformation) => ({
        ...prevInformation,
        [name]: value,
        colorPrimary: name === 'primarycolor' ? value : prevInformation.colorPrimary,
        colorSecondary: name === 'secondarycolor' ? value : prevInformation.colorSecondary,
      }));
    }
  };

  return (
    <div className='container m-0 mw-100 p-0'>
      <NavBar />
      <div className='row background'>
        <div className='col-8 blocks'>
          <div className='accordion_style_top'>
            <AccordionDisplay children={<Define handleChange={handleChange} information={userInformation}/>} title="Design and customize" overlayButtonMessage="Customize the color, background, and profile images of the landing page of the QR Code. A landing page is a web page user lands on after scanning the QR Code." showOverlayButton={true} />
          </div>
          <AccordionDisplay children={<Informations handleChange={handleChange}  information={userInformation}/>} title="Basic information" />
          <AccordionDisplay children={<Links handleChange={handleChange} information={userInformation}/>} title="Website links" overlayButtonMessage="Add web links to display on the landing page of your QR Code." showOverlayButton={true} />
          <AccordionDisplay children={<Download handleChange={handleChange} information={userInformation}/>} title="Downloading images" />
          <AccordionDisplay children={<SocialNetwork handleChange={handleChange} information={userInformation}/>} title="Social Networks" />
          <AccordionDisplay children={<LoaderPage handleChange={handleChange} information={userInformation}/>} title="Page loader image" overlayButtonMessage="A page loader is an image displayed when it takes time to load the landing page after people scan this QR Code." showOverlayButton={true} />
          <AccordionDisplay children={<QRCode handleChange={handleChange} information={userInformation}/>} title="Create QR Code" showOverlayButton={true} />
          <div className='blanc_button'>
            <SubmitButton digitalData={userInformation} />
          </div>
        </div>
        <div className='col-4 block_deux'>
          <Preview
            information={userInformation}
            colorPrimary={userInformation.colorPrimary}
            colorSecondary={userInformation.colorSecondary}
          />
        </div>
        <div className='fixed-bottom'>
          <ButtonPreviewMobile />
        </div>
      </div>
    </div>
  );
}