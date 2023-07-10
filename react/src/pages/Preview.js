import './Preview.css'
import React from 'react';

export default function Preview({
  information
}) {
  return (
    <div className='preview_banner'>
      <div className='gestion_top'>
        <h2>Preview</h2>
        <div className='haut_preview_noir' />
      </div>
      <div className='all_preview'>
        <div className='infos'>
          <div className='Define'>
            < div className="color-box" style={{ backgroundColor: information.colorPrimary }}></div>
            <p>Color Primary</p>
            <div className="color-box" style={{ backgroundColor: information.colorSecondary }}></div>
            <p>Color Secondary</p>
            <p>Background image :</p>
            {information.fileLinkBackground && <img src={information.fileLinkBackground} alt='Background' width="200" />}
            <p>Profile image :</p>
            {information.fileLinkProfile && <img src={information.fileLinkProfile} alt='Profile' width="200" />}
          </div>

          <div className='Informations'>
            <p>First Name : {information.first_name}</p>
            <p>Last Name : {information.last_name}</p>
            <p>Phone Number : {information.mobile}</p>
            <p>Business Phone : {information.business_phone}</p>
            <p>Email : {information.email}</p>
            <p>Organisation : {information.compagny}</p>
            <p>Position : {information.position}</p>
            <p>Job ID : {information.job_id}</p>
            <p>Department : {information.department}</p>
            <p>Address : {information.address}</p>
            <p>Resume : {information.resume}</p>
          </div>

          <div className='Links'>
            <p>Website : {information.site_name}</p>
            <p>Site : {information.site_url}</p>
          </div>

          <div className='Download'>
            <p>Download image :</p>
            {information.fileLinkDownload && <img src={information.fileLinkDownload} alt='DownloadLink' width="200" />}
          </div>

          <div className='SocialNetwork'>
            <p>Facebook : {information.facebook}</p>
            <p>Twitter : {information.twitter}</p>
            <p>LinkedIn : {information.linkedin}</p>
            <p>Instagram : {information.instagram}</p>
            <p>Skype : {information.skype}</p>
            <p>Github : {information.github}</p>
            <p>Slack : {information.slack}</p>
            <p>YouTube : {information.yt}</p>
          </div>

          <div className='LoaderPage'>
            <p>Loader image : </p>
            {information.fileLinkLoader && <img src={information.fileLinkLoader} alt='LoaderImage' width="200" />}
          </div>
        </div>
      </div>
      <div className='preview_back' />
    </div>
  );
}
