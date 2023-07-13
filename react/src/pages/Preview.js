import './Preview.css'
import React from 'react';
import { ReactComponent as Tel } from '../assets/Picto-Tel.svg';
import { ReactComponent as Sms } from '../assets/Picto-SMS.svg';
import { ReactComponent as Mail } from '../assets/Picto-mail.svg';
import { ReactComponent as Adresse } from '../assets/Picto-adresse.svg';
import { ReactComponent as Contact } from '../assets/Picto-Info-Contact.svg';
import { ReactComponent as Resume } from '../assets/Picto-Resume.svg';
import { ReactComponent as Localisation } from '../assets/Picto-Localisation.svg';
import { ReactComponent as Website } from '../assets/Picto-web.svg';
import { ReactComponent as Portfolio } from '../assets/Picto-Portfolio.svg';
import { ReactComponent as Social } from '../assets/Picto-Social-media.svg';
import facebook from '../assets/facebook.svg';
import twitter from '../assets/twitter.svg';
import linkedin from '../assets/linkedin.svg';
import instagram from '../assets/instagram.svg';
import yt from '../assets/yt.svg';
import skype from '../assets/skype.svg';
import whatsapp from '../assets/whatsapp.svg';
import behance from '../assets/behance.svg';
{/*import github from '../assets';
import slack from '../assets';*/}

export default function Preview({
  information
}) {
  console.log(information.site_url)
  return (
    <div className='preview_banner'>
      <div className='gestion_top'>
        <h2>Preview</h2>
        <div className='haut_preview_noir' />
      </div>
      <div className='all_preview'>
        <div className='infos'>

          <div className='profile1'>
            <div className='blue1' style={{ backgroundColor: information.colorPrimary }}></div>
            <div className='cercle1' style={{ backgroundColor: information.colorPrimary }} />
            {information.fileLinkProfile && <img className='profile-picture' src={information.fileLinkProfile} alt='Profile' />}
          </div>

          <div className='nom-prénom' style={{ color: information.colorPrimary }}>
            {information.first_name}<br></br>{information.last_name}
          </div>

          <div className='profession' style={{ color: information.colorSecondary }}>
          {information.position}
          </div>
          <div className='profile2'>
            <div className='cercle-chiant-haut'>
              <Sms className='sms' fill={information.colorSecondary} stroke={information.colorSecondary} />
              <Mail className='mail' fill={information.colorSecondary} stroke={information.colorSecondary} />
            </div>
            <div className='cercle-chiant-bas'>
              <Tel className='tel' fill={information.colorSecondary} stroke={information.colorSecondary} />
              <Adresse className='localisation' fill={information.colorSecondary} stroke={information.colorSecondary} />
            </div>
            <div className='cercle2' style={{ backgroundColor: information.colorPrimary }} />
            <div className='blue2' style={{ backgroundColor: information.colorPrimary }}>
              <div className='information-preview'>
                <div className='pastille-blanc'>
                  <Contact fill={information.colorSecondary} stroke={information.colorSecondary} />
                </div>
                <h1 className='title-info' style={{ color: information.colorSecondary }}>Contact-Us</h1>
                <div className='except-title-information-preview'>
                  <p className='p'>Name</p>
                  <span>{information.first_name}&thinsp;{information.last_name}</span>
                  <p className='p'>Mobile</p>
                  <span>{information.mobile}</span>
                  <p className='p'>Phone at work</p>
                  <span>{information.business_phone}</span>
                  <p className='p'>Email</p>
                  <span className='span-exception'>{information.email}</span>
                  <p className='p'>Organisation</p>
                  <span>{information.compagny}</span>
                  <p className='p'>Job ID</p>
                  <span>{information.job_id}</span>
                  <p className='p'>Department</p>
                  <span>{information.department}</span>
                </div>
              </div>
              <div className='information-preview'>
                <div className='pastille-blanc'>
                  <Resume fill={information.colorSecondary} stroke={information.colorSecondary} />
                </div>
                <h1 className='title-info' style={{ color: information.colorSecondary }}>Resume</h1>
                <div className='except-title-information-preview-resume'>
                  <p className='p'>A brief description of you and your skills</p>
                  <span className='span-exception-resume'>{information.resume}</span>
                </div>
              </div>


              <div className='information-preview'>
                <div className='pastille-blanc'>
                  <Localisation fill={information.colorSecondary} stroke={information.colorSecondary} />
                </div>
                <h1 className='title-info' style={{ color: information.colorSecondary }}>Location</h1>
                <div className='except-title-information-preview-localisation'>
                  <span className='span-exception'>{information.address}</span>
                  <a className='map' href=''> See on the map </a>
                </div>
              </div>

              <div className='information-preview'>
                <div className='pastille-blanc'>
                  <Website fill={information.colorSecondary} stroke={information.colorSecondary} />
                </div>
                <h1 className='title-info' style={{ color: information.colorSecondary }}>Website</h1>
                <div className='except-title-information-preview-localisation'>
                  <a target='_blank' className='url' href={information.site_url}> {information.site_name} </a>
                </div>
              </div>

              <div className='information-preview'>
                <div className='pastille-blanc'>
                  <Portfolio fill={information.colorSecondary} stroke={information.colorSecondary} />
                </div>
                <h1 className='title-info' style={{ color: information.colorSecondary }}>Portfolio</h1>
                <div className='except-title-information-preview-portfolio'>
                {information.fileLinkDownload && <img src={information.fileLinkDownload} alt='DownloadLink' width="100%;" />}
                </div>
              </div>

              <div className='information-preview'>
                <div className='pastille-blanc'>
                  <Social fill={information.colorSecondary} stroke={information.colorSecondary} />
                </div>
                <h1 className='title-info' style={{ color: information.colorSecondary }}>Social Networks</h1>
                <div className='except-title-information-preview-portfolio'>
                <img className='facebook' src={information.facebook} alt="logo-facebook" />
                <p>Twitter : {information.twitter}</p>
                <p>LinkedIn : {information.linkedin}</p>
                <p>Instagram : {information.instagram}</p>
                <p>Skype : {information.skype}</p>
                <p>Github : {information.github}</p>
                <p>Slack : {information.slack}</p>
                <p>YouTube : {information.yt}</p>
                </div>
              </div>




              {/*      <div className='Define'>
                <p>Background image :</p>
                {information.fileLinkBackground && <img src={information.fileLinkBackground} alt='Background' width="200" />}
              </div>


              <div className='LoaderPage'>
                <p>Loader image : </p>
                {information.fileLinkLoader && <img src={information.fileLinkLoader} alt='LoaderImage' width="200" />}
              </div>

              */}

            </div>
          </div>
        </div>
      </div>
      <div className='preview_back' />
    </div>
  );
}
