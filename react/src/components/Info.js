import './Info.css'
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
import facebook from '../assets/facebookbleu.svg';
import twitter from '../assets/twitterbleu.svg';
import linkedin from '../assets/linkedinbleu.svg';
import instagram from '../assets/instagrambleu.svg';
import yt from '../assets/ytbleu.svg';
import skype from '../assets/skypebleu.svg';
import whatsapp from '../assets/whatsappbleu.svg';
import behance from '../assets/behancebleu.svg';
import github from '../assets/githubbleu.svg';
import slack from '../assets/slackbleu.svg';

export default function Info({
    information
}) {

    return (

        <div className='infos'>

            <div className='profile1'>
                <div className='blue1' style={{ backgroundColor: information.color_primary }}></div>
                <div className='cercle1' style={{ backgroundColor: information.color_primary }} />
                {information.file_link_profil && <img className='profile-picture' src={"http://localhost:8080/" + information.file_link_profil} alt='Profile' />}
            </div>

            <div className='background_picture'>
                {information.file_link_background && <img src={"http://localhost:8080/" + information.file_link_background} alt='Background' />}
            </div>
            
            <div className='nom-prénom' style={{ color: information.color_primary }}>
                {information.first_name}<br></br>{information.last_name}
            </div>

            <div className='profession' style={{ color: information.color_secondary }}>
                {information.position}
            </div>
            <div className='profile2'>
                <div className='cercle-chiant-haut'>
                    <Sms id='special_css_svg' className='sms' fill={information.color_secondary} stroke={information.color_secondary} />
                    <Mail id='special_css_svg' className='mail' fill={information.color_secondary} stroke={information.color_secondary} />
                </div>
                <div className='cercle-chiant-bas'>
                    <Tel className='tel' fill={information.color_secondary} stroke={information.color_secondary} />
                    <Adresse className='localisation' fill={information.color_secondary} stroke={information.color_secondary} />
                </div>
                <div className='cercle2' style={{ backgroundColor: information.color_primary }} />
                <div className='blue2' style={{ backgroundColor: information.color_primary }}>
                    <div className='information-preview'>
                        <div className='pastille-blanc'>
                            <Contact fill={information.color_secondary} stroke={information.color_secondary} />
                        </div>
                        <h1 className='title-info' style={{ color: information.color_secondary }}>Contact-Us</h1>
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
                            <Resume fill={information.color_secondary} stroke={information.color_secondary} />
                        </div>
                        <h1 className='title-info' style={{ color: information.color_secondary }}>Resume</h1>
                        <div className='except-title-information-preview-resume'>
                            <p className='p'>A brief description of you and your skills</p>
                            <span className='span-exception-resume'>{information.resume}</span>
                        </div>
                    </div>


                    <div className='information-preview'>
                        <div className='pastille-blanc'>
                            <Localisation fill={information.color_secondary} stroke={information.color_secondary} />
                        </div>
                        <h1 className='title-info' style={{ color: information.color_secondary }}>Location</h1>
                        <div className='except-title-information-preview-localisation'>
                            <span className='span-exception'>{information.address}</span>
                            <a className='map' href=''> See on the map </a>
                        </div>
                    </div>

                    <div className='information-preview'>
                        <div className='pastille-blanc'>
                            <Website fill={information.color_secondary} stroke={information.color_secondary} />
                        </div>
                        <h1 className='title-info' style={{ color: information.color_secondary }}>Website</h1>
                        <div className='except-title-information-preview-localisation'>
                            <a target='_blank' className='url' href={information.site_url}> {information.site_name} </a>
                        </div>
                    </div>

                    <div className='information-preview'>
                        <div className='pastille-blanc'>
                            <Portfolio fill={information.color_secondary} stroke={information.color_secondary} />
                        </div>
                        <h1 className='title-info' style={{ color: information.color_secondary }}>Portfolio</h1>
                        <div className='except-title-information-preview-portfolio'>
                            {information.file_link_download && <img src={information.file_link_download} alt='DownloadLink' width="100%;" />}
                        </div>
                    </div>

                    <div className='information-preview'>
                        <div className='pastille-blanc'>
                            <Social fill={information.color_secondary} stroke={information.color_secondary} />
                        </div>
                        <h1 className='title-info' style={{ color: information.color_secondary }}>Social Networks</h1>
                        <div className='except-title-information-preview-social'>
                            {information.facebook && <a href={information.facebook} target='_blank'><img className='facebook' src={facebook} alt="logo-facebook" /></a>}
                            {information.linkedin && <a href={information.linkedin} target='_blank'><img className='linkedin' src={linkedin} alt="logo-linkedin" /></a>}
                            {information.twitter && <a href={information.twitter} target='_blank'><img className='twitter' src={twitter} alt="logo-twitter" /></a>}
                            {information.instagram && <a href={information.instagram} target='_blank'><img className='instagram' src={instagram} alt="logo-instagram" /></a>}
                            {information.skype && <a href={information.skype} target='_blank'><img className='skype' src={skype} alt="logo-skype" /></a>}
                            {information.github && <a href={information.github} target='_blank'><img className='github' src={github} alt="logo-github" /></a>}
                            {information.slack && <a href={information.slack} target='_blank'><img className='slack' src={slack} alt="logo-slack" /></a>}
                            {information.youtube && <a href={information.youtube} target='_blank'><img className='yt' src={yt} alt="logo-yt" /></a>}
                            {information.behance && <a href={information.behance} target='_blank'><img className='behance' src={behance} alt="logo-behance" /></a>}
                            {information.whatsapp && <a href={information.whatsapp} target='_blank'><img className='whatsapp' src={whatsapp} alt="logo-whatsapp" /></a>}
                        </div>
                    </div>




                    {/*      <div className='Define'>


<div className='LoaderPage'>
<p>Loader image : </p>
{information.fileLinkLoader && <img src={information.fileLinkLoader} alt='LoaderImage' width="200" />}
</div>

*/}

                </div>
            </div>
        </div>
    );
}
