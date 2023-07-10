import React from 'react';
import IconNetwork from '../components/IconNetwork';

export default function SocialNetwork({ 
  handleChange 
}) {
  
  return (
    <div>
      <IconNetwork image="Facebook_icon" name="facebook" label="www.facebook.com/yourpage" handleChange={handleChange} />
      <IconNetwork image="Twitter_icon" name="twitter" label="www.twitter.com/yourpage" handleChange={handleChange} />
      <IconNetwork image="Linkedin_icon" name="linkedin" label="www.linkedin.com/yourpage" handleChange={handleChange} />
      <IconNetwork image="Instagram_icon" name="instagram" label="www.instagram.com/yourpage"  handleChange={handleChange} />
      <IconNetwork image="Skype_icon" name="skype" label="Skype ID" handleChange={handleChange} />
      <IconNetwork image="GitHub_icon" name="github" label="GitHub ID" handleChange={handleChange} />
      <IconNetwork image="Slack_icon" name="slack" label="Slack ID" handleChange={handleChange} />
      <IconNetwork image="Youtube_icon" name="youtube" label="www.youtube.com/yourpage"  handleChange={handleChange} />
    </div>

  );
}
