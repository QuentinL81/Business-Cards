import React from 'react';
import IconNetwork from '../components/IconNetwork';
import './SocialNetwork.css';
import facebook from '../assets/facebook.svg';
import twitter from '../assets/twitter.svg';
import linkedin from '../assets/linkedin.svg';
import instagram from '../assets/instagram.svg';
import yt from '../assets/yt.svg';
import skype from '../assets/skype.svg';
import whatsapp from '../assets/whatsapp.svg';
import behance from '../assets/behance.svg';

export default function SocialNetwork({
  handleChange
}) {

  return (
    <div className='social-networks'> 
      <IconNetwork image={facebook} name="facebook" label="www.facebook.com/yourpage" handleChange={handleChange} />
      <IconNetwork image={linkedin} name="linkedin" label="www.linkedin.com/yourpage" handleChange={handleChange} />
      <IconNetwork image={twitter} name="twitter" label="www.twitter.com/yourpage" handleChange={handleChange} />
      <IconNetwork image={behance} name="youtube" label="www.youtube.com/yourpage"  handleChange={handleChange} />
      <IconNetwork image={instagram} name="instagram" label="www.instagram.com/yourpage"  handleChange={handleChange} />
      <IconNetwork image={yt} name="github" label="GitHub ID" handleChange={handleChange} />
      <IconNetwork image={whatsapp} name="slack" label="Slack ID" handleChange={handleChange} />
      <IconNetwork image={skype} name="skype" label="Skype ID" handleChange={handleChange} />
    </div>
  );
}
